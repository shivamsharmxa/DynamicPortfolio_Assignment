import React, { useState, useEffect } from 'react';
import Link from "next/link";

const ServicesSection = () => {
    const [servicesData, setServicesData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                if (data && data.user && data.user.services) {
                    const enabledServices = data.user.services.filter(service => service.enabled);
                    setServicesData(enabledServices);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Failed to fetch services data:", error);
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <div>Loading services...</div>;
    }

    return (
       <>
       <div className="mil-section-title mil-up">
            <div className="mil-divider"></div>
            <h3>Services{servicesData.title}</h3>
        </div>
        <section className="mil-p-90-30">
            
            <div className="container">
                <div className="row justify-content-center">
                    
                </div>
                <div className="row justify-content-between align-items-center">
                    {servicesData.map((service, key) => (
                        <div key={service._id} className="col-lg-4">
                            <div className="mil-icon-box mil-center mil-mb-60">
                                <div className="mil-service-icon mil-up">
                                    <img src={service.image.url} alt={service.name} className="mil-mb-30" />
                                </div>
                                <h5 className="mil-up mil-mb-30">{service.name}</h5>
                                <p className="mil-up mil-mb-30">{service.charge}</p>
                                <p className="mil-up mil-mb-30">{service.desc}</p>
                                {/* Link or action can be added here */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
};

export default ServicesSection;

