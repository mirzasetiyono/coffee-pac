import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Recipe } from "../models/recipe";

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  constructor() { }

  // Current Ingredients (changes through user interactions)
  currentCoffee = new BehaviorSubject<number>(0);
  currentMilk = new BehaviorSubject<number>(0);
  currentWater = new BehaviorSubject<number>(0);
  currentChocolate = new BehaviorSubject<number>(0);

  // Var for storing coffee recipes that are not available
  naCoffee: BehaviorSubject<Array<Recipe>> = new BehaviorSubject([]);
  currentNaCoffee = this.naCoffee.asObservable();

  // sends not available coffee recipes to component
  getNaCoffee() {
    return this.naCoffee.asObservable();
  }
  // update not avaible coffee recipe 
  sendNaCoffee(coffeeRecipe) {
    this.naCoffee.next(coffeeRecipe);
  }
  // append coffee recipe to not available coffee recipe
  addNaCoffee(coffeeRecipeObj) {
    const currentNaCoffee = this.naCoffee.value;
    const updatedNaCoffee = coffeeRecipeObj;
    this.sendNaCoffee(updatedNaCoffee);
  }

  // App State
  justStarted = new BehaviorSubject<boolean>(true); // <== Starting state

  finishedChoosing = new BehaviorSubject<boolean>(false); // <== after choosing ingredients state

  brewingSuccess = new BehaviorSubject<boolean>(false); // <== after success brewing state

  finishedBrewing = new BehaviorSubject<boolean>(false); // <== after cant create anymore coffee (finish)

  // sends current just started state to components
  getJustStartedState() {
    return this.justStarted.asObservable()
  }
  // sends current choosing state to components
  getFinishedChoosingState() {
    return this.finishedChoosing.asObservable()
  }
  // sends current brewing success to components
  getBrewingSuccessState() {
    return this.brewingSuccess.asObservable()
  }
  // sends current finished brewing state to components
  getFinishedBrewingState() {
    return this.finishedBrewing.asObservable();
  }
  // toggle just started state
  toggleJustStartedState(justStarted: boolean) {
    this.justStarted.next(justStarted);
  }
  // toggle choosing state
  toggleFinishedChoosingState(finishedChoosing: boolean) {
    this.finishedChoosing.next(finishedChoosing);
  }
  // toggle brewing success state
  toggleBrewingSuccessState(brewingSuccess: boolean) {
    this.brewingSuccess.next(brewingSuccess);
  }
  // toggle finished brewing state
  toggleFinishedBrewingState(finishedBrewing) {
    this.finishedBrewing.next(finishedBrewing);
  }

  // take current ingredients from ingredients panel;
  sendIngredients(coffeeIngredients, milkIngredients, waterIngredients, chocolateIngredients) {
    this.currentCoffee.next(coffeeIngredients);
    this.currentMilk.next(milkIngredients);
    this.currentWater.next(waterIngredients);
    this.currentChocolate.next(chocolateIngredients);
  }
  // sends current coffee ing to another component
  getCurrentCoffee() {
    return this.currentCoffee.asObservable();
  }
  // sends current milk ing to another component
  getCurrentMilk() {
    return this.currentMilk.asObservable();
  }
  // sends current water ing to another component
  getCurrentWater() {
    return this.currentWater.asObservable();
  }
  // sends current chocolate ing to another component
  getCurrentChocolate() {
    return this.currentChocolate.asObservable();
  }




}
