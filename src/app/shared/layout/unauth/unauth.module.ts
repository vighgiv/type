import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnauthRoutingModule } from './unauth-routing.module';
import { UnauthComponent } from './unauth.component';
import { SpaceBackgroundComponent } from '../../space-background/space-background.component';

@NgModule({
  declarations: [UnauthComponent, SpaceBackgroundComponent],
  imports: [CommonModule, UnauthRoutingModule]
})
export class UnauthModule {}
