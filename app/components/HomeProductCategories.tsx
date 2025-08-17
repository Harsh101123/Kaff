import React from 'react';
import Slider from 'react-slick';
import { MoveRight, MoveLeft } from 'lucide-react';
import { Link } from './Link';

const categories = [
    {
        id: 1,
        name: "Chimneys",
        image: "./product-categories.png",
        productCount: 23
    },
    {
        id: 2,
        name: "Built-in Hobs",
        image: "./product-categories1.png",
        productCount: 22
    },
    {
        id: 3,
        name: "Built-in Ovens",
        image: "./product-categories2.png",
        productCount: 42
    },
    {
        id: 4,
        name: "Dishwashers",
        image: "./product-categories3.png",
        productCount: 12
    },
    {
        id: 5,
        name: "Microwaves",
        image: "./product-categories.png",
        productCount: 18
    },
    {
        id: 6,
        name: "Cooktops",
        image: "./product-categories1.png",
        productCount: 15
    }
];

// Category type definition
interface Category {
    id: number;
    name: string;
    image: string;
    productCount: number;
}

// Category Card Component
const CategoryCard = ({ category }: { category: Category }) => (
    <div className="px-3">
    <Link to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}>
        <div className="relative bg-[#1a1a1a] rounded-[12px] overflow-hidden hover:bg-[#252525] transition-all duration-300 cursor-pointer group hover:-translate-y-[10px]">
            {/* Category Image */}
            <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a]">
                <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"></div>

            {/* Category Info */}
            <div className="p-6 absolute z-10 w-full bottom-0">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white transition-colors duration-300">
                    {category.name}
                </h3>
                <p className="text-[#CCCCCC] text-sm group-hover:text-white/90 transition-colors duration-300">
                    {category.productCount} Products
                </p>
            </div>
        </div>
    </Link>
</div>
);

const HomeProductCategories = () => {
    const sliderRef = React.useRef<Slider>(null);

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4.2,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3.2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2.2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.2,
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
        <section className="home_product_categories padding bg-[#000] overflow-hidden">
            <div className="container">
                <div className="mb-[3.75rem]">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-[4rem] font-bold text-white mb-6">Product Categories</h2>
                            <p className="text-white">Explore our complete range of premium kitchen solutions</p>
                        </div>

                        {/* Custom Arrow Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={goToPrev}
                                className="w-[50px] h-[50px] bg-transparent rounded-full border border-[#CCCCCC] flex items-center justify-center transition-colors"
                                aria-label="Previous"
                            >
                                <MoveLeft className="text-white" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="w-[50px] h-[50px] bg-transparent rounded-full border border-[#CCCCCC] flex items-center justify-center transition-colors"
                                aria-label="Next"
                            >
                                <MoveRight className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Slider */}
                <div className="relative">
                    <Slider ref={sliderRef} {...settings}>
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default HomeProductCategories;