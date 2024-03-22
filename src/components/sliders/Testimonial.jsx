import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import fetch from 'isomorphic-unfetch';
import { Navigation, Pagination } from 'swiper';

const TestimonialSlider = () => {
  const [testimonialData, setTestimonialData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data && data.user && data.user.testimonials) {
          setTestimonialData(data.user.testimonials.filter(testimonial => testimonial.enabled));
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading testimonials...</div>;
  }

  if (testimonialData.length === 0) {
    return <div>No testimonials available.</div>;
  }

  return (
    <>
      <div className="mil-section-title mil-up">
        <div className="mil-divider" />
        <h3>Reviews</h3>
      </div>
      <section className="mil-p-90-90">
        <div className="row justify-content-center mil-reviews-slider-frame">
          <div className="col-lg-8">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination]} // Activate Navigation and Pagination modules
      
    >
            
              {testimonialData.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="mil-review mil-center">
                    <div className="mil-review-top">
                      <img src={testimonial.image.url} alt={testimonial.name} className="mil-avatar mil-up" />
                      <div className="mil-name">
                        <h4 className="mil-up mil-mb-5">{testimonial.name}</h4>
                        <p className="mil-upper mil-up">{testimonial.position}</p>
                      </div>
                    </div>
                    <p className="mil-up">{testimonial.review}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mil-slider-nav mil-up">
            <div className="mil-reviews-prev">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </div>
            <div className="mil-reviews-next">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
          <div className="swiper-reviews-pagination mil-up"></div>
        </div>
      </section>
    </>
  );
};

export default TestimonialSlider;
