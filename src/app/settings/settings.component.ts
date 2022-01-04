import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEventType, HttpResponse, HttpRequest, HttpHeaders } from '@angular/common/http'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  selectedFiles: FileList;  
  currentFileUpload: File;  
  progress: { percentage: number } = { percentage: 0 };  
  selectedFile = null;  
  changeImage = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  change($event) {
    this.changeImage = true;
  }  
  
  changedImage(event) {
    this.selectedFile = event.target.files[0];
  }  
  
  upload() {    
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    const data: FormData = new FormData();    
    data.append('upload', this.currentFileUpload);

    const newRequest = new HttpRequest('POST', `${environment.BASE_URL}/s3/objects/upload`, data, {
      reportProgress: true,
      responseType: 'text'
    });

    this.http.request(newRequest).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
         alert('File Successfully Uploaded');
      }
    });
    this.selectedFiles = undefined;
  }  
  
  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  // http://localhost:4000/s3/objects/upload
}
