const express = require('express')
const { UsersRouter, ViewsRouter, SessionRouter } = require('./routers')
const { errorHandler } = require('./middlewares')
const cookieParser = require('cookie-parser')
const { engine } = require('express-handlebars')
const fileUpload = require('express-fileupload')

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(cookieParser())
app.use(express.json())
app.use(fileUpload());
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'))

app.use("/", ViewsRouter)
app.use("/users", UsersRouter)
app.use("/auth", SessionRouter)
// app.use("/books", BooksRouter)
// app.use("/purchases", PurchasesRouter)
// app.use("/auth", SessionsRouter)

/**
 * Error Handler
 */
app.use(errorHandler)


app.listen(PORT, console.log(`App running on port ${PORT}`))