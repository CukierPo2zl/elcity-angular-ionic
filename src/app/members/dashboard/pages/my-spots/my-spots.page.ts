import { Component, OnInit } from '@angular/core';
import { SpotService } from 'src/app/services/spot.service';
import { Spot } from 'src/app/models/spot';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-my-spots',
  templateUrl: './my-spots.page.html',
  styleUrls: ['./my-spots.page.scss'],
})
export class MySpotsPage implements OnInit {
  page = 0;
  maxPages = 4;
  spots: Spot[];
  spotForm: FormGroup;

  constructor(private spotService: SpotService, private http: HttpClient, private formBuilder: FormBuilder,) { }

  ngOnInit() {
    this.loadSpots();

    this.spotForm = this.formBuilder.group({
      content: ['', Validators.required],
      anonymous: [false],
    });
  }

  loadSpots() {
    this.spotService.getSpots()
      .subscribe(
        (spots: Spot[]) => this.spots = spots
      );
  }

  loadMore(event) {
   setTimeout(() => {
     event.target.complete();
   }, 500)
  }

  onSubmit(){
    if( this.spotForm.invalid){return;}
    this.spotService.postSpot(this.spotForm.value)
      .pipe(first())
      .subscribe(
          data=>{
            this.spotForm.reset();
            this.ngOnInit();
          },
          error=>{
            console.log("error");
          }
      )
  }

}
