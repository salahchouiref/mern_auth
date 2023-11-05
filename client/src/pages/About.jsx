import React from 'react';

export default function About() {
  return (
    <div className='bg-white mt-3 px-6 py-12 max-w-2xl mx-auto rounded-lg shadow-lg'>
      <h1 className='text-4xl font-bold mb-6 text-gray-900'>About Us</h1>
      <p className='text-lg mb-4 text-gray-700'>
        Welcome to our MERN (MongoDB, Express, React, Node.js) stack
        application with authentication features. Experience seamless sign-up,
        log-in, and log-out functionalities, and explore protected routes
        tailored exclusively for authenticated users.
      </p>
      <p className='text-lg mb-4 text-gray-700'>
        The user-friendly front-end is meticulously crafted with React, enhanced
        by React Router for smooth client-side navigation. Our robust back-end
        powered by Node.js and Express utilizes MongoDB as its reliable
        database. The state-of-the-art authentication system is implemented
        using industry-standard JSON Web Tokens (JWT).
      </p>
      <p className='text-lg text-gray-700'>
        Utilize this application as your launching pad for building
        full-stack web applications. Your creativity knows no bounds with the
        MERN stack at your fingertips!
      </p>
    </div>
  );
}
