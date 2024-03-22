import React from 'react';
import Data from "@data/sections/skills-1.json"; // Confirm this path is correct
import { useInView } from 'react-intersection-observer';

const SkillsOneSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Calculate the circumference of the circle
  const radius = 18; // Assuming the SVG circle radius is 18
  const circumference = 2 * Math.PI * radius;

  return (
    <>
      <div ref={ref} className={`mil-section ${inView ? 'in-view' : 'out-of-view'}`}>
        <div className="mil-section-title mil-up">
          <div className="mil-divider"></div>
          <h3>{Data.title}</h3>
        </div>

        <section className="mil-lang-skills mil-p-90-60">
          <div className="row justify-content-between align-items-center">
            {Data.items.map((item, key) => (
              <div key={`skills1-item-${key}`} className="col-6 col-lg-3">
                <div className="mil-lang-skills-item mil-center mil-up mil-mb-30">
                  <svg viewBox="0 0 36 36" className="circular-chart in-view">
                    <path className="circle-bg"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="#eee" strokeWidth="2.8" />
                    <path className="circle"
                      strokeDasharray={`${circumference}, ${circumference}`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="#00a1ff" strokeWidth="2.8"
                      style={{
                        strokeDashoffset: inView ? circumference - (item.value / 100) * circumference : circumference,
                        transition: 'stroke-dashoffset 1s ease-out',
                      }}
                    />
                  </svg>
                  <h6>{item.label}</h6>
                  <span className="mil-counter">
                    {inView ? `${item.value}%` : '0%'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .mil-section {
          transition: opacity 1s, transform 1s;
          opacity: 0;
          transform: translateY(20px);
          visibility: hidden;
        }
        .in-view {
          opacity: 1;
          transform: translateY(0);
          visibility: visible;
        }
        .out-of-view {
          opacity: 0;
          transform: translateY(20px);
          visibility: hidden;
        }
        .circular-chart {
          display: block;
          margin: 10px auto;
          max-width: 80%;
          max-height: 250px;
        }
        .circle-bg {
          fill: none;
          stroke: #eee;
        }
        .circle {
          fill: none;
          stroke-linecap: round;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
        .mil-lang-skills-item h6 {
          margin-top: 15px;
        }
        .mil-counter {
          display: block;
          font-size: 20px;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default SkillsOneSection;
