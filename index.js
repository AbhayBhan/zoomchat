import express from 'express';
import cors from 'cors';
import http from 'http';
import dt from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import {dirname} from 'path';
import {Server} from 'socket.io';
import userRoutes from './server/routes/userRoutes.js';
import {dbConnect} from './server/config/db.js'
import {errorHandler} from './server/middlewares/errorMiddleware.js'
const dotenv = dt.config();
import MSG from './server/models/messageModel.js';
const PORT = 8000;

const app = express();
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
dbConnect();

const io = new Server(server, {
    cors : {
        origin : `http://localhost:5173`,
        methods : ["GET","POST"]
    }
});

io.on('connection', (socket) => {
    socket.on('conn_made', async() => {
        const messages = await MSG.find();
        socket.emit('initload', {msg : messages});
    })

    socket.on('post', async(data) => {
        const message = await MSG.create(data);
        socket.broadcast.emit('updatemsg', message);
    })
});

app.use('/api/user', userRoutes);

app.use(errorHandler);

const __dirname = path.resolve();
if(process.env.NODE_ENV === "Production"){
    app.use(express.static(path.join(__dirname,'../client/dist')));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,"../","client","dist","index.html"));
    })
}else{
    app.get('/', (req,res) => {
        res.send('Running');
    })
}


server.listen(PORT, () => {
    console.log(`The Server is running on ${PORT}`);
});




