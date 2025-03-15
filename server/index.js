import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import groupRoutes from "./routes/groups.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/task.js";
import messageRoutes from "./routes/message.js";
import {register} from "./controllers/auth.js";
import {createGroup} from "./controllers/groups.js";
import { verifyToken } from "./middleware/auth.js";
import {createProject} from "./controllers/projects.js"
import { createTask } from "./controllers/tasks.js";
import Message from "./models/Message.js";
import { createServer } from "http";
import { Server } from "socket.io";



/* Configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();




app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* Socket.io */
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

/* File Storage */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const upload = multer({ storage});

/* Routes With Files */
app.post("/auth/register", upload.single("picture"), register);
app.post("/groups",verifyToken ,createGroup);
app.post("/projects",verifyToken ,createProject);
app.post("/tasks",verifyToken ,createTask);
/* Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/groups",groupRoutes);
app.use("/projects",projectRoutes);
app.use("/tasks",taskRoutes);
app.use("/message",messageRoutes);

/* Mongoose Database Setup */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT,() => console.log(`Server Port: ${PORT}`));
    /*Group.insertMany(groups);*/
    /*Project.insertMany(projects);*/

}).catch((error) => console.log(`${error} did not connect`));

/* Socket.io */
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    socket.on('join', (projectId) => {
      socket.join(projectId);
    });
  
    socket.on('leave', (projectId) => {
      socket.leave(projectId);
    });
  
    socket.on('message', async (data) => {
      try {
        const message = await Message.create(data);
        io.to(data.project).emit('message', message);
      } catch (err) {
        console.error(err);
      }
    });
  
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

// Start the server
httpServer.listen(3002, () => {
    console.log('Server listening on port 3002');
  });
  
