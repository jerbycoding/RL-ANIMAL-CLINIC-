import React from 'react';

function WelcomeBanner() {
  const userName = localStorage.getItem('username') || 'User'; // Or fetch from context/state

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6 mb-6">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Welcome back, {userName}!
      </h1>
    </div>
  );
}

export default WelcomeBanner;