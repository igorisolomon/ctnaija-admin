import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/shared/services/blog.service';
import { PostInteface } from 'app/shared/interfaces/post-inteface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: PostInteface;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getPostList()
  }

  getPostList(){
    this.blogService.fetchPost().subscribe(
      response=>{
        this.posts = response
      }
    )
  }
  
  edit(post){
    console.log(post);
    // send data to data service
    // navigate to edit post
  }
}
