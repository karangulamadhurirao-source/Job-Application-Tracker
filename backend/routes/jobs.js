const express = require('express');
const supabase = require('../config/supabase');
const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase
    .from('job_applications').select('*').order('id', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post('/', async (req, res) => {
  const { company, role, status, notes } = req.body;
  if (!company || !role)
    return res.status(400).json({ error: 'Company and role are required' });
  const { data, error } = await supabase
    .from('job_applications').insert([{ company, role, status, notes }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

router.put('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('job_applications').update({ status: req.body.status })
    .eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('job_applications').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Deleted' });
});module.exports = router;