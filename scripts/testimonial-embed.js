(function () {
    // Helper function to create and inject testimonials
    function createTestimonialWidget(spaceId) {
        const container = document.getElementById(`testimonials-${spaceId}`);
        if (!container) {
            console.error(`No container found for testimonials-${spaceId}`);
            return;
        }

        // Inject CSS styles into the document head
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
        /* Testimonial card container */
        .testimonial-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            width: 100%;
            gap: 20px;
            padding: 20px;
            border-radius: 10px;
            margin: 20px;
        }
        .testimonial-card {
          border: 1px solid #e5e7eb; /* Light gray border */
          padding: 20px;
          margin: 20px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow */
          max-width: 350px;
          text-align: center;
        }
  
        /* Profile images (for photo testimonials) */
        .testimonial-profile {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 15px auto;
        }
  
        /* Video styles (for video testimonials) */
        .testimonial-video {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
  
        /* Testimonial text */
        .testimonial-text {
          color: #4a4a4a;
          margin-top: 15px;
          font-size: 15px;
          line-height: 1.6;
        }
  
        /* User name and company */
        .testimonial-user-info {
          color: #111827;
          margin-top: 10px;
          font-weight: bold;
          font-size: 18px;
        }
  
        .testimonial-job {
          color: #6b7280; /* Gray text for job title */
          font-size: 14px;
          margin-top: 5px;
        }
  
        /* Stars rating styling */
        .testimonial-stars {
          color: #f59e0b; /* Yellow color for the stars */
          margin-top: 10px;
        }
      `;
        document.head.appendChild(styleTag);

        // Fetch testimonial data from your backend API
        fetch(`http://localhost:5000/api/v1/testimonials/selectedTestimonials?spaceId=${spaceId}`)
            .then(response => response.json())
            .then(testimonials => {
                if (!testimonials || testimonials.length === 0) {
                    container.innerHTML = '<p>No testimonials available.</p>';
                    return;
                }

                // Create testimonial HTML for each testimonial
                const parentDiv = document.createElement('div');
                parentDiv.className = 'testimonial-container';
                container.appendChild(parentDiv);
                testimonials.data.forEach(testimonial => {
                    const testimonialCard = document.createElement('div');
                    testimonialCard.className = 'testimonial-card';

                    // Profile picture or video testimonial
                    if (testimonial.testimonialVideo) {
                        const video = document.createElement('video');
                        video.src = testimonial.testimonialVideo;
                        video.controls = true;
                        video.className = 'testimonial-video';
                        testimonialCard.appendChild(video);
                    } else {
                        const img = document.createElement('img');
                        img.src = testimonial.profilePicture || 'default-image.png'; // Use a default image if no profile picture
                        img.className = 'testimonial-profile';
                        testimonialCard.appendChild(img);
                    }

                    // Testimonial text
                    const text = document.createElement('p');
                    text.innerText = testimonial.testimonialMessage || 'No message available';
                    text.className = 'testimonial-text';
                    testimonialCard.appendChild(text);

                    // Name and company
                    const userInfo = document.createElement('p');
                    userInfo.innerHTML = `<span class="testimonial-user-info">${testimonial.name}</span>`;
                    testimonialCard.appendChild(userInfo);

                    const jobTitle = document.createElement('p');
                    jobTitle.className = 'testimonial-job';
                    jobTitle.innerText = testimonial.jobTitle || 'Job title not available';
                    testimonialCard.appendChild(jobTitle);

                    // Stars rating (if available)
                    if (testimonial.rating) {
                        const stars = document.createElement('div');
                        stars.className = 'testimonial-stars';
                        stars.innerHTML = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating); // Display filled and unfilled stars
                        testimonialCard.appendChild(stars);
                    }

                    parentDiv.appendChild(testimonialCard);
                });
            })
            .catch(error => {
                console.error('Error fetching testimonials:', error);
                container.innerHTML = '<p>Failed to load testimonials.</p>';
            });
    }

    // Automatically execute the script when the DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const scriptTag = document.querySelector('script[data-space-id]');
        if (!scriptTag) {
            console.error('No script tag found with data-space-id');
            return;
        }

        const spaceId = scriptTag.getAttribute('data-space-id');
        if (!spaceId) {
            console.error('No space ID found in script tag');
            return;
        }

        createTestimonialWidget(spaceId);
    });
})();
