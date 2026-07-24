import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Student } from '../student';


@Component({
  selector:'app-table',
  imports:[CommonModule],
  templateUrl:'./table.html',
  styleUrl:'./table.css'
})
export class Table {


students:any[]=[];


constructor(
 private student:Student,
 private router:Router
){


this.students=this.student.getStudents();

}

add(){

this.router.navigate(['/form']);

}

edit(index:any){

this.router.navigate(['/form'], { queryParams: { index: index } });

}
delete(index:any){

this.student.deleteStudent(index);

}
}