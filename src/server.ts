import dotenv from "dotenv";
import app from "./app";
import sequelize from "./database";
import associateModels from "./models/associations";

dotenv.config();

const PORT: number | undefined = Number(process.env.PORT) || 80;

// Sync database and start server
const startServer = async () => {
  try {
    associateModels();
    await sequelize.sync(); // { force: true } for development only to drop and recreate tables
    console.log("Database & tables created!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start the server:", error);
  }
};

startServer();
