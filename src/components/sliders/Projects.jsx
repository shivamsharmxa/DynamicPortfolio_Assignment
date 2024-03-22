import { sliderProps } from "@/src/common/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Ensure you import Swiper styles
import Link from "next/link";

const ProjectsSlider = ({ projects }) => {
  return (
    <>
      <section className="mil-p-90-0">
        <div className="row">
          <div className="col-lg-9">
            <Swiper
              {...sliderProps.milPortfolioCarousel}
              className="mil-swiper-container mil-portfolio-carousel mil-up"
            >
              {projects.map((project, key) => (
                <SwiperSlide className="swiper-slide" key={`project-item-${project._id}`}>
                  <div className="mil-portfolio-item mil-item-2 mil-carousel-item">
                    <div className="mil-cover-frame">
                      {/* Adjusted to correctly access the image URL */}
                      <img src={project.image.url} alt={project.title} data-swiper-parallax="-130" data-swiper-parallax-scale="1.25" />
                    </div>
                    <div className="mil-description" data-swiper-parallax-y="-100%" data-swiper-parallax-duration="400">
                      <h4>{project.title}</h4>
                      {/* Adjusted to use project._id for the URL */}
                      <Link href={`/projects/${project._id}`} className="mil-btn">View project</Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-lg-3">
            <div className="mil-carousel-nav">
              <div className="mil-carousel-nav-arrow mil-portfolio-prev">
                {/* SVG for previous arrow */}
              </div>
              <div className="mil-carousel-nav-arrow mil-portfolio-next">
                {/* SVG for next arrow */}
              </div>
              <div className="mil-portfolio-pagination mil-upper mil-dark" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsSlider;

