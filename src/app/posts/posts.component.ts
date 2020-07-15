import { Component, OnInit } from '@angular/core';
import { BlogService } from 'app/shared/services/blog.service';
import { PostInteface } from 'app/shared/interfaces/post-inteface';
import { DataService } from 'app/shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts: PostInteface;

  constructor(
    private router: Router,
    private blogService: BlogService,
    private dataService: DataService) { }

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
    // send data to data service
    this.dataService.update(post)

    // navigate to edit post
    this.router.navigateByUrl('/post')
  }
}
