// import React, { useContext, useEffect } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";

// const DoctorDashboard = () => {
//   const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
//   const { currency, slotDateFormat } = useContext(AppContext);

//   const formatNumber = (num) => {
//     return num.toLocaleString('en-IN', {
//       maximumFractionDigits: 0,
//       minimumFractionDigits: 0
//     });
//   };

//   useEffect(() => {
//     if (dToken) {
//       getDashData();
//     }
//   }, [dToken]);

//   return (
//     dashData && (
//       <div className="p-6 max-w-[1400px] mx-auto space-y-8">
//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {/* Earnings Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
//             <div className="flex items-center gap-4">
//               <div className="p-4 bg-green-50 rounded-lg">
//                 <img className="w-8 h-8" src={assets.earning_icon} alt="earnings"/>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {currency}{formatNumber(dashData.earnings)}
//                 </p>
//                 <p className="text-sm font-medium text-gray-500">Total Earnings</p>
//               </div>
//             </div>
//           </div>

//           {/* Appointments Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
//             <div className="flex items-center gap-4">
//               <div className="p-4 bg-blue-50 rounded-lg">
//                 <img className="w-8 h-8" src={assets.appointments_icon} alt="appointments"/>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {formatNumber(dashData.appointments)}
//                 </p>
//                 <p className="text-sm font-medium text-gray-500">Total Appointments</p>
//               </div>
//             </div>
//           </div>

//           {/* Patients Card */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
//             <div className="flex items-center gap-4">
//               <div className="p-4 bg-purple-50 rounded-lg">
//                 <img className="w-8 h-8" src={assets.patients_icon} alt="patients"/>
//               </div>
//               <div>
//                 <p className="text-2xl font-bold text-gray-800">
//                   {formatNumber(dashData.patients)}
//                 </p>
//                 <p className="text-sm font-medium text-gray-500">Total Patients</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Latest Appointments Section */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//           <div className="border-b bg-gray-50 px-6 py-4">
//             <div className="flex items-center gap-3">
//               <img src={assets.list_icon} className="w-5 h-5" alt="list"/>
//               <h2 className="text-lg font-semibold text-gray-800">Latest Appointments</h2>
//             </div>
//           </div>

//           <div className="divide-y divide-gray-100">
//             {dashData.latestAppointments.map((item, index) => (
//               <div 
//                 key={index}
//                 className="hover:bg-gray-50 transition-colors duration-150"
//               >
//                 <div className="flex items-center justify-between px-6 py-4">
//                   {/* Patient Info */}
//                   <div className="flex items-center gap-4">
//                     <img 
//                       className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" 
//                       src={item.userData?.image || assets.default_user}
//                       alt={item.userData?.name}
//                     />
//                     <div>
//                       <h3 className="font-semibold text-gray-800">
//                         {item.userData?.name}
//                       </h3>
//                       <div className="flex items-center gap-2 mt-1">
//                         <svg className="w-4 h-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
//                           <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//                         </svg>
//                         <p className="text-sm text-gray-500">
//                           {slotDateFormat(item.slotDate)}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Status and Actions */}
//                   <div className="flex items-center gap-6">
//                     <p className="font-semibold text-gray-700">
//                       {currency}{item.amount}
//                     </p>
                    
//                     {item.cancelled ? (
//                       <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-full">
//                         Cancelled
//                       </span>
//                     ) : item.isCompleted ? (
//                       <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
//                         Completed
//                       </span>
//                     ) : (
//                       <div className="flex gap-3">
//                         <button
//                           onClick={() => cancelAppointment(item._id)}
//                           className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
//                           title="Cancel Appointment"
//                         >
//                           <img
//                             className="w-6 h-6"
//                             src={assets.cancel_icon}
//                             alt="cancel"
//                           />
//                         </button>
//                         <button
//                           onClick={() => completeAppointment(item._id)}
//                           className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200"
//                           title="Complete Appointment"
//                         >
//                           <img
//                             className="w-6 h-6"
//                             src={assets.tick_icon}
//                             alt="complete"
//                           />
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   );
// };

// export default DoctorDashboard;

import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'
const DoctorDashboard = () => {
  const { dashData, getDashData, dToken, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if(dToken) {
      getDashData()
    }
  }, [dToken, getDashData])

  const handleComplete = async (id) => {
    try {
      await completeAppointment(id)
      getDashData() // Refresh data after completion
    } catch (error) {
      console.error('Error completing appointment:', error)
    }
  }

  const handleCancel = async (id) => {
    try {
      await cancelAppointment(id)
      getDashData() // Refresh data after cancellation
    } catch (error) {
      console.error('Error cancelling appointment:', error)
    }
  }

  if (!dashData) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 w-full">
      <div className="w-full max-w-none mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white w-full">
          <h1 className="text-3xl font-bold mb-2">Welcome to Doctor Dashboard</h1>
          <p className="opacity-90">Here's what's happening with your appointments today.</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Appointments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-50 rounded-lg">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <Link to="/doctor-appointments" className="text-purple-500 hover:text-purple-600 text-sm font-medium">View All</Link>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{dashData.appointments}</h3>
            <p className="text-gray-500 text-sm">Total Appointments</p>
          </div>

          {/* Earnings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-emerald-500 text-sm font-medium">+2.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">₹{dashData.earning}</h3>
            <p className="text-gray-500 text-sm">Total Earnings</p>
          </div>

          {/* Success Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-amber-50 rounded-lg">
                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-amber-500 text-sm font-medium">+5.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">
              {dashData.appointments.length ? Math.round((dashData.completedAppointments / dashData.appointments.length) * 100) : 0}%
            </h3>
            <p className="text-gray-500 text-sm">Success Rate</p>
          </div>
        </div>

        {/* Appointments Overview & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Appointments Overview */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Appointments Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-emerald-600 font-medium">Completed</span>
                  <span className="text-emerald-600 bg-emerald-100 px-2 py-1 rounded-lg text-sm">
                    {dashData.completedAppointments}
                  </span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${(dashData.completedAppointments / dashData.appointments.length) * 100}% `}}
                  ></div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-600 font-medium">Upcoming</span>
                  <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded-lg text-sm">
                    {dashData.upcomingAppointments}
                  </span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(dashData.upcomingAppointments / dashData.appointments.length) * 100}%`}}
                  ></div>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-red-600 font-medium">Cancelled</span>
                  <span className="text-red-600 bg-red-100 px-2 py-1 rounded-lg text-sm">
                    {dashData.cancelledAppointments}
                  </span>
                </div>
                <div className="w-full bg-red-100 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(dashData.cancelledAppointments / dashData.appointments.length) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
         
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard
