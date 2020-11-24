import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { HttpModule } from './http';
import { StartupModule } from './startup';
import { LayoutModule } from './layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserModule,
    HttpModule,
    StartupModule,
    LayoutModule
  ],
  exports: [
  ]
})
export class CoreModule { }
