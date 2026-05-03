
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-32CYCKXV.js"
    ],
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 674, hash: '45a7f5b46b04e404b04331224bce026bbb5b8b76376379cd8c34019392bfe95f', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1001, hash: 'eaa6ca4db5afe3578296643ca5ca6e21330f50419ad036339ff6c3449b378407', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 48640, hash: '0d974b7c862a953b1b6e12097d6de6505ca3e743ad72b663ca0460b5bbea07d9', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NVIGBHXU.css': {size: 17451, hash: 'iNpOs4YNZXM', text: () => import('./assets-chunks/styles-NVIGBHXU_css.mjs').then(m => m.default)}
  },
};
