import { Component , OnInit } from "@angular/core";
import { FormGroup , FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { User } from "./user.model";
@Component ({
    selector:"app-signin",
    templateUrl:"./signin.component.html"
})
export class SigninComponent implements OnInit{
    myForm: FormGroup;
    constructor(private authService: AuthService, private router:Router){}
    ngOnInit() {
        this.myForm = new FormGroup({
            email: new FormControl(null, [Validators.required,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
            passWord: new FormControl(null, Validators.required)
        });
    }
    onSubmit() {
        const user = new User(this.myForm.value.email,this.myForm.value.passWord)
        this.authService.signin(user)
            .subscribe(
                data => {
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('userId',data.userId);
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.myForm.reset();
    }
}