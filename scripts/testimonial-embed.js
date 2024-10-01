(function () {
  // Load the widget when the DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const spaceId = document.querySelector('script[data-space-id]').getAttribute('data-space-id');
    const targetDiv = document.getElementById(`testimonials-${spaceId}`);

    // Load Inter font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Create and append styles
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        font-family: 'Inter', sans-serif;
      }
      .testimonial-container {
        padding: 30px;
        background-color: white;
        max-width: 1200px;
        margin: auto;
      }
      .testimonial-header {
        text-align: center;
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .testimonial-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
      }
      .testimonial-card {
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        height: 100%;
      }
      .testimonial-card h3 {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .testimonial-message {
        font-size: 16px;
        color: #555;
        margin-bottom: 15px;
      }
      .testimonial-avatar {
        width: 50px;
        height: 50px;
        background-color: #ddd;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
      }
      .testimonial-avatar img {
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      .testimonial-user-info {
        display: flex;
        align-items: center;
      }
      .star {
        color: #fbbf24;
        margin-right: 3px;
      }
      .star-empty {
        color: #ddd;
      }
      .video-container {
        position: relative;
        padding-bottom: 56.25%; /* 16:9 ratio */
        height: 0;
        overflow: hidden;
      }
      .video-container video, .video-container img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        object-fit: cover;
      }

      .no-testimonial {
        text-align: center;
        font-size: 20px;
        color: #555;
      }
    `;
    document.head.appendChild(style);

    // Fetch testimonial data from API
    fetch(`http://localhost:5000/api/v1/testimonials/selectedTestimonials?spaceId=${spaceId}`)
      .then(response => response.json())
      .catch(error => console.log(error))
      .then(data => {
        console.log(data);
        const testimonials = data.data || [];
        const container = document.createElement('div');
        container.className = 'testimonial-container';

        // Create header
        const header = document.createElement('h1');
        header.className = 'testimonial-header';
        header.textContent = 'What Our Customers Say';
        container.appendChild(header);

        // Create testimonial grid
        const grid = document.createElement('div');
        grid.className = 'testimonial-grid';
        if (testimonials.length === 0) {
          const noTestimonial = document.createElement('p');
          noTestimonial.className = 'no-testimonial';
          noTestimonial.textContent = 'No testimonials available :(';
          container.appendChild(noTestimonial);
        }
        testimonials.forEach(testimonial => {
          // Create card
          const card = document.createElement('div');
          card.className = 'testimonial-card';

          // Avatar and user info
          const userInfo = document.createElement('div');
          userInfo.className = 'testimonial-user-info';

          const avatar = document.createElement('div');
          avatar.className = 'testimonial-avatar';
          if (testimonial.profileImage) {
            const img = document.createElement('img');
            img.src = testimonial.profileImage;
            avatar.appendChild(img);
          } else {
            avatar.textContent = testimonial.name.charAt(0); // Fallback
          }

          const nameElem = document.createElement('h3');
          nameElem.textContent = testimonial.name;

          userInfo.appendChild(avatar);
          userInfo.appendChild(nameElem);

          card.appendChild(userInfo);

          // Star Rating
          const starRating = document.createElement('div');
          starRating.innerHTML = generateStarRating(testimonial.rating || 0);
          card.appendChild(starRating);

          // Testimonial message
          const message = document.createElement('p');
          message.className = 'testimonial-message';
          message.textContent = testimonial.testimonialMessage || '';
          card.appendChild(message);

          // Video or Image
          if (testimonial.testimonialVideo) {
            const videoContainer = document.createElement('div');
            videoContainer.className = 'video-container';
            const video = document.createElement('video');
            video.src = testimonial.testimonialVideo;
            video.controls = true;
            videoContainer.appendChild(video);
            card.appendChild(videoContainer);
          } else {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'video-container';
            const image = document.createElement('img');
            image.src = 'https://picsum.photos/400/225'; // Placeholder image
            image.alt = `${testimonial.name}'s testimonial`;
            imageContainer.appendChild(image);
            card.appendChild(imageContainer);
          }

          grid.appendChild(card);
        });

        container.appendChild(grid);
        targetDiv.appendChild(container);
      })
      .catch(error => {
        console.log(error);
      });
  });

  function generateStarRating(rating) {
    let starHTML = '';
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        starHTML += `<span class="star">★</span>`;
      } else {
        starHTML += `<span class="star star-empty">★</span>`;
      }
    }
    return starHTML;
  }
})();
