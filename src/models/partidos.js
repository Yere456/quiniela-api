import mongoose, { Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

const partidosSchema = new mongoose.Schema(
  {
    equipoLocal: {
      type: Schema.Types.ObjectId,
      ref: 'Equipos',
      autopopulate: true
    },
    equipoVisita: {
      type: Schema.Types.ObjectId,
      ref: 'Equipos',
      autopopulate: true
    },
    golesLocal: {
      type: Number,
      default: 0
    },
    golesVisita: {
      type: Number,
      default: 0
    },
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)
partidosSchema.plugin(autopopulate)

partidosSchema.statics.updatePuntos = async () => {

}

partidosSchema.pre('update', async function (next) {
  next()
})

export default mongoose.model('Partidos', partidosSchema)
