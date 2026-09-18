-- Add school safety fields to an existing school_submissions table.
-- Run once in the Supabase SQL Editor.

alter table public.school_submissions
  add column if not exists fire_hoses integer not null default 0,
  add column if not exists water_tanks integer not null default 0,
  add column if not exists water_tanks_status text not null default 'صالح',
  add column if not exists fire_hydrants integer not null default 0;

alter table public.school_submissions
  drop constraint if exists school_submissions_fire_hoses_check,
  drop constraint if exists school_submissions_water_tanks_check,
  drop constraint if exists school_submissions_water_tanks_status_check,
  drop constraint if exists school_submissions_fire_hydrants_check;

alter table public.school_submissions
  add constraint school_submissions_fire_hoses_check check (fire_hoses >= 0),
  add constraint school_submissions_water_tanks_check check (water_tanks >= 0),
  add constraint school_submissions_water_tanks_status_check check (water_tanks_status in ('صالح', 'غير صالح')),
  add constraint school_submissions_fire_hydrants_check check (fire_hydrants >= 0);
