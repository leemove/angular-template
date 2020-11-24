import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { HttpModule } from './http';
import { StartupModule } from './startup';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    HttpModule,
    StartupModule
  ]
})
export class CoreModule { }
