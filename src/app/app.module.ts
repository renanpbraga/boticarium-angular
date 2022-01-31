import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LaboratoryComponent } from './components/laboratory/laboratory.component';
import { GardenComponent } from './components/garden/garden.component';
import { LibraryComponent } from './components/library/library.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from './components/history/history.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import { CauldronComponent } from './components/laboratory/cauldron/cauldron.component';

@NgModule({
  declarations: [
    AppComponent,
    LaboratoryComponent,
    GardenComponent,
    LibraryComponent,
    MainComponent,
    HistoryComponent,
    NavbarComponent,
    // CauldronComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
