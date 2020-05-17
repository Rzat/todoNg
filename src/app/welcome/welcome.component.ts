import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WelcomDataService } from '../service/data/welcom-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  name = ''
  welcomeMessageFromService: string
  welcomeMessageFromParamService: string
  errorMessage: string


  //Activated Route for taking parameters
  constructor(private route: ActivatedRoute,
    private service: WelcomDataService) { }

  ngOnInit() {
    //parameters which are passed in
    //console.log(this.route.snapshot.params['name'])
    this.name = this.route.snapshot.params['name']
  }

  getWelcomeMessage() {

    this.service.executeHlloWorldBeanService().subscribe(

      response => this.hanleSuccessfullResponse(response),

      error => this.errorResponse(error)
    );

    console.log('last line of getWelcomeMessage')

  }


  getWelcomeMessageWithParam() {

    this.service.executeHlloWorldBeanServiceWithPath(this.name).subscribe(

      response => this.hanleSuccessfullParamResponse(response),

      error => this.errorResponse(error)
    );

    //console.log('last line of getWelcomeMessageWithParam')

  }

  hanleSuccessfullResponse(response) {
    this.welcomeMessageFromService = response.message;
  }

  hanleSuccessfullParamResponse(response) {
    this.welcomeMessageFromParamService = response.message;
  }

  errorResponse(error) {
    this.errorMessage = error.error.message
  }

}
