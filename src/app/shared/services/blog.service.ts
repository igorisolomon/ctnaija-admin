import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyInterface } from '../interfaces/company';
import { environment } from 'environments/environment.prod';
import { PostInteface } from '../interfaces/post-inteface';
import { CommentInterface } from '../interfaces/comment-interface';

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
  fetchPost(page){
    return this.http.get<PostInteface>(
      `${environment.restApiUrl}api/post-list/?page=${page}`
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

  /**
   * Comment session
   */
  // list comments
  // fetchComments

  // Comment starts here
  // get comments
  fetchComments(postId:number){
    return this.http.get<CommentInterface[]>(
      `${environment.restApiUrl}api/comments/?post=${postId}`
    )
  }

  // create comment
  createComment(payload){
    return this.http.post<CommentInterface>(
      `${environment.restApiUrl}api/comments/`,
      payload
    )
  }

  // Delete comments
  deleteComment(id:number){
    return this.http.delete<CommentInterface>(
      `${environment.restApiUrl}api/comment-delete/${id}`
    )
  }

  // fetch category
  fetchCat(){
    return this.http.get(
      `${environment.restApiUrl}api/cat/`
    )
  }
}
