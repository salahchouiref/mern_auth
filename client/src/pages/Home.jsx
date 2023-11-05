import React from 'react';

export default function Home() {
  return (
    <div className='bg-white min-h-screen flex flex-col justify-center items-center py-12 px-4'>
      <h1 className='text-4xl font-bold text-gray-900 mb-6'>
        Welcome to My Professional Auth App!
      </h1>
      <div className='bg-gray-100 p-8 rounded-lg shadow-lg text-gray-800 mb-6 max-w-md'>
        <p className='text-lg mb-4'>
          Explore the power of the MERN stack (MongoDB, Express, React, Node.js)
          with our full-stack web application.
        </p>
        <p className='text-lg mb-4'>
          Our app provides robust authentication features, allowing users to sign
          up, log in securely, and log out. Access protected routes exclusively
          designed for authenticated users.
        </p>
        <p className='text-lg mb-4'>
          Crafted with React for responsive user interfaces and React Router for
          seamless client-side navigation. The back-end, powered by Node.js and
          Express, utilizes MongoDB as the database. Authentication is
          implemented using industry-standard JSON Web Tokens (JWT).
        </p>
        <p className='text-lg'>
          Elevate your projects using this application as a blueprint. Let your
          creativity soar with the MERN stack!
        </p>
      </div>
      <p className='text-lg text-gray-800'>
        Ready to begin? Sign up or log in to get started.
      </p>
    </div>
  );
}
