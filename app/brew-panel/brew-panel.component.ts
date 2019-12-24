import { Component, OnInit, Output } from '@angular/core'

import { CoffeeService } from "../service/coffee.service";

import { BrewList } from "../models/brew-list";

import { Recipe } from "../models/recipe";
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-brew-panel',
  templateUrl: './brew-panel.component.html',
  styleUrls: ['./brew-panel.component.css']
})

export class BrewPanelComponent implements OnInit {
  @Output() event = new EventEmitter();

  // Current Ingredients
  coffeeIngredients: number = 0;
  milkIngredients: number = 0;
  waterIngredients: number = 0;
  chocolateIngredients: number = 0;
  // for state change
  finishedChoosing: boolean = false;

  // variable for storing post-made coffee + ingredients used
  brewList: BrewList[] = [];

  //Brewing boolean for styling purpose
  brewing: boolean = false;

  // boolean for disabling brew button when ing finishes
  finishedBrewing: boolean = false;
  // Boolean for input error handling (styling)
  isError: boolean = false;
  errortrue = "red"
  errorfalse = "inherit"


  // creates recipe objects
  espresso = new Recipe();
  latte = new Recipe();
  americano = new Recipe();
  mocha = new Recipe();
  flatWhite = new Recipe();
  capuccino = new Recipe();
  longBlack = new Recipe();
  noisette = new Recipe();
  marachino = new Recipe();

  // var for storing selected coffee and quantity
  selectedCoffee: string = "";
  selectedQuantity: number = 0;

  // Coffee menu array for checking the select coffee input
  coffeeMenu: Array<Recipe> = [this.espresso, this.latte, this.americano, this.mocha, this.flatWhite, this.capuccino, this.longBlack, this.noisette, this.marachino];

  ngOnInit() {

  }

  constructor(private coffeeService: CoffeeService) {
    this.coffeeService.getFinishedChoosingState().subscribe(state => {
      this.finishedChoosing = state;
    })
    this.coffeeService.getCurrentCoffee().subscribe(currentCoffee => {
      this.coffeeIngredients = currentCoffee;
    })
    this.coffeeService.getCurrentMilk().subscribe(currentMilk => {
      this.milkIngredients = currentMilk;
    })
    this.coffeeService.getCurrentWater().subscribe(currentWater => {
      this.waterIngredients = currentWater;
    })
    this.coffeeService.getCurrentChocolate().subscribe(currentChocolate => {
      this.chocolateIngredients = currentChocolate;
    })
    // espresso ingredients
    this.espresso.coffee = 60;
    this.espresso.name = "ESPRESSO";
    // latte ingredients
    this.latte.coffee = 40;
    this.latte.steamedMilk = 90;
    this.latte.foamedMilk = 10;
    this.latte.name = "LATTE";
    // americano ingredients
    this.americano.coffee = 40;
    this.americano.water = 60;
    this.americano.name = "AMERICANO"
    // mocha ingredients
    this.mocha.coffee = 50;
    this.mocha.steamedMilk = 30;
    this.mocha.chocolate = 50;
    this.mocha.foamedMilk = 10;
    this.mocha.name = "MOCHA";
    // flatwhite ingredients
    this.flatWhite.coffee = 30;
    this.flatWhite.steamedMilk = 70;
    this.flatWhite.name = "FLATWHITE";
    // capuccino ingredients
    this.capuccino.coffee = 40;
    this.capuccino.steamedMilk = 30;
    this.capuccino.foamedMilk = 30;
    this.capuccino.name = "CAPUCCINO"
    // long black ingredients
    this.longBlack.coffee = 60;
    this.longBlack.water = 30;
    this.longBlack.name = "LONG BLACK"
    // noisette ingredients
    this.noisette.coffee = 60;
    this.noisette.steamedMilk = 30;
    this.noisette.name = "NOISETTE";
    // marachino ingredients
    this.marachino.coffee = 50;
    this.marachino.chocolate = 50;
    this.marachino.foamedMilk = 20;
    this.marachino.name = "MARACHINO"
    // Set the undefined ingredients to 0 to avoid NaN
    this.coffeeMenu.forEach(menu => {
      menu.setDefault();
    });
  }

  
  brewCoffee() {
    if (this.selectedCoffee === "" || this.selectedQuantity < 1){
      this.inputWarning()
    } else {
      this.processBrewingCoffee()
    }
  }

   // main function to brew coffee and display coffee made and ingredients in UI 
  processBrewingCoffee(){
    let list = new BrewList(); // <== create temporary instance of BrewList obj
    list.coffee = this.selectedCoffee; // <== Binds to HTML with ngModel (coffee type input)
    list.quantity = this.selectedQuantity; // <== Binds to HTML with ngModel (quantity input)
    let tempRecipe = new Recipe(); // <== create temporary instance of Recipe obj
    // Looping through each menu to find the matching name with user select input
    for (let i = 0; i < this.coffeeMenu.length; i++) {
      if (list.coffee === this.coffeeMenu[i].name) {
        // Assigning selected coffee into temporary obj for processing order
        tempRecipe.name = this.coffeeMenu[i].name;
        tempRecipe.coffee = this.coffeeMenu[i].coffee * list.quantity;
        tempRecipe.foamedMilk = this.coffeeMenu[i].foamedMilk * list.quantity;
        tempRecipe.steamedMilk = this.coffeeMenu[i].steamedMilk * list.quantity;
        tempRecipe.water = this.coffeeMenu[i].water * list.quantity;
        tempRecipe.chocolate = this.coffeeMenu[i].chocolate * list.quantity;
        // Assigning ingredients used into temporary obj for recording coffee that was brewed
        list.coffeeUsed = this.coffeeMenu[i].coffee * list.quantity;
        list.foamedMilkUsed = this.coffeeMenu[i].foamedMilk * list.quantity;
        list.steamedMilkUsed = this.coffeeMenu[i].steamedMilk * list.quantity;
        list.waterUsed = this.coffeeMenu[i].water * list.quantity;
        list.chocolateUsed = this.coffeeMenu[i].chocolate * list.quantity;
        // Checking if the ingredients sufficient or not for the order list
        if (
          this.coffeeIngredients - tempRecipe.coffee > -1 &&
          this.milkIngredients - (tempRecipe.steamedMilk + tempRecipe.foamedMilk) > -1 &&
          this.waterIngredients - tempRecipe.water > -1 &&
          this.chocolateIngredients - tempRecipe.chocolate > -1
        ) {
          this.countIngredients(tempRecipe.coffee, tempRecipe.foamedMilk, tempRecipe.steamedMilk, tempRecipe.water, tempRecipe.chocolate); // <== Count the remaining ingredients
          this.sendNewMenu(); // <== after brewing check the current ingredients to integrate with menu component
          this.processing(list); // <== Redraw the canvas with current ingredients and move it to coffee-made section (history) 1000 delay, toggling state for message box display change 2000 delay;
          this.checkBrewingStatus(); // <== check remaining ingre, if coffee is less than 30 then brewing finishes. 
        } else {
          alert("Not enough ingredients")
        }
        break;
      }
    }
  }

  // Method for counting the remaining ingredients, called on brew function
  countIngredients(coffeeUsed: number, foamedMilkUsed: number, steamedMilkUsed: number, waterUsed: number, chocolateUsed: number) {
    this.coffeeIngredients -= coffeeUsed;
    this.milkIngredients -= (foamedMilkUsed + steamedMilkUsed);
    this.waterIngredients -= waterUsed;
    this.chocolateIngredients -= chocolateUsed;
    this.coffeeService.sendIngredients(this.coffeeIngredients, this.milkIngredients, this.waterIngredients, this.chocolateIngredients);
  }

  // checking the current ingredients with current recipe
  sendNewMenu() {
    let na;
    let naList = [];
    for (let i = 0; i < this.coffeeMenu.length; i++) {
      if (this.coffeeIngredients < this.coffeeMenu[i].coffee ||
        this.milkIngredients < this.coffeeMenu[i].foamedMilk + this.coffeeMenu[i].steamedMilk ||
        this.waterIngredients < this.coffeeMenu[i].water ||
        this.chocolateIngredients < this.coffeeMenu[i].chocolate
      ) {
      na = this.coffeeMenu[i];
      naList = naList.concat(na);
      }
    }
    this.coffeeService.sendNaCoffee(naList);
  }
  // processing method to process the ordered coffee and styling.
  processing(pushedList) {
    this.brewing = !this.brewing;
    setTimeout(() => {
      this.brewing = !this.brewing;
      this.reDrawCanvas(); // <== redraw canvas in menu component
      this.brewList.push(pushedList) // <== pushing ordered coffee into cofffee list
    }, 1000)
    this.coffeeService.toggleFinishedChoosingState(false); // <== change state for message box change display
    this.coffeeService.toggleBrewingSuccessState(true); // <== change state for message box change display
    setTimeout(() => {
      this.coffeeService.toggleFinishedChoosingState(false); // <== change state for message box change display
      this.coffeeService.toggleBrewingSuccessState(false); // <== change state for message box change display
    }, 2000)
  }
  // reDraw canvas in menu component
  reDrawCanvas() {
    this.event.emit(null);
  }
  // alert user that input is incorrect
  inputWarning(){
    console.log("error")
    let dim = setInterval(() => {
      this.isError = true;
      console.log(this.isError)
      this.isError = false;
      console.log(this.isError)
    }, 200)
    setTimeout(() => {
      clearInterval(dim);
    }, 1200)
  }
  checkBrewingStatus(){
    if (this.coffeeIngredients < 30){
      if (this.milkIngredients < 70){
        this.coffeeService.getFinishedBrewingState().subscribe(fbs => {
          this.finishedBrewing = fbs;
        })
      }
    }
  }

}

