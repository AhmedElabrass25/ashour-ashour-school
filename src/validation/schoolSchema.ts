import { z } from "zod";

const optionalDigits = (length: number, message: string) =>
  z
    .string()
    .refine(
      (value) => value === "" || new RegExp(`^[0-9]{${length}}$`).test(value),
      message,
    );

export const schoolSchema = z.object({
  schoolName: z.string().trim().min(1, "اسم المدرسة مطلوب"),
  schoolCode: z.string().trim().min(1, "كود المدرسة مطلوب"),
  schoolType: z.string().min(1, "اختر نوع المدرسة"),
  area: z.string().min(1, "اختر النطاق الجغرافي"),
  shift: z.string().min(1, "اختر نظام الدراسة"),
  availableSpaces: z
    .string()
    .min(1, "عدد الفراغات مطلوب")
    .regex(/^\d+$/, "اكتب رقمًا صحيحًا"),
  fireHoses: z.string().regex(/^\d+$/, "اكتب عددًا صحيحًا"),
  waterTanks: z.string().regex(/^\d+$/, "اكتب عددًا صحيحًا"),
  waterTanksStatus: z.string().min(1, "حدد صلاحية خزانات المياه"),
  fireHydrants: z.string().regex(/^\d+$/, "اكتب عددًا صحيحًا"),
  principal: z.string().trim().min(1, "اسم المدير مطلوب"),
  principalCode: z.string().trim().min(1, "كود المدير مطلوب"),
  nationalId: z.string().regex(/^\d{14}$/, "الرقم القومي يجب أن يكون 14 رقمًا"),
  phone: z
    .string()
    .regex(/^01\d{9}$/, "رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقمًا"),
  principalType: z.string().min(1, "اختر طبيعة عمل المدير"),
  deputy: z.string().trim(),
  deputyCode: z.string().trim(),
  deputyNationalId: optionalDigits(
    14,
    "الرقم القومي للوكيل يجب أن يكون 14 رقمًا",
  ),
  deputyPhone: z
    .string()
    .refine(
      (value) => value === "" || /^01\d{9}$/.test(value),
      "رقم هاتف الوكيل غير صحيح",
    ),
  deputyType: z.string().min(1, "اختر طبيعة عمل الوكيل"),
});

export type SchoolFormValues = z.infer<typeof schoolSchema>;
