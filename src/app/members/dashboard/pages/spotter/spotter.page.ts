import { Component, OnInit } from '@angular/core';
import { Spot } from 'src/app/models/spot';
import { SpotService } from 'src/app/services/spot.service';
import { LocationService } from 'src/app/services/location.service';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Subscription } from 'rxjs';
import { Location } from 'src/app/models';

@Component({
  selector: 'app-spotter',
  templateUrl: './spotter.page.html',
  styleUrls: ['./spotter.page.scss'],
})
export class SpotterPage implements OnInit {

  constructor(private spotService: SpotService, private locationService: LocationService) {
  }

  spots: Spot[];
  locations: Location[];
  locationsSubscription: Subscription;
  selected = null;
  ngOnInit() {
    this.loadData();
  }



  filterPorts(location: Location[], text: string) {
    return this.locations.filter(location => {
      return location.name.toLowerCase().indexOf(text) !== -1 ||
      location.country.toLowerCase().indexOf(text) !== -1;
    });
  }

  loadData() {
    this.locationService.getLocations().toPromise().then((locations: Location[]) => {
      this.locations = locations;
      this.locationService.loaded.next(true);
      this.loadSpots();
    });
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

  loadSpots() {
    this.spotService.getSpots()
      .subscribe(
        (spots: Spot[]) => this.spots = spots
      );
  }






}
