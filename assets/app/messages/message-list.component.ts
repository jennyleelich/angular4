import { Component, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
@Component({
    selector: 'app-message-list',
    template:`
        <div class="col-md-8 col-md-offset-2" >
            <app-message 
            [message]="message" 
            *ngFor="let message of messages"
            >
            </app-message>
        </div>
    
    `
})
export class MessageListComponent implements OnInit{
    messages: Message[];
    //keep in mind, array and object in javascript are reference types 
    //which means if i assign this array from the service to the array in this component,
    //this is one and the same object, these are not two different objects, 
    //i am not creating a copy here, i am simply copy the pointer here which point to the same place in memory
    //so this messages here in this component points to the same array as i have here in the message service.
    //this is mean whenever i add a method from some other place in the application, it is added to this array
    //which happens to be the same as in the message list component. which means the list will automatically get updated
    constructor( private messageService: MessageService){}
    ngOnInit() {
        this.messageService.getMessages()
                .subscribe(
                    (messages:Message[]) => {
                        this.messages = messages;
                    }
                )

    }
}