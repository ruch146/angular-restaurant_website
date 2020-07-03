import { Component, OnInit ,Inject} from '@angular/core';
//shared folder just like interface
import { Dish } from '../shared/dish';

import { DishService } from '../services/dish.service';
//animation
import { flyInOut, expand } from '../animations/app.animation';

//inside host we see that when route changes 
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class MenuComponent implements OnInit {

  dishes: Dish[]
  errMess: string;  


   //now this dishService object is made availabe to you in menu
  constructor(private dishService:DishService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {


    this.dishService.getDishes()
    .subscribe((dishes)=>this.dishes=dishes,
    errmess => this.errMess = <any>errmess);
  
  }



}
