import { useState, useRef } from 'react';
import Slider from 'react-slick';
import { MoveRight, MoveLeft } from 'lucide-react';

const KaffsWorldSection = () => {
    const sliderRef = useRef<Slider | null>(null);

    const tabs = ['Articles', 'Press Release', 'News'] as const;
    const [activeTab, setActiveTab] = useState<typeof tabs[number]>('Articles');

    const contentData = {
        Articles: [
            {
                id: 1,
                image: '/articles3.png',
                title: 'Why Closed Kitchen Cabinets Are Better for Dust-Free Storage',
                description: 'In many Indian homes, open kitchens with exposed shelves may look stylish and feel convenient...',
                date: 'January 15, 2024'
            },
            {
                id: 2,
                image: '/articles1.png',
                title: 'How a Wine Cooler Can Preserve Taste, Aroma, and Glass',
                description: 'Opening a bottle of wine can feel special. The pop of the cork, the swirl in the glass, and the first sip...',
                date: 'January 15, 2024'
            },
            {
                id: 3,
                image: '/articles2.png',
                title: 'How to Choose the Best Chimney Based on Your Cooking Habits',
                description: 'Buying a kitchen chimney is a smart investment for a cleaner, healthier kitchen...',
                date: 'January 15, 2024'
            },
            {
                id: 4,
                image: '/articles1.png',
                title: 'How to Choose the Best Chimney Based on Your Cooking Habits',
                description: 'Discover the latest trends that are shaping modern kitchens this year...',
                date: 'January 15, 2024'
            }
        ],
        'Press Release': [
            {
                id: 5,
                image: '/articles3.png',
                title: 'KAFF Announces New Product Line Launch',
                description: 'Leading kitchen appliance brand introduces innovative solutions for modern homes...',
                date: 'January 15, 2024'
            },
            {
                id: 6,
                image: '/articles3.png',
                title: 'Partnership with Leading Interior Designers',
                description: 'Strategic collaboration to bring premium kitchen experiences to customers...',
                date: 'January 15, 2024'
            },
            {
                id: 7,
                image: '/articles3.png',
                title: 'Awards and Recognition 2024',
                description: 'KAFF receives multiple industry awards for innovation and design excellence...',
                date: 'January 15, 2024'
            }
        ],
        News: [
            {
                id: 8,
                image: '/articles3.png',
                title: 'Kitchen Technology Innovations',
                description: 'Latest developments in smart kitchen appliances and IoT integration...',
                date: 'January 15, 2024'
            },
            {
                id: 9,
                image: '/articles3.png',
                title: 'Sustainable Kitchen Solutions',
                description: 'How eco-friendly kitchen appliances are changing the industry...',
                date: 'January 15, 2024'
            },
            {
                id: 10,
                image: '/articles3.png',
                title: 'Market Trends in Premium Kitchens',
                description: 'Analysis of current market trends and consumer preferences...',
                date: 'January 15, 2024'
            }
        ]
    };

    const currentContent = contentData[activeTab] || [];

    // Slick slider settings
    const sliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
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
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                }
            }
        ]
    };

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    return (
        <section className="kaffs_world_sec bg-black padding">
            <div className="container">
                <div className="mb-[3.75rem]">
                    <div className="flex items-end justify-between">
                        <div>
                            <h2 className="text-[4rem] font-bold text-white mb-6">KAFF's World</h2>
                            <p className="text-white">Insights, tips, and inspiration for your modern kitchen</p>
                        </div>

                        {/* Custom Arrow Controls */}
                        <div className="flex items-center gap-2">
                            <button
                            onClick={prevSlide}
                            className="w-[50px] h-[50px] rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
                        >
                            <MoveLeft className="text-white" />
                        </button>
                              <button
                            onClick={nextSlide}
                            className="w-[50px] h-[50px] rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-gray-800 transition-colors duration-300"
                        >
                            <MoveRight className="text-white" />
                        </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-8 mb-12">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 text-lg font-medium transition-colors duration-300 relative ${activeTab === tab
                                    ? 'text-white border-b-2 border-white'
                                    : 'text-white hover:text-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* React Slick Slider */}
                <div className="kaffs-world-slider">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        {currentContent.map((item) => (
                            <div key={item.id} className="px-3">
                                <div className="bg-white rounded-lg overflow-hidden hover:-translate-y-2 transition-all duration-300 group cursor-pointer">
                                    {/* Image */}
                                    <div className="aspect-[4/3] overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="pt-8 pr-10 pb-[68px] pl-10">
                                        <div className="text-[18px] text-[#959595] mb-3 tracking-wider">
                                            {item.date}
                                        </div>
                                        <h3 className="text-black font-semibold text-2xl mb-6 leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-black text-xl leading-relaxed mb-8">
                                            {item.description}
                                        </p>
                                        <button className="text-black font-semibold text-md hover:text-gray-300 transition-colors duration-300 flex items-center gap-2 tracking-[4%] underline underline-offset-[6px]">
                                            READ ARTICLE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>


        </section>
    );
};

export default KaffsWorldSection;