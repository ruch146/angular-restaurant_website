import { Component, OnInit } from '@angular/core';
//shared folder just like interface
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[]

  selectDish:Dish;

   //now this dishService object is made availabe to you in menu
  constructor(private dishService:DishService) { }

  ngOnInit(): void {


    this.dishService.getDishes()
    .then((dishes)=>this.dishes=dishes);
  }



  onSelect(dish : Dish){
    this.selectDish=dish;

  }

}
