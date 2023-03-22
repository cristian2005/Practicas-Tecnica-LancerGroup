import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {

  constructor(private router: Router, private storageService: StorageService) { }

  fileName: string | undefined;

  onFileSelected(event: any) {
    this.getBase64(event).then(resImage => {
      this.storageService.set("image", resImage)
      this.router.navigate(["/register"])
    })
  }

  async getBase64(event: any) {
    return new Promise((resolveImage) => {
      const file: File = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = function () {
        let image = reader.result;
        resolveImage(image)
      }
    })
  }
}
