<template>
  <q-dialog :model-value="modelValue" @update:model-value="onUpdate">
    <q-card class="neo-card q-pa-none" style="max-width: 760px; width: 96vw">
      <!-- Header -->
      <q-card-section class="row items-center no-wrap neo-header">
        <q-icon name="insights" size="24px" class="neon-icon q-mr-sm" />
        <div class="text-h6 neon-title q-mr-sm">資料補值與清理重點</div>
        <q-space />
        <q-btn dense flat round icon="close" class="text-grey-4" @click="onUpdate(false)" aria-label="關閉" />
      </q-card-section>

      <q-separator class="neo-sep" />

      <!-- Body -->
      <q-card-section class="neo-body">
        <q-timeline color="primary" layout="comfortable" class="neo-timeline">
          <q-timeline-entry title="填補欄位" subtitle="目標：單價元平方公尺（小數三位）">
            <div>僅處理 <code>單價元平方公尺</code> 缺值，依「交易標的」分類計算。</div>
          </q-timeline-entry>

          <q-timeline-entry title="土地">
            <div>公式：<code>總價元 / 土地移轉總面積平方公尺</code></div>
          </q-timeline-entry>

          <q-timeline-entry title="建物">
            <div>公式：<code>總價元 / 建物移轉總面積平方公尺</code></div>
          </q-timeline-entry>

          <q-timeline-entry title="房地(土地+建物)">
            <div>農舍、透天厝：<code>總價元 / 建物移轉總面積平方公尺</code></div>
          </q-timeline-entry>

          <q-timeline-entry title="工廠">
            <div>以土地面積：<code>總價元 / 土地移轉總面積平方公尺</code></div>
          </q-timeline-entry>

          <q-timeline-entry title="車位">
            <div>優先序：
              <ol class="q-ml-md">
                <li><code>總價元 / 土地移轉總面積平方公尺</code></li>
                <li><code>總價元 / 車位移轉總面積(平方公尺)</code></li>
                <li><code>總價元 / 建物移轉總面積平方公尺</code></li>
              </ol>
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="房地(土地+建物)+車位">
            <div>以土地面積：<code>總價元 / 土地移轉總面積平方公尺</code></div>
          </q-timeline-entry>

          <q-timeline-entry title="刪除仍為缺值">
            <div>仍為 NA 的 <code>單價元平方公尺</code> 直接刪除列。</div>
          </q-timeline-entry>

          <q-timeline-entry title="注意事項">
            <ul class="q-ml-md">
              <li>分母須 &gt; 0 才計算。</li>
              <li>多欄位回填時，僅在仍為缺值才進入下一優先來源。</li>
              <li>結果四捨五入至小數三位。</li>
            </ul>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>

      <q-separator class="neo-sep" />


    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>();
function onUpdate(v: boolean) { emit('update:modelValue', v); }
</script>

<style lang="scss" scoped>
:root {
  /* 若外層已定義則沿用，否則提供安全預設 */
  --bg: #0b0f14;
  --glass: rgba(255, 255, 255, 0.06);
  --glass-weak: rgba(255, 255, 255, 0.03);
  --border: rgba(100, 181, 246, 0.18);
  --accent: #80deea;     /* 圖示與強調色，保持可讀性 */
  --grad-start: #b3e5fc; /* 漸層文字起點 */
  --grad-end: #d1c4e9;   /* 漸層文字終點 */
}

/* 玻璃擬態卡片 */
.neo-card {
  position: relative;
  background:
    linear-gradient(180deg, var(--glass), var(--glass-weak)),
    radial-gradient(1200px 400px at 10% -10%, rgba(124, 77, 255, 0.10), transparent),
    radial-gradient(800px 300px at 100% 0%, rgba(0, 229, 255, 0.10), transparent);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,.48), 0 0 0 1px rgba(255,255,255,.02) inset;
  backdrop-filter: blur(10px);
  color: #e5e7eb; /* 高對比文字 */
}

/* Header 條 */
.neo-header {
  padding: 14px 16px;
  background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0));
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
}

/* 漸層標題與圖示 */
.neon-title {
  background: linear-gradient(90deg, var(--grad-start), var(--grad-end));
  -webkit-background-clip: text; background-clip: text;
  color: transparent;
  letter-spacing: .3px;
}
.neon-icon { color: var(--accent); }

/* 分隔線淡化 */
.neo-sep { opacity: .5; }

/* Body 與文字可讀性 */
.neo-body {
  padding: 12px 16px 4px 20px;
  color: #e5e7eb;
}

/* Timeline 視覺 */
.neo-timeline {
  --dot: #26c6da;
}
.neo-timeline .q-timeline__entry {
  filter: drop-shadow(0 1px 0 rgba(0,0,0,.2));
}
.neo-timeline .q-timeline__title {
  color: #e5e7eb;
  font-weight: 600;
}
.neo-timeline .q-timeline__subtitle {
  color: #a5b4c3;
}
.neo-timeline code {
  background: rgba(0,0,0,.35);
  border: 1px solid rgba(255,255,255,.08);
  padding: .04rem .28rem;
  border-radius: 6px;
  color: #e0f2fe;
  font-weight: 500;
}

/* Footer */
.neo-footer {
  padding: 10px 12px;
  background: linear-gradient(0deg, rgba(255,255,255,.03), rgba(255,255,255,0));
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}

/* 玻璃按鈕外框 */
.btn-glass {
  border: 1px solid rgba(255,255,255,.18);
  background: rgba(255,255,255,.04);
  backdrop-filter: blur(6px);
}

/* 強化可讀性：列表縮排與行高 */
ol, ul { line-height: 1.6; }
</style>
