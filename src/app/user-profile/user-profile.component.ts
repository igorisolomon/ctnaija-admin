import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { BlogService } from 'app/shared/services/blog.service';
import { CompanyInterface } from 'app/shared/interfaces/company';
import { FormGroup, FormBuilder, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  company: CompanyInterface;
  companyForm: FormGroup;

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder) {
      this.companyForm = this.fb.group({
        name: new FormControl(this.company?.name),
        phone: new FormControl(this.company?.phone),
        email: new FormControl(this.company?.email),
        about: new FormControl(this.company?.about),
        logo: new FormControl(null),
        facebook: new FormControl(this.company?.facebook),
        facebook_fans: new FormControl(this.company?.facebook_fans),
        twitter: new FormControl(this.company?.twitter),
        twitter_fans: new FormControl(this.company?.twitter_fans),
        youtube: new FormControl(this.company?.youtube),
        youtube_fans: new FormControl(this.company?.youtube_fans),
      })
    }

  ngOnInit() {
    this.fetchCompanyDetail()
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.companyForm.get('logo').setValue(file);
    }
  }

  fetchCompanyDetail(){
    this.blogService.fetchCompany().subscribe(
      response=>{        
        this.companyForm.patchValue({
          name: response?.name,
          phone: response.phone,
          email: response.email,
          about: response.about,
          facebook: response.facebook,
          facebook_fans: response.facebook_fans,
          twitter: response.twitter,
          twitter_fans: response.twitter_fans,
          youtube: response.youtube,
          youtube_fans: response.youtube_fans
        })
      }
    )
  }

  updateCompanyDetais(companyForm: NgForm){
    const formData = new FormData();
    formData.append('name', companyForm.value.name);
    formData.append('phone', companyForm.value.phone);
    formData.append('email', companyForm.value.email);
    formData.append('about', companyForm.value.about);
    formData.append('facebook', companyForm.value.facebook);
    formData.append('facebook_fans', companyForm.value.facebook_fans);
    formData.append('twitter', companyForm.value.twitter);
    formData.append('twitter_fans', companyForm.value.twitter_fans);
    formData.append('youtube', companyForm.value.youtube);
    formData.append('youtube_fans', companyForm.value.youtube_fans);


    // remove file if not updated
    if(this.companyForm.value.logo){
      // remove file
      formData.append('logo', companyForm.value.logo);
    }
    
    this.blogService.editCompany(formData).subscribe(
      response=>{
        console.log(response);
      }
    )
    console.log(this.companyForm.value);
    
  }

}
