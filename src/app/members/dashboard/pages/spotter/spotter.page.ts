import { Component, OnInit, OnDestroy } from '@angular/core';
import { Spot } from 'src/app/models/spot';
import { SpotService } from 'src/app/services/spot.service';
import { LocationService } from 'src/app/services/location.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { StarService } from 'src/app/services/star.service';
/**
 * Component loads spots from the selected place. Default closest place to user location
 */
@Component({
  selector: 'app-spotter',
  templateUrl: './spotter.page.html',
  styleUrls: ['./spotter.page.scss'],
})
export class SpotterPage implements OnInit {

  constructor(
    private spotService: SpotService,
    private locationService: LocationService,
    private geolocation: Geolocation,
    private authService: AuthService,
    private starService: StarService,
    ) {
    }

  /**
   * Spots to display
   */
  spots: Spot[] = [];
  spotsSubscription: Subscription;
  /**
   * Data to display in IonicSelectable component
   */
  locations: Location[];
  locationsSubscription: Subscription;
  /**
   * Selected place from IonicSelectable
   */
  selected = null;
  /**
   * Array of spots with star given by request user
   */
  myStars: Spot[] = [];
  myStarsSubscription: Subscription;

  ngOnInit() {
    this.loadData();
  }

  filterPorts(location: Location[], text: string) {
    return this.locations.filter(location => {
      return location.name.toLowerCase().indexOf(text) !== -1 ||
      location.country.toLowerCase().indexOf(text) !== -1;
    });
  }

  portChange(place: {
    component: IonicSelectableComponent,
    value: Location
    }) {
      this.spotsSubscription.unsubscribe();
      this.loadSpots(Number(place.value.lat), Number(place.value.lng));
    }
    searchLocations(event: {
      component: IonicSelectableComponent,
      text: string
    }) {
      let text = event.text.trim().toLowerCase();
      event.component.startSearch();
      // Close any running subscription.
      if (this.locationsSubscription) {
        this.locationsSubscription.unsubscribe();
      }
      if (!text) {
        // Close any running subscription.
        if (this.locationsSubscription) {
          this.locationsSubscription.unsubscribe();
        }
        event.component.items = [];
        event.component.endSearch();
        return;
      }
      this.locationsSubscription = this.locationService.getPortsAsync().subscribe(ports => {
        // Subscription will be closed when unsubscribed manually.
        if (this.locationsSubscription.closed) {
          return;
        }
        event.component.items = this.filterPorts(ports, text);
        event.component.endSearch();
      });
    }







  loadData() {
      this.locationService.getLocations().toPromise().then((locations: Location[]) => {
      this.locations = locations;
      this.locationService.loaded.next(true);
      this.getMyStars();
      this.loadSpotsByCurrentLocation();

    });
  }

  loadSpots(lon, lat) {
    if (this.spotsSubscription) {
      this.spotsSubscription.unsubscribe();
    }
    this.spotsSubscription = this.spotService.spotsByLocation(lon, lat).subscribe(
      (spots: Spot[]) => {
        this.spots = this.setStars(spots);
       }
    );
  }

  loadSpotsByCurrentLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadSpots(resp.coords.latitude, resp.coords.longitude);

     }).catch((error) => {
       console.log('Error getting location', error);
     });
    this.selected = null;
  }

  getMyStars(){
    this.myStarsSubscription = this.starService.getMyStars().subscribe(
      (res: Spot[]) => {
        this.myStars = res;
      }
    );
  }

  setStars(spots: Spot[]): Spot[]{
    spots.forEach((instance) => this.myStars.forEach((star) => {
        if(instance.url === star.url){
          instance.likedByCurrentUser = true;
        }
    }));
    return spots;
  }
  
  onDestroy(){
    this.myStarsSubscription.unsubscribe();
  }






}
