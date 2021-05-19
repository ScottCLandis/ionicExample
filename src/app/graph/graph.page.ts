import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js/auto';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage implements OnInit {
 @ViewChild('lineCanvas') private lineCanvas: ElementRef;
    moment: any = moment;
    lineChart: any;
    rateList:any;
    cur = 'GBP'
    curOnDate
    curHistory  = [];
    defaultValue: any;
    compareWith: any;
    dateList = [];
  constructor(public http:HttpClient, private route: ActivatedRoute, private router: Router) { 
  this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.rateList = this.router.getCurrentNavigation().extras.state.rateList;
      }
    });}

  ngOnInit() {
      this.dateList.push(moment().format('YYYY-MM-DD'))
     var times = 6;

    for(var i=0; i < times; i++){
    var daysBack = i + 1;
  this.dateList.push(moment().subtract(daysBack, 'days').format('YYYY-MM-DD'))
  if (daysBack === 6){
      this.getCurData();
  }
      }
   
}
    

 getCurData(){
     console.log(this.dateList)
     this.dateList.forEach(date =>
      this.http.get('https://api.ratesapi.io/api/' + date + '?symbols=' + this.cur).subscribe((data:any) => {
          this.curOnDate = data;
        
         this.curHistory.push(this.curOnDate.rates[this.cur])
          console.log(this.curHistory)
      })
 )}
    ngAfterViewInit(){
        this.defaultValue = "1" ;
        this.currancychart()
    }
    newChart(){
        this.lineChart.destroy();
        this.currancychart();
    }
 currancychart() {
    
       this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
 data: {
        labels: this.dateList.reverse(),
    
        datasets: [{
            label: 'Rate to EUR',
            data: this.curHistory,
            parsing: {
                xAxisKey: 'rate'
            }
        },]
    },
    });
      
   
  }
}
