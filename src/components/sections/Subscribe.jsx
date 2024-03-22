import React, { useEffect, useState } from 'react';

const SubscribeSection = () => {
    const [subscribeData, setSubscribeData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setSubscribeData(jsonData.subscribe); // Assuming your API response has a structure similar to your JSON file
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {/* call to action */}
            <section id="about" className="mil-p-90-90">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="mil-center">
                            <h2 className="mil-up mil-mb-60">{subscribeData ? subscribeData.title : 'Loading...'}</h2>
                            <div className="mil-up">
                                <form action={subscribeData ? subscribeData.formAction : '#'} method="post" target="_blank" className="mil-subscribe-form">
                                    <input type="email" placeholder="Your Email" name="EMAIL" required />
                                    <input type="hidden" name={subscribeData ? subscribeData.hiddenFieldName : ''} />
                                    <button type="submit">{subscribeData ? subscribeData.buttonText : 'Subscribe'}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* call to action end */}
        </>
    );
};

export default SubscribeSection;
