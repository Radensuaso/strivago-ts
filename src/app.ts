import express from "express"; // import express from express
import cors from "cors"; // will enable the frontend to communicate with the backend
import {
  badRequestHandler,
  unauthorizedHandler,
  forbiddenHandler,
  notFoundHandler,
  conflictHandler,
  genericServerErrorHandler,
} from "./errorHandlers.js";
import usersRouter from "./services/users/index.js";
import accommodationsRouter from "./services/accommodations/index.js";

const app = express(); //our server function initialized with express()

//=========== GLOBAL MIDDLEWARES ======================
app.use(cors());
app.use(express.json()); // this will enable reading of the bodies of requests, THIS HAS TO BE BEFORE server.use("/authors", authorsRouter)

// ========== ROUTES =======================
app.use("/users", usersRouter);
app.use("/accommodations", accommodationsRouter);
// ============== ERROR HANDLING ==============

app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(forbiddenHandler);
app.use(notFoundHandler);
app.use(conflictHandler);
app.use(genericServerErrorHandler);

export default app;
