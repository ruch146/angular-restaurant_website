import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';


 


//of will convert anything into observable
import { of,Observable } from 'rxjs'
import { delay ,map,catchError} from 'rxjs/operators'

//now we will return observables

//server
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http:HttpClient,
    private processHTTPMsgService:ProcessHTTPMsgService) { }

  getLeaders() : Observable<Leader[]>{
    return this.http.get<Leader[]>(baseURL +'leadership')
    .pipe(catchError(this.processHTTPMsgService.handleError));;

    
  }

  getFeaturedLeader():Observable<Leader>{
    return this.http.get<Leader>(baseURL + 'leadership?featured=true').pipe(map(leaders => leaders[0]));


    
  }
}
