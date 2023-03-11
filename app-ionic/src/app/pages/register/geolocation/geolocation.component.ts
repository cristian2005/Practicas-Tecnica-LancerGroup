import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent {

  constructor(private storageService: StorageService, private router: Router,
    private alertController: AlertController) { }

  async getCurrentLocation() {
    let coordinates = await Geolocation.getCurrentPosition();
    let location = {
      "latitud": coordinates.coords.latitude,
      "longitud": coordinates.coords.longitude
    }
    this.storageService.set("location", location)

    if (coordinates) {
      this.router.navigate(["/register/image"]);
    }
    else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo obtener la ubicación del usuario',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
