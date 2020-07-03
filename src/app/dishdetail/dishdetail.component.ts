import { Component, OnInit ,ViewChild,Inject} from '@angular/core';
//to retrive parameters coming in
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import {Dish} from "../shared/dish"

import { DishService } from '../services/dish.service';

//helps us use params observable ,initially snapshot means we were taking a snapshot and then getting parmas
//now here with the help of  switchMap we can take action whenever params changes

//anytime parmas changes ish value changes 
//now to do that we can add button in view to navigate the dish AND with help of dishids we can modify paramas
import { switchMap } from 'rxjs/operators';

//reactive form
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Comment } from '../shared/comment';





     

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  //it is form model that is going to host reactive form
  commentForm: FormGroup;
  
  //data model
  comment:Comment;

  errMess: string;
  //it will hold the copy of the modified dish untill it is posted to the server 
  dishcopy:Dish;
   

  @ViewChild('cform') commentFormDirective;
  




  //javascript object that will contain all the errors of particular form here
  //if any error is detected the string message orresponding to these errors will be added here
  formErrors={
    'author':'',
    'rating':5,
    'comment':'',

  };

  validationMessages = {
    'author': {
      'required':      ' Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
    },
    'comment': {
      'required':      'Comment.',
      'minlength':     'comment must be at least 5 characters long.',
    },
};
   

  

  dish: Dish;
  dishIds:string[];
  prev:string;
  next:string;
  

 
  

  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb:FormBuilder,
    @Inject('BaseURL') public BaseURL) {
      this.createForm();
     }
  
  //when dish component is intialized fetch info from params
  ngOnInit(): void {
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish;this.dishcopy=dish; this.setPrevNext(dish.id); },
    errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId:string){
    const index = this.dishIds.indexOf(dishId);//we will get index of current dish in dishids
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];

  }
  goBack(): void {
    this.location.back();
  }




  createForm(){
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: 5,
      comment: ['', [Validators.required, Validators.minLength(5)] ],
      
    });


  this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
  
  this.onValueChanged();
  }

  onValueChanged(data?:any){
    if (!this.commentForm) { return; }//if feedback form is not created
    const form = this.commentForm;//just for ease of access
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];//all messages of particular field
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }

  }




  onSubmit(){
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
    .subscribe(dish => {
      this.dish = dish; this.dishcopy = dish;
    },
    errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentForm.reset({
      author: '' ,
      rating: 5 ,
      comment: ''
    });

    this.commentFormDirective.resetForm({rating:5});//completely reset
    
  }

}
