import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { NativeBiometric } from 'capacitor-native-biometric';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: any;
  image: string = "https://api.lancergroup.org/likeride/imagenes/avatar/x1/"

  constructor(private storageService: StorageService, private router: Router,
    private alertController: AlertController) {

  }

  async ngOnInit() {
    let user = await this.storageService.get("session")
    this.user = user.User;
    this.user.image = this.image + this.user.profilePic;

    const credentials = await this.getBiometric();
    if(!credentials.username){
      const alert = await this.alertController.create({
        header: 'Añadiendo datos biometricos...',
        message: 'Añadimos sus datos biometricos a esta cuenta, para iniciar sesión más ráido.',
        buttons: ['Aceptar']
      })
      await alert.present();
      this.addBiometric(credentials)
      return;
    } else {
      const alert = await this.alertController.create({
        header: 'BORRANDO datos biometricos...',
        message: 'BORRAMOS sus datos biometricos.',
        buttons: ['Aceptar']
      })
      await alert.present();
      NativeBiometric.deleteCredentials({
        server: "www.example.com",
      }).then();
      return;
    }

  }

    async getBiometric() {
    return await NativeBiometric.getCredentials({
      server: "https://api.lancergroup.org"
    });
  }

  async addBiometric(params: any = null) {

    NativeBiometric.setCredentials({
      username: params?.userEmail,
      password: params?.userPassword,
      server: "https://api.lancergroup.org",
    }).then();
  }

  logout() {
    this.storageService.remove("session");
    this.router.navigate(["/login"])
  }



}
