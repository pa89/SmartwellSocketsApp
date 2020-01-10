import { SigninPageComponent } from './signin-page/signin-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlotPageComponent } from './slot-page/slot-page.component';

const routes: Routes = [
  {path: '', component: SigninPageComponent},
  {path: 'slot-info', component: SlotPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
