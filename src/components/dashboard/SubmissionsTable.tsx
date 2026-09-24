import type { Submission } from "../../types";
import { DesktopSubmissionsTable } from "./DesktopSubmissionsTable";
import { MobileSubmissionsCards } from "./MobileSubmissionsCards";

type SubmissionsTableProps = {
  submissions: Submission[];
  onOpen: (item: Submission) => void;
};

export function SubmissionsTable({ submissions, onOpen }: SubmissionsTableProps) {
  return (
    <>
      <DesktopSubmissionsTable submissions={submissions} onOpen={onOpen} />
      <MobileSubmissionsCards submissions={submissions} onOpen={onOpen} />
    </>
  );
}
