import React, { useState } from 'react';
import RegisterUser from '../../components/RegisterUser';
import LoginUser from '../../components/LoginUser';

const Home = () => {

  const [component, setComponent] = useState(true);

  return (
    <div className="relative">
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: "url('https://i.pinimg.com/736x/99/10/85/99108567eee0e90f4774513149c01656.jpg')" }}>
        <div className="bg-black bg-opacity-50 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-7xl text-white font-bold mb-4">Welcome to Our Store</h1>
          <p className="text-xl md:text-2xl text-white mb-6">Discover the best products at unbeatable prices</p>
          {/* <a href="#shop" className="bg-indigo-500 text-white px-6 py-3 rounded-full text-lg hover:bg-indigo-700 transition duration-300">Shop Now</a> */}
          <div className='flex space-x-6 mt-5'>
            <button 
              className='bg-green-500 text-white px-6 py-3 rounded-full text-lg hover:bg-green-700 transition duration-300'
              onClick={() => setComponent(true)}
            >
              Register
            </button>
            <button 
              className='bg-red-500 text-white px-6 py-3 rounded-full text-lg hover:bg-red-700 transition duration-300'
              onClick={() => setComponent(false)}
            >
              Login
            </button>
          </div>
          <div className="mt-8">
            {component ? <RegisterUser /> : <LoginUser />}
          </div>
        </div>
    </div>
  </div>
  );
};

export default Home;
