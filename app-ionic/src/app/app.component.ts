import { Component, OnInit } from '@angular/core';
import { App as CapacitorApp } from '@capacitor/app'
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app-ionic';

  currentRoute: any
  constructor(private router: Router) {
    router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.currentRoute = event;
      });
  }

  ngOnInit() {
    CapacitorApp.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack || this.currentRoute.urlAfterRedirects == '/login' || this.currentRoute.urlAfterRedirects == '/user') {
        CapacitorApp.exitApp();
      } else {
        window.history.back();
      }
    });
  }

}