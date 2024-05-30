import Recinto from '../models/RecintoPrueba.js';

const registrarRecinto = async (req, res) => {
  const { nombre, email, password } = req.body; // Extract relevant data from request body

  // Validate email format (if using email for registration)
  if (email && !validateEmail(email)) {
    const error = new Error('Formato de correo electrónico no válido');
    return res.status(400).json({ msg: error.message });
  }

  // Check if recinto with the given nombre or email already exists
  const existeRecintoPorNombre = await Recinto.findOne({ nombre });
  const existeRecintoPorEmail = await Recinto.findOne({ email });

  if (existeRecintoPorNombre || existeRecintoPorEmail) {
    const error = new Error(
      'Ya existe un recinto con ese nombre o correo electrónico'
    );
    return res.status(400).json({ msg: error.message });
  }

  // Hash password before saving (if using bcrypt)
  if (password) {
    req.body.password = await bcrypt.hash(password, 10); // Replace plain-text password
  }

  // Create and save the new recinto
  try {
    const recinto = new Recinto(req.body);
    const recintoGuardado = await recinto.save();
    res.json(recintoGuardado);
  } catch (error) {
    console.error(error); // Log error to console for debugging
    res.status(500).json({ msg: 'Error al registrar recinto' }); // Generic error message
  }
};

// Function to validate email format (if using email for registration)
function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)@(([^<>()\[\]\\.,;:\s@"]+)(\.[^<>()\[\]\\.,;:\s@"]+)*)$/;
  return re.test(email);
}

export {
  registrarRecinto,
};
