import dotenv from 'dotenv';
import express from 'express';
import './shared/container/index';
import {userRoutes} from "./modules/users/routes/user-routes";

dotenv.config()

const app = express();
app.use(express.json())

app.use(userRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server running in http://localhost:${3000}`))