/**
 * 用于动态加载第三方脚本
 * 避免在全局加载第三方脚本，因为不是所有页面都依赖这个脚本
 */
export function loadScript(src: string) {
  return new Promise(function (resolve, reject) {
    let shouldAppend = false;
    let el = document.querySelector(
      'script[src="' + src + '"]',
    ) as HTMLScriptElement;
    if (!el) {
      el = document.createElement('script');
      el.type = 'text/javascript';
      el.async = true;
      el.src = src;
      shouldAppend = true;
    } else if (el.hasAttribute('data-loaded')) {
      resolve(el);
      return;
    }

    el.addEventListener('error', reject);
    el.addEventListener('abort', reject);
    el.addEventListener('load', function loadScriptHandler() {
      el.setAttribute('data-loaded', '1');
      resolve(el);
    });

    if (shouldAppend) document.head.appendChild(el);
  });
}
