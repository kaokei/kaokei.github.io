// https://jscompress.com/

(function () {
  var a = location.pathname.match(/^\/([^/]+)/),
    b =
      a && !/^(hello|world|nihao)$/.test(a[1])
        ? a[1]
        : localStorage.getItem('KEY_BASE') || 'hello';
  window.BASE_URL = a && a[1];
  window.__NUXT__.config.app.baseURL = '/' + b;
})();
