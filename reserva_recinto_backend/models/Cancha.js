// Cancha.js
import mongoose from 'mongoose';

const CanchaSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: String,
  imagen: String,
  precio: Number,
  disponible: Boolean,
  recintoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recinto'
  }
});

export default mongoose.model('Cancha', CanchaSchema);