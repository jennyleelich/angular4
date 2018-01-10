import { Http,Response,Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MessageService {
   private messages: Message[] = [];
   messageIsEdit = new EventEmitter<Message>();
   constructor(private http: Http, private errorService: ErrorService) {}
   addMessage(message: Message) {
       //this.messages.push(message);
       //console.log(this.messages);
       const body = JSON.stringify(message);
       //console.log(body);
       const headers = new Headers({'Content-Type':'application/json'});
       const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            :'';

       return this.http.post("/message"+token,body,{headers:headers})
             .map(response => {
                // console.log('response',response);
                 console.log('responsejson',response.json());
                 const result = response.json();
                 const message = new Message(
                    result.obj.content,
                    result.obj.user.firstName,
                    result.obj._id,
                    result.obj.user._id);
                console.log("message",message);
                 this.messages.push(message);
                 return message;
            })
             .catch(error => {
                 this.errorService.handleError(error.json());
                 return Observable.throw(error.json())
                })
       
       //set up observable which hold the request that allows us to subscribe but which doesn't send the request yet.
        //if no noe is listening(subscribe),why would you send a request
        //we can subscribe this in the component.
   }
   getMessages() {
       return this.http.get('/message')
                  .map(response => {
                      console.log('get response',response);
                      const messages = response.json().obj;
                      let transformedMessages: Message[] = [];
                      for(let message of messages) {
                          transformedMessages.push(new Message(
                              message.content,
                            message.user.firstName,
                            message._id,
                            message.user._id))
                      }
                      this.messages = transformedMessages;
                      return transformedMessages;
                  })
               .catch(error => {
                 this.errorService.handleError(error.json());
                 return Observable.throw(error.json())
                })
   }
   editMessage(message:Message){
        this.messageIsEdit.emit(message);
   }
   updateMessage(message:Message){
       const body = JSON.stringify(message);
       const headers = new Headers({'Content-Type':'application/json'});
       const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            :'';
       return this.http.patch("/message/"+message.messageId+token,body,{headers:headers})
             .map(response => {
                // console.log('response',response);
                // console.log('responsejson',response.json());
                 return response.json()
                })
              .catch(error => {
                 this.errorService.handleError(error.json());
                 return Observable.throw(error.json())
                })
       
       //set up observable which hold the request that allows us to subscribe but which doesn't send the request yet.
        //if no noe is listening(subscribe),why would you send a request
        //we can subscribe this in the component.
   }
   
   deleteMessage(message: Message) {
       this.messages.splice(this.messages.indexOf(message),1);
       const token = localStorage.getItem('token')
            ? '?token='+localStorage.getItem('token')
            :'';
       return this.http.delete("/message/"+message.messageId+token)
             .map(response => {
                // console.log('response',response);
                console.log('responsejson',response.json());
                 return response.json()
                })
              .catch(error => {
                 this.errorService.handleError(error.json());
                 return Observable.throw(error.json())
                })
}
}