<template>
  <q-page class="q-pa-xl">
    <h1 class="q-mt-none">資料處理流程</h1>

    <h2>原始讀取</h2>
    <ol>
      <li>讀取 <code>real_estate_buy.csv</code>；檢視 <code>tail(1)</code> 與 <code>shape</code>。</li>
      <li>檢視 <code>交易標的</code> 分佈；關注缺失與極端值。</li>
    </ol>

    <h2>缺失檢查</h2>
    <ol>
      <li><code>missingno.matrix</code> 與 <code>isna().sum()</code> 檢視缺失。</li>
    </ol>

    <h2>特徵工程</h2>
    <ol>
      <li>新增 <code>總價區間</code> 分段。</li>
      <li>依標的補 <code>單價元平方公尺</code>（土地/建物/房地/工廠/車位）。</li>
      <li>刪除仍為 NA 的列。</li>
    </ol>

    <h2>區域統計與坪價轉換</h2>
    <ol>
      <li>群組鍵：<code>年度, 季別, 縣市, 鄉鎮市區, 建物型態, 總價區間, 交易標的</code>。</li>
      <li>統計 <code>size, mean, max, min, median</code> → <code>區域均價_*</code>。</li>
      <li>除 <code>_size</code> 外乘以 <code>3.30579</code> 換算坪價，四捨五入 3 位。</li>
      <li>輸出 <code>real_estate_buy_area_average.csv</code>（UTF-8 BOM）。</li>
    </ol>
  </q-page>
</template>

<script setup lang="ts">
import { useMeta } from 'quasar';

useMeta({
  title: '台灣房價 | 資料處理流程',
  meta: {
    description: { name: 'description', content: '從原始資料到區域統計與坪價換算的完整處理流程。' },
    ogTitle: { property: 'og:title', content: '台灣房價 | 資料處理流程' },
  },
  link: {
    canonical: { rel: 'canonical', href: 'https://your-domain.example/docs' },
  },
  script: {
    ldjson: {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: '資料處理流程',
        about: ['房價', '台灣', 'Tableau', '資料處理'],
        url: 'https://your-domain.example/docs',
      }),
    },
  },
});
</script>
