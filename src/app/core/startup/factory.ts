import { UserService } from '..';

export const startupFactory = (userService: UserService) => () =>
  // 初始化登录逻辑
  userService
    .loginWithoutAccount()
    .toPromise()
    .catch((e) => {})
    .then((res) => {
      window.APP_INITED = true;
    });
