import { Component, OnInit } from '@angular/core';
import { Spot } from 'src/app/models/spot';
import { SpotService } from 'src/app/services/spot.service';

@Component({
  selector: 'app-spotter',
  templateUrl: './spotter.page.html',
  styleUrls: ['./spotter.page.scss'],
})
export class SpotterPage implements OnInit {
  spots: Spot[];
  constructor(private spotService: SpotService) {
    this.loadSpots();
  }

  data = [
    {
      name: 'asxxxd',
      country: 'Poland'
    },
    {
      name: 'asdassd',
      country: 'Poland'
    },
    {
      name: 'agfdsd',
      country: 'USA'
    }
  ];

  
  selected = null;
  ngOnInit() { }

  loadSpots() {
    this.spotService.getSpots()
      .subscribe(
        (spots: Spot[]) => this.spots = spots
      );
  }




}
