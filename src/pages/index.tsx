import React from 'react';
import Weather from '../components/Weather';

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="items-center justify-between font-mono text-sm lg:flex">
        <Weather />
      </div>
    </main>
  );
};

export default Home;
