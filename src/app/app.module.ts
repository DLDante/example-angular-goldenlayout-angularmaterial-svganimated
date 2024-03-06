import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {DemoMaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { MainViewComponent } from './views/main-view/main-view.component';
import { SecondViewComponent } from './views/second-view/second-view.component';
import { ThirdViewComponent } from './views/third-view/third-view.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule
  ],
  declarations: [
    AppComponent,
    MainViewComponent,
    SecondViewComponent,
    ThirdViewComponent
  ],
  bootstrap: [
    AppComponent
  ],
  entryComponents: [
    MainViewComponent,
    SecondViewComponent,
    ThirdViewComponent
  ]
})
export class AppModule { }
