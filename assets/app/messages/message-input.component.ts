import { Component } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { NgForm } from "@angular/forms";
@Component({
    selector: 'app-message-input',
    templateUrl: "./message-input.component.html"
        
    
    
})
export class MessageInputComponent {
    constructor(private messageService: MessageService){}
    inputValue:any;
    onSubmit(form: NgForm){
        //console.log(form);
        const message = new Message(form.value.content, 'Max');
        this.messageService.addMessage( message)
        .subscribe(res => {
            console.log(res)
        })
        
        form.resetForm();
    }
}