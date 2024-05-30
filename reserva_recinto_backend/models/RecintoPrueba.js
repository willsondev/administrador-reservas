import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Import bcrypt if needed for password hashing
import generarId from '../helpers/generarId';

const RecintoSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  direccion: String,
  descripcion: String,
  imagen: String,
  email: { // Add 'email' property if needed
    type: String,
    required: true,
    trim: true,
    unique: true // Ensure unique email
  },
  password: { // Add 'password' property if needed
    type: String,
    required: true,
    minlength: 6 // Set minimum password length
  },
  capacidad: Number, // Add 'capacidad' property if needed
  telefono: String, // Add 'telefono' property if needed
  confirmado: {
    type: Boolean,
    default: false
  }
});

// Hash password before saving (if using bcrypt)
RecintoSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const Recinto = mongoose.model('Recinto', RecintoSchema);
export default Recinto;
