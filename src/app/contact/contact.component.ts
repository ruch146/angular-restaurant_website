import { Component, OnInit ,ViewChild} from '@angular/core';
//reactive form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  //it is form model that is going to host reactive form
  feedbackForm: FormGroup;
  //corresponding data model
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;


  constructor(private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  createForm(){
    this.feedbackForm=this.fb.group({
      firstname: ['', Validators.required ],
      lastname: ['', Validators.required ],
      telnum: [0, Validators.required ],
      email: ['', Validators.required ],
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }

  onSubmit(){
    this.feedback=this.feedbackForm.value;//giving form model to data model
    console.log(this.feedback)
    this.feedbackForm.reset(
      {
        firstname: '',
        lastname: '',
        telnum: 0,
        email: '',
        agree: false,
        contacttype: 'None',
        message: ''
      }
    )//resetting  all the entries
    this.feedbackFormDirective.resetForm();//completely reset
  }

}
