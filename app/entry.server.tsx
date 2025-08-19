import type {AppLoadContext, EntryContext} from '@remix-run/node';
import {RemixServer} from '@remix-run/react';
import {createContentSecurityPolicy} from '@shopify/hydrogen';
import {renderToReadableStream} from 'react-dom/server';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  // Configure CSP
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    defaultSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
    ],
    styleSrc: [
      "'self'",
      "'unsafe-inline'",
      'https://cdn.shopify.com',
      'https://use.typekit.net', // Add typekit for fonts
      'https://p.typekit.net',   // Add typekit for fonts
    ],
    fontSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://use.typekit.net',
      'https://p.typekit.net',
      'data:',
    ],
    scriptSrc: [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      `'nonce-${nonce}'`,
      'https://cdn.shopify.com',
      'https://shopify.com',
    ],
    imgSrc: [
      "'self'",
      'data:',
      'https://cdn.shopify.com',
      'https://shopify.com',
    ],
    connectSrc: [
      "'self'",
      'https://shopify.com',
      'https://monorail-edge.shopifysvc.com',
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error: unknown) {
        // Log streaming rendering errors from inside the shell
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (responseStatusCode === 200) {
    responseHeaders.set('Content-Type', 'text/html');
    responseHeaders.set('Content-Security-Policy', header);
  }

  return new Response(body, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}