const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function apiError(response: Response, fallback: string) {
  const raw = await response.text();
  try {
    const body = JSON.parse(raw) as { code?: string; message?: string };
    if (body.code === "PGRST205") {
      return new Error(
        "جدول school_submissions غير موجود. شغّل ملف supabase-schema.sql في Supabase SQL Editor ثم أعد المحاولة.",
      );
    }
    return new Error(`Supabase: ${body.message || raw || fallback}`);
  } catch {
    return new Error(`Supabase: ${raw || fallback}`);
  }
}

export const supabase =
  supabaseUrl && supabaseKey
    ? {
        listSubmissions: async () => {
          const response = await fetch(
            `${supabaseUrl}/rest/v1/school_submissions?select=*&order=created_at.desc`,
            {
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
              },
            },
          );
          if (!response.ok)
            return {
              data: null,
              error: await apiError(response, "تعذر تحميل بيانات المدارس"),
            };
          return {
            data: (await response.json()) as Record<string, unknown>[],
            error: null,
          };
        },
        insertSubmission: async (submission: Record<string, unknown>) => {
          const response = await fetch(
            `${supabaseUrl}/rest/v1/school_submissions`,
            {
              method: "POST",
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
              },
              body: JSON.stringify(submission),
            },
          );
          if (response.ok) return { error: null };
          return {
            error: await apiError(response, "تعذر حفظ البيانات في Supabase"),
          };
        },
        updateSubmission: async (
          id: number,
          changes: Record<string, unknown>,
        ) => {
          const response = await fetch(
            `${supabaseUrl}/rest/v1/school_submissions?id=eq.${id}`,
            {
              method: "PATCH",
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                "Content-Type": "application/json",
                Prefer: "return=minimal",
              },
              body: JSON.stringify(changes),
            },
          );
          return {
            error: response.ok
              ? null
              : new Error("تعذر تحديث بيانات المدرسة في Supabase"),
          };
        },
        deleteSubmission: async (id: number) => {
          const response = await fetch(
            `${supabaseUrl}/rest/v1/school_submissions?id=eq.${id}`,
            {
              method: "DELETE",
              headers: {
                apikey: supabaseKey,
                Authorization: `Bearer ${supabaseKey}`,
                Prefer: "return=minimal",
              },
            },
          );
          return {
            error: response.ok
              ? null
              : new Error("تعذر حذف المدرسة من Supabase"),
          };
        },
      }
    : null;
