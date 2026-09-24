import type { StudentRow } from "../../types";
import { getLevelGroups, StudentRowCard } from "./StudentRowCard";

type StudentRowsEditorProps = {
  rows: StudentRow[];
  onChange: (rows: StudentRow[]) => void;
};

export function StudentRowsEditor({ rows, onChange }: StudentRowsEditorProps) {
  const update = (
    index: number,
    key: "students" | "classes",
    value: string,
  ) => {
    const targetLevel = rows[index]?.level;
    onChange(
      rows.map((row, rowIndex) => {
        if (key === "classes" && targetLevel && row.level === targetLevel) {
          return { ...row, classes: value };
        }
        if (rowIndex === index) {
          return { ...row, [key]: value };
        }
        return row;
      }),
    );
  };

  const groups = getLevelGroups(rows);

  return (
    <div className="w-full flex flex-col gap-3">
      {groups.map((group) => (
        <StudentRowCard key={group.level} group={group} onUpdate={update} />
      ))}
    </div>
  );
}
