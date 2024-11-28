import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointments = () => {

  const {docId}= useParams();
  const {doctors, currencySymbol, backendUrl, token, getDoctorData} = useContext(AppContext)
  const daysOFWeek=['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate= useNavigate();

  const[docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots]=useState([])
  const [slotIndex, setSlotIndex]= useState(0)
  const [slotTime, setSlotTime]=useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id ===docId)
    setDocInfo(docInfo)
    
  }

  const getAvailableSlots= async () =>{
     setDocSlots([])
    //getting current date

    let today=new Date()
    for(let i=0;i<7;i++){
      let currentDate= new Date(today)
      currentDate.setDate(today.getDate()+i)

      //setting end time of the date with index
      let endTime= new Date()
      endTime.setDate(today.getDate() +i)
      endTime.setHours(21,0,0,0)

      if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours()>10 ? currentDate.getHours()+1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots=[]

      while(currentDate<endTime){
        let formattedTime=currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit' })


        let day=currentDate.getDate()
        let month=currentDate.getMonth()+1
        let year=currentDate.getFullYear()

        const slotDate=day+"_"+month+"_"+year
        const slotTime=formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if(isSlotAvailable){
          //add time to slots
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        })

        }

        

        // Increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }


  const bookAppointment=async()=>{
    if(!token){
      toast.warn('Login to Book Appointment');
      return navigate('/login')
       
    }

    try {
      const date=docSlots[slotIndex][0].datetime

      let day=date.getDate()
      let month=date.getMonth()+1
      let year=date.getFullYear()

      const slotDate=day+"_"+month+"_"+year

      const {data}=await axios.post(backendUrl+'/api/user/book-appointment', {docId, slotDate, slotTime}, {headers: {token}})
      if(data.success){
        toast.success(data.message)
        getDoctorData()
        navigate('/my-appointments')
      } else{
        toast.error(data.message)
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchDocInfo()
  }, [doctors, docId])
  
  useEffect(()=>{
    if(docInfo)getAvailableSlots()
  },[docInfo])

  useEffect(()=>{
    console.log( docSlots);
  },[docSlots ])

  return docInfo && (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-6'>
        <div className='flex flex-col sm:flex-row gap-6'>
          <div className="relative group">
            <img 
              className='w-full sm:max-w-72 rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-[1.02]' 
              src={docInfo.image} 
              alt={docInfo.name}
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
          </div>

          <div className='flex-1 border border-gray-200 rounded-2xl p-8 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            {/* Doctor Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h1 className='text-2xl font-semibold text-gray-900'>{docInfo.name}</h1>
                <img className='w-5 h-5' src={assets.verified_icon} alt="Verified"/>
              </div>
              
              <div className='flex items-center gap-3 text-sm text-gray-600'>
                <p>{docInfo.degree} - {docInfo.speciality}</p>
                <span className='py-1 px-3 bg-primary/10 text-primary text-xs rounded-full font-medium'>
                  {docInfo.experience}
                </span>
              </div>

              <div className="space-y-2">
                <p className='flex items-center gap-2 text-sm font-medium text-gray-900'>
                  About <img src={assets.info_icon} alt="Info"/>
                </p>
                <p className='text-sm text-gray-600 leading-relaxed'>{docInfo.about}</p>
              </div>

              <p className='text-gray-700 font-medium'>
                Appointment fee: <span className='text-primary'>{currencySymbol}{docInfo.fees}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-8'>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Slots</h2>
        
        {/* Days Selection */}
        <div className='flex gap-4 items-center w-full overflow-x-auto pb-2'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div 
              onClick={() => setSlotIndex(index)} 
              className={`text-center py-4 px-6 min-w-20 rounded-xl cursor-pointer transition-all duration-300
                ${slotIndex === index 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 transform -translate-y-0.5' 
                  : 'border-2 border-gray-100 hover:border-primary/30 text-gray-600'}`} 
              key={index}
            >
              <p className="font-medium">{item[0] && daysOFWeek[item[0].datetime.getDay()]}</p>
              <p className="text-sm mt-1">{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className='flex items-center gap-3 w-full overflow-x-auto mt-6 pb-2'>
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <button 
              onClick={() => setSlotTime(item.time)} 
              className={`text-sm font-medium flex-shrink-0 px-6 py-3 rounded-xl transition-all duration-300
                ${item.time === slotTime 
                  ? 'bg-primary text-white shadow-lg shadow-primary/25 transform -translate-y-0.5' 
                  : 'border-2 border-gray-100 hover:border-primary/30 text-gray-600'}`} 
              key={index}
            >
              {item.time.toLowerCase()}
            </button>
          ))}
        </div>

        {/* Book Appointment Button */}
        <button 
          onClick={bookAppointment} 
          className="mt-8 px-8 py-3.5 bg-primary text-white rounded-xl font-medium
          hover:bg-primary/90 transform hover:-translate-y-0.5 active:translate-y-0
          transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl"
        >
          Book Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-16">
        <RelatedDoctors docID={docId} speciality={docInfo.speciality}/>
      </div>
    </div>
  )
}

export default Appointments

