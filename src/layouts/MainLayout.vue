<template>
  <!-- 外層版型：維持簡潔，只強化視覺風格與一致性 -->
  <q-layout view="hHh lpR fFf" class="tech-bg">
    <!-- 半透明霓虹 Header -->
    <q-header elevated class="glass-header">
      <q-toolbar class="q-py-sm">
        <q-icon name="insights" size="28px" class="neon-icon q-mr-sm" aria-hidden="true" />
        <q-toolbar-title class="neon-title">不動產交易趨勢</q-toolbar-title>

        <!-- 右側導覽：保留原路由，套入一致視覺 -->
        <div class="row items-center q-gutter-xs nav-wrap">
          <q-btn
            flat
            dense
            class="btn-glass"
            to="/"
            label="首頁"
            aria-label="前往首頁"
          />
          <q-btn
            dense
            unelevated
            class="btn-neon"
            to="/visualizeTrend"
            label="視覺化"
            aria-label="前往視覺化"
          />
        </div>
      </q-toolbar>
    </q-header>

    <!-- 內容區：保留 router-view，提供細格網背景 -->
    <q-page-container class="page-grid">
      <router-view />
    </q-page-container>

    <!-- 底部：極簡置中，與主色調一致 -->
    <q-footer class="glass-footer text-center q-py-sm">
      © 2025 TW HousePrice
    </q-footer>
  </q-layout>
</template>



<style scoped lang="scss">
/* ===== 全域色系（與 VisualizePage 一致） ===== */
:root {
  --bg: #0b0f14;
  --border: rgba(100, 181, 246, 0.18);
}

/* ===== 背景與細格網 ===== */
.tech-bg {
  background:
    radial-gradient(1200px 400px at 10% -10%, rgba(124, 77, 255, 0.08), transparent),
    radial-gradient(800px 300px at 100% 0%, rgba(0, 229, 255, 0.08), transparent),
    var(--bg);
}
.page-grid {
  position: relative;
}
.page-grid::before {
  content: "";
  position: absolute; inset: 0;
  background:
    linear-gradient(transparent 95%, rgba(255,255,255,0.04) 100%) 0 0/24px 24px,
    linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.04) 100%) 0 0/24px 24px;
  pointer-events: none;
  z-index: 0;
}
.page-grid > * {
  position: relative; z-index: 1; /* 讓內容在格網之上 */
}

/* ===== Header / Footer 玻璃質感 ===== */
.glass-header,
.glass-footer {
  background: linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02));
  border-bottom: 1px solid var(--border);
  backdrop-filter: blur(10px);
}
.glass-footer {
  border-top: 1px solid var(--border);
  border-bottom: none;
}

/* ===== 霓虹標題與圖示 ===== */
.neon-title {
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg,#b3e5fc,#d1c4e9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.neon-icon { color: #80deea; }

/* ===== 導覽按鈕：一深一淺，對比清楚 ===== */
.btn-glass {
  color: #b3e5fc;
  border: 1px solid rgba(179,229,252,0.25);
  background: rgba(255,255,255,0.04);
  backdrop-filter: blur(6px);
  padding: 2px 12px;
  border-radius: 10px;
  transition: transform .12s ease, background-color .12s ease;
}
.btn-glass:hover { transform: translateY(-1px); background: rgba(255,255,255,0.06); }

.btn-neon {
  color: #0b0f14;
  background: linear-gradient(90deg, #81d4fa, #b39ddb);
  border: 1px solid rgba(255,255,255,0.12);
  padding: 4px 14px;
  border-radius: 10px;
  transition: transform .12s ease, filter .12s ease;
  box-shadow: 0 4px 14px rgba(129,212,250,0.25);
}
.btn-neon:hover { transform: translateY(-1px); filter: brightness(1.03); }

/* ===== RWD 微調 ===== */
@media (max-width: 600px) {
  .neon-title { font-size: 16px; }
  .nav-wrap { margin-left: auto; } /* 在小螢幕仍靠右 */
}
</style>
