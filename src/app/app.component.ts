import { Component, ViewChild, ElementRef } from '@angular/core';
import { DelayapiService } from './delayapi.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DelayReportChart';
  chart: [];

   source1:number = 0
   srcn1: string
     source2:number = 0
     srcn2: string
    source3:number = 0
    srcn3:string

     dest1:number = 0
     destn1: string
     dest2:number = 0
     destn2: string
     dest3:number = 0
     destn3: string

  sourceobj = {id: 1}
  destobj = {}

  @ViewChild('canvasB') canvasB: ElementRef;
  
  constructor(private delayService: DelayapiService) {}
  

  ngOnInit() {


    let  janY =  0;
    let janN = 0;
    let  febY =  0
    let febN = 0
    let  marY =  0
    let marN = 0
    let  aprY =  0
    let aprN = 0
    let  mayY =  0
    let mayN = 0
    let  junY =  0
    let junN = 0
    let  julY =  0
    let julN = 0
    let  augY =  0
    let augN = 0
    let  sepY =  0
    let sepN = 0
    let  octY =  0
    let octN = 0
    let  novY =  0
    let novN = 0
    let  decY =  0
    let decN = 0

    

    console.log(janY);

    this.delayService.datafetch()
            .subscribe(res => {
                res.forEach((obj) => {
                  const month = obj.trip_start_time;
                  if(month[5] == '0') {
                      if (month[6] == '1') {
                          if (obj.delay <= 0 ) {
                              janY++;
                              
                          } else {
                              janN++;
                          }
                      } else if (month[6] == '2') {
                                  if (obj.delay <= 0) {
                                      febY++; 
                                  } else {
                                      febN++;
                                  }
                    } else if (month[6] == '3') {
                                  if (obj.delay <= 0) {
                                      marY++; 
                                  } else {
                                      marN++;
                                  }
                    } else if (month[6] == '4') {
                                  if (obj.delay <= 0) {
                                      aprY++; 
                                  } else {
                                      aprN++;
                                  }
                    } else if (month[6] == '5') {
                                  if (obj.delay <= 0) {
                                      mayY++; 
                                  } else {
                                      mayN++;
                                  }
                    } else if (month[6] == '6') {
                                  if (obj.delay <= 0) {
                                      junY++; 
                                  } else {
                                      junN++;
                                  }
                    } else if (month[6] == '7') {
                                  if (obj.delay <= 0) {
                                      julY++; 
                                  } else {
                                      julN++;
                                  }
                    } else if (month[6] == '8') {
                                  if (obj.delay <= 0) {
                                      augY++; 
                                  } else {
                                      augN++;
                                  }
                    } else if (month[6] == '9') {
                                  if (obj.delay <= 0) {
                                      sepY++; 
                                  } else {
                                      sepN++;
                                  }
                    } 
                  } else  {
                          if (month[6] == '0') {
                                          if (obj.delay <= 0) {
                                              octY++; 
                                          } else {
                                              octN++;
                                          }
                            } else if (month[6] == '1') {
                                          if (obj.delay <= 0) {
                                              novY++; 
                                          } else {
                                              novN++;
                                          }
                            }   else if (month[6] == '2') {
                                          if (obj.delay <= 0) {
                                              decY++; 
                                          } else {
                                              decN++;
                                          }
                            }
                    
                    
                  }
                  console.log(obj.delay);

                  let x=0;
                  let y=0;

                  res.forEach(element => {
                    if(element.srcname == obj.srcname) {
                        x++;
                    }
                    if(element.destname == obj.destname) {
                      y++;
                    }
                  });
                  if(x<=this.source1 ) {
                      if(x<=this.source2 && this.srcn1 != obj.srcname && this.srcn2 != obj.srcname && this.srcn3 != obj.srcname) {
                        this.source3 = x;
                        this.srcn3 = obj.srcname;
                      } else if(x> this.source2 && this.srcn1 != obj.srcname && this.srcn2 != obj.srcname && this.srcn3 != obj.srcname){
                        this.source3 = this.source2;
                        this.srcn3 = this.srcn2;
                        this.source2 = x;
                        this.srcn2 = obj.srcname;
                      }
                  } else if(x>this.source1 && this.srcn1 != obj.srcname && this.srcn2 != obj.srcname && this.srcn3 != obj.srcname) {
                    this.source3 = this.source2
                    this.srcn3 = this.srcn2;
                    this.source2 = this.source1;
                    this.srcn2 = this.srcn1;
                    this.source1 = x;
                    this.srcn1 = obj.destname;
                  }

                  if(y<=this.dest1 ) {
                      if(y<=this.dest2 && this.destn1 != obj.destname && this.destn2 != obj.destname && this.destn3 != obj.destname) {
                        this.dest3 = y;
                        this.destn3 = obj.destname;
                      } else if(y > this.dest2 && this.destn1 != obj.destname && this.destn2 != obj.destname && this.destn3 != obj.destname){
                        this.dest3 = this.dest2;
                        this.destn3 = this.destn2;
                        this.dest2 = y;
                        this.destn2 = obj.destname;
                      }
                  } else if(y >this.dest1 && this.destn1 != obj.destname && this.destn2 != obj.destname && this.destn3 != obj.destname) {
                    this.dest3 = this.dest2;
                    this.destn3 = this.destn2;
                    this.dest2 = this.dest1;
                    this.destn2 = this.destn1;
                    this.dest1 = y;
                    this.destn1 = obj.destname;
                  }
                  
                  console.log(this.destn1);
                  console.log(this.destn2);
                  console.log(this.destn3);
                  
                });

                
                console.log('done');

                const barchartdata = {
                      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'dec'],
                      datasets: [
                          {
                                  label: 'delay<=0',
                                  borderColor: '#3eff10',
                                  stack: 'Stack 0',
                                  backgroundColor: '#3eff10',
                                  data: [
                                    janY,febY,marY,aprY,mayY,junY,julY,augY,sepY,octY,novY,decY
                                  ]
                          }, 
                          {
                                  label: 'delay>0',
                                  borderColor: '#ffc107',
                                  stack: 'Stack 0',
                                  backgroundColor: '#ffc107',
                                  data: [
                                    janN,febN,marN,aprN,mayN,junN,julN,augN,sepN,octN,novN,decN
                                  ]
                          }
                        ]
                  }
                

                this.chart = new Chart(this.canvasB.nativeElement.getContext('2d'), {
                    type: 'bar',
                    data: barchartdata,
                    options: {
                        title: {
                          display: true,
                          text: 'Delay Report Chart'
                        },
                        tooltips: {
                          mode: 'index',
                          intersect: false
                        },
                        responsive: true,
                        scales: {
                          xAxes: [{
                            stacked: true,
                          }],
                          yAxes: [{
                            stacked: true
                          }]
                        }
                    }

                })
                
                
            });

    

    
  }

  


}
