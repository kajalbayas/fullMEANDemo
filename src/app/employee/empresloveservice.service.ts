
import {Resolve,ActivatedRouteSnapshot,RouterStateSnapshot, Router} from '@angular/router';

import {Observable} from 'rxjs';
import {Empmodel} from './empmodel.model';
import {EmpserviceService} from './empservice.service';
import { Injectable } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';


@Injectable()
export class EmpResloveService implements Resolve<Empmodel[]>
{
   
  
    constructor(private emp_service:EmpserviceService,private router:Router)
    {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Empmodel[]>
    {
       
         console.log(route.params.id);
        return this.emp_service.getemployeedetailsbyid(route.params.id);
       
     
    }

   
}
