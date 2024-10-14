import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"


//conection and listeners
const PORT = process.env.PORT || 3000
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log("SERVER OPEN & Connected to DB")
  })
}).catch((err) => {
  console.log(err)
})
