import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Student {

  students:any[] = [];
  addStudent(student:any){

    this.students.push(student);

  }

  getStudents(){
    return this.students;
  }

  getStudent(index:any){

    return this.students[index];

  }

  updateStudent(index:any, student:any){

    this.students[index] = student;
  }
  deleteStudent(index:any){


    this.students.splice(index, 1);

  }
}