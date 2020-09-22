import * as React from 'react';
import './pull.scss';

interface Props {
  children?: any,
  ponitPos?: number,
  className?: string,
  maxPullDistance?: number,
  onContentScroll?: (params: any) => void,
  onRefresh?: (success: (params: any) => void) => void
};


const {useRef, useEffect} = React;

export default function AlexPulling(props: Props) {
  const {children, ponitPos, onRefresh, maxPullDistance, onContentScroll, className,} = props;
  const {current} = useRef({
    startPos: 0,     // 初始手指的位置
    distance: 0,    // 下拉区域的高度
    sTop: 0,        // 内容区域滚动的高度
    pullDom: null,  // 下拉绑定事件的dom
    tipArea: null,  // 下拉区域的dom
    textDom: null,  // 文字dom
    arrDom: null,   // icon dom
    contentDom: null,  // 内容展示dom
    tipStatusDom: null,  // 加载条dom
  });

  useEffect(() => {
    // 下拉的元素
    current.pullDom = document.getElementById('pull-dom');

    // 滚动区域
    current.contentDom = document.getElementById('content');

    // 下拉刷新区域
    current.tipArea = document.getElementById('tip-area');

    // 刷新状态
    const statusDom = current.tipStatusDom = document.getElementById('tip-status');

    // 文本
    current.textDom = statusDom.getElementsByTagName('span')[0];
    
    // 箭头
    current.arrDom = statusDom.getElementsByTagName('i')[0];

    // 监听内容区域，判断滚动高度视是为了防止没有达到顶部时触发下拉刷新
    current.contentDom.addEventListener('scroll', addScroll);

    // 初始化注册touch事件
    eventPoint(current.contentDom.scrollTop, current.pullDom);
  }, []);

  // 注册scroll时间
  function addScroll(evt) {
    onContentScroll(evt);
    const {scrollTop} = evt.target as HTMLInputElement;

    eventPoint(scrollTop, current.pullDom);
    current.sTop = scrollTop;
  }

  // 注册touch
  function eventPoint(sTop, dom) {
    if(sTop > 0) {
      dom.removeEventListener('touchstart', touchStart);
      dom.removeEventListener('touchmove', touchMove);
      dom.removeEventListener('touchend', touchEnd);
    } else {
      dom.addEventListener('touchstart', touchStart);
      dom.addEventListener('touchmove', touchMove);
      dom.addEventListener('touchend', touchEnd);
    }
  }

  // 触摸事件
  function touchStart(evt) {
    current.arrDom.style.transform = 'rotate(0)';
    current.tipArea.style.transition = 'none';
    current.startPos = evt.touches[0].pageY;
  }

  // 滑动事件
  function touchMove(evt) {
    current.distance = evt.touches[0].pageY - current.startPos;

    // 上划或者下拉到最大高度是不错任何处理
    if(current.distance <= 0 || current.distance > maxPullDistance) return;

    // 改变箭头样式
    current.arrDom.className = 'iconfont arrow';
    current.arrDom.innerHTML = '&#xe659;';

    current.textDom.innerHTML = '下拉刷新';
    current.contentDom.style.overflowY = 'hidden';
    current.tipArea.style.height = current.distance + 'px';

    // 达到临界值更新文本
    if(current.distance >= ponitPos) {
      current.textDom.innerHTML = '释放更新';
      current.arrDom.style.transform = 'rotate(180deg)';
    } 
  }

  // 手指移除事件
  function touchEnd() {
    if(current.distance >= ponitPos) {
      current.arrDom.className = 'iconfont load';
      current.arrDom.innerHTML = '&#xe6ac;';
      current.textDom.innerHTML = '数据更新中...';

      onRefresh(res => {
        current.tipArea.style.transition = 'height .2s ease';
        current.tipArea.style.height = '0';
        current.contentDom.style.overflowY = 'auto';

        console.log(res);
      });
    } else {
      current.tipArea.style.transition = 'height .2s ease';
      current.tipArea.style.height = '0';
      current.contentDom.style.overflowY = 'auto';
    }
  }

  return (
    <div className="alex-pull-box" id="pull-dom">
      <div className={`tip-area ${className}`} id="tip-area">
        <div className="tip-text" id="tip-status">
          <i />
          <span>下拉刷新</span>
        </div>
      </div>
      <div className="alex-content" id="content">
        {children}
      </div>
    </div>
  )
};


AlexPulling.defaultProps = {
  ponitPos: 100,
  className: '',
  maxPullDistance: 200,
  children: <p>下拉刷新组件</p>,
  onRefresh(success = () => {}) {
    success();
  },
  onContentScroll(evt) {
    console.log('on content scroll');
  }
}