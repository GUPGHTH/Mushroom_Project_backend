import 'dotenv/config';
import app from './app.js';
import prisma from './config/db.js';

const PORT = process.env.PORT || 5000;

const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

const startServer = async () => {
  await testDatabaseConnection();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();