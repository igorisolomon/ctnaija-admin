import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/shared/services/blog.service';
import { CompanyInterface } from 'app/shared/interfaces/company';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // views: number;
  views = 25689

  company: CompanyInterface;

  constructor(private blogService: BlogService) { }
  
  ngOnInit() {
    this.fetchCompanyDetail()
  }

  
  fetchCompanyDetail(){
    this.blogService.fetchCompany().subscribe(
      response=>{
        // console.log(response);
        this.company = response;
      }
    )
  }

}
