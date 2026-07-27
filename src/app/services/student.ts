import { Injectable } from '@angular/core';

interface Student {
  name: string;
  age: number;
  email: string;
  city: string;
  phones: string[];
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student[] = [];

  getStudents() {
    return this.students;
  }

  addStudent(student: Student) {
    this.students.push(student);
  }

  getStudent(index: number) {
    return this.students[index];
  }

  updateStudent(index: number, student: Student) {
    this.students[index] = student;
  }

  deleteStudent(index: number) {
    this.students.splice(index, 1);
  }
}