
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
//import {NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';

//import { DatePickerModule } from 'date-picker-directive';
import { NgModule } from '@angular/core';
import {EmployeeComponent} from './employee.component';
import {EmployeeRoutingModule} from './emp-routing.module';
import {CommonModule} from '@angular/common';
import {EmpserviceService} from './empservice.service';
import {HttpClientModule} from '@angular/common/http';
import { SearchPipe } from './search.pipe';
import { NewemployeeComponent } from './newemployee/newemployee.component';
import { ColorDirective } from './color.directive';

import {EmpResloveService} from './empresloveservice.service';
import { SortingPipe } from './sorting.pipe';


@NgModule({
   
    declarations: 
    [
        EmployeeComponent,
        SearchPipe,
        NewemployeeComponent,
        ColorDirective,
        SortingPipe
      
      
       
    ],
    imports: [
        CommonModule,
        DateValueAccessorModule,
        //NgbModule,
        //NgbInputDatepicker, 
      
        //DatePickerModule,
        FormsModule,
        ReactiveFormsModule,
        EmployeeRoutingModule,
        HttpClientModule
    ],
    providers:[EmpResloveService,EmpserviceService]
    //providers: [Employeedetailsauthservice,Authentication]
})

export class EmployeeModule{

}