import type { StudentRow, Submission } from "../types";

export const initialRows: StudentRow[] = [
  ...["الأول", "الثاني", "الثالث"].flatMap((grade) => [
    {
      level: `الصف ${grade} الإعدادي`,
      gender: "بنين",
      students: "",
      classes: "",
    },
    {
      level: `الصف ${grade} الإعدادي`,
      gender: "بنات",
      students: "",
      classes: "",
    },
  ]),
];

export const sampleSubmissions: Submission[] = [
  {
    id: 1,
    schoolName: "مدرسة النور الإعدادية",
    schoolType: "إعدادي",
    area: "حضر",
    shift: "صباحية",
    principal: "أحمد محمد علي",
    students: 486,
    classes: 14,
    status: "مكتمل",
  },
  {
    id: 2,
    schoolName: "مدرسة السلام للتعليم الأساسي",
    schoolType: "تعليم أساسي",
    area: "ريف",
    shift: "ممتدة",
    principal: "منى السيد",
    students: 732,
    classes: 21,
    status: "مكتمل",
  },
  {
    id: 3,
    schoolName: "مدرسة المستقبل الرسمية",
    schoolType: "متعدد المراحل",
    area: "حضر",
    shift: "يوم كامل",
    principal: "خالد حسن",
    students: 958,
    classes: 28,
    status: "مراجعة",
  },
];
