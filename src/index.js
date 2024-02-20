import app from "./app.js"
import { PORT } from "./config.js"

//Crear servidor y escuchar peticiones http
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})