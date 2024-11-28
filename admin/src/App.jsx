import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllApointments from './pages/Admin/AllApointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import axios from 'axios'
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const {aToken}=useContext(AdminContext)
  const {dToken}=useContext(DoctorContext)



  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      
      <ToastContainer/>
      <Navbar></Navbar>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
        {/*---- Admin Routes ----- */}
          <Route path='/' element={<></>}></Route>
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllApointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />

        {/*----- Doctor Routes ----- */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard/>}  />
          <Route path='/doctor-appointments' element={<DoctorAppointments/>}  />
          <Route path='/doctor-profile' element={<DoctorProfile/>}  />

        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer/>
    </>
  )
}

export default App
