// Google Translate 代理（translate.goog）—— 全站中英文切换。
// 站点经 https://<点换横线的域名>.translate.goog/... 代理，带 _x_tr_* 参数即整页机翻。
// 所有纯函数都做了 SSG 安全处理（无 window 时返回中性值）；组件里凡依赖「当前是否在
// 代理域」的渲染，一律走 useTranslateProxy()（挂载后再判定），避免 SSG/水合不一致。

import { useEffect, useState } from 'react';

const PROXY_SUFFIX = '.translate.goog';
const SOURCE_LANG = 'zh-CN';

/** 当前文档是否由 translate.goog 代理提供（即处于英文/目标语模式）。 */
export const isOnTranslateProxy = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.host.endsWith(PROXY_SUFFIX);
};

/** 从 _x_tr_tl 参数取目标语言，缺省 en。 */
export const translateTargetLang = (): string => {
  if (typeof window === 'undefined') return 'en';
  return new URLSearchParams(window.location.search).get('_x_tr_tl') || 'en';
};

/**
 * React hook：挂载后再解析代理状态。
 * SSG 与首帧渲染都返回中性值（onProxy=false），与预渲染 HTML 一致；
 * 在 translate.goog 上挂载后 useEffect 置真并触发一次重渲染。
 */
export function useTranslateProxy(): { onProxy: boolean; lang: string } {
  const [state, setState] = useState({ onProxy: false, lang: 'en' });
  useEffect(() => {
    setState({ onProxy: isOnTranslateProxy(), lang: translateTargetLang() });
  }, []);
  return state;
}

/** 去掉查询串里的 _x_tr_* 参数。 */
const stripTranslateParams = (search: string): string => {
  const params = new URLSearchParams(search);
  for (const key of Array.from(params.keys())) {
    if (key.startsWith('_x_tr_')) params.delete(key);
  }
  const s = params.toString();
  return s ? `?${s}` : '';
};

/** 当前页 → 其 translate.goog 代理（中文→英文），保留 path/query/hash。 */
export const buildTranslateUrl = (): string => {
  const { host, pathname, search, hash } = window.location;
  const proxy = host.replace(/\./g, '-') + PROXY_SUFFIX;
  const sep = search ? '&' : '?';
  return `https://${proxy}${pathname}${search}${sep}_x_tr_sl=${SOURCE_LANG}&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wv${hash}`;
};

/** translate.goog 代理 → 原始页（回中文），保留 path/hash、剥掉 _x_tr_* 参数。 */
export const buildOriginalUrl = (): string => {
  const { host, pathname, search, hash } = window.location;
  const orig = host.slice(0, -PROXY_SUFFIX.length).replace(/-/g, '.');
  return `https://${orig}${pathname}${stripTranslateParams(search)}${hash}`;
};

/**
 * 子站 iframe 的 src。英文（代理）模式下把 iframe 指向子站自己的 translate.goog
 * 地址，使内嵌的文档/简历也被翻译；否则返回普通相对地址（与原行为一致）。
 *   path       如 '/edge-ai-docs/'
 *   extraQuery 如 'embed=1'（不带前导 ?），可为空串
 *   onProxy/lang 来自 useTranslateProxy()
 */
export const subSiteSrc = (
  path: string,
  extraQuery: string,
  onProxy: boolean,
  lang: string,
): string => {
  if (!onProxy) return extraQuery ? `${path}?${extraQuery}` : path;
  const host = window.location.host; // 已是代理域
  const trParams = `_x_tr_sl=${SOURCE_LANG}&_x_tr_tl=${lang}&_x_tr_hl=${lang}&_x_tr_pto=wv`;
  const joined = extraQuery ? `${extraQuery}&${trParams}` : trParams;
  return `https://${host}${path}?${joined}`;
};
