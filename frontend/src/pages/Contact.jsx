import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-800">
          ABOUT <span className="text-primary">US</span>
        </h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <img 
          className="w-full rounded-lg shadow-lg object-cover h-[480px]" 
          src={assets.about_image}
          alt="About Prescripto"
        />
        <div className="space-y-8 text-gray-600">
          <p className="text-md leading-relaxed">
            Welcome To Prescripto, Your Trusted Partner In Managing Your
            Healthcare Needs Conveniently And Effectively. At Prescripto, We
            Understand The Challenges Individuals Face When It Comes To
            Scheduling Doctor Appointments And Managing Their Health Records.
          </p>
          <p className="text-md leading-relaxed">
            Prescripto IS Commited To Excellence Is Healthcare Technology. We
            Continuously Strive To Enhance Our Platform, Integrating The Latest
            Advancements To Improve User Experience And Deliver Superior
            Service. Whether You're Booking Your First Appointment Or Managing
            Ongoing Care, Prescripto IS Here To Support You Every Step Of The
            Way.
          </p>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-md leading-relaxed">
              Our Vision At Prescripto Is To Create A Seamless Healthcare
              Experience For Every User. We Aim To Bridge The Gap Between Patients
              And Healthcare Providers, Making It Easier For You TO Access The Care
              You Need, When You Need It.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800">
          WHY CHOOSE <span className="text-primary">US</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md p-8 hover:bg-primary group transition-all duration-300">
          <h3 className="text-xl font-bold mb-4 group-hover:text-white">Efficiency</h3>
          <p className="group-hover:text-white">Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 hover:bg-primary group transition-all duration-300">
          <h3 className="text-xl font-bold mb-4 group-hover:text-white">Convenience</h3>
          <p className="group-hover:text-white">Access to a network of trusted healthcare professionals in your area.</p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 hover:bg-primary group transition-all duration-300">
          <h3 className="text-xl font-bold mb-4 group-hover:text-white">Personalisation</h3>
          <p className="group-hover:text-white">Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
