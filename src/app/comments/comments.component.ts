import { Component, OnInit, Input } from '@angular/core';
import { BlogService } from 'app/shared/services/blog.service';
import { CommentInterface } from 'app/shared/interfaces/comment-interface';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() postId: number
  comments: CommentInterface[];
  replyForm

  constructor(
    private blogService: BlogService,
    private fb: FormBuilder) {
      this.replyForm = this.fb.group({
        comment:new FormControl("", [Validators.required, Validators.maxLength(256)]),
      })
    }

  ngOnInit(): void {
    this.getComment()
  }

  getComment(){
    this.blogService.fetchComments(this.postId).subscribe(
      response=>this.comments=response
    )
  }

  onDelete(id){
    this.blogService.deleteComment(id).subscribe(
      response=>{
        this.getComment();
      }
    )
  }

  onReply(replyForm){
    const payload = {
      name: "CTNaija",
      email:"crackteamnaija1@gmail.com",
      image_url:"https://api.ctnaija.com/media/images/cracktm_nw1.png",
      comment: replyForm.value.comment,
      post: this.postId
    }
    this.blogService.createComment(payload).subscribe(
      response=>{
        // update comment
        this.getComment()
        // clear form
        this.replyForm.reset()
      }
    )
  }
}
