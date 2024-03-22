import React, { useState, useEffect } from 'react';

const SkillsTwoSection = () => {
  const [skillsData, setSkillsData] = useState([]);
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
        if (data && data.user && data.user.skills) {
          const enabledSkills = data.user.skills.filter(skill => skill.enabled);
          const updatedSkillsData = enabledSkills.map(skill => ({
            ...skill,
            percentage: Math.floor(Math.random() * 31) + 70 // Generate random percentage values
          }));
          setSkillsData(updatedSkillsData);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch skills data:", error);
        setIsLoading(false);
      });
  }, []);

  // Intersection Observer to animate skill bars on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.width;
            obs.unobserve(entry.target);
          }
        });
      }, 
      { threshold: 0.1 }
    );

    document.querySelectorAll('.skill-percentage').forEach((elem) => {
      observer.observe(elem);
    });

    // Clean-up function
    return () => observer.disconnect();
  }, [skillsData]);

  if (isLoading) {
    return <div>Loading skills...</div>;
  }

  return (
    <div className="skills-container">
      {skillsData.map((skill, index) => (
        <div key={`skill-${index}`} className="skill-row">
          <div className="skill-name">{skill.name}</div>
          <div className="skill-bar">
            <div 
              className="skill-percentage"
              data-width={`${skill.percentage}%`} 
              style={{ width: '0%', transition: 'width 2s ease' }}
            >
              <span className="skill-percentage-label">{`${skill.percentage}%`}</span>
            </div>
          </div>
        </div>
      ))}
      <style jsx>
        {`
        .skills-container {
            width: 100%;
            font-family: Arial, sans-serif;
        }
        .skill-row {
            margin-bottom: 1rem;
        }
        .skill-name {
            font-size: 1rem;
            margin-bottom: 0.5rem;
            color: #333;
        }
        .skill-bar {
            width: 100%;
            background-color: #eee;
            border-radius: 3px;
            height: 1rem;
            position: relative;
        }
        .skill-percentage {
            height: 100%;
            border-radius: 3px;
            background-color: #007bff;
            position: absolute;
            top: 0; left: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
        }
        .skill-percentage-label {
            color: white;
            font-size: 0.8rem;
            font-weight: bold;
            padding-right: 0.5rem;
            display: block;
            margin-left: auto; // Ensures that the label stays at the end of the bar.
        }
        `}
      </style>
    </div>
  );
};

export default SkillsTwoSection;
