
# TESTIMONIALS

Effortlessly collect, manage, and embed customer testimonials (text and video) on your website using a customizable form and script integration.

## Problem Statement

Product owners often struggle to collect genuine testimonials from their customers, and embedding these testimonials on a website in an attractive and responsive manner can be complex and time-consuming. Furthermore, managing the flow of submitted testimonials, choosing the best ones, and seamlessly integrating them into the website without code overhead is challenging.

## Solution

**TESTIMONIALS** solves this problem by offering a simple, easy-to-integrate tool that allows product owners to:
- Collect customer testimonials via a shareable form link.
- Manage and select the best testimonials from an intuitive dashboard.
- Embed chosen testimonials (text or video) on their website with minimal setup via a script tag and a `<div>`.

With **TESTIMONIALS**, website owners can not only showcase the best customer reviews but also enable customers to submit their own testimonials directly through embedded forms.

## Use Cases

- **E-commerce Websites**: Collect and showcase customer reviews to build trust and boost sales.
- **SaaS Platforms**: Display user feedback and success stories to attract potential customers.
- **Service-Based Businesses**: Gather testimonials from clients and highlight your business's success stories.
- **Personal Portfolios**: Showcase video or text feedback from collaborators, clients, or peers.

## Features

- **Text & Video Testimonials**: Support for both text and video submissions, making the testimonials more engaging.
- **Embed Testimonials Anywhere**: Use a simple `<script>` and `<div>` to embed testimonials on any webpage.
- **Select & Manage Testimonials**: Review, approve, and curate which testimonials to display from your dashboard.
- **Responsive Design**: The testimonials widget is responsive and looks great across devices.
## Zero Code Overhead

With **TESTIMONIALS**, embedding testimonials is as easy as pasting a couple of lines of code. There’s no need for custom development or handling complex codebases:

-   No need for backend setup.
-   No maintenance of databases or media storage.
-   Fully managed embedding via a simple script and div tag.
-  Almost negligible script size (Under 10kb minified and gzipped)
  
## Deployed Link

- The complete project is deployed [here](https://testimonials-sg.vercel.app) 
- The project's frontend is deployed on [Vercel](vercel.com)
- The project' s backend is deployed on [Render](render.com) (This might take around 50 seconds to spin up).

## How It Works

1. **Create a Space**: Generate a unique form link for customers to submit testimonials.
2. **Collect Testimonials**: Send the form link or embed the form on your website to your customers and start collecting feedback.
3. **Manage Testimonials**: Review the submissions and select the testimonials you want to showcase.
4. **Embed Testimonials**: Copy the script and div tag provided for your selected testimonials, and paste them into your website’s HTML.
   
Example:
```
<div id="testimonials-[your-space-id]"></div>
<script
  src="https://cdn.jsdelivr.net/gh/ShashankGupta10/testimonials@main/scripts/testimonial-embed.js"
  data-space-id="[your-space-id]"
></script> 
```

## Installation
Follow these steps to clone and set up the repository on your local machine:

1.  **Clone the Repository**
    
    -   Open your terminal or command prompt.
    -   Run the following command to clone the repository from GitHub:
	```
	git clone https://github.com/ShashankGupta10/testimonials.git
	```         
2.  **Install Dependencies (Client)**
    
    -   The project uses Node.js and npm, install the necessary packages:
       
        ```
          cd client && npm install
        ```
        
3.  **Environment Variables**
    
    -   Create a `.env` file in the root directory and add the necessary environment variables. Example:
        
        `cp .env.example .env` 
        
        Then, update the `.env` file with your environment-specific variables.
        
4.  **Install Dependencies (Server)**
    
   -   The project uses Node.js and npm, install the necessary packages:
       
        ```
          cd server && npm install
        ```
        
5.  **Environment Variables**
    
    -   Create a `.env` file in the root directory and add the necessary environment variables. Example:
        
        `cp .env.example .env` 
        
        Then, update the `.env` file with your environment-specific variables.
 
 6. **Start the Development Server**
 
	- Run the following commands and go to http://localhost:3000 to see the application.
	
	`` cd client && npm run dev ``
	`` cd server && npm start ``


## License

This project is licensed under the MIT License.
