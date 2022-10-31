import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const usuariosSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    imagen: {
      type: String,
      default: ''
    },
    puntos: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

usuariosSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

usuariosSchema.statics.comparePassword = async (password, candidatePassword) => {
  return await bcrypt.compare(password, candidatePassword)
}

usuariosSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }
  const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
  next()
})

export default mongoose.model('Usuarios', usuariosSchema)
