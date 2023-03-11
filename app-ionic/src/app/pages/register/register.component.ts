import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { StorageService } from 'src/app/services/storage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  location: any

  public formRegister: FormGroup;

  constructor(public fb: FormBuilder, public alertController: AlertController,
    public authenticationService: AuthenticationService, public storageService: StorageService,
    private router: Router) {

    this.formRegister = this.fb.group({
      userName: ["", Validators.required],
      userLastName: ["", Validators.required],
      userEmail: ["", Validators.email],
      userPhoneNumber: ["", Validators.required],
      userPassword: ["", Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/)],
      confirmPassword: ["", Validators.required],
      type: ["1"],
      userProfilePic: [""],
      answer: ["UBER"]

    });

  }


  async ngOnInit() {
    this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd && event.url === "/register") {
        let location = await this.storageService.get("location")
        this.location = location;
        this.ngOnInit();
      }
    })
  }

  async onRegister() {
    let params = this.formRegister.value;
    params.userProfilePic = await this.storageService.get("image")
    this.authenticationService.register(params).subscribe({
      next: this.response.bind(this),
      error: this.catchError.bind(this)
    });

  }

  async response(params: any) {

    if (this.formRegister.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debe rellenar todos los campos.',
        buttons: ['Aceptar.']
      });
      await alert.present();
      return;
    }

    else if (this.formRegister.get("userPassword")?.value !== this.formRegister.get("confirmPassword")?.value) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Los campos de contraseña deben coincidir',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }


    else if (params.code == 1) {
      this.storageService.set("userData", params).then(() => {
        this.router.navigate(["/login"])
        this.storageService.remove("location");
      });
    }

    else if (params.code == 2) {
      const alert = await this.alertController.create({
        message: 'El usuario ya existe.',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
    }

  }

  async catchError(error: any) {
    const alert = await this.alertController.create({
      header: 'Problemas con el servidor',
      message: 'Por favor, intentelo más tarde.',
      buttons: ['Aceptar']
    });

    await alert.present();
    return;
  }


}
