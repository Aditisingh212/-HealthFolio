import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import {assets} from '../assets/assets'
import axios from "axios";
import { toast } from "react-toastify";
const MyProfile = () => {

  const {userData, setUserData, token, backendUrl, loadUSerProfileData}= useContext(AppContext)
 
  const [isEdit, setIsEdit] = useState(false);
  const [image,setImage]=useState(false);

  //saving profile updates in database as well
  const updateUserProfileData=async()=>{
     try {
      const formData = new FormData()

      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)


      image && formData.append('image', image)

      const {data}=await axios.post(backendUrl+ '/api/user/update-profile', formData, {headers:{token}})

      if(data.success){
        toast.success(data.message)
        await loadUSerProfileData
        
        setIsEdit(false)
        setImage(false)

      } else{
        toast.error(data.message)
      }

     } catch (error) {
      console.log(error.message);
      toast.error(error.message)
     }
  } 


  return userData && (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-white to-gray-50/50 rounded-3xl shadow-xl backdrop-blur-sm">
      <div className="flex flex-col gap-6">
        {/* Profile Image Section */}
        <div className="flex justify-center">
          {isEdit ? (
            <label htmlFor="image" className="group cursor-pointer inline-block">
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/10 transition-all duration-300 group-hover:ring-primary/30 group-hover:scale-105">
                <img 
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" 
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                  <div className="transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <img className="w-12 h-12" src={assets.upload_icon} alt="Upload" />
                    <p className="text-white text-sm mt-2">Change Photo</p>
                  </div>
                </div>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" className="hidden" />
              </div>
            </label>
          ) : (
            <div className="relative w-44 h-44 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-primary/10">
              <img 
                className="w-full h-full object-cover" 
                src={userData.image} 
                alt="Profile"
              />
            </div>
          )}
        </div>

        {/* Name Section */}
        <div className="text-center">
          {isEdit ? (
            <input 
              className="text-3xl font-semibold bg-transparent border-b-2 border-primary/20 px-4 py-1 
              focus:outline-none focus:border-primary/50 text-center transition-all duration-300
              hover:border-primary/30"
              type="text"
              value={userData.name}
              onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
            />
          ) : (
            <h1 className="text-3xl font-semibold text-gray-800">{userData.name}</h1>
          )}
        </div>

        <hr className="border-gray-200 my-2" />

        {/* Contact Information */}
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Information
          </h2>
          <div className="grid grid-cols-[1fr_3fr] gap-6 text-sm">
            <p className="font-medium text-gray-700">Email:</p>
            <p className="text-primary font-medium">{userData.email}</p>
            
            <p className="font-medium text-gray-700">Phone:</p>
            {isEdit ? (
              <input
                className="bg-gray-50 rounded-lg px-4 py-2 border-2 border-transparent
                focus:border-primary/30 focus:outline-none transition-all duration-300
                hover:border-gray-200"
                type="text"
                value={userData.phone}
                onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-primary font-medium">{userData.phone}</p>
            )}

            <p className="font-medium text-gray-700">Address:</p>
            {isEdit ? (
              <div className="space-y-3">
                <input
                  className="w-full bg-gray-50 rounded-lg px-4 py-2 border-2 border-transparent
                  focus:border-primary/30 focus:outline-none transition-all duration-300
                  hover:border-gray-200"
                  onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))}
                  value={userData.address.line1}
                  type="text"
                  placeholder="Address Line 1"
                />
                <input
                  className="w-full bg-gray-50 rounded-lg px-4 py-2 border-2 border-transparent
                  focus:border-primary/30 focus:outline-none transition-all duration-300
                  hover:border-gray-200"
                  onChange={(e) => setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))}
                  value={userData.address.line2}
                  type="text"
                  placeholder="Address Line 2"
                />
              </div>
            ) : (
              <p className="text-gray-600">
                {userData.address.line1}<br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Basic Information
          </h2>
          <div className="grid grid-cols-[1fr_3fr] gap-6 text-sm">
            <p className="font-medium text-gray-700">Gender:</p>
            {isEdit ? (
              <select
                className="bg-gray-50 rounded-lg px-4 py-2 border-2 border-transparent
                focus:border-primary/30 focus:outline-none transition-all duration-300
                hover:border-gray-200"
                onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}

            <p className="font-medium text-gray-700">Birth Date:</p>
            {isEdit ? (
              <input
                className="bg-gray-50 rounded-lg px-4 py-2 border-2 border-transparent
                focus:border-primary/30 focus:outline-none transition-all duration-300
                hover:border-gray-200"
                type="date"
                onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-4">
          {isEdit ? (
            <button 
              onClick={updateUserProfileData}
              className="px-8 py-3 rounded-xl bg-primary text-white 
              hover:bg-primary/90 active:bg-primary/95 transition-all duration-300 
              shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20
              transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Save Changes
            </button>
          ) : (
            <button 
              onClick={() => setIsEdit(true)}
              className="px-8 py-3 rounded-xl border-2 border-primary text-primary
              hover:bg-primary hover:text-white transition-all duration-300
              shadow-lg shadow-transparent hover:shadow-primary/20
              transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
