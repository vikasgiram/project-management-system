const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


const dotenv = require('dotenv');


const employeeRoutes = require('./routes/employeeRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const companyRoutes = require('./routes/companyRoutes');
const customerRoutes = require('./routes/customerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const taskSheetRoutes = require('./routes/taskSheetRoutes');
const taskRoutes = require('./routes/taskRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const designationRoutes = require('./routes/designationRoutes');
const actionRoutes = require('./routes/actionRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const serviceRoutes = require('./routes/serviceRoutes')
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// API routes here
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});


app.use('/api/employee', employeeRoutes);

app.use('/api', authRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/company', companyRoutes);

app.use('/api/customer', customerRoutes);

app.use('/api/project', projectRoutes);

app.use('/api/tasksheet', taskSheetRoutes);

app.use('/api/task', taskRoutes);

app.use('/api/designation',designationRoutes);

app.use('/api/department',departmentRoutes);

app.use('/api/action', actionRoutes);

app.use('/api/ticket', ticketRoutes);

app.use('/api/service', serviceRoutes);

app.use('/api/feedback', feedbackRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error:'+err.message });
  });

app.use('*', (req, res, next) => {
  res.status(404).json({ error: 'Page Not Found' });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back the React app.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html')); 
});

app.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging
  res.status(500).json({
    message: 'Something went wrong, please try again later.',
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));