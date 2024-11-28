import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    });
  };

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="p-6 max-w-[1400px] mx-auto space-y-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Earnings Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <img className="w-8 h-8" src={assets.earning_icon} alt="earnings"/>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {currency}{formatNumber(dashData.earnings)}
                </p>
                <p className="text-sm font-medium text-gray-500">Total Earnings</p>
              </div>
            </div>
          </div>

          {/* Appointments Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <img className="w-8 h-8" src={assets.appointments_icon} alt="appointments"/>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatNumber(dashData.appointments)}
                </p>
                <p className="text-sm font-medium text-gray-500">Total Appointments</p>
              </div>
            </div>
          </div>

          {/* Patients Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-50 rounded-lg">
                <img className="w-8 h-8" src={assets.patients_icon} alt="patients"/>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatNumber(dashData.patients)}
                </p>
                <p className="text-sm font-medium text-gray-500">Total Patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Appointments Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b bg-gray-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <img src={assets.list_icon} className="w-5 h-5" alt="list"/>
              <h2 className="text-lg font-semibold text-gray-800">Latest Appointments</h2>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {dashData.latestAppointments.map((item, index) => (
              <div 
                key={index}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between px-6 py-4">
                  {/* Patient Info */}
                  <div className="flex items-center gap-4">
                    <img 
                      className="w-12 h-12 rounded-full object-cover border-2 border-gray-100" 
                      src={item.userData?.image || assets.default_user}
                      alt={item.userData?.name}
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.userData?.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <svg className="w-4 h-4 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="text-sm text-gray-500">
                          {slotDateFormat(item.slotDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center gap-6">
                    <p className="font-semibold text-gray-700">
                      {currency}{item.amount}
                    </p>
                    
                    {item.cancelled ? (
                      <span className="px-3 py-1 text-xs font-medium bg-red-50 text-red-600 rounded-full">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-full">
                        Completed
                      </span>
                    ) : (
                      <div className="flex gap-3">
                        <button
                          onClick={() => cancelAppointment(item._id)}
                          className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                          title="Cancel Appointment"
                        >
                          <img
                            className="w-6 h-6"
                            src={assets.cancel_icon}
                            alt="cancel"
                          />
                        </button>
                        <button
                          onClick={() => completeAppointment(item._id)}
                          className="p-2 hover:bg-green-50 rounded-full transition-colors duration-200"
                          title="Complete Appointment"
                        >
                          <img
                            className="w-6 h-6"
                            src={assets.tick_icon}
                            alt="complete"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
