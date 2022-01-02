import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import {Router} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'iit-cc-app';

  constructor(private route:Router){}

  clickHomeBtn(): void {
    this.route.navigate(['/home']);
  }

  clickSettingsBtn(): void {
    this.route.navigate(['/settings']);
  }
}
