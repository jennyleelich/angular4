import { Component , OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { NgForm } from "@angular/forms";
@Component({
    selector: 'app-message-input',
    templateUrl: "./message-input.component.html"
        
    
    
})
export class MessageInputComponent implements OnInit{
    constructor(private messageService: MessageService){}
    inputValue:any;
    message: Message;
    ngOnInit(){
        this.messageService.messageIsEdit.subscribe(
            (message: Message) => this.message = message
        )
    }
    onSubmit(form: NgForm){
        if(this.message ){
            this.message.content = form.value.content;
            this.messageService.updateMessage(this.message)
                .subscribe(
                    result => console.log(this.message);
                )
            console.log("before nul",this.message);
            this.message = null;
            console.log("after null",this.message);
        }else{
             //console.log(form);
            const message = new Message(form.value.content, 'Max');
            this.messageService.addMessage( message)
            .subscribe(res => {
                console.log(res)
            })
        }
        
        form.resetForm();
    }
    onClear(form:NgForm){
        this.message = null;
        form.resetForm();
    }
}