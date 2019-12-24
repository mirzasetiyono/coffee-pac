import { Component, AfterViewInit } from '@angular/core';

import { CoffeeService } from './service/coffee.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private coffeeService: CoffeeService){
    this.coffeeService.getJustStartedState().subscribe(jss => {
      this.justStarted = jss;
    })
    this.coffeeService.getFinishedChoosingState().subscribe(fcs => {
      this.finishedChoosing = fcs
    })
    this.coffeeService.getBrewingSuccessState().subscribe(bss => {
      this.brewingSuccess = bss;
    })
    this.coffeeService.getFinishedBrewingState().subscribe(fbs => {
      this.finishedBrewing = fbs;
    })
    console.log(this.justStarted);
    console.log(this.finishedChoosing);
    console.log(this.brewingSuccess);
    console.log(this.finishedBrewing);
  }


  ngAfterViewInit(){
  }

  // For styling purpose
  toggleTransformMessage(){
    this.transformMessage = false;
    setTimeout(() => {
      this.transformMessage = true;
    }, 100)
  }

  transformMessage: boolean = true;
  // app state for message box
  justStarted: boolean;
  finishedChoosing: boolean;
  brewingSuccess: boolean;
  finishedBrewing: boolean;
  
}
