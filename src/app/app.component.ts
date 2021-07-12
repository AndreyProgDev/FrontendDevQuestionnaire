import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { EmailService } from './EmailService';
import { EmailValidator } from './EmailValidator';
import { Hobby } from './Hobby';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontendDevQuestionnaire';

  disableSelect = true;
  frameVersions = [['1.1.1', '1.2.1', '1.3.3'],
  ['2.1.2', '3.2.4', '4.3.1'],
  ['3.3.1', '5.2.1', '5.1.3'] ];

  firstName: string = '';
  lastName: string = '';
  dateBirth: Date = new Date("0-0-0"); 

  jsTech: string = '';
  frameVer: string = '';
  email: string = '';
  hobbys: Hobby[] = [];

  name: string = '';
  years: string = '';
  months: string = '';
  days: string = '';
  frameVerType = -1

  emails: FormGroup = new FormGroup({});
  emailSyncValidators = [
    Validators.required,
    Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
  ];

  constructor(private http : HttpClient ,private emailService: EmailService) {}

  ngOnInit(): void {
    
    this.emails = new FormGroup({
      email: new FormControl('',
       this.emailSyncValidators,
       EmailValidator.createValidator(this.emailService))
    });
  }
  

  enableFramVer(){
    this.disableSelect = false;

    switch (this.jsTech) {
      case 'angular':
        this.frameVerType = 0;
        break;
      case 'react':
        this.frameVerType = 1;
        break;
      case 'vue':
        this.frameVerType = 2;
        break;
    
      default:
        break;
    }
  }

  addHobby(){
    this.hobbys.push(new Hobby(this.name, this.years+' years '+this.months+' months '+this.days+' days'));
  }

  delHobby(h: Hobby){
    for (let i = 0; i < this.hobbys.length; i++) 
      if(this.hobbys[i] == h)
        this.hobbys.splice(i, 1);
  }

  submit() {
      
      let body = {
        firstName: this.firstName,
        lastName: this.lastName,
        dateOfBirth: this.dateBirth.getDate()+"-"+this.dateBirth.getMonth()+1+"-"+this.dateBirth.getFullYear(),
        framework: this.jsTech,
        frameworkVersion: this.frameVer,
        email: this.email, 
        hobby: this.hobbys
      }

      this.http.put(`http://---/api/---/}`, body)
      .subscribe((data)=> 
        {
          console.log(data);
        },
        error=>console.log(error)
      );
  }
}
