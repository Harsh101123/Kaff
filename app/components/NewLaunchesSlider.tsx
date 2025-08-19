import React, { useState, useEffect } from 'react';
import { MoveRight, MoveLeft, Star } from 'lucide-react';
import { Link } from './Link';
import { ClientOnly } from '~/components/ClientOnly';

const products = [
    {
        id: 1,
        name: "LINNEA RG 60 DC- BLDC Motor Chimney",
        image: "./new-launches1.png",
        price: "₹66,299",
        originalPrice: "₹69,800",
        rating: 4.2
    },
    {
        id: 2,
        name: "ASF 94V - 4 Burners with full FFD Built-In Hob",
        image: "./new-launches2.png",
        price: "₹39,990",
        originalPrice: "₹49,990",
        rating: 4.2
    },
    {
        id: 3,
        name: "LINNEA RG 60 DC- BLDC Motor Chimney",
        image: "./new-launches3.png",
        price: "₹66,299",
        originalPrice: "₹69,990",
        rating: 4.2
    },
    {
        id: 4,
        name: "LINNEA RG 60 DC- BLDC Motor Chimney",
        image: "./new-launches4.png",
        price: "₹66,299",
        originalPrice: "₹69,800",
        rating: 4.2
    },
    {
        id: 5,
        name: "LINNEA RG 60 DC- BLDC Motor Chimney",
        image: "./new-launches1.png",
        price: "₹66,299",
        originalPrice: "₹69,800",
        rating: 4.2
    },
    {
        id: 6,
        name: "ASF 94V - 4 Burners with full FFD Built-In Hob",
        image: "./new-launches2.png",
        price: "₹39,990",
        originalPrice: "₹49,990",
        rating: 4.2
    },
    {
        id: 7,
        name: "LINNEA RG 60 DC- BLDC Motor Chimney",
        image: "./new-launches3.png",
        price: "₹66,299",
        originalPrice: "₹69,990",
        rating: 4.2
    },
    {
        id: 8,
        name: "LINNEA RG 60 DC- BLDC Motor Chimney",
        image: "./new-launches4.png",
        price: "₹66,299",
        originalPrice: "₹69,800",
        rating: 4.2
    }
];

// Product type definition
interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    originalPrice: string;
    rating: number;
}

// Static Product Card Component (for fallback)
const StaticProductCard = ({ product }: { product: Product }) => (
    <div className="bg-[#F2F2F2] rounded-[12px] overflow-hidden mb-6">
        <Link to="/">
            {/* Product Image */}
            <div className="flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                />
            </div>
            {/* Product Info */}
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-black mb-3 line-clamp-2">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-2 mb-8">
                    <span className="text-2xl font-medium text-color">{product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button className="flex-1 pt-[8px] pr-5 pb-[12px] pl-5 text-sm font-medium text-[#2D2D2D] bg-white border border-[#2D2D2D] hover:bg-gray-50 transition-colors">
                        QUICK VIEW
                    </button>
                    <button className="flex-1 pt-[8px] pr-5 pb-[12px] pl-5 text-sm font-medium text-white bg-[#2D2D2D] hover:bg-[#2d2d2deb] transition-colors">
                        SHOP NOW
                    </button>
                </div>
            </div>
        </Link>
    </div>
);

// Static fallback component for SSR and loading state
const StaticNewLaunches = () => (
    <section className="newlaunches_sec padding overflow-hidden">
        <div className="container">
            <div className="mb-[3.75rem]">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-[4rem] font-bold text-black mb-6">New Launches</h2>
                        <p className="text-black">Discover our latest innovations in kitchen technology</p>
                    </div>

                    {/* Static Arrow Controls (disabled for fallback) */}
                    <div className="flex items-center gap-2">
                        <button
                            className="w-[50px] h-[50px] bg-white rounded-full border border-[#CCCCCC] flex items-center justify-center opacity-50 cursor-not-allowed"
                            aria-label="Previous"
                            disabled
                        >
                            <MoveLeft className="text-[#373737]" />
                        </button>
                        <button
                            className="w-[50px] h-[50px] bg-white rounded-full border border-[#CCCCCC] flex items-center justify-center opacity-50 cursor-not-allowed"
                            aria-label="Next"
                            disabled
                        >
                            <MoveRight className="text-[#373737]" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Static Grid Layout - showing first 4 products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.slice(0, 4).map((product) => (
                    <StaticProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    </section>
);

// Dynamic slider component with dynamic import
const NewLaunchesWithDynamicImport = () => {
    const [SliderComponent, setSliderComponent] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Dynamically import react-slick only when needed
        Promise.all([
            import('react-slick'),
        ]).then(([slickModule]) => {
            setSliderComponent(() => slickModule.default);
            setIsLoading(false);
        }).catch((error) => {
            console.error('Failed to load slider:', error);
            setIsLoading(false);
        });
    }, []);

    if (isLoading || !SliderComponent) {
        return <StaticNewLaunches />;
    }

    const sliderRef = React.useRef<any>(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4.1,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const goToPrev = () => {
        sliderRef.current?.slickPrev();
    };

    const goToNext = () => {
        sliderRef.current?.slickNext();
    };

    return (
        <section className="newlaunches_sec padding overflow-hidden">
            <div className="container">
                <div className="mb-[3.75rem]">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-[4rem] font-bold text-black mb-6">New Launches</h2>
                            <p className="text-black">Discover our latest innovations in kitchen technology</p>
                        </div>

                        {/* Interactive Arrow Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToPrev}
                                className="w-[50px] h-[50px] bg-white rounded-full border border-[#CCCCCC] flex items-center justify-center hover:bg-gray-50 transition-colors"
                                aria-label="Previous"
                            >
                                <MoveLeft className="text-[#373737]" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="w-[50px] h-[50px] bg-white rounded-full border border-[#CCCCCC] flex items-center justify-center hover:bg-gray-50 transition-colors"
                                aria-label="Next"
                            >
                                <MoveRight className="text-[#373737]" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dynamic Slider */}
                <div className="relative">
                    <SliderComponent ref={sliderRef} {...settings}>
                        {products.map((product) => (
                            <div key={product.id} className="px-3">
                                <div className="bg-[#F2F2F2] rounded-[12px] overflow-hidden">
                                    <Link to="/">
                                        {/* Product Image */}
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="max-w-full max-h-full object-contain"
                                                loading="lazy"
                                            />
                                        </div>
                                        {/* Product Info */}
                                        <div className="p-6">
                                            <h3 className="text-2xl font-semibold text-black mb-3 line-clamp-2">
                                                {product.name}
                                            </h3>

                                            {/* Price */}
                                            <div className="flex items-center gap-2 mb-8">
                                                <span className="text-2xl font-medium text-color">{product.price}</span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                                                )}
                                            </div>

                                            {/* Buttons */}
                                            <div className="flex gap-3">
                                                <button className="flex-1 pt-[8px] pr-5 pb-[12px] pl-5 text-sm font-medium text-[#2D2D2D] bg-white border border-[#2D2D2D] hover:bg-gray-50 transition-colors">
                                                    QUICK VIEW
                                                </button>
                                                <button className="flex-1 pt-[8px] pr-5 pb-[12px] pl-5 text-sm font-medium text-white bg-[#2D2D2D] hover:bg-[#2d2d2deb] transition-colors">
                                                    SHOP NOW
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </SliderComponent>
                </div>
            </div>
        </section>
    );
};

// Main component
const NewLaunches = () => {
    return (
        <ClientOnly fallback={<StaticNewLaunches />}>
            {() => <NewLaunchesWithDynamicImport />}
        </ClientOnly>
    );
};

export default NewLaunches;