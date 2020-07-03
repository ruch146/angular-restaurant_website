import { Component, OnInit ,Inject} from '@angular/core';
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


   //now this dishService object is made availabe to you in menu
  constructor(private dishService:DishService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {


    this.dishService.getDishes()
    .subscribe((dishes)=>this.dishes=dishes);
  }



}
