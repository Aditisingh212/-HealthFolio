// import React from "react";
// import { assets } from "../assets/assets";

// const About = () => {
//   return (
//     <div>
//       <div className="text-center text-2xl pt-10 text-gray-500">
//         <p>
//           ABOUT <span className="text-gray-700 font-medium">US</span>
//         </p>
//       </div>

//       <div className="my-10 flex flex-col md:flex-row gap-12">
//         <img className="w-full md:max-w-[360px]" src={assets.about_image}></img>
//         <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
//           <p>
//             Welcome To Prescripto, Your Trusted Partner In MAnaging Your
//             HEalthcare Needs Conveniently And Effectively. At Prescripto, We
//             Understand The Challenges Individuals Face When It Comes To
//             Scheduling Doctor Appointments And Managing Their Health Records.
//           </p>
//           <p>
//             Prescripto IS Commited To Excellence Is Healthcare Technology. We
//             Continuously Strive To Enhance Our Platform, Integrating The Latest
//             Advancements To Improve USer Experience And Deliver Superior
//             Service. Whether You're Booking Your First Appointment Or Managing
//             Ongoing Care, Prescripto IS Here To Support You Every Step Of The
//             Way.
//           </p>
//           <b className="text-gray-800">Our Vision</b>
//           <p>
//             Our Vision At Prescripto Is To Create A Seamless Healthcare
//             Experience For Every User. We Aim To Bridge The Gap Between Patients
//             And Healtcare Providers, Making It Easier For You TO Access The Care
//             You Need, When You Need It.
//           </p>
//         </div>
//       </div>

//       <div>
//         <p>
//           WHY <span className="text-gray-700 font-semibold"></span> CHOOSE US
//         </p>
//       </div>

//       <div className="flex flex-col md:flex-row mb-20">
//         <div className=" border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15-px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer ">
//           <b>Efficiency:</b>
//           <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
//         </div>

//         <div className=" border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15-px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer ">
//           <b>Convenience:</b>
//           <p>Access to a network of trusted healthcare professionals in your area.</p>
//         </div>

//         <div className=" border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15-px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer ">
//           <b>Personalisation:</b>
//           <p>Tailored recommendations and remainder to help you stay on top of your health.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;


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
