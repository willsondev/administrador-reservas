import Recinto from "../models/Recinto.js";

const agregarRecinto = async (req, res) => {
    const recinto = new Recinto(req.body);
    recinto.usuario = req.usuario._id
    try {
        const recintoAlmacenado = await recinto.save();
        res.json(recintoAlmacenado)
    } catch (error) {
        console.log(error)
    }
};
 
const obtenerRecintos = async (req, res) => {
    const recintos = await Recinto.find()
        .where("usuario")
        .equals(req.usuario);

res.json(recintos);
};

const obtenerRecinto = async (req, res) => {
    const { id } = req.params;
    const recinto = await Recinto.findById(id);

    if (!recinto) {
        return res.status(404).json({msg: 'No Encontrado'})
    }

    if (recinto.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.json({ msg: "Accion no válida" });
    }

        res.json(recinto)
    
}
 
const actualizarRecinto = async (req, res) => {
     const { id } = req.params;
    const recinto = await Recinto.findById(id);

    if (!recinto) {
        return res.status(404).json({msg: 'No Encontrado'})
    }

    if (recinto.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.json({ msg: "Accion no válida" });
    }

    // actualizar recinto
    recinto.nombre = req.body.nombre || recinto.nombre;
    recinto.propietario = req.body.propietario || recinto.propietario;
    recinto.email = req.body.email || recinto.email;
    recinto.fecha = req.body.fecha || recinto.fecha;
    recinto.direccion = req.body.direccion || recinto.direccion;
    try {
        const recintoActualizado = await recinto.save();
        res.json(recintoActualizado)
    } catch (error) {
        console.log(error)
    }
    
}

const eliminarRecinto = async (req, res) => {
    const { id } = req.params;
    const recinto = await Recinto.findById(id);

    if (!recinto) {
        return res.status(404).json({msg: 'No Encontrado'})
    }

    if (recinto.usuario._id.toString() !== req.usuario._id.toString()) {
        return res.json({ msg: "Accion no válida" });
    }

    //eliminar
    try {
        await recinto.deleteOne();
        res.json({ msg: "Paciente Eliminado"})
    } catch (error) {
        console.log(error)
    }
}

export { agregarRecinto,obtenerRecintos, obtenerRecinto, actualizarRecinto, eliminarRecinto };