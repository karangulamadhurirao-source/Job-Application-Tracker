create table if not exists jobs (
  id bigint generated always as identity primary key,
  company text not null,
  role text not null,
  status text not null default 'Applied',
  applied_date date default current_date,
  notes text,
  created_at timestamptz default now()
);