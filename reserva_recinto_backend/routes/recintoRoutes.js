import express from "express";
const router = express.Router();
import { agregarRecinto,obtenerRecintos, obtenerRecinto, actualizarRecinto, eliminarRecinto } from "../controllers/recintoController.js";
import checkAuth from "../middleware.js/authMiddleware.js";

router.route('/')
    .post(checkAuth, agregarRecinto)
    .get(checkAuth, obtenerRecintos);

router
    .route('/:id')
    .get(checkAuth, obtenerRecinto)
    .put(checkAuth, actualizarRecinto)
    .delete(checkAuth, eliminarRecinto)

export default router;