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

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save()

    return res.status(200).json({ savedUser })
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const signinHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await Usuarios.findOne({ email: req.body.email }).populate(
      'roles'
    )

    if (!userFound) return res.status(400).json({ message: 'User Not Found' })

    const matchPassword = await Usuarios.comparePassword(
      req.body.password,
      userFound.password
    )

    if (!matchPassword) {
      return res.status(401).json({
        message: 'Invalid Password'
      })
    }

    res.json({ userFound })
  } catch (error) {
    console.log(error)
  }
}
