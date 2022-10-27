import Equipo from '../models/equipo.js'
import Partido from '../models/partidos.js'

export async function updatePartido (req, res) {
  try {
    const { golesLocal, golesVisita, status } = req.body

    const partidoUpdate = await Partido.findByIdAndUpdate(req.params.id, {
      golesLocal,
      golesVisita,
      status
    }, { new: true })

    return res.status(200).send(partidoUpdate)
  } catch (error) {
    console.error(error)
  }
}

export async function createPartido (req, res) {
  try {
    const { equipoLocal, equipoVisita } = req.body

    const local = await Equipo.findOne({ nombre: equipoLocal })
    const visita = await Equipo.findOne({ nombre: equipoVisita })

    const partido = new Partido({
      equipoLocal: local._id,
      equipoVisita: visita._id
    })

    await partido.save()

    return res.status(201)
  } catch (error) {
    console.error(error)
  }
}

export async function getPartidos (req, res) {
  try {
    const partidos = await Partido.find()

    return res.status(200).send(partidos)
  } catch (error) {
    console.error(error)
  }
}

export async function getPartido (req, res) {
  try {
    const partido = await Partido.findById(req.params.id)

    return res.status(200).send(partido)
  } catch (error) {
    console.error(error)
  }
}
