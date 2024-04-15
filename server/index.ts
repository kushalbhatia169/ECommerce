import bodyParser from 'body-parser';
import express from 'express';
import cookieParser from "cookie-parser";
import helmet from 'helmet';
import cors from 'cors';
import { connectToDatabase, disconnectFromDatabase } from './db';
import router from './routes/routes';

const app = express();
const port = 3000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use('/posts', router);

async function startApplication() {
  try {
    await connectToDatabase();
    // Application logic here
    app.listen(port, () => {
      return console.log(`Express is listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    // Gracefully handle the failure to connect to the database
    process.exit(1); // Exit the application with a non-zero status code
  }
}

startApplication().catch(console.error);

// Optionally, handle graceful shutdown
process.on('SIGINT', async () => {
  console.log("Received SIGINT signal. Shutting down gracefully...");
  await disconnectFromDatabase();
  process.exit(0); // Exit the application with a success status code
});
