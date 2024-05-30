import mongose from 'mongoose'

const recintoSchema = mongose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    propietario: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    fecha: {
        type: Date,
        required: true,
        default:Date.now(),
    },
    direccion: {
        type: String,
        require: true,
    },
    usuario: {
        type: mongose.Schema.Types.ObjectId,
        ref: "Usuario"
    },
},
    {
        timestamps: true,
    }
);

const Recinto = mongose.model("Recinto", recintoSchema);

export default Recinto;