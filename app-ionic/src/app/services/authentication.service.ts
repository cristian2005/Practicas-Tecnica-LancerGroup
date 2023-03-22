import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})


export class AuthenticationService {

  urlRegister = "https://api.lancergroup.org/likeride/api/Auth/Register";
  urlLogin = "https://api.lancergroup.org/likeride/api/Auth/Get_ToketLogin";

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

  register(params: any) {


    let headers = new HttpHeaders({
      "Country": "DO",
      "x-api-key": "123456"
    });

    let formData = new FormData();

    formData.append("userName", params.userName + " " + params.userLastName)
    formData.append("userEmail", params.userEmail)
    formData.append("userPassword", params.userPassword)
    formData.append("userPhoneNumber", params.userPhoneNumber)
    formData.append("type", params.type)
    formData.append("userProfilePic", params.userProfilePic)
    formData.append("answer", params.answer)


    let options = {
      headers: headers,
    }

    return this.httpClient
      .post(this.urlRegister, formData, options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }

  login(params: any) {

    let headers = new HttpHeaders({
      "Country": "DO",
      "x-api-key": "123456"
    });

    let options = {
      headers: headers,
    }

    let formData = new FormData();
    formData.append("userEmail", params.userEmail)
    formData.append("userPassword", params.userPassword)

    return this.httpClient.post(this.urlLogin, formData, options)
      .pipe(
        map((res: any) => {
          return res;
        })
      );

  }

  async isAuthenticated(): Promise<boolean> {
    const session = await this.storageService.get("session");
    return session
  }
}

