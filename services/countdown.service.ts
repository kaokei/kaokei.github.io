import autobind from 'autobind-decorator';
import { Injectable } from '@kaokei/use-vue-service';

@Injectable()
export class CountdownService {
  // 单位为秒
  public value = 0;
  // 倒计时单位， 默认100毫秒
  public step = 100;
  // 浏览器倒计时开始时间点，单位为秒
  public startTime = 0;
  // 倒计时句柄
  public timer = 0;

  private MAX_DAYS = 99;
  public day = 0;
  public hour = 0;
  public minute = 0;
  public second = 0;
  public millisecond = 0;

  public init(value: number, step = 100) {
    this.value = value;
    this.step = step;
    this.start();
  }

  private getTime() {
    // 获取当前时间戳
    return new Date().getTime();
  }

  private start() {
    if (this.value > 0) {
      this.startTime = this.getTime();
      this.countdown();
    }
  }

  @autobind
  private countdown() {
    const now = this.getTime();
    const gap = now - this.startTime;
    let current = this.value * 1000 - gap;
    if (current < 0) {
      current = 0;
    }

    const ms = current % 1000;
    this.millisecond = Math.floor(ms / 100);
    const totalSecond = (current - ms) / 1000;
    this.second = totalSecond % 60;
    const totalMinute = (totalSecond - this.second) / 60;
    this.minute = totalMinute % 60;
    const totalHour = (totalMinute - this.minute) / 60;
    this.hour = totalHour % 24;
    this.day = Math.min(this.MAX_DAYS, (totalHour - this.hour) / 24);

    if (current > 0) {
      this.timer = window.setTimeout(this.countdown, 100);
    }
  }

  public dispose() {
    window.clearTimeout(this.timer);
  }
}
