import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NativeBiometric } from 'capacitor-native-biometric';
import { BiometryType } from 'capacitor-native-biometric/dist/esm/definitions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formLogin: FormGroup;

  constructor(private authenticationService: AuthenticationService,
    private storageService: StorageService, private router: Router,
    private alertController: AlertController, private fb: FormBuilder) {

    this.formLogin = this.fb.group({
      userEmail: ["", Validators.required],
      userPassword: ["", Validators.required]

    });

  }


  async conseguir(){
    try {
      const credentials = await NativeBiometric.getCredentials({
        server: "HOLA",
      });
      alert(JSON.stringify(credentials))
    } catch (error) {
      alert(JSON.stringify(error))
    }
    
  }


  async setear(){
    try {
      NativeBiometric.setCredentials({
        username: "wilson",
        password: "1234",
        server: "HOLA",
      }).then();
    } catch (error) {
      alert(JSON.stringify(error))
    }

  }

  async validar(){

    try {
      const verified = await NativeBiometric.verifyIdentity({
        reason: "Para iniciar sesión más fácil",
        title: "Obtener datos biometricos.",
      })
        .then(() => true)
        .catch(() => false);
        alert(verified)
    } catch (error) {
      alert(JSON.stringify(error))
      
    }
    
  }

  

  async addBiometric(params: any) {

    NativeBiometric.setCredentials({
      username: params?.userEmail,
      password: params?.userPassword,
      server: "https://api.lancergroup.org",
    }).then();
  }

  async biometricVerification() {
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) return;

    const isFaceID = result.biometryType == BiometryType.FACE_ID;

    const verified = await NativeBiometric.verifyIdentity({
      reason: "Para iniciar sesión más fácil",
      title: "Obtener datos biometricos.",
    })
      .then(() => true)
      .catch(() => false);
    alert(verified)
    if (!verified) return;

    const credentials = await NativeBiometric.getCredentials({
      server: "https://api.lancergroup.org",
    });
    alert(JSON.stringify(credentials))
    this.onLogin({userEmail: credentials.username, userPassword: credentials.password, valid:true})
  }

  async onLogin(params: any = null) {
    let params2 =  params ?? this.formLogin.value
    alert(params2)
    if (this.formLogin.valid || params2?.valid) {
      this.authenticationService.login(params2).subscribe({
        next: this.response.bind(this, params2),
        error: this.catchError.bind(this)
      });
    }
  }


  async response(res: any, params: any) {
    if (params.code == 1) {
      this.storageService.set("session", params).then(() => {
        this.addBiometric(params)
        this.router.navigate(["/user"])
      });
    }

    else if (params.code == 2) {
      const alert = await this.alertController.create({
        header: 'Datos incorrectos:',
        message: 'Correo o contraseña son incorrectos.',
        buttons: ['Aceptar']
      })
      await alert.present();
      return;
    }

    else if (params.code == 3) {
      const alert = await this.alertController.create({
        header: 'Ingrese bien sus datos:',
        message: 'El usuario no existe.',
        buttons: ['Aceptar']
      })
      await alert.present();
      return;
    }

  }

  async catchError(error: any) {
    const alert = await this.alertController.create({
      header: 'Problemas con el servidor',
      message: 'Por favor, intentelo más tarde.',
      buttons: ['Aceptar']
    })
    await alert.present();
    return;
  }


}
