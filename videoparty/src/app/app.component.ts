import { Component } from '@angular/core';
import { Username } from './Interfaces/Username';
import { HttpClient } from '@angular/common/http';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'videoparty';
  name: Username;

  constructor(private httpService: HttpService) {
  }

  addUsername(user: Username) {
    this.httpService.submit(this.name).subscribe(res => {
        alert('Data added successfully !! ');
      }
      , err => {
        console.log('Error Occured ' + err);
      }
      );
    }

    OnSubmit(): void {
      // tslint:disable-next-line:prefer-const
      const usernameValue = document.getElementById('username_value') as HTMLInputElement;
      // const name1: Username = { id: 1, name: usernameValue.nodeValue}; // OK
      this.name =  { id: 1, name: usernameValue.value};
      this.addUsername(this.name);
    }



}
