#!/usr/bin/env node
// 首页内容同步：把 ranpin/ranpin 的 profile README 抓成首页的唯一内容源。
//
// 单一事实源 = https://github.com/ranpin/ranpin/blob/main/README.md
// 改 README 即可，首页在下次构建时自动跟上（deploy.yml 另有每日定时重建）。
//
// 抓取失败（离线 / 网络受限）时沿用仓库里已提交的副本，保证构建不会断；
// 只有在「抓取失败且没有副本」时才硬失败。
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SRC = 'https://raw.githubusercontent.com/ranpin/ranpin/main/README.md';
const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../content/home-readme.md',
);

// 正常 README 有 2000 字符上下；低于此值视为抓到了错误页（如限流/重定向 HTML）。
// 注意 text.length 是 UTF-16 码元数（≈字符数），不是磁盘字节数——中文每字 3 字节。
const MIN_CHARS = 400;

try {
  const res = await fetch(SRC, {
    signal: AbortSignal.timeout(20_000),
    headers: { 'cache-control': 'no-cache' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  if (text.length < MIN_CHARS) {
    throw new Error(`内容过短（${text.length} 字符），疑似抓到错误页`);
  }
  // 抓到的必须是 markdown 而不是 HTML 错误页
  if (/^\s*<!doctype html/i.test(text)) {
    throw new Error('抓到的是 HTML 而非 markdown');
  }
  writeFileSync(OUT, text);
  console.log(`[sync-home] README 已同步（${text.length} 字符）`);
} catch (err) {
  if (existsSync(OUT)) {
    const cur = readFileSync(OUT, 'utf8');
    console.warn(
      `[sync-home] 抓取失败（${err.message}），沿用已提交副本（${cur.length} 字符）`,
    );
  } else {
    console.error(`[sync-home] 抓取失败且无已提交副本：${err.message}`);
    process.exit(1);
  }
}
