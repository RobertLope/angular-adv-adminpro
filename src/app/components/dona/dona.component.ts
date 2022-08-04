import { Component, Input } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {

  @Input() titulo: string = 'Sin titulo';
  @Input() labels: string[] = [];
  @Input() data: number[][] = [[1,2,3]];

  





  public colors: Color[]= [
    { backgroundColor: [ '#6857E6','#009FEE','#F02059'] }
  ];

}
