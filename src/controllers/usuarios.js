import Usuarios from '../models/usuarios.js'

export const signupHandler = async (req, res) => {
  try {
    const { username, email, password, imagen } = req.body

    // Creating a new User Object
    const newUser = new Usuarios({
      username,
      email,
      password,
      imagen
    })

    const savedUser = await newUser.save()

    return res.status(200).send(savedUser)
  } catch (error) {
    console.error(error)
    return res.status(400).send(error.message)
  }
}

export const signinHandler = async (req, res) => {
  try {
    const { email, password } = req.body

    const userFound = await Usuarios.findOne({ email })

    if (!userFound) return res.status(404).json({ message: 'User Not Found' })

    const matchPassword = await Usuarios.comparePassword(
      password,
      userFound.password
    )

    if (!matchPassword) {
      return res.status(401).json({
        message: 'Invalid Password'
      })
    }

    res.status(200).send(userFound)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
export async function getUsuarios (req, res) {
  try {
    const usuarios = await Usuarios.find()

    return res.status(200).send(usuarios)
  } catch (error) {
    console.error(error)
  }
}

export async function getUsuario (req, res) {
  try {
    const usuario = await Usuarios.findById(req.params.id)

    return res.status(200).send(usuario)
  } catch (error) {
    console.error(error)
  }
}

export async function updateUsuario (req, res) {
  try {
    const user = await Usuarios.findByIdAndUpdate(req.params.id, req.body, { new: true })

    return res.status(200).send(user)
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}
