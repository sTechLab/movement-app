import {Component} from '@angular/core';
import {Platform, NavController, Alert} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';

import {SettingsService} from '../../services/settings';
import {AuthService} from '../../services/auth';
import {VenueService} from '../../services/venues';
import {GeoService} from '../../services/geo';

import {WelcomePage} from '../welcome/welcome';

declare var window: any;

@Component({
  templateUrl: 'build/pages/settings/settings.html'
})
export class SettingsPage {
  APP_VERSION:string;
  enabled:boolean = false;

  constructor(private nav: NavController,
              private platform:Platform,
              public authService: AuthService,
              public venueService: VenueService,
              public geoService:GeoService) {
                this.nav = nav;
                this.APP_VERSION = SettingsService.APP_VERSION;
  }

  onPageWillEnter() {
    this.platform.ready().then(()=>{
        this.checkGeoPermissions();
    });
  }

  checkGeoPermissions(){
    if(this.geoService.state){
      console.log("Plugin is initiated so get the coords");
      this.enabled = this.geoService.state.enabled;
    }else{
      console.log("Plugin is not initiated so intiate it")
      this.geoService.initBackgroundLocation();
    }

      // console.log("===========checkGeoPermissions===========");
      // let bgGeo = window.BackgroundGeolocation;
      // if(bgGeo){
      //   bgGeo.getState((state)=>{
      //     console.log("=============>state:");
      //     console.log(state);
      //     this.enabled = state.enabled;
      //     console.log("=============>enabled:");
      //     console.log(this.enabled);
      //     console.log("===========/checkGeoPermissions===========");
      //   });
      // }else{
      //   console.log("cant find plugin");
      // }
  }

  toggleGeoPermissions(){

    this.geoService.test()

    this.platform.ready().then(()=>{
      console.log("===========toggleGeoPermissions===========");

      if(this.geoService.state){
        console.log("Plugin is initiated so get the coords");
        
      }else{
        console.log("Plugin is not initiated so intiate it")
        // this.geoService.initBackgroundLocation();

      }

      // let bgGeo = window.BackgroundGeolocation;
      // if(bgGeo){


      //   // bgGeo.getState((state)=>{
      //   //   console.log(state);
      //   //   if(state.enabled){
      //   //     console.log("===========>STOP TRACKING");
      //   //     bgGeo.stop();
      //   //   }else{
      //   //     console.log("===========>START TRACKING");
      //   //     bgGeo.start();
      //   //   }
      //   // });
      // }else{
      //   console.log("cant find plugin");
      // }
    });
  }

  signout(){
    this.authService.removeToken();
    this.nav.rootNav.setRoot(WelcomePage);
  }

  clear(){
    this.venueService.clearVenues();
  }

  confirmSignout( ){
    let alert = Alert.create({
      title: 'Are you sure?',
      subTitle: 'Are you sure you want to sign out?',
      buttons: [{
        text: 'Cancel',
        handler: data => {} 
      },{
        text: 'Confirm',
        handler: data => {
          this.signout();
        }
      }]
    });
    this.nav.present(alert);
  }

  confirmLogsClear( ){
    let alert = Alert.create({
      title: 'Are you sure?',
      subTitle: `If you erase your local logs, you won't be able to recover them.`,
      buttons: [{
        text: 'Cancel',
        handler: data => {} 
      },{
        text: 'Confirm',
        handler: data => {
          this.clear();
        }
      }]
    });
    this.nav.present(alert);
  }

}
