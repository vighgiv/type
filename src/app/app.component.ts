import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'touch-type-app';

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'avatar-login',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/avatar-login.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'avatar-register',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/avatar-register.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'times',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/times.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'check',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/check.svg')
    );
  }
}
