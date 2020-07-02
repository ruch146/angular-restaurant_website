import { Component, OnInit } from '@angular/core';
//to retrive parameters coming in
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import {Dish} from "../shared/dish"

import { DishService } from '../services/dish.service';

//helps us use params observable ,initially snapshot means we were taking a snapshot and then getting parmas
//now here with the help of  switchMap we can take action whenever params changes

//anytime parmas changes ish value changes 
//now to do that we can add button in view to navigate the dish AND with help of dishids we can modify paramas
import { switchMap } from 'rxjs/operators';




     

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
   

  

  dish: Dish;
  dishIds:string[];
  prev:string;
  next:string;

  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { }
  
  //when dish component is intialized fetch info from params
  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });
  }

  setPrevNext(dishId:string){
    const index = this.dishIds.indexOf(dishId);//we will get index of current dish in dishids
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }
  goBack(): void {
    this.location.back();
  }

}
