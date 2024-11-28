import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* About Us Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          ABOUT <span className="text-gray-800">US</span>
        </h1>
        <p className="text-gray-500 mt-2">Learn more about our mission and values</p>
      </div>

      {/* About Content */}
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <img
          className="w-full md:max-w-md rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover"
          src={assets.about_image}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
          <p className="leading-relaxed">
            Welcome to <span className="font-semibold text-primary">Prescripto</span>, your reliable partner in managing healthcare needs with ease and efficiency. At Prescripto, we recognize the difficulties people face when booking doctor appointments and organizing their health records.
          </p>
          <p className="leading-relaxed">
            <span className="font-semibold text-primary">Prescripto</span> is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </p>
          <b className="text-lg text-gray-800">Our Vision</b>
          <p className="leading-relaxed">
            Prescripto is dedicated to excellence in healthcare technology. We are constantly working to improve our platform by incorporating the latest innovations to enhance user experience and provide exceptional service. Whether you're scheduling your first appointment or managing ongoing care, Prescripto is here to assist you at every stage.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          WHY <span className="text-primary">CHOOSE US</span>
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 border-2 border-gray-100 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-600 cursor-pointer hover:bg-primary hover:text-white">
            <b>Efficiency:</b>
            <p>Effortless appointment scheduling designed to fit seamlessly into your busy life.</p>
          </div>

          <div className="flex-1 border-2 border-gray-100 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-600 cursor-pointer hover:bg-primary hover:text-white">
            <b>Convenience:</b>
            <p>Connect with a network of reliable healthcare professionals near you.</p>
          </div>

          <div className="flex-1 border-2 border-gray-100 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-gray-600 cursor-pointer hover:bg-primary hover:text-white">
            <b>Personalization:</b>
            <p>Personalized recommendations and reminders to keep you on track with your health.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
