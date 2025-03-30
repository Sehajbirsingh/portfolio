document.addEventListener('DOMContentLoaded', () => {

    // --- Project Data ---
    const projects = [
        // (Keep the project data array exactly as before)
        {
            id: "sql-converter",
            title: "SQL Syntax Converter",
            description: "A web application built with Python and Flask to automatically convert MS SQL Server syntax to Snowflake SQL.",
            github_url: "https://github.com/Sehajbirsingh/sql_converter",
            live_url: null,
            image: "assets/project_placeholders/sql_converter_ui.png",
            tech_stack: ["Python", "Flask", "SQL", "Snowflake", "MS SQL Server"]
        },
        {
            id: "airbnb-toronto",
            title: "Toronto Airbnb Analysis",
            description: "Analyzed complex Toronto Airbnb data using MongoDB and NLP techniques. Built end-to-end ETL pipelines (SSIS, SSAS) migrating insights to SQL Server, visualized via Power BI.",
            github_url: "https://github.com/Sehajbirsingh/airbnb_toronto",
            live_url: null,
            image: "assets/project_placeholders/airbnb_dashboard.png",
            tech_stack: ["MongoDB", "NLP", "Python", "SQL Server", "SSIS", "SSAS", "Power BI", "ETL"]
        },
        {
            id: "ai-job-rec",
            title: "AI Job Recommendation System",
            description: "End-to-end Generative AI project providing personalized job recommendations from resumes using TensorFlow, embeddings, vector DB, and Mistral AI API.",
            github_url: "https://github.com/Sehajbirsingh/AI_JOB_Recommendation",
            live_url: null,
            image: "assets/project_placeholders/ai_job_rec_ui.png",
            tech_stack: ["GenAI", "TensorFlow", "Deep Learning", "Vector DB", "Mistral AI", "Python"]
        },
        {
            id: "virtual-canvas",
            title: "Virtual Canvas",
            description: "Computer vision project using OpenCV and MediaPipe for hand landmark detection, allowing users to draw in the air by moving their fingers.",
            github_url: "https://github.com/Sehajbirsingh/Virtual-Canvas",
            live_url: null,
            image: "assets/project_placeholders/virtual_canvas_demo.gif",
            tech_stack: ["Computer Vision", "OpenCV", "MediaPipe", "Python", "ML"]
        },
        {
            id: "block-vote",
            title: "Block-Vote",
            description: "A decentralized, transparent, and secure voting system built on blockchain. Deployed on Ethereum testnet using Ganache, Solidity, and Truffle.",
            github_url: "https://github.com/Sehajbirsingh/BLOCK-VOTE",
            live_url: null, // Add link if deployed
            image: "assets/project_placeholders/block_vote_ui.png",
            tech_stack: ["Blockchain", "Ethereum", "Solidity", "Truffle", "Ganache", "Web3"]
        },
        {
            id: "fruit-detection",
            title: "Fruit Detection & Calorie Estimation",
            description: "Utilizes YOLOv8 to detect, count, and identify fruits in an image, providing estimated calorie information.",
            github_url: null,
            live_url: "https://huggingface.co/spaces/Sehajbir/fruit-detection-app",
            image: "assets/project_placeholders/fruit_detection_ui.png",
            tech_stack: ["Object Detection", "YOLOv8", "CV", "Python", "Hugging Face"]
        },
        {
            id: "spotify-pipeline",
            title: "Spotify Data Pipeline",
            description: "Automated ETL pipeline using Apache Spark & Airflow for Spotify API data. Features Selenium login, cleaning, star schema storage, and daily scheduling.",
            github_url: "https://github.com/Sehajbirsingh/Spotify-Data-Pipeline",
            live_url: null,
            image: "assets/project_placeholders/spotify_pipeline_diagram.png",
            tech_stack: ["Spark", "Airflow", "Docker", "Python", "Pandas", "Selenium", "ETL"]
        },
        {
            id: "breathing-app",
            title: "5-5-5 Breathing App",
            description: "A web app guiding users through the 5-5-5 breathing pattern for relaxation, featuring animations and audio cues.",
            github_url: "https://github.com/Sehajbirsingh/Breathing---555",
            live_url: "https://breathing-555.onrender.com/",
            image: "assets/project_placeholders/breathing_app_ui.png",
            tech_stack: ["HTML", "CSS", "JavaScript", "UI/UX", "Web App"]
        }
    ];

    // --- Skills Data ---
     const skills = [
        "Python", "SQL (Snowflake, SQL Server)", "Data Engineering", "ETL/ELT (Matillion, SSIS)",
        "Cloud (Azure, AWS)", "Data Warehousing (Snowflake)", "Big Data (Spark)", "Orchestration (Airflow)",
        "ML (TensorFlow, OpenCV)", "NLP", "Generative AI", "Data Modeling", "DB (MongoDB)",
        "BI (Power BI, Tableau)", "Version Control (Git, Azure DevOps)", "Docker", "Web Dev (Flask, JS)",
        "Blockchain (Solidity)", "Automation (Selenium)", "API Integration", "Data Visualization", "Agile"
    ];

    // --- DOM Elements ---
    const projectsGrid = document.getElementById('projects-grid');
    const skillsListContainer = document.querySelector('#skills .skills-list'); // Renamed for clarity
    const projectModal = document.getElementById('project-modal');
    const closeModalButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const modalLinks = document.getElementById('modal-links');
    const footerYear = document.getElementById('year');


    // --- Populate Projects ---
    if (projectsGrid) {
        // Clear loading placeholder
        const loadingProjects = projectsGrid.querySelector('.loading-placeholder');
        if(loadingProjects) loadingProjects.remove();

        if (projects.length > 0) {
            projects.forEach(project => {
                const card = document.createElement('div');
                card.classList.add('project-card');
                card.dataset.projectId = project.id;

                const img = document.createElement('img');
                img.src = project.image || 'assets/project_placeholders/default.png';
                img.alt = `${project.title} screenshot`;
                img.loading = 'lazy'; // Lazy load images

                const title = document.createElement('h4');
                title.textContent = project.title;

                // Generate a shorter description for the card
                let cardDescText = project.description;
                if (cardDescText.length > 120) { // Limit card description length
                     cardDescText = cardDescText.substring(0, 117) + '...';
                }
                const shortDesc = document.createElement('p');
                shortDesc.textContent = cardDescText;


                card.appendChild(img);
                card.appendChild(title);
                card.appendChild(shortDesc);

                card.addEventListener('click', () => openModal(project.id));
                projectsGrid.appendChild(card);
            });
        } else {
             projectsGrid.innerHTML = '<p class="loading-placeholder">No projects to display yet.</p>'; // Handle empty case
        }
    } else {
        console.error("Element with id 'projects-grid' not found.");
    }

    // --- Populate Skills ---
    if (skillsListContainer) {
        // Clear loading placeholder
        const loadingSkills = skillsListContainer.querySelector('.loading-placeholder');
        if(loadingSkills) loadingSkills.remove();

        if(skills.length > 0) {
            skills.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsListContainer.appendChild(li);
            });
        } else {
            skillsListContainer.innerHTML = '<p class="loading-placeholder">Skills list loading...</p>'; // Handle empty case
        }

    } else {
        console.error("Element '#skills .skills-list' not found.");
    }

    // --- Modal Functionality ---
    function openModal(projectId) {
        const project = projects.find(p => p.id === projectId);
        if (!project || !projectModal) return;

        modalTitle.textContent = project.title;
        modalImage.src = project.image || 'assets/project_placeholders/default.png';
        modalImage.alt = `${project.title} image`;
        modalDescription.textContent = project.description; // Full description here
        modalTechStack.textContent = 'Tech Stack: ' + project.tech_stack.join(' | '); // Use a separator

        // Clear previous links
        modalLinks.innerHTML = '';

        // Add GitHub Link
        if (project.github_url) {
            const githubLink = document.createElement('a');
            githubLink.href = project.github_url;
            githubLink.textContent = 'GitHub Repo';
            githubLink.target = '_blank';
            githubLink.rel = 'noopener noreferrer';
            modalLinks.appendChild(githubLink);
        }

        // Add Live Demo Link
        if (project.live_url) {
            const liveLink = document.createElement('a');
            liveLink.href = project.live_url;
            liveLink.textContent = 'Live Demo';
            liveLink.target = '_blank';
            liveLink.rel = 'noopener noreferrer';
            modalLinks.appendChild(liveLink);
        }

         // Display the modal with a fade-in effect
         projectModal.style.opacity = '0';
         projectModal.style.display = 'block';
         // Use a small timeout to allow the display property to take effect before starting the transition
         setTimeout(() => {
             projectModal.style.opacity = '1';
         }, 10); // A tiny delay

    }

    function closeModal() {
         if (!projectModal) return;
         // Fade out
         projectModal.style.opacity = '0';
         // Wait for transition to finish before setting display to none
         setTimeout(() => {
            projectModal.style.display = 'none';
         }, 400); // Should match the transition duration in CSS (modalFadeIn animation duration)
    }

    // Event Listeners for Modal
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    } else {
         console.error("Element with class '.close-button' not found.");
    }

    if(projectModal) {
        // Close modal if clicked on the background overlay
        projectModal.addEventListener('click', (event) => {
            if (event.target === projectModal) { // Check if the click was directly on the modal background
                closeModal();
            }
        });
    }


    // Close modal on Escape key press
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal && projectModal.style.display === 'block') {
            closeModal();
        }
    });

    // --- Set Footer Year ---
     if (footerYear) {
        footerYear.textContent = new Date().getFullYear();
     }

    // --- Cursor Trail Effect (Optional - Uncomment if desired) ---
    // const trail = document.querySelector('.cursor-trail');
    // if (trail) {
    //      let lastX = 0, lastY = 0;
    //      let isMoving = false;
    //      document.addEventListener('mousemove', (e) => {
    //          isMoving = true;
    //          trail.style.opacity = '0.7'; // Make visible when moving
    //          // Immediate position update
    //          trail.style.left = e.pageX + 'px';
    //          trail.style.top = e.pageY + 'px';
             
    //          // You could add more complex trail logic here (e.g., multiple elements, delayed following)
             
    //          // Reset timeout for hiding
    //          clearTimeout(window.hideTrailTimeout);
    //          window.hideTrailTimeout = setTimeout(() => {
    //             trail.style.opacity = '0'; // Hide after a delay
    //              isMoving = false;
    //          }, 150); // Hide after 150ms of no movement

    //      });
    //      // Initially hide
    //      trail.style.opacity = '0';
    // } else {
    //      console.error("Element with class '.cursor-trail' not found for effect.");
    // }


    // --- Smooth Scrolling for Nav Links (Still potentially redundant with CSS) ---
    // document.querySelectorAll('header nav ul li a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);
    //         if (targetElement) {
    //              targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //         } else {
    //              console.warn(`Element with ID '${targetId}' not found for smooth scroll.`);
    //         }
    //     });
    // });


    console.log("Portfolio loaded. Engaging retro thrusters..."); // Fun console message

});