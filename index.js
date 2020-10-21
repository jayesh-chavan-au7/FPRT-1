import { config } from 'dotenv'
config()

import path from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'

import './models'
import userAuthRoute from './Routes/userAuth.routes'
import AdminActionRoute from './Routes/adminAction.routes'
import vendorActionRoute from './Routes/vendorAction.routes'
import userActionRoute from './Routes/userAction.routes'

const app = express()

app.use(cors({ credentials:true, origin: "http://localhost:3000"}))
app.use(express.urlencoded({ extended : true }))
app.use(express.json())
app.use(cookieParser())

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('./client/build'))
}else{
    // IN DEVLOPMENT MODE ONLY
    app.use(morgan('dev'))
}

app.use('/user', userAuthRoute)
app.use('/admin', AdminActionRoute)
app.use('/vendor', vendorActionRoute)
app.use('/user', userActionRoute)

app.get('/*', (req,res,next) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'))
})

app.get('/', (req,res,next) => {
    res.status(404).send('Page Not Found')
})

const PORT= process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
})