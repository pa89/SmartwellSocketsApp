import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-module-routing.module';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SlotPageComponent } from './slot-page/slot-page.component';

@NgModule({
  declarations: [SigninPageComponent,
  SlotPageComponent],
  imports: [
    CommonModule,
    AdminModuleRoutingModule
  ]
})
export class AdminModuleModule { }
