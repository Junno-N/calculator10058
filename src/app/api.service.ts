import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Observable } from "rxjs";



@Injectable({
  providedIn: "root",
})
export class ApiService {
  
  userIdUrl = `${environment.backendUrl}/userid`;
  constructor(private http: HttpClient) {}
  getUserId(): Observable<any> {
    return this.http.get(this.userIdUrl);
  }









  
  
}