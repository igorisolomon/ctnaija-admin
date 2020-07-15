import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyInterface } from '../interfaces/company';
import { environment } from 'environments/environment';
import { PostInteface } from '../interfaces/post-inteface';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  // fetch Company
  /**
   * Gets the company details
   */
  fetchCompany(){
    return this.http.get<CompanyInterface>(
      `${environment.restApiUrl}api/company/1`
    )
  }

  // Edit company
  editCompany(payload){
    return this.http.patch<CompanyInterface>(
      `${environment.restApiUrl}api/company-edit/1`,
      payload
    )
  }


  // fetch post
  /**
   * Gets post list from database
   */
  fetchPost(){
    return this.http.get<PostInteface>(
      `${environment.restApiUrl}api/post/`
    )
  }

  // Create post
  createPost(payload){
    return this.http.post<PostInteface>(
      `${environment.restApiUrl}api/post-create`,
      payload
    )
  }

  // Edit post
  editPost(id, payload){
    return this.http.patch<PostInteface>(
      `${environment.restApiUrl}api/post-edit/${id}`,
      payload
    )
  }

  // Delete Post
  deletePost(id){
    return this.http.delete<PostInteface>(
      `${environment.restApiUrl}api/post-edit/${id}`
    )
  }
}
