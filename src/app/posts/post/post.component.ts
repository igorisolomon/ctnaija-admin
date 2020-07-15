import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, NgForm } from '@angular/forms';
import { PostInteface } from 'app/shared/interfaces/post-inteface';
import { BlogService } from 'app/shared/services/blog.service';
import { DataService } from 'app/shared/services/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: PostInteface
  editorForm: FormGroup

  editorStyle = {
    height: '300px'
  }

  // text = quill.getText();

  config = {
    toolbar: [
      ['bold', 'italic', 'underline','blockquote'],        // toggled buttons
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '+1'}, { 'indent': '-1' }],          // outdent/indent
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'align': [] }]
    ]
  }

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private dataService: DataService) {  }

  ngOnInit(): void {

    const updatePost = this.dataService.post.value

    if(updatePost){
      this.editorForm = this.fb.group({
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
    this.editorForm.value.body = event.text
    this.editorForm.value.body_html = event.html
  }

  onCategoryChange(event){
    this.editorForm.value.categorys = event.value.map(x=>+x)
    // this.editorForm.value.categorys = `"${JSON.stringify(event.value.map(x=>+x))}"`
    // console.log(`"${JSON.stringify(event.value.map(x=>+x))}"`);
    // console.log(`'hey'`);
    
    
  }

  onSubmit(editorForm: NgForm){

    console.log(editorForm.value);
    

    // const formData = new FormData();
    // // append file if not updated
    // if(this.editorForm.value.media){
    //   formData.append('media', editorForm.value.media);
    // }
    // else{
    //   return
    // }

    // const payload = editorForm.value
    // delete payload.media

    // this.blogService.createPost(payload).subscribe(
    //   response=>{
    //     this.blogService.editPost(response.id,formData).subscribe(
    //       response=>{
    //         console.log(response);
    //       }
    //     )
    //   }
    // )
  }
}
