import mongoose from 'mongoose'

const equiposSchema = new mongoose.Schema(
  {
    nombre: String,
    imagen: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

export default mongoose.model('Equipos', equiposSchema)
