import { Component, OnInit} from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { DataService } from './shared/services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ){}

  ngOnInit(){
    this.authService.checkAuthenticationState();
    this.dataService.updatePostList();
  }

}
