import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { UserService } from '../user';
import { Router } from '@angular/router';
import { HttpDataError } from './models';

@Injectable()
export class DataInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private user: UserService) {}



  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      headers: new HttpHeaders({
        // 此处可以种入自定义头
        // token: ''
      }),
    });

    return next.handle(newReq)
      .pipe(
        switchMap((event) => {
          if (event instanceof HttpResponse && event.status === 200) {
            return this.handleData(event);
          } else {
            return of(event);
          }
        })
      );
  }

  /**
   * http响应数据处理
   */
  handleData(event: HttpResponse<any>): Observable<any> {
    const {body} = event;
    /**
     * TODO: 根据服务端约定的响应处理数据
     * 这里假设响应如下:
     * {
     *  rs: 1,
     *  msg: "成功",
     *  data: {
     *    name: "zhagnsan"
     *  }
     * }
     */
    // 响应中状态字段名称
    const STATUS_CODE_KEY = 'rs';
    // 响应中信息字段名称
    const MESSAGE_KEY = 'msg';
    // 响应中数据字段名称
    const DATA_KEY = 'data';
    // 未登录状态码
    const NO_LOGIN_CODE = 3;
    // 响应错误状态码
    const ERROR_CODE = 1;
    // 响应成功状态码
    const SUCESS_CODE = 2;
    // 这里补充对应系统的装填码字段来判断是否已经登录系统。
    if (body) {
      switch (body[STATUS_CODE_KEY]) {
        // 处理没有登录的情况
        case NO_LOGIN_CODE:
          const router = this.injector.get(Router);
          router.navigateByUrl('/login', {
            replaceUrl: true
          });
          return throwError({
            msg: '登录已经失效，请重新登录！',
            code: NO_LOGIN_CODE
          });
        case ERROR_CODE:
          return throwError({
            msg: body[MESSAGE_KEY],
            code: ERROR_CODE
          });
        case SUCESS_CODE:
          return of(event.clone({
            body: body.DATA_KEY
          }));
        default:
          // 二进制数据会没有状态
          return of(event);
      }
    }
    return of(event);
  }


  /**
   * http错误处理
   */
  handlerError(event: HttpErrorResponse): Observable<any> {
    const error = {
      ...event
    };
    if (event.error && (event.error.message as string)) {
      // error.message = event.error.message
      // error.resError = event.error.message
    }

    return throwError(error);
  }

}
