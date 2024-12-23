import { Injectable } from '@kaokei/use-vue-service';
import qs from 'query-string';

@Injectable()
export class RouterService {
  public route: any;
  public router: any;

  public getRoute() {
    return this.router.currentRoute;
  }
  public getRouteQuery() {
    return this.getRoute().query || {};
  }

  public setRouter(router: any) {
    this.router = router;
  }

  public replace(...args: any) {
    this.router.replace(...args);
  }

  public push(...args: any) {
    this.router.push(...args);
  }

  public updateQuery(newQuery: any, forceReload = false) {
    const query = { ...this.getRouteQuery(), ...newQuery };
    if (forceReload) {
      const search = qs.stringify(query);
      location.href = `${location.pathname}?${search}`;
    } else {
      this.router.replace({ query });
    }
  }

  public removeQuery(removeKeys: string[], forceReload = false) {
    const query = { ...this.getRouteQuery() };
    for (const k of removeKeys) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete query[k];
    }
    if (forceReload) {
      const search = qs.stringify(query);
      location.href = `${location.pathname}?${search}`;
    } else {
      this.router.replace({ query });
    }
  }

  public addQuery(newQuery: any, forceReload = false) {
    const query = { ...this.getRouteQuery(), ...newQuery };
    if (forceReload) {
      const search = qs.stringify(query);
      location.href = `${location.pathname}?${search}`;
    } else {
      this.router.replace({ query });
    }
  }

  public reload() {
    // @ts-expect-error 有的浏览器不支持reload参数
    top?.location.reload(true);
  }

  public reloadHome() {
    top?.location.replace('/');
  }
}
