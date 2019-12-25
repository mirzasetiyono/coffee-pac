import { Component, OnInit, Output } from '@angular/core';
import { CoffeeService } from "../service/coffee.service";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ingredients-panel',
  templateUrl: './ingredients-panel.component.html',
  styleUrls: ['./ingredients-panel.component.css']
})
export class IngredientsPanelComponent implements OnInit {
  @Output() myEvent = new EventEmitter();

  // current ingredients
  coffeeIngredients: number = 0;
  milkIngredients: number = 0;
  waterIngredients: number = 0;
  chocolateIngredients: number = 0;

  // boolean for state 
  finishedChoosing: boolean = false;

  // Boolean for suggesting user
  showSuggest: boolean = false;

  // boolean for full alert
  coffeeAlert: boolean;
  milkAlert: boolean;
  waterAlert: boolean;
  chocolateAlert: boolean;
  shown: number = 0;
  hide: number = 1;

  // disableButton boolean to avoid user mess with the alert interval
  disableCoffeeBtn: boolean = false;
  disableMilkBtn: boolean = false;
  disableWaterBtn: boolean = false;
  disableChocolateBtn: boolean = false;

  // boolean for ingredients full styling
  coffeeFull: boolean = false;
  milkFull: boolean = false;
  waterFull: boolean = false;
  chocolateFull: boolean = false;

  // variables for ingredients gauge control
  coffeeHeight: number = 0
  milkHeight: number = 0
  waterHeight: number = 0
  chocolateHeight: number = 0

  constructor(private coffeeService: CoffeeService) {
    this.coffeeService.getCurrentCoffee().subscribe(coffeeIng => {
      this.coffeeIngredients = coffeeIng;
      this.coffeeHeight = coffeeIng * 0.2; // <== Adjustment to ingredients container height (see ingrediets-panel.css #coffee-ing)
    })
    this.coffeeService.getCurrentMilk().subscribe(milkIng => {
      this.milkIngredients = milkIng
      this.milkHeight = milkIng * 0.2; // <== Adjustment to ingredients container height (see ingrediets-panel.css #milk-ing)
    })
    this.coffeeService.getCurrentWater().subscribe(waterIng => {
      this.waterIngredients = waterIng;
      this.waterHeight = waterIng * 0.4; // <== Adjustment to ingredients container height (see ingrediets-panel.css #water-ing)
    })
    this.coffeeService.getCurrentChocolate().subscribe(chocoIng => {
      this.chocolateIngredients = chocoIng;
      this.chocolateHeight = chocoIng * 0.666; // <== Adjustment to ingredients container height (see ingrediets-panel.css #chocolate-ing)
    })
  }

  ngOnInit() {

  }

  // Finish choosing ingredients and continue to brewing step
  applyIng() {
    this.coffeeService.sendIngredients(this.coffeeIngredients, this.milkIngredients, this.waterIngredients, this.chocolateIngredients); // <== send updated ingredients to another components
    this.coffeeService.toggleJustStartedState(false); // <== finishing just started state
    this.coffeeService.toggleFinishedChoosingState(true); // <== change the state finishedchoosing to true
    this.undisplayFull(); // <== undisplay "full" warning from all ingredients containers
    this.disableIngredientsBtn(); // <== Disable all add / reset ingredients buttons
    let toggling = this.coffeeService.getFinishedChoosingState().subscribe(fcs => { // <== get finishedchoosing state
      this.finishedChoosing = fcs;
    })
    setTimeout(() => {
      toggling.unsubscribe(); // <== close the subsription, avoid heading content changes to "fill ingredients"
    }, 500)
 
    // this is for handling  0 input of ingredients
    this.myEvent.emit(null); // <== call functions other components: brewPanel.sendNewMenu(); menuPanel.checkAndRedraw(); toggleTransformMessage()
    this.showSuggest = false; // <== undisplay suggestion text
  }

  ///////// SEE THE CHECK FUNCTION COMMENTS AT THE BOTTOM //////////////

  // Coffee ingredients add / remove buttons
  coffeeAdd5() {
    if (this.coffeeIngredients < 996) {
      this.coffeeIngredients = this.coffeeIngredients + 5;
      this.coffeeHeight = this.coffeeHeight + 1;
      this.coffeeCheck(); // <== check if full
    } this.coffeeCheck(); // <== check if full
  }
  coffeeAdd50() {
    if (this.coffeeIngredients < 951) {
      this.coffeeIngredients = this.coffeeIngredients + 50;
      this.coffeeHeight = this.coffeeHeight + 10;
      this.coffeeCheck(); // <== check if full
    } this.coffeeCheck(); // <== check if full
  }
  coffeeAdd100() {
    if (this.coffeeIngredients < 901) {
      this.coffeeIngredients = this.coffeeIngredients + 100;
      this.coffeeHeight = this.coffeeHeight + 20;
      this.coffeeCheck(); // <== check if full
    } this.coffeeCheck(); // <== check if full
  }
  coffeeReset() {
    this.coffeeIngredients = 0;
    this.coffeeHeight = 0;
    this.coffeeCheck(); // <== undisplay "full" text
  }

  // Milk ingredients additions buttons
  milkAdd5() {
    if (this.milkIngredients < 996) {
      this.milkIngredients = this.milkIngredients + 5;
      this.milkHeight = this.milkHeight + 1;
      this.milkCheck(); // <== check if full
    } this.milkCheck(); // <== check if full
  }
  milkAdd50() {
    if (this.milkIngredients < 951) {
      this.milkIngredients = this.milkIngredients + 50;
      this.milkHeight = this.milkHeight + 10;
      this.milkCheck(); // <== check if full
    } this.milkCheck(); // <== check if full
  }
  milkAdd100() {
    if (this.milkIngredients < 901) {
      this.milkIngredients = this.milkIngredients + 100;
      this.milkHeight = this.milkHeight + 20;
      this.milkCheck(); // <== check if full
    } this.milkCheck(); // <== check if full
  }
  milkReset() {
    this.milkIngredients = 0;
    this.milkHeight = 0;
    this.milkCheck(); // <== undisplay "full" text
  }

  // Water ingredients additions buttons
  waterAdd5() {
    if (this.waterIngredients < 496) {
      this.waterIngredients = this.waterIngredients + 5;
      this.waterHeight = this.waterHeight + 2;
      this.waterCheck(); // <== check if full
    } this.waterCheck(); // <== check if full
  }
  waterAdd50() {
    if (this.waterIngredients < 451) {
      this.waterIngredients = this.waterIngredients + 50;
      this.waterHeight = this.waterHeight + 20;
      this.waterCheck(); // <== check if full
    } this.waterCheck(); // <== check if full
  }
  waterAdd100() {
    if (this.waterIngredients < 401) {
      this.waterIngredients = this.waterIngredients + 100;
      this.waterHeight = this.waterHeight + 40;
      this.waterCheck(); // <== check if full
    } this.waterCheck(); // <== check if full
  }
  waterReset() {
    this.waterIngredients = 0;
    this.waterHeight = 0;
    this.waterCheck(); // <== undisplay "full" text
  }

  // Chocolate ingredients additions buttons
  chocolateAdd5() {
    if (this.chocolateIngredients < 296) {
      this.chocolateIngredients = this.chocolateIngredients + 5;
      this.chocolateHeight = this.chocolateHeight + 3.33;
      this.chocolateCheck(); // <== check if full
    } this.chocolateCheck(); // <== check if full
  }
  chocolateAdd50() {
    if (this.chocolateIngredients < 251) {
      this.chocolateIngredients = this.chocolateIngredients + 50;
      this.chocolateHeight = this.chocolateHeight + 33.3;
      this.chocolateCheck(); // <== check if full
    } this.chocolateCheck(); // <== check if full
  }
  chocolateAdd100() {
    if (this.chocolateIngredients < 201) {
      this.chocolateIngredients = this.chocolateIngredients + 100;
      this.chocolateHeight = this.chocolateHeight + 66.6;
      this.chocolateCheck(); // <== check if full
    } this.chocolateCheck(); // <== check if full
  }
  chocolateReset() {
    this.chocolateIngredients = 0;
    this.chocolateHeight = 0;
    this.chocolateCheck(); // <== undisplay "full" text
  }

  // This part is a bit messy (cant get get the interval and timeout inside a function)

  // check if the coffee ingrdients reach 1000 and alert in UI
  coffeeCheck() {
    if (this.coffeeIngredients === 1000) {
      this.coffeeFull = true; // <== Displaying "full" (see HTML) event binding
      this.disableCoffeeBtn = !this.disableCoffeeBtn // <== disabling the button to avoid messy interval (see HTML) event binding
      let dim = setInterval(() => {
        this.coffeeAlert = !this.coffeeAlert // <== interval for dim "full" text event binding
      }, 200)
      setTimeout(() => {
        clearInterval(dim); // <== Clearing the interval, after 1200ms
        this.disableCoffeeBtn = !this.disableCoffeeBtn // <== enabling back the button, after 1200ms
      }, 1200)
    } else {
      this.coffeeFull = false;
      this.toggleSuggest(); // <== check if the ingredients is proportional to continue
    }
  }

  // check if the milk ingrdients reach 1000
  milkCheck() {
    if (this.milkIngredients === 1000) {
      this.milkFull = true; // <== Displaying "full" text
      this.disableMilkBtn = !this.disableMilkBtn // <== disabling the button to avoid messy interval
      let dim = setInterval(() => {
        this.milkAlert = !this.milkAlert // <== interval for dim "full" text
      }, 200)
      setTimeout(() => {
        clearInterval(dim); // <== Clearing the interval, after 1200ms
        this.disableMilkBtn = !this.disableMilkBtn // <== enabling back the button, after 1200ms
      }, 1200)
    } else {
      this.milkFull = false;
      this.toggleSuggest(); // <== check if the ingredients is proportional to continue
    }
  }
  // check if the water ingrdients reach 1000
  waterCheck() {
    if (this.waterIngredients === 500) {
      this.waterFull = true; // <== Displaying "full" text
      this.disableWaterBtn = !this.disableWaterBtn // <== disabling the button to avoid messy interval
      let dim = setInterval(() => {
        this.waterAlert = !this.waterAlert // <== interval for dim "full" text
      }, 200)
      setTimeout(() => {
        clearInterval(dim); // <== Clearing the interval, after 1200ms
        this.disableWaterBtn = !this.disableWaterBtn // <== enabling back the button, after 1200ms
      }, 1200)
    } else {
      this.waterFull = false;
      this.toggleSuggest(); // <== check if the ingredients is proportional to continue
    }
  }
  // check if the chocolate ingrdients reach 1000
  chocolateCheck() {
    if (this.chocolateIngredients === 300) {
      this.chocolateFull = true; // <== Displaying "full" text
      this.disableChocolateBtn = !this.disableChocolateBtn // <== disabling the button to avoid messy interval
      let dim = setInterval(() => {
        this.chocolateAlert = !this.chocolateAlert // <== interval for dim "full" text
      }, 200)
      setTimeout(() => {
        clearInterval(dim); // <== Clearing the interval, after 1200ms
        this.disableChocolateBtn = !this.disableChocolateBtn // <== enabling back the button, after 1200ms
      }, 1200)
    } else {
      this.chocolateFull = false;
      this.toggleSuggest(); // <== check if the ingredients is proportional to continue
    }
  }

  // Disable all button (usefull for continue to brewing step and prevent error)
  disableIngredientsBtn() {
    this.disableCoffeeBtn = !this.disableCoffeeBtn;
    this.disableMilkBtn = !this.disableMilkBtn;
    this.disableWaterBtn = !this.disableWaterBtn;
    this.disableChocolateBtn = !this.disableChocolateBtn
  }
  // Toggle showSuggest boolean for showing suggestion message in UI
  toggleSuggest() {
    if (this.coffeeIngredients > 99 && 
        this.milkIngredients > 99 && 
        this.waterIngredients > 99 && 
        this.chocolateIngredients > 49
      ){
        this.showSuggest = true;
      } 
  }
  // undisplay "full" text in ingredients container
  undisplayFull(){
    this.coffeeFull = false; // <== undisplay full text
    this.milkFull = false; // <== undisplay full text
    this.waterFull = false; // <== undisplay full text
    this.chocolateFull = false; // <== undisplay full text
  }
}


