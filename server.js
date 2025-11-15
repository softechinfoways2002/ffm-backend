require('dotenv').config();
const cors = require('cors');
const app = require('./src/app');
const connectToDb = require('./src/database/db');

//  Connect to Database
connectToDb();

//  Enable CORS Middleware
app.use(cors({
  origin: '*', // You can restrict this to specific domains later if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

//  Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Server is running on port: ${PORT}`);
});
