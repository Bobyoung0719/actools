export default class Tool {
  /**
   * 获取真实像素值
   * @param raw 传入的数值
   * @param defaultSize 设计稿的基准
   */
  static px(raw, defaultSize = 75) {
    const htmlFontSize = document.documentElement.style.fontSize;
    const realSize = +htmlFontSize.substring(0, htmlFontSize.length - 2);

    if(realSize === defaultSize) {
      return raw;
    }

    return (realSize * raw) / defaultSize;
  }
}