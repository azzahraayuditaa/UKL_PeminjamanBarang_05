import express from "express";
import { authentification, createUser, deleteUser, getAlluser, updateUser } from "../controller/userController"
import { verifyAddAdmin, verifyAddUser, verifyAuthentification, verifyUpdateUser } from "../middleware/userValidation"
// import uploadFileUser from "../middlewares/userUpload";
import { verifyRole, verifyToken } from "../middleware/authorization"

const app = express()
app.use(express.json())

app.get(`/`,getAlluser)
app.post(`/create/user`,[verifyAddUser],createUser);
app.post(`/create/admin`,[verifyAddAdmin],createUser);
app.put(`/update/:id`,[verifyUpdateUser],updateUser)
app.post(`/login`,[verifyAuthentification],authentification)
app.delete(`/delete/:id`,deleteUser)

// app.put(/pic/:id,[uploadFileUser.single("picture")],changeProfile)

export default app;