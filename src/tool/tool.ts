import http from './http';

/**
 * @param raw 真实的像素值
 * @param defaultSize 默认的fontSize 一般是按750设计稿
 */

export function px(raw, defaultSize = 75) {
  const htmlFontSize = document.documentElement.style.fontSize;
  const realSize = +htmlFontSize.substring(0, htmlFontSize.length - 2);

  if(realSize === defaultSize) {
    return raw;
  }

  return (realSize * raw) / defaultSize;
}

// 是不是生产环境
export const isProd = (location.hostname !== 'localhost');

/**
 * 检查登录
 */

export function checkLogin() {
  return http(`${location.origin}/ybbApi/loginStatus`)
}