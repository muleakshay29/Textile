import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../_models/user";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  // API_URL = `http://localhost:3000/`;
  API_URL = `https://textile-app95.herokuapp.com/`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(insertData): Observable<any> {
    const URL = `${this.API_URL}registration`;
    return this.http.post<any>(URL, insertData, httpOptions);
  }

  login(userData: any) {
    const URL = `${this.API_URL}login`;

    return this.http.post<any>(URL, userData, httpOptions).pipe(
      map((user) => {
        if (user) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      })
    );
  }

  logout() {
    const URL = `${this.API_URL}logout`;
    this.currentUserSubject.next(null);
    return this.http.post<any>(URL, "");
  }
}
