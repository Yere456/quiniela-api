import Equipo from '../models/equipo.js'
import Partido from '../models/partidos.js'
import Pronostico from '../models/pronostico.js'
import Usuario from '../models/usuarios.js'

export async function updatePartido (req, res) {
  try {
    const { golesLocal, golesVisita, status } = req.body

    const partidoUpdate = await Partido.findByIdAndUpdate(req.params.id, {
      golesLocal,
      golesVisita,
      status
    }, { new: true })

    const apuestas = await Pronostico.find({ partido: req.params.id })

    // eslint-disable-next-line array-callback-return
    apuestas.map(apuesta => {
      async function a () {
        const user = await Usuario.findById(apuesta.usuario._id)
        const apuestaUsuarioLocal = apuesta.golesLocal
        const apuestaUsuarioVisita = apuesta.golesVisita

        if (apuestaUsuarioLocal === partidoUpdate.golesLocal && apuestaUsuarioVisita === partidoUpdate.golesVisita) {
          user.puntos += 3
          await user.save()
          return
        }

        if (apuestaUsuarioLocal === partidoUpdate.golesLocal || apuestaUsuarioVisita === partidoUpdate.golesVisita) {
          user.puntos += 1
          await user.save()
        }
      }
      a()
    })

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

    const partidoCreated = await partido.save()

    return res.status(200).send(partidoCreated)
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
