declare global {
  interface Window {
    // 在window上挂一些第三方属性
    Sentry: any;
    __bl: any;
    analysisSdk: any;
    recreateWechatLogin: any;
    navigation: any;
    BASE_URL: any;
  }

  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_KEY: string | undefined;
      REACT_APP_API_URL: string | undefined;
    }
  }

  declare const TencentCaptcha: any;

  declare const WxLogin: any;

  declare const __PROD__: boolean;

  type ThisIsAGlobalType = string;
}
