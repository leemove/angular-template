import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from './models';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * 用户信息
   */
  user?: User;

  /**
   * 不需要账号密码的登录方式
   */
  loginWithoutAccount(): Observable<User>{
    return of({
      name: 'a'
    })
    .pipe(
      tap(user => this.user = user),
    );
  }

  logout(): Observable<any> {
    this.user = undefined;
    /**
     * TODO: 这里可以替换成退出登录的接口
     */
    return of(null);
  }

  constructor() { }

}
