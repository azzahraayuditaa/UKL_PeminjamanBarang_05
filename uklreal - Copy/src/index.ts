import express from 'express'
import cors from 'cors'
import userRoute from './route/userRoute'
import barangRoute from './route/barangRoute' 


const PORT: number = 8000
const app = express()
app.use(cors())

app.use(`/user`, userRoute)
app.use(`/barang`, barangRoute)

app.listen(PORT, () => {
    console.log(`[Server]: Server is running at http://localhost:${PORT}`);
})