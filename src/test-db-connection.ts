// src/test-db-connection.ts
import { connectDB } from './models/db';

const testDBConnection = async () => {
  await connectDB();
};

testDBConnection();
