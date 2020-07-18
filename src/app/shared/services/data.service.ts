import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostInteface } from '../interfaces/post-inteface';
import { BlogService } from './blog.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  post = new BehaviorSubject<PostInteface>(null);
  posts = new BehaviorSubject<PostInteface>(null);

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(){
    this.updatePostList()
  }

  update(currentPost: PostInteface){
    this.post.next(currentPost)
  }

  updatePostList(){
    this.blogService.fetchPost().subscribe(
      response=>{
        this.posts.next(response)
      }
    )
  }
}
