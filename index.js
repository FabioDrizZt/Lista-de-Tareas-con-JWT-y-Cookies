const express = require('express')
const session = require('express-session') // Middleware para manejar sesiones
const cookieParser = require('cookie-parser') // Middleware para parsear cookies
const bodyParser = require('body-parser') // Middleware para parsear cuerpos de peticiones
const methodOverride = require('method-override') // Middleware para permitir otros métodos HTTP como PUT y DELETE
const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs') // Configura EJS como el motor de vistas

// Middleware para parsear cuerpos de peticiones en formato JSON
app.use(bodyParser.json())

// Middleware para parsear cuerpos de peticiones en formato URL-encoded (como formularios HTML)
app.use(bodyParser.urlencoded({ extended: true }))

// Middleware para parsear cookies
app.use(cookieParser())

// Middleware para manejar sesiones
app.use(
  session({
    secret: 'your_secret_key', // Clave secreta para firmar la sesión
    resave: false, // No volver a guardar la sesión si no ha sido modificada
    saveUninitialized: true, // Guardar una sesión no inicializada
  })
)

// Middleware para permitir otros métodos HTTP como PUT y DELETE usando un campo oculto "_method"
app.use(methodOverride('_method'))

let usuarios = [] // Simulated user database
let tareas = [] // Simulated task database

// Ruta para mostrar el formulario de registro
app.get('/register', (req, res) => {
  res.render('register')
})

// Ruta para manejar el registro de usuarios
app.post('/register', (req, res) => {
  const { username, password } = req.body
  if (usuarios.find((user) => user.username === username)) {
    return res.status(400).send('User already exists')
  }
  usuarios.push({ username, password })
  res.redirect('/login')
})

// Ruta para mostrar el formulario de inicio de sesión
app.get('/login', (req, res) => {
  res.render('login')
})

// Ruta para manejar el inicio de sesión de usuarios
app.post('/login', (req, res) => {
  const { username, password } = req.body
  const user = usuarios.find(
    (user) => user.username === username && user.password === password
  )
  if (!user) {
    return res.status(400).send('Invalid credentials')
  }
  req.session.user = user // Almacena el usuario en la sesión
  res.redirect('/tareas')
})

// Ruta para manejar el cierre de sesión de usuarios
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    // Destruye la sesión
    if (err) {
      return res.status(500).send('Failed to logout')
    }
    res.redirect('/login')
  })
})

// Ruta para mostrar las tareas (solo si el usuario está autenticado)
app.get('/tareas', (req, res) => {
  if (!req.session.user) {
    // Verifica si el usuario está autenticado
    return res.redirect('/login')
  }
  const userTasks = tareas.filter(
    (task) => task.username === req.session.user.username
  )
  res.render('tareas', { tareas: userTasks })
})

// Ruta para manejar la creación de nuevas tareas (solo si el usuario está autenticado)
app.post('/tareas', (req, res) => {
  if (!req.session.user) {
    // Verifica si el usuario está autenticado
    return res.redirect('/login')
  }
  const { descripcion } = req.body
  tareas.push({
    id: tareas.length + 1,
    username: req.session.user.username,
    descripcion,
  })
  res.redirect('/tareas')
})

// Ruta para manejar la eliminación de tareas (solo si el usuario está autenticado)
app.delete('/tareas/:id', (req, res) => {
  if (!req.session.user) {
    // Verifica si el usuario está autenticado
    return res.redirect('/login')
  }
  const taskId = parseInt(req.params.id, 10)
  tareas = tareas.filter(
    (task) => task.id !== taskId || task.username !== req.session.user.username
  )
  res.redirect('/tareas')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/register`)
})
