import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Empmodel } from './empmodel.model';
import { EmpserviceService } from './empservice.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmpserviceService]
})
export class EmployeeComponent implements OnInit {

  isUpdate: string = '';
  filterdata: any;
  Empobject: Empmodel = {}
  emp: Empmodel[] = [{}];
  isDesc: boolean;
  selectedEmp: Empmodel = {}
  column: any;
  direction: any;
  sortingName: string = '';



constructor(private formbuilder: FormBuilder, private router: Router,
    private empservice: EmpserviceService, private activatedroute: ActivatedRoute)
   {}

  showallemp() 
  {
   
     //using resolve guards
    this.emp= this.activatedroute.snapshot.data['emplist'];
    this.empservice.detailemp().subscribe(
     (data: Empmodel[]) =>
     {

       console.log(data);
       this.emp = data;
     });
  }





  //to navigate on click of view button using htttpservice
  getviewdeatils(id: number): void {
    this.router.navigate(['emp/viewemp', id]);
  }


  edit(id: any): void 
  {
   this.isUpdate = "edit";
    this.router.navigate(['emp/editemp', id]);
  }


  getnavigate(): void
  {
     this.router.navigate(['emp/newemp']);
  }

  sort(property)
   {

    console.log(property);
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;

  };



  //to delete particular record 
  delete(data: any): void
   {
  

    let confirmMsg = confirm("Are you sure want to delete this record?");
    if (confirmMsg)
     {
      this.empservice.deletProductById(data).subscribe(
        (data: any) =>
         {
        
        
            this.showallemp();
           
        })
       
    }

  }

  ngOnInit()
 {
  
   this.showallemp();
   
 }

}





//using behviousub service
    /*this.empservice.detailemp$.subscribe(data=>
      {
        debugger;
         console.log("updated data-------------"+data);
         this.emp=data;
        
   }))*/

      /*this.employeeform.setValue({
      //empid:data.empid,
      name:data.name,
      city: data.city,
      designation:data.designation,
      empid:data.empid,
      _id:data._id
 
    }); */// new code. here u only need to bind the data to form using set value function