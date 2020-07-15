import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PostInteface } from '../interfaces/post-inteface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  post = new BehaviorSubject<PostInteface>(null);

  constructor() { }

  update(currentPost: PostInteface){
    this.post.next(currentPost)
  }
}
