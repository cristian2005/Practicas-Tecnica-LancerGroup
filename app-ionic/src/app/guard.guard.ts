import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AlertButton, alertController } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService,
    private alertController: AlertController) { }

  async canActivate(): Promise<boolean> {
    const isAuthenticated = await this.authenticationService.isAuthenticated();
    if (isAuthenticated) {
      return true;
    }
    else {
      const alert = await this.alertController.create({
        message: 'Por favor, inicie sesión para acceder al apartado de perfil de usuario.',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.router.navigate(["/login"])
      return false;
    }
  }

}
