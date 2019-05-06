//import {HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map, catchError } from "rxjs/operators";
import { Empmodel } from './empmodel.model';
import 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'authkey',
        'userid': '1'
    })
};

@Injectable({
    providedIn: 'root'
})


export class EmpserviceService
 {

   //public _posts: BehaviorSubject<Empmodel []>;
   Appurl: string ="http://localhost:5000/api";
   //detailemp$:Observable<Empmodel[]>;
   //emp: Empmodel[] = [{}];
    
     constructor(private httpclient: HttpClient)
     { 
        
     }


     detailemp():Observable<any>
     {
        this.Appurl = "http://localhost:5000/api/empdetails";
        return this.httpclient.get(this.Appurl);
     }
  
     getemployeedetailsbyid(id: number):Observable<any>
     {
       
      
        this.Appurl = "http://localhost:5000/api/empdetailsbyid";
        return this.httpclient.get(this.Appurl + '/' + id);
       
      }
   
      saveallemp(emp: Empmodel): Observable<any> {
        this.Appurl = "http://localhost:5000/api/saveemp";
        return this.httpclient.post<any>(this.Appurl, emp);
    }
   

    updateempdetails(emp: any,_id): Observable<any> {
      
        this.Appurl = "http://localhost:5000/api/updateempdetails";
        return this.httpclient.put(this.Appurl + '/' + _id, emp)
    }
    


    deletProductById(id: number): Observable<any> 
    {
        this.Appurl = "http://localhost:5000/api/deleteemp";
        return this.httpclient.delete<any>(this.Appurl + "/" + id);
    }


 
}



        /*this._posts= <BehaviorSubject<any[]>>new BehaviorSubject<any[]>([]);
        
        this.detailemp$=this._posts.asObservable();

        this.httpclient.get(this.Appurl+'/empdetails').subscribe(
            (emp:any)=>
            {
              
              console.log(emp);
               this.emp=emp;
               this._posts.next(this.emp);
                
            }
        )*/