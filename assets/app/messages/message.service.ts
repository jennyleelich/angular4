import { Http,Response,Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Message } from "./message.model";

@Injectable()
export class MessageService {
   private messages: Message[] = [];
   constructor(private http: Http) {}
   addMessage(message: Message) {
       //this.messages.push(message);
       //console.log(this.messages);
       //const body = JSON.stringify(message);
       //console.log(body);
       const headers = new Headers({'Content-Type':'application/json'});
       return this.http.post("/message",message,{headers:headers})
             .map(response => {
                // console.log('response',response);
                // console.log('responsejson',response.json());
                 return response.json()
                })
             .catch(error => {
                 return Observable.throw(error.json())
                })
       
       //set up observable which hold the request that allows us to subscribe but which doesn't send the request yet.
        //if no noe is listening(subscribe),why would you send a request
        //we can subscribe this in the component.
   }
   getMessages() {
       return this.messages;
   }
   deleteMessage(message: Message) {
       this.messages.splice(this.messages.indexOf(message),1);
   }
}