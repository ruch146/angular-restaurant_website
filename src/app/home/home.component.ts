import { Component, OnInit ,Inject} from '@angular/core';


import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';
//animation
import { flyInOut, expand } from '../animations/app.animation';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class HomeComponent implements OnInit {

  dish: Dish;
  dishErr:string;
  promotion: Promotion;
  leader:Leader

  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService:LeaderService,
    @Inject('BaseURL') public BaseURL) { }

  ngOnInit(): void {

   this.dishservice.getFeaturedDish()
   .subscribe((dish)=>this.dish=dish,
   errmsg=>this.dishErr=errmsg);
    this.promotionservice.getFeaturedPromotion()
    .subscribe((promotion)=>this.promotion=promotion);
    this.leaderService.getFeaturedLeader()
    .subscribe((leader)=>this.leader=leader);
  }

}
