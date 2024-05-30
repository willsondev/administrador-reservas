// Reserva.js
import mongoose from 'mongoose';

const ReservaSchema = mongoose.Schema({
  canchaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cancha'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },
  fechaInicio: Date,
  fechaFin: Date,
  hora: String,
  estado: String
});

export default mongoose.model('Reserva', ReservaSchema);