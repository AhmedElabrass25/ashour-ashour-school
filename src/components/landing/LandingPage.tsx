import { useNavigate } from "react-router-dom";
import type { Submission } from "../../types";
import { LandingHeader } from "./LandingHeader";
import { LandingAbout, LandingHero } from "./LandingHeroAbout";
import { LandingFeatures, LandingSafety } from "./LandingFeaturesSafety";
import { LandingFooter, LandingPreview } from "./LandingPreviewFooter";

import { ContactSection } from "../common/ContactSection";

type LandingPageProps = {
  submissions: Submission[];
};

export function LandingPage({ submissions }: LandingPageProps) {
  const navigate = useNavigate();
  const totalStudents = submissions.reduce((sum, item) => sum + item.students, 0);
  const totalClasses = submissions.reduce((sum, item) => {
    const cls = item.classes || 0;
    return sum + (cls > 100 ? Math.max(1, Math.round((item.students || 0) / 35)) : cls);
  }, 0);
  const reviewedSchools = submissions.filter((item) => item.status === "مكتمل").length;
  const pendingSchools = submissions.filter((item) => item.status !== "مكتمل").length;
  const totalTanks = submissions.reduce((sum, item) => sum + (item.waterTanks || 0), 0);
  const totalHydrants = submissions.reduce((sum, item) => sum + (item.fireHydrants || 0), 0);
  const totalHoses = submissions.reduce((sum, item) => sum + (item.fireHoses || 0), 0);

  const goToDashboard = () => navigate("/dashboard");

  return (
    <main className="min-h-screen overflow-hidden bg-slate-50 font-sans text-slate-900" dir="rtl">
      <LandingHeader onGoToDashboard={goToDashboard} />
      <LandingHero onGoToDashboard={goToDashboard} />
      <LandingAbout />
      <LandingFeatures />
      <LandingSafety totalTanks={totalTanks} totalHydrants={totalHydrants} totalHoses={totalHoses} />
      <LandingPreview onGoToDashboard={goToDashboard} />
      <ContactSection />
      <LandingFooter
        submissions={submissions}
        totalStudents={totalStudents}
        totalClasses={totalClasses}
        reviewedSchools={reviewedSchools}
        pendingSchools={pendingSchools}
        onGoToDashboard={goToDashboard}
      />
    </main>
  );
}
