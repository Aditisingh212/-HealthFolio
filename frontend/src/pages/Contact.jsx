import React, { useState,useContext } from 'react';
import { assets } from '../assets/assets'; // Ensure this path is correct
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';

const Contact = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
  });
  const {backendUrl,token} = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl + '/api/feedback', feedback,{headers:{token}});
      if (data.success) {
        toast.success('Thank you for your feedback!');
        setFeedback({ name: '', email: '', message: '', rating: 5 }); // Reset form
      }
    } catch (error) {
      toast.error('Failed to submit feedback');
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Contact Us Heading */}
      <div className="text-center pt-12 pb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          CONTACT <span className="text-gray-800">US</span>
        </h1>
        <p className="text-gray-500 mt-2">We'd love to hear from you</p>
      </div>

      {/* Office Details */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <div className="w-full md:w-1/2">
          <img
            className="w-full rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 object-cover"
            src={assets.contact_image}
            alt="Contact"
          />
        </div>
        
        <div className="flex flex-col gap-8 w-full md:w-1/2">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">OUR OFFICE</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-600">
                <svg className="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="leading-relaxed">
                  Chitkara University Rajpura<br />
                  Patiala, India
                </p>
              </div>
              
              <div className="flex items-start gap-3 text-gray-600">
                <svg className="w-6 h-6 text-primary mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <p className="leading-relaxed">
                  +91-78888-80XXX<br />
                  admin@prescripto.com
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Register Yourself as Doctor Now</h3>
            <p className="text-gray-600">
              Manage your appointments easily here.<br />
              Mail Your Details Now!
            </p>
            <button className="group relative px-8 py-3 bg-white text-gray-800 font-medium 
              rounded-xl overflow-hidden border-2 border-gray-200 hover:border-primary 
              transition-all duration-300">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Explore Now
              </span>
              <div className="absolute inset-0 bg-primary transform scale-x-0 group-hover:scale-x-100 
                transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Form Section */}
      <div className="mb-20">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Share Your Feedback
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 
                  focus:border-primary/50 focus:ring-4 focus:ring-primary/10 
                  transition-all duration-300 outline-none hover:border-gray-200"
                  value={feedback.name}
                  onChange={(e) => setFeedback({...feedback, name: e.target.value})}
                  placeholder="John Doe"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Email Input - Similar styling as Name Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 
                  focus:border-primary/50 focus:ring-4 focus:ring-primary/10 
                  transition-all duration-300 outline-none hover:border-gray-200"
                  value={feedback.email}
                  onChange={(e) => setFeedback({...feedback, email: e.target.value})}
                  placeholder="john@example.com"
                />
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Rating Section */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How would you rate your experience?
              </label>
              <div className="flex flex-col items-center p-6 rounded-xl bg-gray-50 border-2 border-gray-100">
                <div className="flex gap-4 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedback({...feedback, rating: star})}
                      className={`text-4xl transform transition-all duration-300 
                      hover:scale-110 active:scale-95 ${
                        star <= feedback.rating 
                          ? 'text-yellow-400 hover:text-yellow-500 drop-shadow-lg' 
                          : 'text-gray-200 hover:text-gray-300'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <p className={`text-sm font-medium transition-all duration-300 ${
                  feedback.rating >= 4 
                    ? 'text-green-500' 
                    : feedback.rating >= 3 
                      ? 'text-blue-500' 
                      : 'text-gray-500'
                }`}>
                  {feedback.rating === 5 ? "Excellent!" :
                   feedback.rating === 4 ? "Very Good!" :
                   feedback.rating === 3 ? "Good" :
                   feedback.rating === 2 ? "Fair" : "Poor"}
                </p>
              </div>
            </div>

            {/* Message Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <div className="relative">
                <textarea
                  required
                  rows="4"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-100 
                  focus:border-primary/50 focus:ring-4 focus:ring-primary/10 
                  transition-all duration-300 outline-none hover:border-gray-200 resize-none"
                  value={feedback.message}
                  onChange={(e) => setFeedback({...feedback, message: e.target.value})}
                  placeholder="Tell us about your experience..."
                ></textarea>
                <div className="absolute left-4 top-4 pointer-events-none text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-white rounded-xl 
              hover:bg-primary/90 transform hover:-translate-y-0.5 
              transition-all duration-300 font-medium 
              shadow-lg shadow-primary/25 hover:shadow-xl"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
