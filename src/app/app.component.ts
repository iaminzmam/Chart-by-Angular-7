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

  src = [0,0,0]
  srcn = ['','','']
  dest = [0,0,0]
  destn = ['','','']

  

  @ViewChild('canvasB') canvasB: ElementRef;
  
  constructor(private delayService: DelayapiService) {}
  

  ngOnInit() {


    let monthY = [0,0,0,0,0,0,0,0,0,0,0,0]
    let monthN = [0,0,0,0,0,0,0,0,0,0,0,0]


    this.delayService.datafetch()
            .subscribe(res => {
                for(let i=0; i<res.length; i++) {
                    let obj = res[i];
                        let time = obj.trip_start_time;
                        let month = time.split("-",3);
                        month = month[1].valueOf()-1;
                        if(obj.delay > 0) {
                          monthN[month]++; 
                        } else {
                          monthY[month]++;
                        }
                        let x= 0;
                        let y=0;
                        for(let j=0; j< res.length; j++) {
                            if(obj.srcname == res[j].srcname) {
                                x++;
                            }
                            if(obj.destname == res[j].destname) {
                                y++;
                            }
                        }

                        if(x > this.src[0]) {
                          if(this.srcn.indexOf(obj.srcname) == -1) {
                              let s3 = this.src[1];
                              let s2 = this.src[0];
                              let s1 = x;
                              let sn3 = this.srcn[1];
                              let sn2 = this.srcn[0];
                              let sn1 = obj.srcname;

                              this.src = [s1, s2, s3];
                              this.srcn = [sn1, sn2, sn3];
                          }
                        } else if(x > this.src[1]) {
                              if(this.srcn.indexOf(obj.srcname) == -1) {
                                let s3 = this.src[1];
                                let s2 = x;
                                let s1 = this.src[0];
                                let sn3 = this.srcn[1];
                                let sn2 = obj.srcname;
                                let sn1 = this.srcn[0];

                                this.src = [s1, s2, s3];
                                this.srcn = [sn1, sn2, sn3];
                            }
                        }   else if(x > this.src[2]) {
                              if(this.srcn.indexOf(obj.srcname) == -1) {
                                let s3 = x;
                                let s2 = this.src[1];
                                let s1 = this.src[0];
                                let sn3 = obj.srcname;
                                let sn2 = this.srcn[1];
                                let sn1 = this.srcn[0];

                                this.src = [s1, s2, s3];
                                this.srcn = [sn1, sn2, sn3];
                            }
                        }

                        if(y > this.dest[0]) {
                            if(this.destn.indexOf(obj.destname) == -1) {
                                let s3 = this.dest[1];
                                let s2 = this.dest[0];
                                let s1 = y;
                                let sn3 = this.destn[1];
                                let sn2 = this.destn[0];
                                let sn1 = obj.destname;

                                this.dest = [s1, s2, s3];
                                this.destn = [sn1, sn2, sn3];
                            }
                          } else if(y > this.dest[1]) {
                                if(this.destn.indexOf(obj.destname) == -1) {
                                  let s3 = this.dest[1];
                                  let s2 = y;
                                  let s1 = this.dest[0];
                                  let sn3 = this.destn[1];
                                  let sn2 = obj.destname;
                                  let sn1 = this.destn[0];

                                  this.dest = [s1, s2, s3];
                                  this.destn = [sn1, sn2, sn3];
                              }
                          }   else if(y > this.dest[2]) {
                                if(this.destn.indexOf(obj.destname) == -1) {
                                  let s3 = y;
                                  let s2 = this.dest[1];
                                  let s1 = this.dest[0];
                                  let sn3 = obj.destname;
                                  let sn2 = this.destn[1];
                                  let sn1 = this.destn[0];

                                  this.dest = [s1, s2, s3];
                                  this.destn = [sn1, sn2, sn3];
                              }
                          }
                        
                        

                } console.log(monthY);
                console.log(this.srcn);

                const barchartdata = {
                  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'dec'],
                  datasets: [
                      {
                              label: 'delay<=0',
                              borderColor: '#3eff10',
                              stack: 'Stack 0',
                              backgroundColor: '#3eff10',
                              data: monthY
                      }, 
                      {
                              label: 'delay>0',
                              borderColor: '#ffc107',
                              stack: 'Stack 0',
                              backgroundColor: '#ffc107',
                              data: monthN
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
