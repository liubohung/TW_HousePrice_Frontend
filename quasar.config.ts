// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers';
import { fileURLToPath } from 'node:url';
import type { OutputChunk, OutputAsset } from 'rollup';

// 無效字元處理
const INVALID_CHAR_REGEX: RegExp = /[\x00-\x1F\x7F<>*#"{}|^[\]`;?:&=+$,]/g;
const DRIVE_LETTER_REGEX: RegExp = /^[a-z]:/i;

// 檔案名稱清理函數
const sanitizeFileName = (name: string): string => {
  // 移除開頭的底線和其他無效字元
  return name.replace(/^_+/, '').replace(INVALID_CHAR_REGEX, '');
};

export default defineConfig((ctx) => {
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    // preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: ['i18n', 'axios'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#css
    css: ['app.scss'],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v7',
      // 'fontawesome-v6',
      // 'eva-icons',
      // 'themify',
      // 'line-awesome',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons', // optional, you are not bound to it
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        // Defines an alias for the './src' directory to simplify imports.
        // You can use '@' in your import paths to reference files in the 'src' directory.
      },
    },
    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#build
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        vueRouterMode: 'history',
        node: 'node20',
      },

      typescript: {
        strict: true,
        vueShim: true,
        // extendTsConfig (tsConfig) {}
      },

      vueRouterMode: 'hash', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

      // publicPath: '/',
      publicPath: process.env.NODE_ENV === 'production' ? '/TW_HousePrice_Frontend/' : '/', // for GitHub Pages deployment

      emptyOutDir: true,

      rollupOptions: {
        output: {
          sanitizeFileName(name: string): string {
            const match: RegExpExecArray | null = DRIVE_LETTER_REGEX.exec(name);
            const driveLetter: string = match ? match[0] : '';
            const cleanedName = sanitizeFileName(name.slice(driveLetter.length));
            return driveLetter + cleanedName;
          },
          entryFileNames: (chunkInfo: OutputChunk) => {
            // 移除開頭底線和清理檔案名稱
            const cleanName = sanitizeFileName(chunkInfo.name);
            // 確保檔案名稱不為空
            const finalName = cleanName || 'main';
            return `assets/${finalName}-[hash].js`;
          },
          chunkFileNames: (chunkInfo: OutputChunk) => {
            // 取得原始名稱，強制移除所有底線前綴
            let name = chunkInfo.name || 'chunk';

            // 移除所有開頭的底線
            name = name.replace(/^_+/, '');

            // 處理特殊的內部 chunk 名稱
            const nameMap: Record<string, string> = {
              'plugin-vue_export-helper': 'vue-export-helper',
              'plugin-vue-export-helper': 'vue-export-helper',
              'plugin-vue': 'vue-plugin',
              'export-helper': 'vue-helper',
            };

            // 檢查是否需要重新命名
            for (const [pattern, replacement] of Object.entries(nameMap)) {
              if (name.includes(pattern)) {
                name = name.replace(pattern, replacement);
                break;
              }
            }

            // 最終清理
            const cleanName = sanitizeFileName(name);
            const finalName = cleanName || 'chunk';

            console.log(`Chunk: ${chunkInfo.name} -> ${finalName}`); // 調試用

            return `assets/${finalName}-[hash].js`;
          },
          assetFileNames: (assetInfo: OutputAsset) => {
            // 移除開頭底線和清理檔案名稱
            let name = assetInfo.name || 'asset';

            // 強制移除所有開頭的底線
            name = name.replace(/^_+/, '');

            const cleanName = sanitizeFileName(name);
            const finalName = cleanName || 'asset';

            // 取得副檔名
            const ext = name.includes('.') ? name.substring(name.lastIndexOf('.')) : '';
            const nameWithoutExt = ext ? finalName.replace(ext, '') : finalName;

            return `assets/${nameWithoutExt}-[hash]${ext}`;
          },
        },
        // 手動控制 chunk 分割，避免自動生成底線前綴的檔案
        manualChunks(id: string) {
          // Vue 相關
          if (id.includes('node_modules/vue/') || id.includes('node_modules/@vue/')) {
            return 'vue-vendor';
          }
          // Vue Router
          if (id.includes('node_modules/vue-router/')) {
            return 'vue-router';
          }
          // Quasar
          if (id.includes('node_modules/quasar/')) {
            return 'quasar-vendor';
          }
          // Vue i18n
          if (id.includes('node_modules/vue-i18n/') || id.includes('node_modules/@intlify/')) {
            return 'vue-i18n';
          }
          // 處理 Vue 插件輔助函數
          if (id.includes('plugin-vue') && id.includes('export-helper')) {
            return 'vue-helpers';
          }
          // 其他大的第三方庫可以在這裡處理
          if (id.includes('node_modules/') && !id.includes('src/')) {
            return 'vendor';
          }
        },
        // 額外的 Rollup 選項
        treeshake: {
          moduleSideEffects: false,
        },
      },

      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      // viteVuePluginOptions: {},

      // 額外的 Vite 配置來處理檔案命名
      // 非常重要
      extendViteConf(viteConf) {
        // 確保 Vite 也遵循我們的命名規則
        if (!viteConf.build) viteConf.build = {};
        if (!viteConf.build.rollupOptions) viteConf.build.rollupOptions = {};
        if (!viteConf.build.rollupOptions.output) viteConf.build.rollupOptions.output = {};

        // 強制覆蓋任何可能導致底線前綴的設定
        viteConf.build.rollupOptions.preserveEntrySignatures = 'strict';

        // 確保我們的輸出配置不被覆蓋
        const originalOutput = viteConf.build.rollupOptions.output;
        viteConf.build.rollupOptions.output = {
          ...originalOutput,
          // 強制使用我們的命名函數
          chunkFileNames: (chunkInfo: any) => {
            let name = chunkInfo.name || 'chunk';
            name = name.replace(/^_+/, '');

            const nameMap: Record<string, string> = {
              'plugin-vue_export-helper': 'vue-export-helper',
              'plugin-vue-export-helper': 'vue-export-helper',
              'plugin-vue': 'vue-plugin',
              'export-helper': 'vue-helper',
            };

            for (const [pattern, replacement] of Object.entries(nameMap)) {
              if (name.includes(pattern)) {
                name = name.replace(pattern, replacement);
                break;
              }
            }

            const cleanName = sanitizeFileName(name);
            const finalName = cleanName || 'chunk';

            return `assets/${finalName}-[hash].js`;
          },
        };
      },
      vitePlugins: [
        [
          '@intlify/unplugin-vue-i18n/vite',
          {
            // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
            // compositionOnly: false,

            // if you want to use named tokens in your Vue I18n messages, such as 'Hello {name}',
            // you need to set `runtimeOnly: false`
            // runtimeOnly: false,

            ssr: ctx.modeName === 'ssr',

            // you need to set i18n resource including paths !
            include: [fileURLToPath(new URL('./src/i18n', import.meta.url))],
          },
        ],

        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true,
            },
          },
          { server: false },
        ],
      ],
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#devserver
    devServer: {
      // https: true,
      open: true, // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#framework
    framework: {
      config: {},

      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],

      // Quasar plugins
      plugins: ['Meta'],
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: [],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
    //   pwaServiceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    //   bexManifestFile: 'src-bex/manifest.json
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render', // keep this as last one
      ],

      // extendPackageJson (json) {},
      // extendSSRWebserverConf (esbuildConf) {},

      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      pwa: false,
      // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!

      // pwaExtendGenerateSWOptions (cfg) {},
      // pwaExtendInjectManifestOptions (cfg) {}
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      // swFilename: 'sw.js',
      // manifestFilename: 'manifest.json',
      // extendManifestJson (json) {},
      // useCredentialsForManifestTag: true,
      // injectPwaMetaTags: false,
      // extendPWACustomSWConf (esbuildConf) {},
      // extendGenerateSWOptions (cfg) {},
      // extendInjectManifestOptions (cfg) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true,
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf) {},
      // extendElectronPreloadConf (esbuildConf) {},

      // extendPackageJson (json) {},

      // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
      preloadScripts: ['electron-preload'],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',
        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'tw-houseprice-frontend',
      },
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      // extendBexScriptsConf (esbuildConf) {},
      // extendBexManifestJson (json) {},

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: [],
    },
  };
});
