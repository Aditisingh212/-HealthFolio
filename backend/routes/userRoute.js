import express from 'express'
import {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment} from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter =express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile',authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser ,updateProfile) //here using 2 middleware, first for passing the form data nad second for authUser
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointments',authUser, listAppointment)

userRouter.post('/cancel-appointment', authUser, cancelAppointment)


export default userRouter