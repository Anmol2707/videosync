import { Component, OnInit } from '@angular/core';
import { Username } from '../../Interfaces/Username';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../../services/http.service';
import { ChatService } from '../../Services/chat.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  name: Username;
  disabled: boolean;
  newMessage: string;
  messageList: string[] = [];

  constructor(private httpService: HttpService, private chatService: ChatService) {
    this.disabled = false;
  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messageList.push(message);
      });
  }

  addUsername(user: Username) {
    this.httpService.submit(this.name).subscribe(res => {
        this.disabled = true;
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

    sendMessage() {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
    }

}
