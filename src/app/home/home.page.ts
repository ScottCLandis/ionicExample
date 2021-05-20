import { Component, OnInit} from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';

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

  constructor(public http:HttpClient, private router: Router, public alertController:AlertController) {}
    
    ngOnInit() {
        this.getRates();
    }

    getRates(){
        this.http.get('https://api.ratesapi.io/api/latest').subscribe((data:any) => {
            console.log(Error)
            this.rates = data.rates;
            this.rateList = Object.entries(this.rates);
            var eur = this.eurIn
                this.rateList.forEach(function(rateMod) { 
                    rateMod[3] = rateMod[1] * eur; 
                });
        },(error) => {
           
    this.alertController.create({
      header: 'Error',
     
      message: 'There was an error fetching data, please try again later.',
      buttons: ['OK']
    }).then(res => {

      res.present();

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

