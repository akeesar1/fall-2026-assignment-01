import * as fs from "fs";
import * as path from "path";

export type Gradebook = {
  [studentName: string]: {
    [subject: string]: number;
  };
};

export function calculateSubjectAverage(subject: string): number {
  const filePath = path.join(process.cwd(), "data", "gradebook.json");
  const fileContents = fs.readFileSync(filePath, "utf-8");
  const gradebook: Gradebook = JSON.parse(fileContents);

  const grades = Object.values(gradebook)
    .map((student) => student[subject])
    .filter((grade): grade is number => grade !== undefined);

  if (grades.length === 0) {
    return 0;
  }

  return grades.reduce((total, grade) => total + grade, 0) / grades.length;
}
