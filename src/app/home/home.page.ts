import { Component, OnInit} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
   
    rates: any;
    rateList: any;
    dateRange: any
    eurIn = 1;
    calcRate:any;

  constructor(public http:HttpClient, private router: Router) {}
    
    ngOnInit() {
        this.getRates();
    }

    getRates(){
        this.http.get('https://api.ratesapi.io/api/latest').subscribe((data:any) => {
            this.rates = data.rates;
            this.rateList = Object.entries(this.rates);
            var eur = this.eurIn
                this.rateList.forEach(function(rateMod) { 
                    rateMod[3] = rateMod[1] * eur; 
                });
        })
    }
    goToChart(){
         let navigationExtras: NavigationExtras = {
      state: {
        rateList: this.rateList
      }
    };
    this.router.navigate(['graph'], navigationExtras);
    }
}

   

