import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { EmployeeComponent } from './employee.component';
import { NewemployeeComponent } from './newemployee/newemployee.component';
import {EmpResloveService} from './empresloveservice.service';

const routes: Routes = 
[
  {
    path: '', redirectTo: 'emp', pathMatch: 'full'
  },

  {
    //object key=emplist and value =EmpResloveService
    path: 'emp',
    children:
      [
        {
          path:'', component: EmployeeComponent,
        },
        {

          path: 'newemp', component: NewemployeeComponent

        },
        {

          path: 'viewemp/:id', component: NewemployeeComponent,
          resolve:{emplist:EmpResloveService}
        },

        {

          path: 'editemp/:id', component: NewemployeeComponent,
          resolve:{emplist:EmpResloveService}


        }

      

      ]
  },

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class EmployeeRoutingModule {
  constructor() {
    console.log("Employee Routing Module Loaded...");
  }
}