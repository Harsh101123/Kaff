import type { AppLoadContext, EntryContext } from '@shopify/remix-oxygen';
import { RemixServer } from '@remix-run/react';
import isbot from 'isbot';
import { renderToReadableStream } from 'react-dom/server';
import { createContentSecurityPolicy } from '@shopify/hydrogen';

/**
 * ENTRY.SERVER.TSX EXPLANATION
 * 
 * This file handles SERVER-SIDE RENDERING (SSR) for your Hydrogen app.
 * It's called every time someone requests a page from your store.
 */

export default async function handleRequest(
  // ===== FUNCTION PARAMETERS =====
  request: Request,              // The incoming HTTP request (GET, POST, etc.)
  responseStatusCode: number,    // HTTP status code (200, 404, 500, etc.)
  responseHeaders: Headers,      // HTTP response headers
  remixContext: EntryContext,    // Remix context with route data and matches
  context: AppLoadContext,       // Shopify context with storefront, env vars, etc.
) {
  
  // ===== 1. CONTENT SECURITY POLICY (CSP) SETUP =====
  /**
   * CSP is a security feature that prevents XSS attacks by controlling
   * which resources (scripts, styles, fonts) can be loaded on your site.
   * 
   * The nonce is a unique token that allows specific inline scripts/styles to run.
   */
  const { nonce, header, NonceProvider } = createContentSecurityPolicy({
    shop: {
      // These domains are trusted for Shopify checkout and store operations
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,  // e.g., "checkout.shopify.com"
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,        // e.g., "your-store.myshopify.com"
    },
    
    // ===== STYLE SOURCES =====
    // Controls where CSS can be loaded from
    styleSrc: [
      "'self'",              // Allow styles from your own domain
      "'unsafe-inline'",     // Allow inline styles (needed for many components)
      'https://use.typekit.net',     // Adobe Fonts
      'https://cdn.shopify.com',     // Shopify CDN for themes/assets
      // During development, allow localhost with any port
      ...(process.env.NODE_ENV !== 'production' ? ['http://localhost:*'] : []),
    ],
    
    // ===== FONT SOURCES =====
    // Controls where fonts can be loaded from
    fontSrc: [
      "'self'",              // Allow fonts from your own domain
      'https://use.typekit.net',     // Adobe Fonts (for your TypeKit fonts)
    ],
    
    // ===== OTHER POSSIBLE DIRECTIVES =====
    // You can add more security directives as needed:
    // scriptSrc: [
    //   "'self'",
    //   "'nonce-" + nonce + "'",    // Allow scripts with correct nonce
    //   'https://cdn.shopify.com',
    // ],
    // imgSrc: [
    //   "'self'",
    //   'data:',                     // Allow data URLs for images
    //   'https://cdn.shopify.com',
    // ],
  });

  // ===== 2. SERVER-SIDE RENDERING =====
  /**
   * This converts your React components into HTML on the server.
   * renderToReadableStream is used instead of renderToString for better performance
   * with streaming - it sends HTML chunks as they're ready instead of waiting
   * for the entire page to render.
   */
  const body = await renderToReadableStream(
    // Wrap the entire app in NonceProvider to make nonce available to all components
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,                 // Pass the nonce for CSP compliance
      signal: request.signal, // Allow request cancellation (if user navigates away)
      
      // ===== ERROR HANDLING =====
      onError(error) {
        // Log any rendering errors to console
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;  // Set HTTP 500 status for server errors
      },
    },
  );

  // ===== 3. BOT DETECTION =====
  /**
   * Search engine crawlers and bots need the complete HTML before they can index it.
   * Regular users can start seeing content as it streams in.
   * 
   * isbot() detects if the request is from a search engine or bot.
   * If it is, we wait for ALL content to be ready before sending response.
   */
  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;  // Wait for complete HTML for SEO bots
  }
  // For regular users, streaming starts immediately for faster perceived performance

  // ===== 4. RESPONSE HEADERS =====
  /**
   * Set the response headers that tell the browser:
   * - What type of content this is (text/html)
   * - What security policies to enforce (CSP header)
   */
  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);  // Apply CSP rules
  
  // ===== 5. SEND RESPONSE =====
  /**
   * Return the final HTTP response with:
   * - The rendered HTML body (streaming)
   * - All the headers (including CSP)
   * - The appropriate status code
   */
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}

/**
 * ===== HOW THIS FIXES YOUR ROUTER ISSUES =====
 * 
 * 1. PROPER SSR SETUP: Ensures React Router context is available during server rendering
 * 2. NONCE PROVIDER: Makes nonce available to all components for secure inline scripts
 * 3. STREAMING: Prevents hydration mismatches by handling rendering properly
 * 4. BOT HANDLING: Ensures SEO crawlers get complete HTML
 * 5. ERROR BOUNDARIES: Catches rendering errors gracefully
 * 
 * ===== RELATIONSHIP TO YOUR SLIDER/HEADER ISSUES =====
 * 
 * - Your Slick Slider errors happen because components try to use router hooks 
 *   before the router context is properly established
 * - This file ensures the router context is available during SSR
 * - The NonceProvider allows your inline scripts (like slider initialization) to run securely
 * - Proper streaming prevents hydration mismatches between server and client rendering
 */