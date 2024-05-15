import express, { Router } from "express";

const router: Router = express.Router();

export interface Student {
  name: string;
  age: number;
  grade: number;
}

const students: Student[] = [
  { name: "Alice", age: 20, grade: 75 },
  { name: "Bob", age: 22, grade: 85 },
  { name: "Charlie", age: 21, grade: 60 },
  { name: "David", age: 19, grade: 45 },
  { name: "Eve", age: 20, grade: 90 },
];

const filterPassedStudents = (students: Student[]): Student[] =>
  students.filter((student) => student.grade >= 50);

const getStudentNames = (students: Student[]): string[] =>
  students.map((student) => student.name);

const sortStudentsByGrade = (students: Student[]): Student[] =>
  students.slice().sort((a, b) => a.grade - b.grade);

const getAverageAge = (students: Student[]): number => {
  const totalAge = students.reduce((acc, student) => acc + student.age, 0);
  return totalAge / students.length;
};

router.get("/passed-students", (req, res) => {
  const passedStudents = filterPassedStudents(students);
  res.json(passedStudents);
});

router.get("/student-names", (req, res) => {
  const studentNames = getStudentNames(students);
  res.json(studentNames);
});

router.get("/sorted-students", (req, res) => {
  const sortedStudents = sortStudentsByGrade(students);
  res.json(sortedStudents);
});

router.get("/average-age", (req, res) => {
  const averageAge = getAverageAge(students);
  res.json(averageAge);
});

export default router;
