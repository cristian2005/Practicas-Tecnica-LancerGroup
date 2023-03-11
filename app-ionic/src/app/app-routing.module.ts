import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { GeolocationComponent } from './pages/register/geolocation/geolocation.component';
import { ImageComponent } from './pages/register/image/image.component';
import { GuardGuard } from './guard.guard';

const routes: Routes = [
  {
   path: "", redirectTo:"login", pathMatch:"full"
  },
  
  { 
    path: "user", component: UserComponent, canActivate: [GuardGuard]
  },

  { 
    path: "register", component: RegisterComponent  
  },

  { 
    path: "register/geolocation", component: GeolocationComponent  
  },

  { 
    path: "register/image", component: ImageComponent  
  },

  { 
    path: "login", component: LoginComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
