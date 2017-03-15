import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { InfoModule } from './info/info.module';
import { SearchInputModule } from './search-input.module';
import { MapModule } from './map/map.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';

import { ApiService } from './services/api.service';
import { EventBusService } from './services/event-bus.service';
import { SearchService } from './services/search.service';
import { SignatureService } from './services/signature.service';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InfoModule,
    HttpModule,
    MapModule,
    ReactiveFormsModule,
    SearchInputModule
  ],
  providers: [
    ApiService,
    EventBusService,
    SearchService,
    SignatureService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
