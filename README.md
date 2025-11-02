AI Fitness Coach

An AI-powered fitness web application designed to help users create personalized workout and diet plans based on their fitness goals, preferences, and body type. Built using Next.js, Tailwind CSS, and OpenAI API for smart fitness recommendations.

Features

AI Workout Plan Generator – Get customized workout plans based on your fitness goal (e.g., weight loss, muscle gain, flexibility).
AI Diet Plan Generator – Generate daily meal plans tailored to your dietary preferences.
BMI Calculator – Calculates and classifies BMI based on height and weight.
User-Friendly Interface – Built with Tailwind CSS for a clean, responsive design.
PDF Download – Export your personalized plan as a PDF.
Secure API Integration – Uses environment variables to protect sensitive keys.

Tech Stack
Category	Technology
Frontend	Next.js, React, Tailwind CSS
AI Model	OpenAI API (GPT-based)
Deployment	Vercel / GitHub Pages
Others	HTML2PDF.js, Axios
Installation & Setup

Follow these steps to run the project locally:

1️Clone the repository
git clone https://github.com/Krishnaveni-Pasumarti/ai-fitness-coach.git
cd ai-fitness-coach

Install dependencies
npm install

Create an environment file

Create a file named .env.local in the root directory and add your OpenAI API key:

OPENAI_API_KEY=your_api_key_here


Never commit your API key to GitHub. Keep it private in .env.local.

Run the app
npm run dev


Now open your browser and visit:

http://localhost:3000

Future Enhancements

 Add user authentication

 Save and track user progress

 Voice-based AI assistant for fitness

 Integration with wearable devices (Fitbit, Apple Watch)
