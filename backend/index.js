require('dotenv').config();
const express = require("express");
const dbConnect = require('./config/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express();

dbConnect()
app.use(cors({ origin: '*', methods: 'GET, PUT, PATCH, POST, DELETE' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());


//Import and use routes
const authRoutes = require('./src/routes/authRoutes')
const userRoutes = require('./src/routes/userRoutes')
const depoRoutes = require('./src/routes/depoRoutes')
const regionRoutes = require('./src/routes/regionRoutes')
const ownerRoutes = require('./src/routes/ownerRoute')
const vagonTypeRoutes = require('./src/routes/vagonTypeRoute')
const repairTypeRoutes = require('./src/routes/repairTypeRoute')
const vagonRoutes = require('./src/routes/vagonRoute')

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/depo', depoRoutes)
app.use('/region', regionRoutes)
app.use('/owner', ownerRoutes)
app.use('/vagon', vagonRoutes)
app.use('/vagon-type', vagonTypeRoutes)
app.use('/repair-type', repairTypeRoutes)

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'none'; font-src 'self' data:;"
  );
  next();
});

const PORT = process.env.PORT || 3000;
  
 app.listen(PORT, async () => {
   console.log(`Server is running on port ${PORT}`);
 });
