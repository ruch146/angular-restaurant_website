import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

//of will convert anything into observable
import { of,Observable } from 'rxjs'
import { delay } from 'rxjs/operators'


//now we will return observables and components will subscribe to it in order to render it.



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }


  getDishes(): Observable<Dish[] >{
    return of(DISHES).pipe(delay(2000));
  }

  getDish(id: string): Observable<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000))
  }

  
  //return dish for which featured is set to true
  getFeaturedDish(): Observable<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000))
  }

  getDishIds():Observable<string[] | any>{
    return of(DISHES.map(dish=>dish.id))//array of ids
  }
}



//inject it in app module.ts and also add it in provider to make it available to all components
//for a component to use it ,import it ther and inject inside the constructor
//there in component,inside the onit method which is a lifecycle method you can ask service to fetch information
//whenever a component is created this method is going to execute