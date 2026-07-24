import { Routes } from '@angular/router';
import { Table } from './table/table';
import { Form } from './form/form';


export const routes: Routes = [
  {
    path:'',
    component:Table
  },

  {
    path:'form',
    component:Form
  }
];