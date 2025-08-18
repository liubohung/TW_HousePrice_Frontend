<template>
  <q-page class="q-pa-md tech-bg">
    <!-- Hero -->
    <section class="row items-start items-md-center justify-between q-mb-lg header-wrap">
      <div class="col-12 col-md-auto q-mb-sm q-mb-md-none">
        <div class="row items-center no-wrap">
          <q-icon name="insights" size="34px" class="neon-icon q-mr-sm" />
          <h1 class="q-mt-none q-mb-xs neon-title">臺灣房價視覺化說明</h1>
        </div>
      </div>
    </section>

    <!-- Intro Copy -->
    <section class="neo-card q-pa-md q-mb-lg">
      <div class="neo-card__glow"></div>
      <div class="row items-center q-col-gutter-md">
        <div class="col-12 col-md">
          <h2 class="section-title q-mt-none q-mb-xs">專案概述</h2>
          <p class="section-desc q-mb-sm">
            本站整合內政部不動產交易實價資料，提供各縣市、鄉鎮與建物型態的每坪平均成交單價分佈與趨勢。以
            <strong>Tableau</strong> 進行視覺化。
          </p>
          <div class="row q-col-gutter-sm q-mt-sm  ">
            <div class="col-md-4 ">
              <q-badge outline align="middle" class="pill">實價登錄</q-badge>
              <q-badge outline align="middle" class="pill">視覺化</q-badge>
              <q-badge outline align="middle" class="pill">房價趨勢</q-badge>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-auto">
          <q-btn
            dense unelevated icon="play_circle" label="立即探索"
            color="primary" class="btn-neon"
            to="/visualizeTrend"
          />
        </div>
      </div>
    </section>

    <!-- Feature Grid -->
    <section class="row q-col-gutter-md q-mb-lg">
      <div class="col-12 col-md-4">
        <q-card class="neo-card feature-card">
          <q-card-section class="row items-center no-wrap">
            <q-icon name="map" size="26px" class="neon-icon q-mr-sm" />
            <div class="text-subtitle1 text-weight-medium">區域比較</div>
          </q-card-section>
          <q-separator class="neo-sep" />
          <q-card-section class="text-body2">
            以縣市與鄉鎮維度檢視區域內 房價 中位數、平均值、極值與成交比數，提供使用者掌握房市資訊。
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="neo-card feature-card">
          <q-card-section class="row items-center no-wrap">
            <q-icon name="timeline" size="26px" class="neon-icon q-mr-sm" />
            <div class="text-subtitle1 text-weight-medium">時間序列</div>
          </q-card-section>
          <q-separator class="neo-sep" />
          <q-card-section class="text-body2">
            追蹤年度或季度走勢，辨識結構性變動與房價波動。
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="neo-card feature-card">
          <q-card-section class="row items-center no-wrap">
            <q-icon name="rule" size="26px" class="neon-icon q-mr-sm" />
            <div class="text-subtitle1 text-weight-medium">交易概括</div>
          </q-card-section>
          <q-separator class="neo-sep" />
          <q-card-section class="text-body2">
            提供房屋交易相關訊息，包括區域交易總價、坪數、單價等概覽，協助使用者快速了解市場狀況。
          </q-card-section>
        </q-card>
      </div>
    </section>

    <!-- 如何閱讀圖表（右側按鈕） -->
    <section class="neo-card q-pa-md q-mb-xl">
      <div class="row items-center justify-between q-mb-sm">
        <h3 class="section-title q-mt-none q-mb-none">如何閱讀圖表</h3>
        <div class="row q-gutter-sm">
          
          <q-btn dense flat class="btn-link" color="primary" icon="help_outline" label="補值與清理說明" @click="showHelp = true" />
        </div>
      </div>
      <ul class="readlist q-ml-md q-mb-none">
        <li>請優先檢視<strong>平均數</strong><strong>樣本數</strong>與<strong>中位數</strong>，避免極端值誤導。</li>
        <li>不同條件下，資料會呈現不同趨勢，查看資料圖表時，請注意資料坐標軸單位</li>
        <li>每一個面版展現出不同視角下之檢視，使用者可以根據需求進行深入分析。</li>
      </ul>
    </section>

    <!-- 使用說明 -->
    <section class="neo-card q-pa-md q-mb-lg">
      <div class="row items-start justify-between q-col-gutter-md">
        <div class="col-12 col-md">
          <h3 class="section-title q-mt-none q-mb-xs">使用情境</h3>
          <ol class="readlist q-ml-md q-mb-sm">
            <li>交易概況：可知近年各區域房價走勢，不動產成交總價，以及成交建物等相關資訊，可藉由時間軸選擇年月與季，儀表板會動態呈現資料</li>
            <li>地區概況：可由右方選擇縣市與時間後，選擇鄉鎮，檢視該區域內的總價區間交易比數，以及不同類型房產每坪價格。</li>
            <li>交易時間趨勢：可由右方選擇縣市與建築類型後，了解每坪房價價格變化趨勢，以及該區域內成交比社與成交不動產交易總類與各季每坪交易價格變化</li>
          </ol>
        </div>
      </div>
    </section>

    <!-- 資料來源與更新頻率（使用變數避免 ESLint 警告） -->
    <section class="neo-card q-pa-md q-mb-lg">
      <div class="row items-center justify-between q-mb-sm">
        <h3 class="section-title q-mt-none q-mb-none">資料來源與更新頻率</h3>
        <div class="row items-center q-gutter-xs">
          <q-badge outline class="pill">更新頻率：{{ updateFrequency }}</q-badge>
          <q-badge outline class="pill">最近更新：{{ lastUpdated }}</q-badge>
        </div>
      </div>
      <q-separator class="neo-sep q-my-sm" />
      <div class="row q-col-gutter-md">
        <div v-for="s in sources" :key="s.name" class="col-12 col-md-4">
          <q-card class="term-card">
            <q-card-section class="row items-center no-wrap">
              <q-icon :name="s.icon" size="24px" class="neon-icon q-mr-sm" />
              <div class="text-subtitle2">{{ s.name }}</div>
            </q-card-section>
            <q-card-section class="text-body2">{{ s.desc }}</q-card-section>
            <q-separator class="neo-sep" />
            <q-card-actions align="right">
              <q-btn dense flat color="primary" class="btn-link" :href="s.url" target="_blank" rel="noopener" label="前往" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </section>

    <!-- 名詞解釋 -->
    <section class="neo-card q-pa-md q-mb-lg">
      <h3 class="section-title q-mt-none q-mb-sm">名詞解釋</h3>
      <div class="term-grid">
        <div v-for="t in terms" :key="t.key" class="term-card">
          <div class="row items-center no-wrap q-mb-sm">
            <q-icon name="help_outline" class="neon-icon q-mr-sm" />
            <div class="text-subtitle1 text-weight-medium neon-term">{{ t.term }}</div>
          </div>
          <div class="text-body2 text-grey-3">
            {{ t.desc }}
            <q-icon v-if="t.tip" name="info" size="18px" class="q-ml-xs text-grey-4 cursor-pointer">
              <q-tooltip class="tooltip">{{ t.tip }}</q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
    </section>

    <!-- 限制與注意事項 -->
    <section class="neo-card q-pa-md q-mb-lg">
      <h3 class="section-title q-mt-none q-mb-sm">限制與注意事項</h3>
      <q-list class="neo-list">
        <q-item v-for="n in notices" :key="n.text" dense>
          <q-item-section avatar>
            <q-icon name="warning_amber" class="text-amber-4" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ n.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </section>

    <DataImputationHelp v-model="showHelp" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMeta } from 'quasar';
import DataImputationHelp from 'components/DataImputationHelp.vue';

const showHelp = ref(false);

/** 供畫面使用，避免 ESLint 未使用警告 */
const updateFrequency = ref('每季');
const lastUpdated = ref('2025-08-18');

const sources = ref([
  { name: '內政部不動產交易實價登錄', desc: '主要交易明細與欄位來源。', url: 'https://plvr.land.moi.gov.tw/', icon: 'public' },
  { name: '地政資料開放平台', desc: '行政區界、地籍及空間圖層。', url: 'https://data.gov.tw/', icon: 'layers' },

]);

const terms = ref([
  { key: 'ppu', term: '單價元平方公尺', desc: '以總價除以面積所得的單價，依交易標的選擇分母欄位。', tip: '住宅多以建物面積；僅土地交易則以土地面積。' },
  { key: 'median', term: '中位數', desc: '所有樣本依價格排序後的中間值，比平均數更能抵抗極端值。', tip: '樣本數過少時，中位數仍可能不穩定。' },
  { key: 'ptype', term: '建物型態', desc: '如公寓、華廈、住宅大樓、透天等，用來分群降低異質性。', tip: '不同型態間價格機制差異大，建議分開觀察。' }
]);

const notices = ref([
  { text: '樣本數過少的區域請謹慎解讀，建議檢視樣本數以及歷年交易紀錄' },
  { text: '政策或突發事件可能造成短期異常；請配合時間軸檢視。' },
  { text: '補值規則為保守處理，無法完全替代原始資料缺漏。' },
  { text: '本視覺化僅供使用者進行參考，不負任何法律上之責任。實際情況請依據最新資料進行判斷' }
]);

useMeta({
  title: '臺灣房價視覺化 | 說明',
  meta: {
    description: { name: 'description', content: 'Quasar + Tableau 的台灣房價視覺化說明頁。' },
    ogTitle: { property: 'og:title', content: '臺灣房價視覺化' },
    ogDescription: { property: 'og:description', content: 'SSR + Tableau 嵌入的房價視覺化網站。' }
  },
  link: { canonical: { rel: 'canonical', href: 'https://your-domain.example/' } },
  script: {
    ldjson: {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '臺灣房價視覺化',
        url: 'https://your-domain.example/'
      })
    }
  }
});
</script>

<!-- 全域變數 -->
<style lang="scss">
:root {
  --bg: #0b0f14;
  --glass: rgba(255,255,255,0.06);
  --glass-weak: rgba(255,255,255,0.03);
  --border: rgba(100,181,246,0.18);
  --accent: #80deea;
  --grad-start: #b3e5fc;
  --grad-end: #d1c4e9;
}
html, body { background: var(--bg); }
</style>

<style lang="scss" scoped>
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

/* Header RWD */
.header-wrap { row-gap: 6px; }
.btn-wrap > .q-btn { width: auto; }
@media (max-width: 600px) {
  .neon-title { font-size: 32px; }
  .btn-wrap { width: 100%; }
  .btn-wrap > .q-btn { flex: 1 1 auto; }
  .hide-xs { display: none; }
  .q-page.tech-bg { padding-left: 8px; padding-right: 8px; }
}

/* 霓虹標題與圖示 */
.neon-title {
  font-size: 32px;
  letter-spacing: .4px;
  background: linear-gradient(90deg, var(--grad-start), var(--grad-end));
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
}
.neon-icon { color: var(--accent); }

/* 玻璃卡片 */
.neo-card {
  position: relative;
  background:
    linear-gradient(180deg, var(--glass), var(--glass-weak)),
    radial-gradient(1200px 400px at 10% -10%, rgba(124, 77, 255, 0.10), transparent),
    radial-gradient(800px 300px at 100% 0%, rgba(0, 229, 255, 0.10), transparent);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,.02) inset;
  backdrop-filter: blur(10px);
  color: #e5e7eb;
}
.neo-card__glow {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: 18px;
  pointer-events: none;
  background: radial-gradient(600px 200px at 20% 0%, rgba(129,212,250,.08), transparent 60%),
              radial-gradient(400px 160px at 80% 0%, rgba(179,136,255,.08), transparent 60%);
}

/* 特色卡片尺寸 */
.feature-card { min-height: 146px; }

/* 按鈕樣式 */
.btn-neon {
  box-shadow: 0 0 0 1px rgba(128,222,234,.25) inset, 0 8px 24px rgba(0,0,0,.45);
}
.btn-glass {
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(6px);
}
.btn-link { text-decoration: underline; }

/* 區塊標題與描述 */
.section-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, #d1eaff, #e3d8ff);
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
}
.section-desc { color: #c8d4e3; }

/* 細節 */
.neo-sep { opacity: .5; }
.pill {
  border: 1px solid rgba(255,255,255,.22);
  color: #e5e7eb;
  background: rgba(255,255,255,.06);
  padding: 4px 8px;
  border-radius: 999px;
}
.readlist li { line-height: 1.7; color: #e5e7eb; }

/* 名詞解釋卡片 */
.term-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
}
.term-card {
  background: linear-gradient(180deg, var(--glass), var(--glass-weak));
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 12px 14px;
  box-shadow: 0 8px 20px rgba(0,0,0,.45),
              0 0 0 1px rgba(255,255,255,.05) inset;
  backdrop-filter: blur(8px);
  color: #e5e7eb;
  transition: transform .2s ease, box-shadow .2s ease;
}
.term-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(0,0,0,.55),
              0 0 6px rgba(128,222,234,.35);
}
.neon-term {
  background: linear-gradient(90deg, var(--grad-start), var(--grad-end));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.tooltip {
  background: rgba(0,0,0,.8);
  color: #e5e7eb;
  font-size: 20px;
  border-radius: 6px;
  padding: 4px 6px;
}

/* 列表與連結 */
.neo-list .q-item__label { color: #e5e7eb; }
.link-chip { border-radius: 999px; }
</style>
