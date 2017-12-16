import { Component } from "@angular/core";
import { Message } from "./message.model";
@Component({
    selector: 'app-message-input',
    template:`
        <div class="col-md-8 col-md-offset-2" >
            <div class="form-group">
                <label for="content">Content</label>
                <input type="text" id="content" class="form-control" [(ngModel)]="inputValue">
            </div>
            <button class="btn btn-primary" type="submit" (click)="onSave()">Save</button>
        </div>
    
    `
})
export class MessageInputComponent {
    inputValue:any;
    onSave(){
        alert(this.inputValue);
    }
}