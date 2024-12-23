import { Inject, Injectable, forwardRef } from '@kaokei/use-vue-service';
import type { UserVO } from '~/types/user';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {
  public user = {} as UserVO;

  @Inject(forwardRef(() => StorageService))
  public storageService!: StorageService;

  /**
   * 页面加载时从本地存储中初始化用户数据
   * 如果本地存储没有用户数据，路由中间件可能会强制登录
   */
  public initUserWhenPageLoaded(query: any) {
    this.updateUser({
      userId: 9527,
      username: '游客',
    });
  }

  /**
   * 绑定手机号可能导致用户信息更新
   */
  public updateUser(user: UserVO) {
    this.user = user;
    this.storageService.setUserInfo(user);
  }

  public isLogin() {
    return !!this.user.userId;
  }

  public reset() {
    (this.user as any) = {};
    this.storageService.removeUserInfo();
  }
}
