-- Fake test data for school_submissions.
-- Run this file in Supabase SQL Editor after supabase-schema.sql.

insert into public.school_submissions (
  school_name,
  school_code,
  school_type,
  area,
  shift,
  available_spaces,
  principal_name,
  principal_code,
  principal_national_id,
  principal_phone,
  principal_type,
  deputy_name,
  deputy_code,
  deputy_national_id,
  deputy_phone,
  deputy_type,
  students,
  status
) values
(
  'مدرسة النور الإعدادية', 'SCH-001', 'إعدادي', 'حضر', 'صباحية', 4,
  'أحمد محمد علي', 'PR-001', '29001011234567', '01012345678', 'أصلي',
  'محمود حسن إبراهيم', 'DV-001', '29102021234568', '01123456789', 'مكلف',
  '[
    {"level":"الصف الأول الإعدادي","gender":"بنين","students":"180","classes":"5"},
    {"level":"الصف الأول الإعدادي","gender":"بنات","students":"165","classes":"5"},
    {"level":"الصف الثاني الإعدادي","gender":"بنين","students":"150","classes":"4"},
    {"level":"الصف الثاني الإعدادي","gender":"بنات","students":"145","classes":"4"},
    {"level":"الصف الثالث الإعدادي","gender":"بنين","students":"130","classes":"4"},
    {"level":"الصف الثالث الإعدادي","gender":"بنات","students":"125","classes":"4"}
  ]'::jsonb,
  'مكتمل'
),
(
  'مدرسة السلام للتعليم الأساسي', 'SCH-002', 'تعليم أساسي', 'ريف', 'ممتدة', 7,
  'منى السيد إبراهيم', 'PR-002', '28803031234569', '01023456789', 'مكلف',
  'خالد محمود حسن', 'DV-002', '28904041234560', '01234567890', 'أصلي',
  '[
    {"level":"الصف الأول الإعدادي","gender":"بنين","students":"210","classes":"6"},
    {"level":"الصف الأول الإعدادي","gender":"بنات","students":"198","classes":"6"},
    {"level":"الصف الثاني الإعدادي","gender":"بنين","students":"190","classes":"5"},
    {"level":"الصف الثاني الإعدادي","gender":"بنات","students":"184","classes":"5"},
    {"level":"الصف الثالث الإعدادي","gender":"بنين","students":"175","classes":"5"},
    {"level":"الصف الثالث الإعدادي","gender":"بنات","students":"169","classes":"5"}
  ]'::jsonb,
  'مراجعة'
),
(
  'مدرسة المستقبل الرسمية', 'SCH-003', 'متعدد المراحل', 'حضر', 'يوم كامل', 12,
  'خالد حسن عبد الله', 'PR-003', '28705051234561', '01134567890', 'أصلي',
  'سارة أحمد محمود', 'DV-003', '29006061234562', '01045678901', 'أصلي',
  '[
    {"level":"الصف الأول الإعدادي","gender":"بنين","students":"250","classes":"7"},
    {"level":"الصف الأول الإعدادي","gender":"بنات","students":"240","classes":"7"},
    {"level":"الصف الثاني الإعدادي","gender":"بنين","students":"225","classes":"6"},
    {"level":"الصف الثاني الإعدادي","gender":"بنات","students":"218","classes":"6"},
    {"level":"الصف الثالث الإعدادي","gender":"بنين","students":"205","classes":"6"},
    {"level":"الصف الثالث الإعدادي","gender":"بنات","students":"198","classes":"6"}
  ]'::jsonb,
  'مكتمل'
),
(
  'مدرسة الأمل الإعدادية', 'SCH-004', 'إعدادي', 'ريف', 'مسائية', 3,
  'يوسف سمير عادل', 'PR-004', '28607071234563', '01256789012', 'مكلف',
  'عمر نبيل سالم', 'DV-004', '28908081234564', '01167890123', 'مكلف',
  '[
    {"level":"الصف الأول الإعدادي","gender":"بنين","students":"120","classes":"3"},
    {"level":"الصف الأول الإعدادي","gender":"بنات","students":"115","classes":"3"},
    {"level":"الصف الثاني الإعدادي","gender":"بنين","students":"108","classes":"3"},
    {"level":"الصف الثاني الإعدادي","gender":"بنات","students":"102","classes":"3"},
    {"level":"الصف الثالث الإعدادي","gender":"بنين","students":"96","classes":"3"},
    {"level":"الصف الثالث الإعدادي","gender":"بنات","students":"90","classes":"3"}
  ]'::jsonb,
  'مراجعة'
),
(
  'مدرسة المعرفة الحديثة', 'SCH-005', 'تعليم أساسي', 'حضر', 'صباحية', 9,
  'هبة علي حسن', 'PR-005', '29109091234565', '01078901234', 'أصلي',
  'إيهاب محمد سامي', 'DV-005', '28810101234566', '01289012345', 'أصلي',
  '[
    {"level":"الصف الأول الإعدادي","gender":"بنين","students":"160","classes":"4"},
    {"level":"الصف الأول الإعدادي","gender":"بنات","students":"155","classes":"4"},
    {"level":"الصف الثاني الإعدادي","gender":"بنين","students":"148","classes":"4"},
    {"level":"الصف الثاني الإعدادي","gender":"بنات","students":"142","classes":"4"},
    {"level":"الصف الثالث الإعدادي","gender":"بنين","students":"135","classes":"4"},
    {"level":"الصف الثالث الإعدادي","gender":"بنات","students":"129","classes":"4"}
  ]'::jsonb,
  'مكتمل'
);

-- Check the inserted fake rows.
select id, school_name, school_type, area, shift, status
from public.school_submissions
order by created_at desc;
