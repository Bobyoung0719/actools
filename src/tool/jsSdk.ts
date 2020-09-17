(<any>window).isContainer = false;

(<any>window).nativeCall = res => {

  // 判断是不是app容器
  (<any>window).isContainer = () => true;

  console.log('来自native的反馈：', res);
}

interface Params {
  method: String,
  params: Object,
  callBack?: Function 
};

// 向natinve注册信息
function execMsg(data) {
  if(isContainer) {

    const json = JSON.stringify(data);

    JsBridge.postMessage(json);
  } else {
    console.log('非app环境不能使用native方法！');
  }
}

/**
 * 
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
 * 
 * @param param0 
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


