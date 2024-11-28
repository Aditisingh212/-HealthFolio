import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const MyAppointments = () => {
    const {backendUrl, token, getDoctorData}= useContext(AppContext)

    const [appointments, setAppointments]=useState([])
    const months= ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    
    const slotDateFormat=( slotDate)=> {
      const dateArray = slotDate.split('_')
      return dateArray[0]+" "+months[Number(dateArray[1])]+ " "+dateArray[2]
    }

    //const navigate=useNavigate()
    const getUserAppointments=async()=>{
      try {
        
        const {data}=await axios.get(backendUrl+'/api/user/appointments', {headers:{token}})
        
        if(data.success){
          setAppointments(data.appointments.reverse())
          console.log(data.appointments);
          
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message);
        
      }
    }

 // cancel appointment
    const cancelAppointment=async(appointmentId)=>{
       try {
        const {data}= await axios.post (backendUrl+'/api/user/cancel-appointment', {appointmentId}, {headers: {token}})
        if(data.success){
          toast.success(data.message)
          getUserAppointments()
          getDoctorData()

        } else{
          toast.error(data.message)
        }
        
       } catch (error) {
        console.log(error);
        toast.error(error.message);
       }
    }


    useEffect(()=>{
      if(token){
        getUserAppointments()
      }

    },[token])
  
    return (
    <div className="max-w-6xl mx-auto px-4">
      <p className='text-2xl font-semibold text-gray-800 mt-12 mb-8'>
        My Appointments
      </p>

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div 
            key={index}
            className='bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300'
          >
            <div className='grid grid-cols-[1fr_2fr] gap-6 sm:flex sm:gap-8'>
              {/* Doctor Image */}
              <div className="overflow-hidden rounded-xl">
                <img 
                  className='w-32 h-32 object-cover hover:scale-105 transition-transform duration-300' 
                  src={item.docData.image}
                  alt={item.docData.name}
                />
              </div>

              {/* Doctor Info */}
              <div className='flex-1 space-y-2.5'>
                <p className='text-lg font-semibold text-gray-800'>{item.docData.name}</p>
                <p className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {item.docData.speciality}
                </p>
                
                <div className="mt-3">
                  <p className='text-gray-700 font-medium'>Address:</p>
                  <p className='text-sm text-gray-600'>{item.docData.address.line1}</p>
                  <p className='text-sm text-gray-600'>{item.docData.address.line2}</p>
                </div>
                
                <p className='text-sm mt-2'>
                  <span className='text-gray-700 font-medium'>Date & Time: </span>
                  <span className='text-gray-600'>{slotDateFormat(item.slotDate)} | {item.slotTime}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className='flex flex-col gap-3 justify-end min-w-[180px]'>
                {!item.cancelled && (
                  <>
                    <button className='px-6 py-2.5 rounded-xl text-sm text-gray-600 border-2 border-gray-200
                      hover:bg-primary hover:text-white hover:border-primary transition-all duration-300'>
                      Pay Online
                    </button>
                    <button 
                      onClick={() => cancelAppointment(item._id)}
                      className='px-6 py-2.5 rounded-xl text-sm text-gray-600 border-2 border-gray-200
                      hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-300'
                    >
                      Cancel Appointment
                    </button>
                  </>
                )}
                {item.cancelled && (
                  <div className='px-6 py-2.5 rounded-xl text-sm text-red-500 border-2 border-red-200 
                    bg-red-50 text-center font-medium'>
                    Appointment Cancelled
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
