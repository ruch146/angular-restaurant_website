import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';

//server for getting dishes
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';

//of will convert anything into observable
import { of,Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { map,catchError } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';



//now we will return observables and components will subscribe to it in order to render it.



@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http:HttpClient  ,  private processHTTPMsgService: ProcessHTTPMsgService) { }



  getDishes(): Observable<Dish[] >{
    return this.http.get<Dish[]>(baseURL + 'dishes')
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getDish(id: string): Observable<Dish> {
    return this.http.get<Dish>(baseURL + 'dishes/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  
  }

  
  //return dish for which featured is set to true
  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }

  getDishIds():Observable<string[] | any>{
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    .pipe(catchError(error => error));
    
  }
  //receives modified dish as the parameter 




  //incoming message is in json format
  putDish(dish: Dish): Observable<Dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.put<Dish>(baseURL + 'dishes/' + dish.id, dish, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
  

}


//inject it in app module.ts and also add it in provider to make it available to all components
//for a component to use it ,import it ther and inject inside the constructor
//there in component,inside the onit method which is a lifecycle method you can ask service to fetch information
//whenever a component is created this method is going to execute