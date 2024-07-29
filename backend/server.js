const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

const dotenv = require('dotenv');

const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');
const customerRoutes = require('./routes/customerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api', employeeRoutes);

app.use('/api', authRoutes);

app.use('/api', adminRoutes);

app.use('/api', companyRoutes);

app.use('/api', customerRoutes);

app.use('/api', projectRoutes);

app.use('/api', taskRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error'+err.message });
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
