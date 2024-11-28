// import React from "react";
// import { useContext } from "react";
// import { DoctorContext } from "../../context/DoctorContext";
// import { useEffect } from "react";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";
// const DoctorAppointments = () => {
//   const {
//     dToken,
//     appointments,
//     getAppointments,
//     completeAppointment,
//     cancelAppointment,
//   } = useContext(DoctorContext);
//   const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

//   useEffect(() => {
//     if (dToken) {
//       getAppointments();
//     }
//   }, [dToken]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>

//       <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
//         <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Payment</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>

//         {appointments.reverse().map((item, index) => (
//           <div
//             className="flex flex-wrap justify-between max=sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 px-6 border-b hover:bg-gray-50"
//             key={index}
//           >
//             <p className="max-sm:hidden">{index + 1}</p>

//             <div className="flex items-center gap-2">
//               <img className="w-8 rounded-full" src={item.userData.image}></img>{" "}
//               <p>{item.userData.name}</p>
//             </div>

//             <div>
//               <p className="text-xs inline border border-primary px-2 rounded-full">
//                 {item.payment ? "Online" : "CASH"}
//                 {}
//               </p>
//             </div>
//             <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
//             <p>
//               {slotDateFormat(item.slotDate)}, {item.slotTime}
//             </p>
//             <p>
//               {currency}
//               {item.amount}
//             </p>
//             {item.cancelled ? (
//               <p className="text-red-400 text-xs font-medium">Cancelled</p>
//             ) : item.isCompleted ? (
//               <p className="text-green-400 text-xs font-medium">Completed</p>
//             ) : (
//               <div className="flex">
//                 <img
//                   onClick={() => cancelAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.cancel_icon}
//                 ></img>
//                 <img
//                   onClick={() => completeAppointment(item._id)}
//                   className="w-10 cursor-pointer"
//                   src={assets.tick_icon}
//                 ></img>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorAppointments;



import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 w-full">
      <div className="w-full max-w-none mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-3xl p-8 text-white w-full">
          <h1 className="text-3xl font-bold mb-2">Appointments</h1>
          <p className="opacity-90">Manage all your patient appointments here.</p>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">All Appointments</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr className="text-sm text-gray-500">
                  <th className="px-6 py-4 text-left font-medium">#</th>
                  <th className="px-6 py-4 text-left font-medium">Patient</th>
                  <th className="px-6 py-4 text-left font-medium">Payment</th>
                  <th className="px-6 py-4 text-left font-medium">Age</th>
                  <th className="px-6 py-4 text-left font-medium">Date & Time</th>
                  <th className="px-6 py-4 text-left font-medium">Fees</th>
                  <th className="px-6 py-4 text-left font-medium">Status/Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {appointments.reverse().map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          className="w-8 h-8 rounded-full object-cover"
                          src={item.userData.image}
                          alt={item.userData.name}
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {item.userData.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${item.payment ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {item.payment ? "Online" : "Cash"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {calculateAge(item.userData.dob)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {slotDateFormat(item.slotDate)}, {item.slotTime}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {currency}{item.amount}
                    </td>
                    <td className="px-6 py-4">
                      {item.cancelled ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            onClick={() => cancelAppointment(item._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Appointment"
                          >
                            <img className="w-5 h-5" src={assets.cancel_icon} alt="cancel"/>
                          </button>
                          <button
                            onClick={() => completeAppointment(item._id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Complete Appointment"
                          >
                            <img className="w-5 h-5" src={assets.tick_icon} alt="complete"/>
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;
