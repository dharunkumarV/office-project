import { Component } from '@angular/core';
import { Inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student';

interface Student {
  name: string;
  age: number;
  email: string;
  city: string;
  phones: string[];
}

function nameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value && value.length < 3) {
    return { nameLength: true };
  }
  return null;
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  editIndex = -1;
  private fb: FormBuilder;
  private studentService: StudentService;
  private router: Router;
  private route: ActivatedRoute;

  studentForm: any;

  constructor(
    fb: FormBuilder,
    studentService: StudentService,
    router: Router,
    route: ActivatedRoute
  ) {
    this.fb = fb;
    this.studentService = studentService;
    this.router = router;
    this.route = route;

    this.studentForm = this.fb.group({
    name: ['', [Validators.required, nameValidator]],
    age: ['', [Validators.required, Validators.min(1)]],
    email: ['', [Validators.required, Validators.email]],
    city: ['', Validators.required],
      phones: this.fb.array([])
    });

    const index = this.route.snapshot.queryParams['index'];
    if (index !== undefined) {
      this.editIndex = Number(index);
      const student = this.studentService.getStudent(this.editIndex);
      if (student) {
        this.studentForm.patchValue({
          name: student.name,
          age: student.age,
          email: student.email,
          city: student.city
        });
        student.phones.forEach((phone: string) => {
          this.phones.push(this.fb.control(phone));
        });
      }
    }
  }

  get phones() {
    return this.studentForm.get('phones') as FormArray;
  }

  addPhone() {
    this.phones.push(this.fb.control(''));
  }

  submit() {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
      return;
    }
    const formValue = this.studentForm.value;
    const student: Student = {
      name: formValue.name,
      age: parseInt(formValue.age, 10),
      email: formValue.email,
      city: formValue.city,
      phones: formValue.phones
    };
    if (this.editIndex === -1) {
      this.studentService.addStudent(student);
    } else {
      this.studentService.updateStudent(this.editIndex, student);
    }
    this.router.navigate(['/']);
  }
}