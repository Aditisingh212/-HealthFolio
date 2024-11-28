import express from 'express' 
import cors from 'cors' //cross-origin resource sharing[middleware: allows/restricts resources(like APIs) to be accessed from different origins.] used mainly when frontend backend are hosted on diff servers
import 'dotenv/config' //imports and automatically loads environment variables from .env file into process.env [typically used to store sensitive info such as API keys, database credentials etc that should not be hardcoded in code]
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import feedbackRouter from './routes/feedbackRoute.js'

// app config
const app= express()
const port=process.env.PORT || 4000
connectDB();
connectCloudinary();

//middlewares
app.use(express.json())
app.use(cors()) // allows to connect frontend with backend


//API endpoints 
app.use('/api/admin',adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/feedback', feedbackRouter)

app.get('/',(req,res)=>{
    res.send('API Working')
})

app.listen(port, ()=> 
    console.log("Server started at:", port)) // starts server