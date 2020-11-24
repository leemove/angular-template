import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { HttpModule } from './http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    HttpModule
  ]
})
export class CoreModule { }
