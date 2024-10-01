(function () {
  // Load the widget when the DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    const spaceId = document.querySelector('script[data-space-id]').getAttribute('data-space-id');
    const targetDiv = document.getElementById(`form-${spaceId}`);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.innerHTML = `
      * {
        font-family: 'Inter', sans-serif;
      }
      .testimonial-container {
        background-color: white;
        color: black;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: auto;
        max-width: 600px;
      }
      .testimonial-header {
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
      }
      .testimonial-message {
        text-align: center;
        font-size: 18px;
        margin-bottom: 20px;
        color: gray;
        font-weight: 400;
      }
      .questions-list {
        list-style-type: disc;
        padding-left: 20px;
      }
      .questions-list li {
        margin-bottom: 10px;
        font-weight: 500;
      }
      .testimonial-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .testimonial-button {
        background-color: black;
        color: white;
        padding: 10px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
        font-weight: 500;
      }
      .testimonial-button.secondary {
        background-color: #f0f0f0;
        color: black;
      }

      /* Modal Styles */
      .modal {
        display: none;
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        justify-content: center;
        align-items: center;
      }
      
      .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        width: 100%;
        max-width: 500px;
        position: relative;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .modal-header {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 20px;
        text-align: center;
      }
      
      .close-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        cursor: pointer;
      }
      
      .video-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #f1f1f1;
        border-radius: 8px;
        height: 200px;
        margin-bottom: 20px;
        color: #9e9e9e;
        font-size: 16px;
        text-align: center;
      }
      
      video {
        width: 100%;
        height: 100%;
        border-radius: 8px;
      }
      
      .input-group {
        margin-bottom: 15px;
      }
      
      .input-group label {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 5px;
        display: block;
      }
      
      .input-group input {
        padding: 10px;
        width: 95%;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        font-size: 14px;
      }

      .input-group textarea {
        width: 95%;
        padding: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        font-size: 14px;
      }
      
      .button-group {
        display: flex;
        justify-content: space-between;
        gap: 10px;
      }
      
      .button-group button {
        width: 48%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
      }
      
      #start-record-btn {
        background-color: #f0f0f0;
        color: #000;
      }
      
      #add-testimonial-btn {
        background-color: #000;
        color: #fff;
        width: 100%;
      }

      .testimonial-icon {
        font-size: 40px;
        text-align: center;
        margin-bottom: 20px;
      }

      .testimonial-icon span {
        display: inline-block;
        background-color: black;
        color: #000;
        padding: 10px;
        border-radius: 50%;
      }
    `;
    document.head.appendChild(style);

    fetch(`http://localhost:5000/api/v1/spaces/getSpace/${spaceId}`)
      .then(response => response.json())
      .then(formData => {
        const testimonialContainer = document.createElement('div');
        testimonialContainer.className = 'testimonial-container';

        testimonialContainer.innerHTML = `
          <div class="testimonial-icon">
            <span>👍</span>
          </div>
          <div class="testimonial-header">${formData.headerTitle}</div>
          <div class="testimonial-message">${formData.customMessage}</div>
          <div>
            <h3>QUESTIONS</h3>
            <ul class="questions-list">
              ${formData.questions.map((q) => `<li>${q}</li>`).join('')}
            </ul>
          </div>
          <div class="testimonial-buttons">
            <div class="testimonial-button" id="record-video-btn">🎥 Record a video</div>
            <div class="testimonial-button secondary" id="send-text-btn">📝 Send in text</div>
          </div>
        `;

        targetDiv.appendChild(testimonialContainer);

        document.getElementById('record-video-btn').addEventListener('click', function () {
          openModal();
        });

        document.getElementById('send-text-btn').addEventListener('click', function () {
          openTextModal(formData.spaceName, formData.customMessage, formData.questions);
        });
      })
      .catch(error => {
        console.error('Error fetching formData:', error);
      });

    let mediaRecorder;
    let recordedChunks = [];
    let stream;

    function openTextModal(spaceName, customMessage, questions) {
      const modal = document.createElement('div');
      modal.id = 'text-modal';
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <div class="modal-header">Testimonial for ${spaceName}</div>
          <div class="modal-message">${customMessage}</div>
          <ul class="questions-list">
            ${questions.map((q) => `<li>${q}</li>`).join('')}
          </ul>
          <div class="input-group">
            <label for="testimonial">Testimonial</label>
            <textarea id="text-testimonial" placeholder="Enter your testimonial" rows=4></textarea>
          </div>
          <div class="input-group">
            <label for="name">Name</label>
            <input type="text" id="text-name" placeholder="Enter your name" />
          </div>
          <div class="input-group">
            <label for="company">Company</label>
            <input type="text" id="text-company" placeholder="Enter your company" />
          </div>
          <div class="button-group">
            <button id="add-testimonial-btn">Submit Testimonial</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      const closeButton = modal.querySelector('.close-btn');
      closeButton.addEventListener('click', closeModal);
      modal.style.display = 'flex';

      document.getElementById('add-testimonial-btn').addEventListener('click', function () {
        uploadTextTestimonial(spaceName);
      });

      async function uploadTextTestimonial() {
        const name = document.getElementById('text-name').value;
        const company = document.getElementById('text-company').value;
        const testimonial = document.getElementById('text-testimonial').value;

        const testimonialData = {
          name: name,
          companyName: company,
          testimonialMessage: testimonial,
          testimonialVideo: '',
          spaceId: spaceId,
        };
        const response = await fetch('http://localhost:5000/api/v1/testimonials/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testimonialData),
        });
        const result = await response.json();
        if (result.success) {
          alert('Testimonial submitted successfully!');
          closeModal();
        } else {
          alert('Error submitting testimonial.');
        }
      }

    }
    function openModal() {
      const modal = document.createElement('div');
      modal.id = 'video-modal';
      modal.classList.add('modal');
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <div class="modal-header">Record a Video</div>
          <div class="video-container">
            <video id="video-preview" autoplay></video>
          </div>
          <div class="input-group">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
          <div class="input-group">
            <label for="company">Company</label>
            <input type="text" id="company" placeholder="Enter your company" />
          </div>
          <div class="button-group">
            <button id="start-record-btn">Start Recording</button>
            <button id="add-testimonial-btn">Add Testimonial</button>
          </div>
        </div>
      `;

      document.body.appendChild(modal);
      const video = document.getElementById('video-preview');
      const startRecordBtn = document.getElementById('start-record-btn');
      const addTestimonialBtn = document.getElementById('add-testimonial-btn');

      startRecordBtn.addEventListener('click', function () {
        if (startRecordBtn.innerText === 'Start Recording' || startRecordBtn.innerText === 'Re-record') {
          startRecording(video, startRecordBtn);
        } else if (startRecordBtn.innerText === 'Stop Recording') {
          stopRecording(startRecordBtn);
        }
      });

      addTestimonialBtn.addEventListener('click', function () {
        uploadTestimonial();
      });

      const closeButton = modal.querySelector('.close-btn');
      closeButton.addEventListener('click', closeModal);
      modal.style.display = 'flex';

      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          stream = mediaStream;
          video.srcObject = mediaStream;
        })
        .catch((error) => console.error('Error accessing media devices.', error));
    }

    function startRecording(video, startRecordBtn) {
      recordedChunks = [];

      // Reacquire media stream when "Re-record" is clicked
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          stream = mediaStream;
          video.srcObject = mediaStream;

          mediaRecorder = new MediaRecorder(stream);

          mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              recordedChunks.push(event.data);
            }
          };

          mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            video.srcObject = null;
            video.src = URL.createObjectURL(blob);
            video.play();

            startRecordBtn.innerText = 'Re-record';
            document.getElementById('add-testimonial-btn').disabled = false;
          };

          mediaRecorder.start();
          startRecordBtn.innerText = 'Stop Recording';
        })
        .catch((error) => {
          console.error('Error accessing media devices.', error);
        });
    }

    function stopRecording(startRecordBtn) {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
      }
      if (stream) {
        // Stop all media tracks to free up resources
        stream.getTracks().forEach((track) => track.stop());
      }
      startRecordBtn.innerText = 'Re-record';
    }


    function stopRecording(startRecordBtn) {
      mediaRecorder.stop();
      stream.getTracks().forEach((track) => track.stop());
      startRecordBtn.innerText = 'Re-record';
    }

    async function uploadTestimonial() {
      const name = document.getElementById('name').value;
      const company = document.getElementById('company').value;
      const blob = new Blob(recordedChunks, { type: 'video/webm' });

      const formData = new FormData();
      formData.append('file', blob);
      formData.append('upload_preset', 'testimonials');

      // Upload to Cloudinary
      console.log(formData.get('file'));
      console.log(formData.get('upload_preset'));
      const response = await fetch('https://api.cloudinary.com/v1_1/dz1vccend/video/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json();
      const videoUrl = data.secure_url;
      console.log(videoUrl);
      // Post form data with video link to your API
      const testimonialData = {
        name: name,
        companyName: company,
        testimonialVideo: videoUrl,
        testimonialMessage: 'This is a great product!',
        spaceId: spaceId,
      };

      const api_response = await fetch('http://localhost:5000/api/v1/testimonials/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      })

      const result = await api_response.json();
      console.log(result);
      if (result.success) {
        alert('Testimonial submitted successfully!');
        closeModal();
      } else {
        alert('Error submitting testimonial.');
      }
    }

    function closeModal() {
      const modal = document.getElementById('video-modal');
      const textModal = document.getElementById('text-modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.removeChild(modal);
      }
      if (textModal) {
        textModal.style.display = 'none';
        document.body.removeChild(textModal);
      }
    }
  });
})();