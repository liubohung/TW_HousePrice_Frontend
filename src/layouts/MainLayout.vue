<template>
  <!-- 外層版型：維持簡潔，只強化視覺風格與一致性 -->
  <q-layout view="hHh lpR fFf" class="tech-bg">
    <!-- 半透明霓虹 Header -->
    <q-header elevated class="glass-header">
      <q-toolbar class="q-py-sm">

        <!-- 左：首頁連結 -->
        <router-link
          to="/"
          aria-label="前往首頁"
          class="neon-title-link row items-center no-wrap text-decoration-none"
        >
          <q-icon name="insights" size="28px" class="neon-icon q-mr-sm" aria-hidden="true" />
          <span class="neon-title">不動產交易趨勢</span>
        </router-link>

        <!-- 中間留白 -->
        <q-space />

        <!-- 右：導覽（改為文字連結風格） -->
        <div class="row items-center nav-wrap">
          <router-link
            to="/visualizeTrend"
            aria-label="前往視覺化"
            class="nav-link text-decoration-none"
          >
            臺灣房價視覺化
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <!-- 內容區 -->
    <q-page-container class="page-grid">
      <router-view />
    </q-page-container>

    <!-- 底部 -->
    <q-footer class="glass-footer text-center q-py-sm">
      © 2025 TW HousePrice
    </q-footer>
  </q-layout>
</template>

<style scoped lang="scss">
/* ===== 全域色系 ===== */
:root {
  --bg: #0b0f14;
  --border: rgba(100, 181, 246, 0.18);
}

/* ===== 背景格網 ===== */
.tech-bg {
  background:
    radial-gradient(1200px 400px at 10% -10%, rgba(124, 77, 255, 0.08), transparent),
    radial-gradient(800px 300px at 100% 0%, rgba(0, 229, 255, 0.08), transparent),
    var(--bg);
}
.page-grid { position: relative; }
.page-grid::before {
  content: "";
  position: absolute; inset: 0;
  background:
    linear-gradient(transparent 95%, rgba(255,255,255,0.04) 100%) 0 0/24px 24px,
    linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.04) 100%) 0 0/24px 24px;
  pointer-events: none;
  z-index: 0;
}
.page-grid > * { position: relative; z-index: 1; }

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

/* ===== 霓虹標題連結 ===== */
.text-decoration-none { text-decoration: none; color: inherit; }

.neon-title {
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg,#b3e5fc,#d1c4e9);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  transition: transform .14s ease, filter .14s ease, text-shadow .14s ease;
}
.neon-title-link { padding: 4px 6px; border-radius: 10px; }
.neon-title-link:hover .neon-title {
  transform: scale(1.05);
  filter: brightness(1.1);
  text-shadow:
    0 0 6px rgba(179,229,252,0.45),
    0 0 12px rgba(179,229,252,0.25);
}
.neon-icon { color: #80deea; transition: transform .14s ease, filter .14s ease; }
.neon-title-link:hover .neon-icon { transform: translateY(-1px); filter: brightness(1.08); }

/* ===== 導覽連結（與首頁風格一致，但使用亮色文字） ===== */
.nav-wrap { gap: 14px; }

.nav-link {
  font-size: 16px;
  font-weight: 500;
  color: #b3e5fc;
  transition: transform .14s ease, filter .14s ease, text-shadow .14s ease;
}
.nav-link:hover {
  transform: scale(1.05);
  filter: brightness(1.15);
  text-shadow:
    0 0 6px rgba(179,229,252,0.45),
    0 0 12px rgba(179,229,252,0.25);
}

/* ===== RWD ===== */
@media (max-width: 600px) {
  .neon-title { font-size: 16px; }
  .nav-link { font-size: 14px; }
}
</style>
