import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Student } from '../student';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector:'app-form',
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl:'./form.html',
  styleUrl:'./form.css'
})
export class Form {

studentForm = new FormGroup({
  name: new FormControl(''),
  age: new FormControl(''),
  email: new FormControl(''),
  city: new FormControl(''),
});

errorMessage = '';
editIndex = -1;

constructor(
  private service: Student,
  private router: Router,
  private route: ActivatedRoute
) {
  const index = this.route.snapshot.queryParams['index'];
  if (index !== undefined) {
    this.editIndex = Number(index);
    const item = this.service.getStudent(this.editIndex);
    if (item) {
      this.studentForm.setValue({
        name: item.name,
        age: item.age,
        email: item.email,
        city: item.city,
      });
    }
  }
}

submit() {
  this.errorMessage = '';
  const student = this.studentForm.value as any;

  if (!student.name || !student.age || !student.email || !student.city) {
    this.errorMessage = 'Please fill all fields.';
    return;
  }

  if (Number(student.age) <= 0) {
    this.errorMessage = 'Age must be a positive number.';
    return;
  }

  if (student.email.indexOf('@') === -1) {
    this.errorMessage = 'Email must contain @.';
    return;
  }

  if (this.editIndex === -1) {
    this.service.addStudent(student);
  } else {
    this.service.updateStudent(this.editIndex, student);
  }

  this.router.navigate(['/']);
}
}
