import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageList: Array<string>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(`${environment.BASE_URL}/s3/objects/list`).subscribe((data: any) => {
      console.log(data);
      this.imageList = data;
    })
  }

}
