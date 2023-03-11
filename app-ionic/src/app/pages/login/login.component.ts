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
  

  async addBiometric(params: any = null) {

    NativeBiometric.setCredentials({
      username: "endomamoru@inazumaeleven.com",
      password: "wilson0102",
      server: "https://api.lancergroup.org",
    }).then();
  }

  async biometricVerification() {
    const result = await NativeBiometric.isAvailable();

    if (!result.isAvailable) return;

    const isFaceID = result.biometryType == BiometryType.FACE_ID;

    const verified = await NativeBiometric.verifyIdentity({
      title: "Obtener datos biometricos para iniciar sesión más fácil"
    })
      .then(() => true)
      .catch(() => false);
    if (!verified) return;

    const credentials = await NativeBiometric.getCredentials({
      server: "https://api.lancergroup.org",
    });
    alert(JSON.stringify(credentials))
    alert("funciona")
    this.onLogin(credentials)
  }

  async onLogin(params: any = null) {
    let params2 =  params ?? this.formLogin.value
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
