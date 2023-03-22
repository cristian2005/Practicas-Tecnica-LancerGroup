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

    await this.getBiometric();

  }

  async addBiometric() {
    const user = await this.storageService.get("credentials")
    NativeBiometric.setCredentials({
      username: user.userEmail,
      password: user.userPassword,
      server: "https://api.lancergroup.org",
    }).then();
  }

  async getBiometric() {
    try {
      let credentials = await NativeBiometric.getCredentials({
        server: "https://api.lancergroup.org"
      });

      if (!credentials.username) {
        const alert = await this.alertController.create({
          header: 'Desea añadir sus datos biometricos?',
          message: 'Añadimos sus datos biometricos a esta cuenta, para iniciar sesión más ráido.',
          buttons: [
            {
              text: "Cancelar",
              role: "cancel",
              handler: () => {

              }
            },
            {
              text: "Agregar",
              role: "confirm",
              handler: () => {
                this.addBiometric()
              }
            }
          ]
        })
        await alert.present();
        return;
      }
    }
    catch (error) {
      const alert1 = await this.alertController.create({
        header: 'ERROR Desea añadir sus datos biometricos?',
        message: 'Añadimos sus datos biometricos a esta cuenta, para iniciar sesión más ráido.',
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {

            }
          },
          {
            text: "Agregar",
            role: "confirm",
            handler: () => {
              this.addBiometric()
            }
          }
        ]
      })
      await alert1.present();
      return;
    }

  }

  async borrar() {
    NativeBiometric.deleteCredentials({
      server: "https://api.lancergroup.org",
    }).then(() => {
      alert("SE HA BORRADO LA HUELLA")
    });
  }


  logout() {
    this.storageService.remove("session");
    this.router.navigate(["/login"])
  }



}
