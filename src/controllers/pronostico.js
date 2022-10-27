import Partido from '../models/partidos.js'
import Pronostico from '../models/pronostico.js'
import Usuario from '../models/usuarios.js'

export async function createPronostico (req, res) {
  try {
    const { idPartido, idUsuario, golesLocal, golesVisita } = req.body

    const partido = await Partido.findById(idPartido)
    const usuario = await Usuario.findById(idUsuario)

    const pronostico = new Pronostico({
      partido: partido._id,
      usuario: usuario._id,
      golesLocal,
      golesVisita
    })

    const savedPronostico = await pronostico.save()

    return res.status(200).send(savedPronostico)
  } catch (error) {
    return res.status(500).send(error)
  }
}
