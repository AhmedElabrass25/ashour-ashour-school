import type { StudentRow } from "../../types";
import { getLevelGroups, StudentFieldsGroupCard } from "./StudentFieldsGroupCard";

type StudentFieldsProps = {
  rows: StudentRow[];
  updateRow: (
    index: number,
    key: "students" | "classes",
    value: string,
  ) => void;
};

export function StudentFields({ rows, updateRow }: StudentFieldsProps) {
  const groups = getLevelGroups(rows);

  return (
    <div className="w-full flex flex-col gap-4">
      {groups.map((group) => (
        <StudentFieldsGroupCard key={group.level} group={group} updateRow={updateRow} />
      ))}
    </div>
  );
}
