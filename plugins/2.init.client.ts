import 'reflect-metadata';
import { useRootService } from '@kaokei/use-vue-service';
import { defineNuxtPlugin, useRoute, useRouter } from '#imports';
import { RouterService } from '~/services/router.service';
import { UserService } from '~/services/user.service';

export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();
  const router = useRouter();

  const routerService = useRootService(RouterService);
  routerService.setRouter(router);

  const userService = useRootService(UserService);
  // 有些特殊页面不需要加载用户信息
  if (!route.meta?.ignoreUser) {
    // 页面加载时，先尝试加载本地数据，同时请求服务器数据
    // 因为当前用户可能已经登录，但是刷新了页面，此时用户实际已经设置了cookie
    userService.initUserWhenPageLoaded(route.query);
  }
});
