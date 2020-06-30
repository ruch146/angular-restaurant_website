import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }


  getDishes() : Promise<Dish[]>{
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES), 2000);
    });

  }

  getDish(id: string): Promise<Dish> {
    return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    });
  }


  
  //return dish for which featured is set to true
  getFeaturedDish(): Promise<Dish> {
    return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });
  }
}

//inject it in app module.ts and also add it in provider to make it available to all components
//for a component to use it ,import it ther and inject inside the constructor
//there in component,inside the onit method which is a lifecycle method you can ask service to fetch information
//whenever a component is created this method is going to execute