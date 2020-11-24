import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { startupFactory } from './factory';
import { UserService } from '../user';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: startupFactory,
      deps: [UserService],
      multi: true,
    }
  ]
})
export class StartupModule { }
