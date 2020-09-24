// webView创建的时候会建立一个通信通道，会在window注册一个JsBridge

import URI from 'urijs';

(<any>window).nativeCall = res => {
  console.log('来自native的反馈：', res);
}

interface Params {
  method: String,
  params: Object,
  callBack?: Function 
};

// 向natinve注册信息
function execMsg(data) {
  if(isNative) {

    const json = JSON.stringify(data);

    JsBridge.postMessage(json);
  } else {
    console.log('非app环境不能使用native方法！');
  }
}

export function isContainer() {
  let isApp = false;
  
  try {
    isApp = !!JsBridge;
  } catch (error) {
    console.log('非app环境！');
  }

  return isApp;
}

const isNative = isContainer();

/**
 * 设置toast
 * @param params
 * callBack 回调函数
 * duration 持续时间
 * message  toast展示信息
 */
export function toast({ callBack, ...last }) {
  const data:Params = {
    method: 'toast',
    params: {
      duration: last.duration || 1000,
      message: last.message || 'toast'
    }
  };

  callBack && (data.callBack = callBack);

  execMsg(data);
}

/**
 * 设置title
 * @param param
 *  title 标题
 *  color 标题颜色
 *  bgColor 标题背景颜色
 *  leftJs  左边功能函数
 *  leftText 左边文案
 *  rightJs  右侧功能函数
 *  rightText 右侧文案
 */

export function setTitle({ callBack, ...last }) {
  const data:Params = {
    method: 'setTitle',
    params: { ...last }
  }

  callBack && (data.callBack = callBack);

  execMsg(data);
}

/**
 * native login or web login
 */

export function login() {
  if(isNative) {
    execMsg({ method: 'nativeLogin' });
  } else {
    window.location.href = `${location.origin}/login?backUrl=${location.href}`
  }
}

/**
 * 自定义页面跳转
 * @params
 * url 跳转地址
 * isCloseCurPage 是否关闭当前页面，默认false
 */
interface UrlParams {
  url: string,
  [key: string]: any
  isCloseCurPage?: boolean
}
export function pageInit(params: UrlParams) {
  const { url, isCloseCurPage = false, ...lastArgs } = params;

  if(!url) return;

  const uri = new URI(url);
  const newUrl = uri.addQuery(lastArgs).href();

  if(isNative) {
    execMsg({ 
      method: 'pageSkip',
      params: { url: newUrl, isNewWebView: !isCloseCurPage } 
    });
    return;
  } 

  if(url.includes('http')) {
    if(isCloseCurPage) {
      window.location.replace(newUrl);
    } else {
      window.location.href = newUrl;
    }
  }

}