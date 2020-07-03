import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';

//server for getting dishes
import {HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

//of will convert anything into observable
import { of,Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map } from 'rxjs/operators';


//now we will return observables and components will subscribe to it in order to render it.



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient) { }


  getDishes(): Observable<Dish[] >{
    return this.http.get<Dish[]>(baseURL + 'dishes');
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id);
  }

  
  //return dish for which featured is set to true
  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }

  getDishIds():Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  }
}



//inject it in app module.ts and also add it in provider to make it available to all components
//for a component to use it ,import it ther and inject inside the constructor
//there in component,inside the onit method which is a lifecycle method you can ask service to fetch information
//whenever a component is created this method is going to execute