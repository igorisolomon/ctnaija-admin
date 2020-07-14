import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  editorForm: FormGroup

  fileToUpload: File = null;

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

  constructor() { }

  ngOnInit(): void {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }

  toText(html: string){
    html = html.replace(/<\/h[1-6]>/ig, '\n');
    html = html.replace(/<\/div>/ig, '\n');
    html = html.replace(/<\/li>/ig, '\n');
    html = html.replace(/<li>/ig, '  *  ');
    html = html.replace(/<\/ul>/ig, '\n');
    html = html.replace(/<\/p>/ig, '\n');
    html = html.replace(/<\/blockquote>/ig, '\n');
    html = html.replace(/<br\s*[\/]?>/gi, "\n");
    html = html.replace(/<[^>]+>/ig, '');
    return html
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  onSubmit(){
    console.log(this.editorForm.value.editor);
    console.log(this.toText(this.editorForm.value.editor));
  }
}
