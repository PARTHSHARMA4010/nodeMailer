import React, { useState } from 'react';
import '../assets/login.css'; // Import Tailwind CSS
import  Axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

    Axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:3000/auth/login', {
      email,
      password,
    }).then(response => {
      if(response.data.status){
        navigate('/');
      }
      
    }).catch(err => {
      console.log(err);
    })
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="absolute top-10 text-center w-full">
        <h1 className="text-4xl font-serif text-gray-800">Roti-Sabji</h1>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Login</button>
          <Link to="/forgotPassword">Forgot Password ?</Link>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Link to="/signup">
          <button className="mt-2 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition-colors">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
