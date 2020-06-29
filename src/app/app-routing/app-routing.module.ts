import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule,Routes} from "@angular/router"
 
import {routes} from './routes'



@NgModule({
  declarations: [],
  exports:[
    RouterModule //for others to use it
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
