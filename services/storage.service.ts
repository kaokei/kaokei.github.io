import { Injectable } from '@kaokei/use-vue-service';

@Injectable()
export class StorageService {
  private getItem(key: string) {
    const data = localStorage.getItem(key) as string;
    try {
      // 转成json数据
      return JSON.parse(data);
    } catch {
      return data;
    }
  }
  private setItem(key: string, value: any) {
    try {
      const data = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(key, data);
    } catch {
      // do nothing
    }
  }
  private removeItem(key: string) {
    localStorage.removeItem(key);
  }

  private getItemWithPathname(key: string) {
    const pname = location.pathname;
    return this.getItem(`${key}_${pname}`);
  }
  private setItemWithPathname(key: string, value: any) {
    const pname = location.pathname;
    return this.setItem(`${key}_${pname}`, value);
  }

  /**
   * 存储分页大小
   * 每个页面的分页大小是独立的
   */
  private KEY_PAGE_SIZE = 'KEY_PAGE_SIZE';
  public getPageSize() {
    return this.getItemWithPathname(this.KEY_PAGE_SIZE);
  }
  public setPageSize(value: any) {
    return this.setItemWithPathname(this.KEY_PAGE_SIZE, value);
  }

  /**
   * 存储用户选择的域
   */
  private KEY_ZONE = 'KEY_ZONE';
  public getZone() {
    return this.getItem(this.KEY_ZONE);
  }
  public setZone(value: any) {
    return this.setItem(this.KEY_ZONE, value);
  }
  public removeZone() {
    return this.removeItem(this.KEY_ZONE);
  }

  /**
   * 存储是否展示域引导
   */
  private KEY_ZONE_GUIDE = 'KEY_ZONE_GUIDE';
  public getZoneGuide() {
    return this.getItem(this.KEY_ZONE_GUIDE);
  }
  public setZoneGuide(value: any) {
    return this.setItem(this.KEY_ZONE_GUIDE, value);
  }
  public removeZoneGuide() {
    return this.removeItem(this.KEY_ZONE_GUIDE);
  }
  public setZoneGuideNeedShow() {
    return this.setZoneGuide('guide');
  }
  public isZoneGuideNeedShow() {
    return this.getZoneGuide() === 'guide';
  }

  /**
   * 存储adtag
   */
  private KEY_ADTAG = 'KEY_ADTAG';
  public getAdtag() {
    return this.getItem(this.KEY_ADTAG);
  }
  public setAdtag(value: any) {
    return this.setItem(this.KEY_ADTAG, value);
  }
  public removeAdtag() {
    return this.removeItem(this.KEY_ADTAG);
  }

  /**
   * 存储用户登录token
   */
  private KEY_USER_LOGIN_TOKEN = 'KEY_USER_LOGIN_TOKEN';
  public getUserToken() {
    return this.getItem(this.KEY_USER_LOGIN_TOKEN);
  }
  public setUserToken(value: any) {
    return this.setItem(this.KEY_USER_LOGIN_TOKEN, value);
  }
  public removeUserToken() {
    return this.removeItem(this.KEY_USER_LOGIN_TOKEN);
  }

  /**
   * 存储用户信息
   */
  private KEY_USER_INFO = 'KEY_USER_INFO';
  public getUserInfo() {
    return this.getItem(this.KEY_USER_INFO);
  }
  public setUserInfo(value: any) {
    return this.setItem(this.KEY_USER_INFO, value);
  }
  public removeUserInfo() {
    return this.removeItem(this.KEY_USER_INFO);
  }

  /**
   * 存储用户等级信息
   */
  private KEY_USER_LEVEL = 'KEY_USER_LEVEL';
  public getUserLevel() {
    return this.getItem(this.KEY_USER_LEVEL);
  }
  public setUserLevel(value: any) {
    return this.setItem(this.KEY_USER_LEVEL, value);
  }
  public removeUserLevel() {
    return this.removeItem(this.KEY_USER_LEVEL);
  }

  /**
   * 存储发送验证码的倒计时
   * 解决刷新页面丢失倒计时的问题
   */
  private KEY_TCAPTURE_COUNTDOWN = 'KEY_TCAPTURE_COUNTDOWN';
  public getTCaptureCountdown() {
    const value = this.getItem(this.KEY_TCAPTURE_COUNTDOWN);
    if (value) {
      const now = Date.now();
      const gap = Math.floor((now - value) / 1000);
      if (gap > 0 && gap < 60) {
        return 60 - gap;
      }
    }
    return 0;
  }
  public setTCaptureCountdown() {
    const now = Date.now();
    return this.setItem(this.KEY_TCAPTURE_COUNTDOWN, now);
  }
  public removeTCaptureCountdown() {
    return this.removeItem(this.KEY_TCAPTURE_COUNTDOWN);
  }
}
