import React, { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

const Timeline = () => {
    const { t } = useTranslation();

    // Dynamically build timelineData from translation files, grouped by decades
    const timelineData = useMemo(() => {
        const decadesData = t('timeline.decades', { returnObjects: true });
        if (!decadesData || typeof decadesData !== 'object') {
            console.warn("Translation data for 'timeline.decades' is missing or not an object.");
            return [];
        }

        let idCounter = 1;
        const transformedData = [];

        // Define the order of decades to display (latest first, then oldest)
        const decadeKeys = ['2020s', '2010s', '2000s', '1990s'];

        decadeKeys.forEach(decadeKey => {
            const eventsInDecade = decadesData[decadeKey];
            if (Array.isArray(eventsInDecade)) {
                transformedData.push({
                    id: idCounter++,
                    year: decadeKey, // The year label will be the decade (e.g., '2020s')
                    contents: eventsInDecade.map(event => ({
                        date: event.date,
                        title: event.title // Directly use 'title' field from the JSON data
                    }))
                });
            }
        });

        return transformedData;
    }, [t]);

    const [activeId, setActiveId] = useState(timelineData.length > 0 ? timelineData[0].id : null);

    const mainContainerRef = useRef(null);
    const timelineItemRefs = useRef([]); // Refs for desktop vertical items
    const mobileYearRefs = useRef([]); // Refs for mobile horizontal years

    const contentPanelRef = useRef(null);

    // GSAP animations for active year text (desktop) and mobile year underline
    useEffect(() => {
        if (!timelineData.length || activeId === null) {
            return;
        }

        // --- Desktop Year Text Animation ---
        const allDesktopYearTexts = timelineItemRefs.current
            .map(el => el?.querySelector('.year-text'))
            .filter(Boolean);
        gsap.to(allDesktopYearTexts, {
            color: '#9CA3AF', // Inactive text color
            fontWeight: '400',
            duration: 0.3
        });
        const activeDesktopItemElement = timelineItemRefs.current.find(el => el?.dataset.id === String(activeId));
        if (activeDesktopItemElement) {
            const year = activeDesktopItemElement.querySelector('.year-text');
            if (year) {
                gsap.to(year, { color: '#FFFFFF', fontWeight: '700', duration: 0.3 }); // Active text color
            }
        }

        // --- Mobile Year Underline Animation ---
        const allMobileYearUnderlines = mobileYearRefs.current
            .map(el => el?.querySelector('.mobile-underline'))
            .filter(Boolean);
        gsap.to(allMobileYearUnderlines, {
            width: '0%',
            opacity: 0,
            duration: 0.3
        });
        const activeMobileYearElement = mobileYearRefs.current.find(el => el?.dataset.id === String(activeId));
        if (activeMobileYearElement) {
            const underline = activeMobileYearElement.querySelector('.mobile-underline');
            if (underline) {
                gsap.to(underline, {
                    width: '100%',
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            }
        }

    }, [activeId, timelineData]);


    const handleClick = (itemId) => {
        setActiveId(itemId);
    };

    const activeDecadeData = timelineData.find(item => item.id === activeId);

    if (timelineData.length === 0) {
        return (
            <div className="p-4 font-sans text-gray-800 min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-800 to-black">
                Loading timeline data...
            </div>
        );
    }

    return (
        // Outermost container: Background gradient and responsive padding.
        // `pt-10` for mobile, `pt-20` for desktop.
        // Background from gray-800 to black.
        // Removed `justify-center` from outermost div to align content to the left.
        <div className="p-4 md:p-10 font-sans text-gray-800 min-h-screen pt-14 md:pt-20
                        bg-gradient-to-b from-gray-800 to-black">
            
            {/* Main Title Section */}
            {/* Centered on both mobile and desktop. Responsive font size. */}
            <div className="w-full text-center mb-8 md:mb-16">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                    {t('timeline.mainTitle')}
                </h1>
            </div>

            {/* Mobile Horizontal Years at Top (visible only on mobile) */}
            <div className="md:hidden w-full flex justify-center mb-8 text-white">
                <div className="overflow-x-auto whitespace-nowrap hide-scrollbar px-4">
                    <div className="flex space-x-8"> {/* Adjust space-x for gap between years */}
                        {timelineData.map((item, index) => (
                            <div
                                key={item.id}
                                className="inline-block relative cursor-pointer py-2"
                                data-id={item.id}
                                ref={el => { if (el) mobileYearRefs.current[index] = el; }}
                                onClick={() => handleClick(item.id)}
                            >
                                <span className={`text-base md:text-lg ${activeId === item.id ? 'font-bold' : 'font-normal'}`}> {/* Font size adjusted */}
                                    {item.year}
                                </span>
                                <div className="mobile-underline absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ease-out"
                                     style={{ width: activeId === item.id ? '100%' : '0%', opacity: activeId === item.id ? 1 : 0 }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Three-Column Layout (visible only on desktop) */}
            {/* `max-w-6xl` defines max width for the timeline block. */}
            {/* The absence of `mx-auto` and the padding on the parent div means it's left-aligned. */}
            <div className="hidden md:flex w-full max-w-6xl relative" ref={mainContainerRef}>

                {/* Column 1: Years/Decades */}
                <div className="flex-grow pr-2 text-right desktop-years-column">
                    <ul>
                        {timelineData.map((item, index) => (
                            <li
                                key={item.id}
                                className="mb-24 flex items-center justify-end year-container cursor-pointer"
                                data-id={item.id}
                                ref={el => { if (el) timelineItemRefs.current[index] = el; }}
                                onClick={() => handleClick(item.id)}
                            >
                                <div className="flex items-center justify-end h-4">
                                    <span className={`year-text text-base md:text-lg ${activeId === item.id ? 'text-white font-bold' : 'text-gray-900 font-normal'}`}> {/* Font size adjusted */}
                                        {item.year}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 2: Dots and Vertical Line */}
                <div className="w-8 flex-shrink-0 relative flex flex-col items-center desktop-dots-column">
                    <div className="absolute left-1/2 h-full border-l-2 border-gray-700 transform -translate-x-px"></div>
                    <ul>
                        {timelineData.map((item, index) => (
                            <li
                                key={item.id}
                                className="relative mb-24 flex items-center justify-center dot-container cursor-pointer"
                                data-id={item.id}
                                onClick={() => handleClick(item.id)}
                            >
                                <div className={`dot w-4 h-4 rounded-full transition-all duration-300 ease-out
                                    ${activeId === item.id
                                        ? 'bg-gray-800 border-4 border-white w-6 h-6'
                                        : 'bg-gray-500 border-2 border-gray-500'
                                    }`}>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3: Content Display Area (Desktop) */}
                <div className="flex-grow ml-16 relative">
                    <div
                        className="absolute w-full top-0 left-0"
                        ref={contentPanelRef}
                    >
                        {activeDecadeData && activeDecadeData.contents.map((contentItem, contentIndex) => (
                            <div key={`${activeDecadeData.id}-${contentIndex}`} className="timeline-content-item mb-6">
                                <p className="text-sm md:text-base text-gray-400"> {/* Font size adjusted */}
                                    {contentItem.date}
                                </p>
                                <h2 className="text-lg md:text-2xl font-bold text-white"> {/* Font size adjusted */}
                                    {contentItem.title}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Vertical Content (visible only on mobile) */}
            {/* Text color on mobile is now white */}
            {activeDecadeData && (
                <div className="block md:hidden mt-8 w-full px-4 text-white text-center">
                    {activeDecadeData.contents.map((contentItem, contentIndex) => (
                        <div key={`${activeDecadeData.id}-mobile-${contentIndex}`} className="timeline-content-item mb-4">
                            <p className="text-sm"> {/* Font size adjusted */}
                                {contentItem.date}
                            </p>
                            <h2 className="text-lg font-bold"> {/* Font size adjusted */}
                                {contentItem.title}
                            </h2>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Timeline;