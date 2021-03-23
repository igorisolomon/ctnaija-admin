import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { PostInteface } from 'app/shared/interfaces/post-inteface';
import { BlogService } from 'app/shared/services/blog.service';
import { DataService } from 'app/shared/services/data.service';
import { Router } from '@angular/router';
import * as QuillNamespace from 'quill';
import ImageResize from 'quill-image-resize-module';


let Quill: any = QuillNamespace;
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: PostInteface;
  editorForm: FormGroup;
  body: string;
  postId: number;
  categories;

  editorStyle = {
    height: '300px'
  }

  config = {
    toolbar: [
      ['bold', 'italic', 'underline','blockquote'],        // toggled buttons
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '+1'}, { 'indent': '-1' }],          // outdent/indent
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }]
    ],
    imageResize: true
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private blogService: BlogService,
    private dataService: DataService) {  }

  ngOnInit(): void {

    this.blogService.fetchCat().subscribe(
      res=> this.categories=res
    )
    const updatePost = this.dataService.post.value
    // clear post
    this.dataService.update(null)

    this.postId = updatePost?.id;

    if(updatePost){
      this.editorForm = this.fb.group({
        id: new FormControl(updatePost.id),
        title: new FormControl(updatePost.title),
        media: new FormControl(null),
        body: new FormControl(updatePost.body),
        body_html: new FormControl(updatePost.body_html?updatePost.body_html:updatePost.body),
        categorys: new FormControl(updatePost.categorys)
      })
    }
    else{
      this.editorForm = this.fb.group({
        title: new FormControl(""),
        media: new FormControl(null),
        body: new FormControl(""),
        body_html: new FormControl(""),
        categorys: new FormControl()
      })
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editorForm.get('media').setValue(file);
    }
  }

  onBodyChange(event){
    this.body = event.text;
    this.editorForm.value.body_html = event.html;
  }

  onCategoryChange(event){
    this.editorForm.value.categorys = event.value.map(x=>+x)
  }

  onSubmit(editorForm){
    
    const formData = new FormData();
    // append file if not updated
    if(this.editorForm.value.media){
      formData.append('media', editorForm.value.media);
    }
    else{
      return
    }

    const payload = editorForm.value
    payload.body = this.body
    delete payload.media


    this.blogService.createPost(payload).subscribe(
      response=>{
        this.blogService.editPost(response.id,formData).subscribe(
          response=>{
            this.router.navigateByUrl('/posts')
          }
        )
      }
    )
  }

  onEdit(editorForm){
    const payload = editorForm.value
    const id = payload.id

    const formData = new FormData();
    formData.append('media', editorForm.value.media);

    // Update image if image is changed
    if(this.editorForm.value.media){
      this.blogService.editPost(id,formData).subscribe(
        response=>{
          console.log(response);
        }
      )
    }

    // Remove id from payload
    delete payload.id
    delete payload.media

    // Update the form without image
    this.blogService.editPost(id,payload).subscribe(
      response=>{
        this.router.navigateByUrl('/posts')
      }
    )
    
  }

  onDelete(id: number){
    this.blogService.deletePost(id).subscribe(
      response=>{
        this.router.navigateByUrl('/posts')
      }
    )
  }
}
