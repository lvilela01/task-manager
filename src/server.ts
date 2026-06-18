import { app } from "./app";
import { env } from "./env";
import dotenv from 'dotenv'
dotenv.config()

const PORT = env.PORT

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
