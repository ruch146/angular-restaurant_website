import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';

//of will convert anything into observable
import { Observable,of } from 'rxjs'
import { delay ,map,catchError} from 'rxjs/operators'

//server
import {HttpClient} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';




@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor(private http:HttpClient,
    private processHTTPMsgService:ProcessHTTPMsgService) { }


  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseURL +'promotions');
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions/' + id)
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion>(baseURL + 'promotions?featured=true')
    .pipe(map(promotions => promotions[0]))
    .pipe(catchError(this.processHTTPMsgService.handleError));
    
  }

  getPromotionIds(): Observable<string[] | any> {
    return this.getPromotions().pipe(map(promotions => promotions.map(promotion => promotion.id)))
    .pipe(catchError(this.processHTTPMsgService.handleError));
  }
}
