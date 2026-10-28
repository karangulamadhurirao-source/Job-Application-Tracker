require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jobsRouter = require('./routes/jobs');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/jobs', jobsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));