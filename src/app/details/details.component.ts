import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="listing-details" *ngIf="housingLocation">
      <img class="listing-photo" [src]="housingLocation.photo" [alt]="housingLocation.name">
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation.name }}</h2>
        <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      </section>
      <section class="listing-features">
        <h3 class="section-heading">About this housing location</h3>
        <ul>
          <li>Units available: {{ housingLocation.availableUnits }}</li>
          <li>Does the location have wifi: {{ housingLocation.wifi }}</li>
          <li>Does the location has laundry: {{ housingLocation.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h4 class="section-heading">Interested in this location?</h4>

        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input type="text" formControlName="firstName" />

          <label for="last-name">Last Name</label>
          <input type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input type="email" formControlName="email">

           <button type="submit" class="primary">Apply Now</button>
        </form>
       
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})

export class DetailsComponent 
{
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

}
