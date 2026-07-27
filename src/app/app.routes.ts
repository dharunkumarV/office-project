import { Routes } from '@angular/router';
import { Table } from './components/table/table';
import { Form } from './components/form/form';


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