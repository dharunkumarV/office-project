import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StudentService } from '../../services/student';
import { FormsModule } from '@angular/forms';

interface Student {
  name: string;
  age: number;
  email: string;
  city: string;
  phones: string[];
}

@Component({
  selector: 'app-table',
  imports: [FormsModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table implements OnInit {
  students: Student[] = [];
  searchTerm: string = '';

  constructor(
    private studentService: StudentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
  }

  get filteredStudents(): Student[] {
    if (!this.searchTerm.trim()) {
      return this.students;
    }
    return this.students.filter(student =>
      student.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  add() {
    this.router.navigate(['/form']);
  }

  edit(index: number) {
    this.router.navigate(['/form'], { queryParams: { index: index } });
  }

  delete(index: number) {
    if (confirm('Do you want to delete this student?')) {
      this.studentService.deleteStudent(index);
    }
  }
}