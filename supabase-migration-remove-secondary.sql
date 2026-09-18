-- Remove secondary-grade rows from existing school submissions.
-- Run once in the Supabase SQL Editor.

update public.school_submissions as school
set students = cleaned.students
from (
  select
    school_row.id,
    coalesce(
      jsonb_agg(student_row.value order by student_row.ordinality)
        filter (
          where coalesce(student_row.value->>'level', '') not ilike '%ثانوي%'
        ),
      '[]'::jsonb
    ) as students
  from public.school_submissions as school_row
  cross join lateral jsonb_array_elements(school_row.students)
    with ordinality as student_row(value, ordinality)
  group by school_row.id
) as cleaned
where school.id = cleaned.id;
