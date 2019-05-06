import { Component, OnInit } from '@angular/core';
import { Empmodel } from '../empmodel.model';
import { EmpserviceService } from '../empservice.service';
import { FormGroup, FormControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.css'],
  providers: [EmpserviceService]
})
export class NewemployeeComponent implements OnInit
 {
  backbttnhide: boolean;
  urlpath: any = '';
  employeeform: FormGroup;
   newemp: Empmodel ={};
   emp: Empmodel[] = [{}];
  statusCode: string = '';
  submitted: boolean = false;
  selectedemp: Empmodel = {};
  setbutton: any;
  employeeid: any;
  isReadOnly: boolean = false;
  isButtonhide: boolean;
  urlid: any = '';
  emptyarray:Empmodel={};
  isvalid:boolean;
  

  educationlist=[
  {
    'id':1,
    'code':"BBA"
  },
  {
    'id':2,
    'code':"MCA"

  },
  {
    'id':3,
    'code':"PG"
  },
  {
    'id':4,
    'code':"Diploma"
  },
]

genderList = [{ value: 1, text: "Male", selected: "checked" }, { value: 2, text: "Female", selected: "" }];
  


  constructor(private formbuilder: FormBuilder, private router: Router, private empservice: EmpserviceService,
    private activatedroute: ActivatedRoute) {

  }

  createempform() {

    this.employeeform = this.formbuilder.group(
      {
        name: ['',Validators.required],
        city: [''],
        designation: [''],
        salary: [''],
        education:[''],
        gender:[''],
        doj:[''],
        created_at: [''],
        updated_at: [''],
        _id: ['']

      });
      console.log(this.employeeform);
     
  }
  

  get f() { return this.employeeform.controls; }



  saveOrUpdate(employeeform): void 
  {
    debugger; 
    
    this.submitted = true;
    let formdata = employeeform.getRawValue();
    this.newemp = formdata;

    if (this.employeeform.invalid) {
      return;
    }

    else {
      this.empservice.saveallemp(this.newemp).subscribe(
        (data: any) => {
         
          console.log(data);
          this.statusCode = "200";
          this.router.navigate(['emp']);
        }
      )
    }
    this.employeeform.reset();
  }


  update(employeeform): void 
  {
     console.log(employeeform);
    this.urlid = this.activatedroute.snapshot.url[1].path;
    this.empservice.updateempdetails(this.newemp, this.urlid).subscribe(
      (data: any) => 
      {
        console.log(data);
        this.router.navigate(['emp']);
      })
  }

  buttonvalue(): void 
  {

    if (this.setbutton === 'Update')
    {
     
      this.update(this.employeeform);
    }
    if (this.setbutton === 'Save') {
      debugger;
      this.saveOrUpdate(this.employeeform);
    }


  }



  getparams(employeeid): void
   {
    this.newemp = this.activatedroute.snapshot.data['emplist'];
    

    this.empservice.getemployeedetailsbyid(employeeid).subscribe(
      (data: any) => 
      {
        
        console.log('fetched data' + data);
        this.newemp =data

     })
     this.setvalue();
  }


  
  
  setvalue():void
  {
      this.employeeform.setValue({
         
      name:this.newemp.name,
      city: this.newemp.city,
      designation:this.newemp.designation,
      salary:this.newemp.salary,
      education:this.newemp.education,
      gender:this.newemp.gender,
      doj:this.newemp.doj

    })
      console.log(name);
  }



  back(): void 
  {
    this.router.navigate(['emp']);
  }

  ngOnInit()
   {
    
    this.createempform();
 
    this.isButtonhide = false;
    this.backbttnhide = true;

    console.log(this.router.url);
    console.log(this.activatedroute.snapshot.url); // array of states

    this.urlpath = this.activatedroute.snapshot.url[0].path;
    console.log(this.urlpath);

   
    this.activatedroute.params.subscribe((params: Params) => 
    {
       if (this.activatedroute.snapshot.params['id']) 
       {
        this.setbutton = 'Update';
        }

      else {
        this.setbutton = 'Save';
      }


      this.employeeid = params['id'];
      console.log('selected id' + this.employeeid);
      this.getparams(this.employeeid);

      if (this.urlpath === "viewemp" ) 
      {
        this.isButtonhide = true;
        this.isReadOnly = true;
        this.backbttnhide = false;
      }
      if (this.urlpath === "newemp" || this.urlpath=="editemp") 
      {
        this.isvalid=true;  
        if(this.urlpath=="editemp")
        {
          
          this.setvalue();
        }
       
      }

     })
    
  }

}

