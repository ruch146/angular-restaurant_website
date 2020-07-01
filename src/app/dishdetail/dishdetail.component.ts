import { Component, OnInit } from '@angular/core';
//to retrive parameters coming in
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import {Dish} from "../shared/dish"

import { DishService } from '../services/dish.service';



     

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
   

  

  dish: Dish;

  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }
  
  //when dish component is intialized fetch info from params
  ngOnInit(): void {

   let id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
    .subscribe((dish)=>this.dish=dish);
  }


  goBack(): void {
    this.location.back();
  }

}
