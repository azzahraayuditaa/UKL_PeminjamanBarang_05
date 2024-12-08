import express from "express";
import { validateAnalis, validateBorrow, validateBorrowAnalis, validateReturn, verifyAddBarang, verifyUpdateBarang } from "../middleware/barangValidation"
import { addBarang, analisis, borrowAnalysis, borrowBarang, getAllBarang, getBarang, returnBarang, updateBarang, deleteBarang } from "../controller/barangController"
import { verifyRole, verifyToken } from "../middleware/authorization"



const app = express()
app.use(express.json())

app.post(`/inventory`,[verifyToken,verifyRole(["admin"]),verifyAddBarang], addBarang)
app.put(`/update/:id_barang`,[verifyToken,verifyRole(["admin"]),verifyUpdateBarang], updateBarang)
app.get(`/inventory/:id_barang`,[verifyToken,verifyRole(["admin","user"])], getBarang)
app.get(`/`,[verifyToken,verifyRole(["admin","user"])],getAllBarang)
app.delete(`/delete/:id_barang`,[verifyToken,verifyRole(["admin"])],deleteBarang)

// PEMINJAMAN DAN PENGEMBALIAN BARANG
app.post("/inventory/borrow",[verifyToken,verifyRole(["admin","user"]),validateBorrow],borrowBarang )
app.post("/inventory/return",[verifyToken,verifyRole(["admin","user"]),validateReturn],returnBarang )
app.post(`/inventory/usage-report`,[verifyToken,verifyRole(["admin"]),validateAnalis],analisis)
app.post(`/inventory/borrow-analysis`,[verifyToken,verifyRole(["admin"]),validateBorrowAnalis],borrowAnalysis)


export default app;