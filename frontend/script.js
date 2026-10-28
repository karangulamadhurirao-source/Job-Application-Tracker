
const API = 'https://job-application-tracker-xxxx.onrender.com/api/jobs';
const list = document.getElementById('job-list');
const msg = document.getElementById('message');

function show(text) {
  msg.textContent = text;
  setTimeout(() => (msg.textContent = ''), 2500);
}

async function loadJobs() {
  try {
    const res = await fetch(API);
    const jobs = await res.json();
    list.innerHTML = '';
    jobs.forEach(addCard);
  } catch (e) {
    show('Failed to load. Is backend running?');
  }
}

function addCard(job) {
  const card = document.createElement('div');
  card.className = 'card';

  const info = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = job.company + ' - ' + job.role;
  const notes = document.createElement('p');
  notes.textContent = job.notes || '';
  info.append(title, notes);
  const select = document.createElement('select');
  ['Applied', 'Interview', 'Offer', 'Rejected'].forEach(s => {
    const o = document.createElement('option');
    o.textContent = s;
    o.selected = s === job.status;
    select.appendChild(o);
  });
  select.onchange = async () => {
    await fetch(API + '/' + job.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: select.value })
    });
    show('Status updated');
  };

  const del = document.createElement('button');
  del.textContent = 'Delete';
  del.className = 'delete';
  del.onclick = async () => {
    await fetch(API + '/' + job.id, { method: 'DELETE' });
    show('Deleted');
    loadJobs();
  };

  const actions = document.createElement('div');
  actions.className = 'actions';
  actions.append(select, del);
  card.append(info, actions);
  list.appendChild(card);
}

document.getElementById('job-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const body = {
    company: document.getElementById('company').value,
    role: document.getElementById('role').value,
    status: document.getElementById('status').value,
    notes: document.getElementById('notes').value
  };
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (res.ok) {
    show('Job added');
    e.target.reset();
    loadJobs();
  } else {
    show('Error adding job');
  }
});

loadJobs();
