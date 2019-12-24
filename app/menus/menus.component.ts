import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { Recipe } from "../models/recipe";

import { CoffeeService } from "../service/coffee.service";



@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit, AfterViewInit {

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

  // assigning objects into arrays for looping 
  coffeeMenuTop: Array<Recipe> = [this.espresso, this.latte, this.americano, this.mocha, this.flatWhite];
  coffeeMenuBottom: Array<Recipe> = [this.capuccino, this.longBlack, this.noisette, this.marachino];

  // arrays of coffee recipe with insufficient ingredients, receiving data through service (async)
  naCoffee: Array<Recipe> = [];
  // instansiate canvas rendering
  private context: CanvasRenderingContext2D;

  // getting canvas element from HTML
  @ViewChild("menu", { static: false }) menu: ElementRef;


  constructor(private coffeeService: CoffeeService) {
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
    // getting the current ingredients async 
    this.coffeeService.getNaCoffee().subscribe(nacoffee => {
      this.naCoffee = nacoffee;
      console.log(nacoffee);
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.context = (this.menu.nativeElement as
      HTMLCanvasElement).getContext("2d");
    
      // Starting (Draw all recipe and cups)
    this.ingredientsLoop();
    this.cupLoop(this.coffeeMenuTop.length, this.coffeeMenuBottom.length);

  }

  // Check available recipe with the current ingredients using naCoffee, and redrawing the canvas.
  checkAndRedraw() {
    for (let i = 0; i < this.naCoffee.length; i++) {
      console.log(this.naCoffee)
      let naCoffeeName = this.naCoffee[i].name;
      // check if naCoffee has recipe that belongs to top coffee menu
      for (let y = 0; y < this.coffeeMenuTop.length; y++) {
        if (naCoffeeName == this.coffeeMenuTop[y].name) {
          let index = this.coffeeMenuTop.indexOf(this.coffeeMenuTop[y]);
          this.coffeeMenuTop.splice(index, 1)
        }
      }
      // check if naCoffee has recipe that belongs to top coffee menu
      for (let x = 0; x < this.coffeeMenuBottom.length; x++) {
        if (naCoffeeName == this.coffeeMenuBottom[x].name) {
          let index$ = this.coffeeMenuBottom.indexOf(this.coffeeMenuBottom[x]);
          this.coffeeMenuBottom.splice(index$, 1)
        }
      }
    }
    // this handle if user has no more ingredients to make a cup of coffee or still has ingredients
    if (this.naCoffee.length < 9) {
      this.eraseAll(); // <== Erase whole canvas
      this.ingredientsLoop(); // <== Redraw ingredients recipe based on current ingredients
      this.cupLoop(this.coffeeMenuTop.length, this.coffeeMenuBottom.length); // <== Redraw cup based on current ingredients 
    } else {
      this.eraseAll(); // ingredients finished
      this.ingredientsFinished(); // ingredients finished
      // this.coffeeService.toggleFinishedChoosingState(false);
      this.coffeeService.toggleFinishedBrewingState(true);
    }
  }


  cupLoop(topCup: number, bottomCup: number) {
    // Draw top cups (5)
    for (let i = 0, x1 = 35, x2 = 75, x3 = 250, x4 = 285, y1 = 55, y2 = 285; i < topCup; i++ , x1 += 320, x2 += 320, x3 += 320, x4 += 320) {
      this.drawCup1(x1, x2, x3, x4, y1, y2, 200);
    }
    // Draw bottom cups (4)
    for (let i = 0, x1 = 35, x2 = 75, x3 = 250, x4 = 285, y1 = 355, y2 = 585; i < bottomCup; i++ , x1 += 320, x2 += 320, x3 += 320, x4 += 320) {
      this.drawCup1(x1, x2, x3, x4, y1, y2, 500);
    }

  }

  ingredientsLoop() {
    // Draw top Ingredients
    for (let i = 0, x1 = 35, x2 = 160; i < this.coffeeMenuTop.length; i++ , x1 += 320, x2 += 320) {
      this.coffeeMenuTop[i].setDefault(); // <== this is function for setting the unused ingredients to zero (avoid writing zero ingredients and errors) see recipe.ts
      const coffee = this.coffeeMenuTop[i].coffee * 1.6; // <== 1.6 are multiplier for adjusting the vertival canvas positioning. change to adjust ingredients height 
      const steamedMilk = this.coffeeMenuTop[i].steamedMilk * 1.6;
      const chocolate = this.coffeeMenuTop[i].chocolate * 1.6;
      const water = this.coffeeMenuTop[i].water * 1.6;
      const foamedMilk = this.coffeeMenuTop[i].foamedMilk * 1.6;
      const coffeeName = this.coffeeMenuTop[i].name;

      this.writeTitle(coffeeName, x2, 40, 250); // <== write the title with coffee name as parameter, x2 as the horizontal canvas positioning

      this.drawCoffee(x1, (285 - coffee), 250, coffee); // <== 285 is the bottom of the cup, coffee = ingredients multiply by 1.6 (see the top comment) positioning purpose
      this.writeIngredients(("Coffee " + this.coffeeMenuTop[i].coffee.toString() + " ml"), x2, 285, 150, "30px Verdana"); // <== write ingredients, x2 horizontal canvas positioning

      this.drawMilkSteamed(x1, ((285 - coffee) - steamedMilk), 250, steamedMilk); // simillar to top, height adjustment;
      if (steamedMilk > 1) { // <== avoid 0 ingredients displayed on UI
        this.writeIngredients(("Milk (Steamed) " + this.coffeeMenuTop[i].steamedMilk.toString() + " ml"), x2, (285 - coffee), 150, "30px Verdana"); // <== simillar
      };

      this.drawChocolate(x1, (((285 - coffee) - steamedMilk) - chocolate), 250, chocolate); // simillar to top, height adjustment;
      if (chocolate > 1) { // <== avoid 0 ingredients displayed on UI
        this.writeIngredients(("Chocolate " + this.coffeeMenuTop[i].chocolate.toString() + " ml"), x2, ((285 - coffee) - steamedMilk), 150, "30px Verdana"); // <== simillar
      }

      this.drawWater(x1, ((((285 - coffee) - steamedMilk) - chocolate) - water), 250, water); // simillar to top, height adjustment;
      if (water > 1) { // <== avoid 0 ingredients displayed on UI
        this.writeIngredients(("Water " + this.coffeeMenuTop[i].water.toString() + " ml"), x2, (((285 - coffee) - steamedMilk) - chocolate), 150, "30px Verdana"); // <== simillar
      }

      this.drawMilkFoamed(x1, (((((285 - coffee) - steamedMilk) - chocolate) - water) - foamedMilk), 250, foamedMilk); // simillar to top, height adjustment;
      if (foamedMilk > 1) { // <== avoid 0 ingredients displayed on UI
        this.writeIngredients(("Milk (Foamed) " + this.coffeeMenuTop[i].foamedMilk.toString() + " ml"), x2, ((((285 - coffee) - steamedMilk) - chocolate) - water + 5), 150, "15px Helvetica"); // <== simillar, +5 to adjust the smaller space for foamed milk
      }

    }
    //Draw bottom Ingredients
    // Simillar to drawtop methods, see top comments for explanations
    for (let i = 0, x1 = 35, x2 = 160; i < this.coffeeMenuBottom.length; i++ , x1 += 320, x2 += 320) {
      this.coffeeMenuBottom[i].setDefault();
      const coffee = this.coffeeMenuBottom[i].coffee * 1.6;
      const steamedMilk = this.coffeeMenuBottom[i].steamedMilk * 1.6;
      const chocolate = this.coffeeMenuBottom[i].chocolate * 1.6;
      const water = this.coffeeMenuBottom[i].water * 1.6;
      const foamedMilk = this.coffeeMenuBottom[i].foamedMilk * 1.6;
      const coffeeName = this.coffeeMenuBottom[i].name;

      this.drawCoffee(x1, (585 - coffee), 250, coffee);
      this.writeIngredients(("Coffee " + this.coffeeMenuBottom[i].coffee.toString() + " ml"), x2, 585, 150, "30px Verdana");

      this.writeTitle(coffeeName, x2, 340, 250);

      this.drawMilkSteamed(x1, ((585 - coffee) - steamedMilk), 250, steamedMilk);
      if (steamedMilk > 1) {
        this.writeIngredients(("Milk (Steamed) " + this.coffeeMenuBottom[i].steamedMilk.toString() + " ml"), x2, (585 - coffee), 150, "30px Verdana");
      }

      this.drawChocolate(x1, (((585 - coffee) - steamedMilk) - chocolate), 250, chocolate);
      if (chocolate > 1) {
        this.writeIngredients(("Chocolate " + this.coffeeMenuBottom[i].chocolate.toString() + " ml"), x2, ((585 - coffee) - steamedMilk), 150, "30px Verdana");
      }

      this.drawWater(x1, ((((585 - coffee) - steamedMilk) - chocolate) - water), 250, water);
      if (water > 1) {
        this.writeIngredients(("Water " + this.coffeeMenuBottom[i].water.toString() + " ml"), x2, (((585 - coffee) - steamedMilk) - chocolate), 150, "30px Verdana");
      }

      this.drawMilkFoamed(x1, (((((585 - coffee) - steamedMilk) - chocolate) - water) - foamedMilk), 250, foamedMilk);
      if (foamedMilk > 1) {
        this.writeIngredients(("Milk (Foamed) " + this.coffeeMenuBottom[i].foamedMilk.toString() + " ml"), x2, ((((585 - coffee) - steamedMilk) - chocolate) - water + 5), 150, "15px Verdana");
      }
    }
  }

  // Draw coffee ingredients blueprint
  drawCoffee(x1: number, yStart: number, width: number, height: number) {
    this.context.fillStyle = "rgba(89, 74, 78, 0.75)";
    this.context.fillRect(x1, yStart, width, height);
  }
  // Draw steamed milk blueprint
  drawMilkSteamed(x1: number, yStart: number, width: number, height: number) {
    this.context.fillStyle = "rgba(255, 244, 228, 0.75)";
    this.context.fillRect(x1, yStart, width, height)
  }
  // Draw foamed milk ingredients blueprint
  drawMilkFoamed(x1: number, yStart: number, width: number, height: number) {
    this.context.fillStyle = "rgba(244, 239, 211, 0.75)";
    this.context.fillRect(x1, yStart, width, height);
  }
  // Draw chocolate ingredients blueprint
  drawChocolate(x1: number, yStart: number, width: number, height: number) {
    this.context.fillStyle = "rgba(163, 86, 56, 0.75)"
    this.context.fillRect(x1, yStart, width, height);
  }
  // Draw water ingredients blueprint
  drawWater(x1: number, yStart: number, width: number, height: number) {
    this.context.fillStyle = "rgba(211, 244, 255, 0.75)"
    this.context.fillRect(x1, yStart, width, height);
  }
  // write ingredients text blueprint
  writeIngredients(ingredient: string, xMid: number, yStart: number, width: number, fontStyle: string) {
    this.context.fillStyle = "black";
    this.context.font = fontStyle;
    this.context.textAlign = "center";
    this.context.fillText(ingredient, xMid, yStart - 10, width);
  }
  // write coffee name blueprint
  writeTitle(coffeeName: string, xMid: number, yPos: number, width: number) {
    this.context.fillStyle = "black";
    this.context.font = "italic 30px Verdana";
    this.context.textAlign = "center";
    this.context.fillText(coffeeName, xMid, yPos, width);
  }
  // Handles writing when ingredients is finished called in checkAndRedraw()
  ingredientsFinished() {
    this.context.fillStyle = "black";
    this.context.font = "40px Verdana"
    this.context.fillText("You dont have enough ingredients to brew coffee", 800, 200, 1000);
    this.context.fillText("Press reset to restart", 800, 270, 1000);
  }
  // erase whole canvas
  eraseAll() {
    this.context.fillStyle = "#f8f9fa";
    this.context.fillRect(0, 0, 1600, 600);
  }

  // draw 1 cup blueprints
  drawCup1(x1: number, x2: number, x3: number, x4: number, y1: number, y2: number, y3: number) {
    this.context.beginPath();
    this.context.lineWidth = 2.5;
    this.context.lineJoin = "round";
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.lineTo(x3, y2);
    this.context.lineTo(x4, y1);
    this.context.lineTo(x1, y1);
    this.context.stroke();

    // erasing the left right triangle
    this.context.beginPath();
    this.context.moveTo(x1 - 1, y1);
    this.context.lineTo(x2 - 1, y2);
    this.context.lineTo(x1, y2);
    this.context.lineTo(x1, y1);
    this.context.fillStyle = "#f8f9fa";
    this.context.fill();

    // erasing the right right triangle
    this.context.beginPath();
    this.context.moveTo(x4 + 1, y1);
    this.context.lineTo(x3 + 1, y2);
    this.context.lineTo(x4, y2);
    this.context.lineTo(x4, y1);
    this.context.fillStyle = "#f8f9fa";
    this.context.fill();
  }

}
