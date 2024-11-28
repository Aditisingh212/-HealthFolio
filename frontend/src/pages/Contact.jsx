// import React, { useState,useContext } from 'react';
// import { assets } from '../assets/assets'; // Ensure this path is correct
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { AppContext } from '../context/AppContext';

// const Contact = () => {
//   const [feedback, setFeedback] = useState({
//     name: '',
//     email: '',
//     message: '',
//     rating: 5,
//   });
//   const {backendUrl,token} = useContext(AppContext)

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const {data} = await axios.post(backendUrl + '/api/feedback', feedback,{headers:{token}});
//       if (data.success) {
//         toast.success('Thank you for your feedback!');
//         setFeedback({ name: '', email: '', message: '', rating: 5 }); // Reset form
//       }
//     } catch (error) {
//       toast.error('Failed to submit feedback');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4">
//       {/* Contact Us Heading */}
//       <div className="text-center text-2xl pt-10 text-gray-500">
//         <p >
//           CONTACT <span className="text-gray-700 font-semibold">US</span>
//         </p>
//       </div>

//       {/* Office Details */}
//       <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
//         <img
//           className="w-full md:max-w-[360px]"
//           src={assets.contact_image}
//           alt="Contact"
//         />
//         <div className="flex flex-col justify-center items-start gap-6">
//           <p className="font-semibold text-lg text-gray-600">OUR OFFICE</p>
//           <p className="text-gray-500">
//             Chitkara University Rajpura
//             <br /> Patiala, India
//           </p>
//           <p className="text-gray-500">
//             +91-78888-80XXX
//             <br />
//             admin@prescripto.com
//           </p>
//           <p className="font-semibold text-lg text-gray-600">Register Yourself as Doctor Now</p>
//           <p className="text-gray-500">
//             Manage your appointments easily here.
//             Mail Your Details Now!
//           </p>
//           <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
//             Explore Now
//           </button>
//         </div>
//       </div>

//       {/* Feedback Form Section */}
//       <div className="mb-20">
//         <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Share Your Feedback
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Name Input */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   required
//                   className="w-full pl-12 pr-5 py-3.5 rounded-xl border-2 border-gray-100 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-300 hover:border-gray-200 bg-gray-50/30"
//                   value={feedback.name}
//                   onChange={(e) => setFeedback({...feedback, name: e.target.value})}
//                   placeholder="John Doe"
//                 />
//                 <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Email Input */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <input
//                   type="email"
//                   required
//                   className="w-full pl-12 pr-5 py-3.5 rounded-xl border-2 border-gray-100 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-300 hover:border-gray-200 bg-gray-50/30"
//                   value={feedback.email}
//                   onChange={(e) => setFeedback({...feedback, email: e.target.value})}
//                   placeholder="john@example.com"
//                 />
//                 <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Rating Section - Enhanced CSS */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-3 ml-1">
//                 How would you rate your experience?
//               </label>
//               <div className="flex flex-col items-center p-4 rounded-xl bg-gray-50/30 border-2 border-gray-100">
//                 <div className="flex gap-4 mb-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <button
//                       key={star}
//                       type="button"
//                       onClick={() => setFeedback({...feedback, rating: star})}
//                       className={`text-4xl transform transition-all duration-300 hover:scale-110 active:scale-95 ${
//                         star <= feedback.rating 
//                           ? 'text-yellow-400 hover:text-yellow-500 filter drop-shadow-md' 
//                           : 'text-gray-200 hover:text-gray-300'
//                       }`}
//                     >
//                       ★
//                     </button>
//                   ))}
//                 </div>
//                 <p className={`text-sm font-medium transition-all duration-300 ${
//                   feedback.rating >= 4 
//                     ? 'text-green-500' 
//                     : feedback.rating >= 3 
//                       ? 'text-blue-500' 
//                       : 'text-gray-500'
//                 }`}>
//                   {feedback.rating === 5 ? "Excellent!" :
//                    feedback.rating === 4 ? "Very Good!" :
//                    feedback.rating === 3 ? "Good" :
//                    feedback.rating === 2 ? "Fair" : "Poor"}
//                 </p>
//               </div>
//             </div>

//             {/* Message Input */}
//             <div className="group">
//               <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
//                 Your Message
//               </label>
//               <div className="relative">
//                 <textarea
//                   required
//                   rows="4"
//                   className="w-full pl-12 pr-5 py-3.5 rounded-xl border-2 border-gray-100 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-300 hover:border-gray-200 bg-gray-50/30 resize-none"
//                   value={feedback.message}
//                   onChange={(e) => setFeedback({...feedback, message: e.target.value})}
//                   placeholder="Tell us about your experience..."
//                 ></textarea>
//                 <div className="absolute inset-y-0 left-3 flex items-start pt-4 pointer-events-none text-gray-400">
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-primary text-white py-4 rounded-xl hover:bg-primary/90 transform hover:-translate-y-0.5 transition-all duration-300 font-medium shadow-lg hover:shadow-primary/30"
//             >
//               Submit Feedback
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;



import React, { useState, useContext } from 'react';
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
  const { backendUrl, token } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + '/api/feedback', feedback, { headers: { token } });
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
    <div className="min-h-screen py-12 px-6">
      <div className="border border-primary max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Contact Details */}
          <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-6 md:w-1/3">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="mb-4 text-sm text-gray-200">We'd love to hear from you! Reach out with your feedback or inquiries.</p>
            <div className="space-y-4 text-gray-100 text-sm">
              <p>
                <strong>Address:</strong> Chitkara University, Rajpura, Patiala, India
              </p>
              <p>
                <strong>Phone:</strong> +91-78888-80XXX
              </p>
              <p>
                <strong>Email:</strong> admin@prescripto.com
              </p>
            </div>
          </div>

          {/* Right Section - Feedback Form */}
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Share Your Feedback</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={feedback.name}
                  onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full border rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  value={feedback.email}
                  onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full border rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                />
              </div>

              {/* Rating Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rate Us</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setFeedback({ ...feedback, rating: star })}
                      className={`text-3xl ${
                        star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                      } transition duration-300`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  required
                  rows="4"
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                  placeholder="Tell us about your experience..."
                  className="w-full border rounded-lg px-4 py-3 text-gray-700 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-800 transition duration-300"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
