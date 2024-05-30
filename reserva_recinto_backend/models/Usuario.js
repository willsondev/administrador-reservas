// Usuario.js
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import generarId from '../helpers/generarId.js'

const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
    },
    token: {
      type: String,
      default: generarId(),
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
});

UsuarioSchema.methods.comprobarPassword = async function (
  passwordFormulario
) {
  return await bcrypt.compare(passwordFormulario, this.password)
}


 const Usuario = mongoose.model('Usuario', UsuarioSchema);

export default Usuario;