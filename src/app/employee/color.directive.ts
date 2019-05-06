import { Directive,Input,AfterViewInit,ElementRef, OnChanges} from '@angular/core';

@Directive({
  selector: '[appColor]'
})
export class ColorDirective implements OnChanges{

@Input()
pricerange:any=''

constructor(private elementRef:ElementRef) { }

ngOnChanges()
{
   
  if(this.pricerange<=5000)
  {
   this.elementRef.nativeElement.style.color="pink";
  }
  else if(this.pricerange>=5000 && this.pricerange<=10000)
  {
   this.elementRef.nativeElement.style.color="blue";
  }
  else if (this.pricerange>=10000 && this.pricerange<=15000)
  {
      this.elementRef.nativeElement.style.color="purple"; 
  }

  else (this.pricerange>=15000)
  {
     this.elementRef.nativeElement.style.color="sky blue";
  }

}
}


