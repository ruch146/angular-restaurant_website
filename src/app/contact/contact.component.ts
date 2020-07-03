import { Component, OnInit ,ViewChild} from '@angular/core';
//reactive form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Feedback, ContactType } from '../shared/feedback';
//animation
import { flyInOut } from '../animations/app.animation';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut()
    ]
})
export class ContactComponent implements OnInit {
  //it is form model that is going to host reactive form
  feedbackForm: FormGroup;
  //corresponding data model
  feedback: Feedback;
  contactType = ContactType;
  @ViewChild('fform') feedbackFormDirective;
  //javascript object that will contain all the errors of particular form here
  //if any error is detected the string message orresponding to these errors will be added here
  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''

  };

 
  validationMessages = {
      'firstname': {
        'required':      'First Name is required.',
        'minlength':     'First Name must be at least 2 characters long.',
        'maxlength':     'FirstName cannot be more than 25 characters long.'
      },
      'lastname': {
        'required':      'Last Name is required.',
        'minlength':     'Last Name must be at least 2 characters long.',
        'maxlength':     'Last Name cannot be more than 25 characters long.'
      },
      'telnum': {
        'required':      'Tel. number is required.',
        'pattern':       'Tel. number must contain only numbers.'
      },
      'email': {
        'required':      'Email is required.',
        'email':         'Email not in valid format.'
      },
  };
  


  constructor(private fb:FormBuilder) {
    this.createForm();
   }

  ngOnInit(): void {
  }
  //pattern validators allows us to specify particular pattern and check that particular value matchs the pattern
  //for adding pattern we need to do that in template file.
  
  createForm(){
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      telnum: [0, [Validators.required, Validators.pattern] ],
      email: ['', [Validators.required, Validators.email] ],
      agree: false,
      contacttype: 'None',
      message: ''
    });


    //valueChanges is an observable then we need to subscribe to that
    //and inside the subscriber we need to specify what to be done when value changes 
    //inside subscriber we will get some data which will indicate which element has undergone change
    //and when that happens we will call onvaluechanged method 
    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    
    this.onValueChanged();//this will reset the form error messages initially
  }
  
  //initiate form validation and define form error messages
  onValueChanged(data?:any){
    if (!this.feedbackForm) { return; }//if feedback form is not created
    const form = this.feedbackForm;//just for ease of access
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
