import React, { useState, useEffect } from 'react';

const HeroOne = () => {
    const [heroData, setHeroData] = useState(null);

    useEffect(() => {
        // Replace with your actual API endpoint URL
        const endpoint = 'https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae';

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Adjust this according to your actual API response structure
                // For now, we are using a placeholder structure
                setHeroData(data.user.about);
            })
            .catch(error => {
                console.error("Failed to fetch Hero Section data:", error);
            });
    }, []);

    if (!heroData) {
        return <div>Loading hero section...</div>;
    }

    return (
        <>
            {/* banner */}
            <section className="mil-side-banner mil-center" style={{ backgroundImage: `url(${heroData.image})` }}>
                <div className="mil-banner-top mil-up"></div>
                <div className="mil-banner-title">
                    <div className="mil-upper mil-dark mil-up mil-mb-30"> Hello! My Name is</div>
                    {/* Safely set inner HTML for title, which may contain <br/> */}
                    <h1 className="mil-up mil-mb-30" dangerouslySetInnerHTML={{ __html: heroData.name }} />
                    <p className="mil-upper mil-dark mil-up">{heroData.title}</p>
                </div>
                <div className="mil-up mil-oval-frame">
                    {/* The rest of your SVG and scroll down button */}
                </div>
            </section>
            {/* banner end */}
        </>
    );
};

export default HeroOne;
