import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';
import { IngredientsPanelComponent } from './ingredients-panel/ingredients-panel.component';
import { BrewPanelComponent } from './brew-panel/brew-panel.component';

import { CoffeeService } from "./service/coffee.service";

@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    IngredientsPanelComponent,
    BrewPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CoffeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
