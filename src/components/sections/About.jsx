import React, { useState, useEffect } from 'react';

const AboutSection = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const endpoint = 'https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae';

        fetch(endpoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the API's response structure matches what you expect
                setAboutData(data.user.about);
            })
            .catch(error => {
                console.error("Failed to fetch About Section data:", error);
            });
    }, []);

    if (!aboutData) {
        return <div>Loading about section...</div>;
    }

    return (
        <section id="about" className="mil-p-0-90">
            <div className="mil-oval-frame-2 mil-mb-90">
                {/* Ensure the avatar image and alt text are being referenced correctly */}
                <img src={aboutData.avatar.url} alt={aboutData.name} />
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="mil-center"> 
                        {/* Set inner HTML directly since we assume it's safe content from your API */}
                        <h2 className="mil-up mil-mb-30"  dangerouslySetInnerHTML={{__html: aboutData.title}} />
                        <div className="mil-quote mil-up mil-mb-30"><i className="fas fa-quote-left" /></div>
                        <p className="mil-up mil-mb-30">{aboutData.subTitle}</p>
                        <p className="mil-up mil-mb-30">{aboutData.description}</p>
                        {/* The signature might not be present in the data; add it if needed */}
                        {/* <img src={aboutData.signature.url} alt="Signature" className="mil-up mil-sign" /> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;

