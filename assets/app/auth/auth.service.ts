import { Injectable } from "@angular/core";
import { Http ,Headers,Response} from "@angular/http";
import { User } from "./user.model";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService {
    constructor(private http: Http){

    }
    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type':'application/json'});
        return this.http.post('/user',body,{headers:headers})
                .map((response)=> response.json())
                .catch((error)=> Observable.throw(error.json()));
    }
}