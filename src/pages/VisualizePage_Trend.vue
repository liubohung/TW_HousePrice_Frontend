<template>
  <q-page class="q-pa-md tech-bg">
    <!-- Header -->
    <div class="row items-start items-md-center justify-between q-mb-md header-wrap">
      <div class="col-12 col-md-auto q-mb-sm q-mb-md-none">
        <div class="row items-center no-wrap">
          <q-icon name="insights" size="30px" class="neon-icon q-mr-sm" />
          <div>
            <h1 class="q-mt-none q-mb-xs neon-title">不動產交易趨勢</h1>
            <div class="caption text-grey-5 hide-xs">Taiwan Real Estate • Interactive Tableau</div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-auto row items-center q-gutter-sm btn-wrap">
        <q-btn
          dense outline color="primary" icon="help_outline" label="補值與清理說明"
          class="btn-glass col-12 col-sm-auto" @click="showHelp = true"
        />
        <q-btn
          dense unelevated color="primary"
          :icon="isFull ? 'fullscreen_exit' : 'fullscreen'"
          :label="isFull ? '退出全螢幕' : '全螢幕檢視'"
          class="btn-neon col-12 col-sm-auto"
          @click="isFull ? exitFull() : enterFull()"
        />
      </div>
    </div>

    <!-- Viz Card -->
    <div ref="vizWrap" :class="['neo-card', { 'is-full': isFull }]" class="q-pa-sm">
      <div class="neo-card__glow"></div>

      <!-- 全螢幕時顯示 -->
      <q-btn v-show="isFull" round dense icon="close" class="fs-close" @click="exitFull" aria-label="關閉全螢幕" />

      <div class="viz-box">
        <div class="tableauPlaceholder" id="viz1755451162005">
          <noscript>
            <a href="#"><img alt="房價視覺化匯集"
              src="https://public.tableau.com/static/images/_1/_17554288010490/sheet0/1.png" style="border:none" /></a>
          </noscript>
          <object class="tableauViz">
            <param name="host_url" value="https%3A%2F%2Fpublic.tableau.com%2F" />
            <param name="embed_code_version" value="3" />
            <param name="site_root" value="" />
            <param name="name" value="_17554288010490/sheet0" />
            <param name="tabs" value="no" />
            <param name="toolbar" value="yes" />
            <param name="static_image" value="https://public.tableau.com/static/images/_1/_17554288010490/sheet0/1.png" />
            <param name="animate_transition" value="yes" />
            <param name="display_static_image" value="yes" />
            <param name="display_spinner" value="yes" />
            <param name="display_overlay" value="yes" />
            <param name="display_count" value="yes" />
            <param name="language" value="zh-TW" />
          </object>
        </div>
      </div>

      <q-inner-loading :showing="loading">
        <q-spinner size="42px" />
        <div class="q-mt-sm text-grey-5">載入互動視覺中</div>
      </q-inner-loading>
    </div>

    <DataImputationHelp v-model="showHelp" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useMeta } from 'quasar';
import DataImputationHelp from 'components/DataImputationHelp.vue';

const showHelp = ref(false);
const loading = ref(true);
const isFull = ref(false);
const vizWrap = ref<HTMLElement | null>(null);
let ro: ResizeObserver | null = null;

// persist function refs for add/remove
const onOrient = () => fitObject('viz1755451162005');
const onFsChange = () => {
  isFull.value = !!document.fullscreenElement;
  setTimeout(() => fitObject('viz1755451162005'), 50);
};
const onEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isFull.value) void exitFull();
};

useMeta({
  title: '台灣房價視覺化 | Tableau',
  meta: {
    description: { name: 'description', content: '使用 Tableau 呈現台灣房價多維度視覺化。' },
    ogTitle: { property: 'og:title', content: '台灣房價視覺化 | Tableau' }
  },
  link: { canonical: { rel: 'canonical', href: 'https://your-domain.example/visualize' } }
});

function fitObject(wrapId: string) {
  const viz = document.querySelector<HTMLObjectElement>(`#${wrapId} object.tableauViz`);
  if (!viz) return;
  viz.removeAttribute('width');
  viz.removeAttribute('height');
  viz.style.width = '100%';
  viz.style.height = '100%';
}

function injectTableau(wrapId: string) {
  const existed = document.querySelector('script[src="https://public.tableau.com/javascripts/api/viz_v1.js"]');
  const wrap = document.getElementById(wrapId);
  if (!wrap) return;
  const vizElement = wrap.querySelector<HTMLObjectElement>('object.tableauViz');
  if (!vizElement) return;

  if (existed) {
    loading.value = false;
    fitObject(wrapId);
    return;
  }
  const script = document.createElement('script');
  script.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
  script.onload = () => { loading.value = false; fitObject(wrapId); };
  vizElement.parentNode?.insertBefore(script, vizElement);
}

async function enterFull() {
  const el = vizWrap.value;
  if (!el) return;
  try {
    await el.requestFullscreen();
    isFull.value = true;
    setTimeout(() => fitObject('viz1755451162005'), 200);
  } catch { /* ignore */ }
}

async function exitFull() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
  } finally {
    isFull.value = false;
    setTimeout(() => fitObject('viz1755451162005'), 200);
  }
}

onMounted(() => {
  injectTableau('viz1755451162005');

  if (vizWrap.value) {
    ro = new ResizeObserver(() => fitObject('viz1755451162005'));
    ro.observe(vizWrap.value);
  }
  window.addEventListener('orientationchange', onOrient, { passive: true });
  document.addEventListener('fullscreenchange', onFsChange);
  window.addEventListener('keydown', onEsc);
});

onBeforeUnmount(() => {
  ro?.disconnect();
  ro = null;
  window.removeEventListener('orientationchange', onOrient);
  document.removeEventListener('fullscreenchange', onFsChange);
  window.removeEventListener('keydown', onEsc);
});
</script>

<style lang="scss">
:root {
  --bg: #0b0f14;
  --border: rgba(100, 181, 246, 0.18);
}

/* 背景與格網 */
.q-page.tech-bg {
  position: relative;
  min-height: 100%;
  background:
    radial-gradient(1200px 400px at 10% -10%, rgba(124, 77, 255, 0.08), transparent),
    radial-gradient(800px 300px at 100% 0%, rgba(0, 229, 255, 0.08), transparent),
    var(--bg);
}
.q-page.tech-bg::before {
  content: "";
  position: absolute; inset: 0;
  background:
    linear-gradient(transparent 95%, rgba(255,255,255,0.04) 100%) 0 0/24px 24px,
    linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.04) 100%) 0 0/24px 24px;
  pointer-events: none;
}

/* 標題與圖示 */
.neon-title { font-size: 28px; letter-spacing: .4px;
  background: linear-gradient(90deg,#b3e5fc,#d1c4e9); -webkit-background-clip: text; background-clip: text; color: transparent; }
.neon-icon { color: #80deea; }

/* 卡片 */
.neo-card {
  position: relative;
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.02) inset;
  backdrop-filter: blur(10px);
}

/* 全螢幕尺寸：使用 dvw/dvh，Safari 相容寫法 */
.neo-card:is(:fullscreen, .is-full),
.neo-card:-webkit-full-screen {
  inline-size: 100dvw;
  block-size: 100dvh;
  border-radius: 0;
}

/* 視覺容器 */
.viz-box {
  position: relative;       /* 供絕對定位子元素填滿 */
  --ratio: 0.56;
  inline-size: 100%;
  block-size: min(85vh);
  min-block-size: 520px;
}

/* 全螢幕時取消高度限制，改為填滿 */
.neo-card:is(:fullscreen, .is-full) .viz-box,
.neo-card:-webkit-full-screen .viz-box {
  inline-size: 100%;
  block-size: 100%;
  min-block-size: 0;
}

/* 內嵌元素填滿父層 */
.tableauPlaceholder, .tableauViz {
  position: absolute;
  inset: 0;
  display: block;
  inline-size: 100%;
  block-size: 100%;
  border-radius: 12px;
  overflow: hidden;
}

/* Header RWD */
.header-wrap { row-gap: 6px; }
.btn-wrap > .q-btn { width: auto; }
@media (max-width: 1024px) {
  .viz-box {
    --ratio: 0.75;
    block-size: min(78vh, calc(100vw * var(--ratio)));
    min-block-size: 440px;
  }
}
@media (max-width: 600px) {
  .neon-title { font-size: 20px; }
  .btn-wrap { width: 100%; }
  .btn-wrap > .q-btn { flex: 1 1 auto; }
  .hide-xs { display: none; }
  .q-page.tech-bg { padding-left: 8px; padding-right: 8px; }
  .neo-card { border-radius: 14px; }
  .viz-box {
    --ratio: 0.95;
    block-size: min(82vh, calc(100vw * var(--ratio)));
    min-block-size: 380px;
  }
}

/* 全螢幕關閉鈕在右上角 */
.fs-close {
  position: absolute; top: 10px; right: 10px; z-index: 10;
  background: rgba(0,0,0,.35); color: #fff;
}
</style>
