import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import {checkApi} from "./middlewares/checkApi.js"
import cookieParser from "cookie-parser"
import connectDB from "./database/db.js"
import userRouter from "./routes/user.route.js" 
const app = express()


connectDB()


//default middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))


app.use(express.json())
app.use(cookieParser())

app.use(bodyParser.json()); // Parses JSON payload
app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded payload

// Use the API Key validation middleware for all API routes
app.use(checkApi);

//apis
app.use("/api/v1/user", userRouter)



app.listen(process.env.PORT, ()=>{
    console.log(`server listen at port ${process.env.PORT}`)
})

