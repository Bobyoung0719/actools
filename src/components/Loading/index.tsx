import * as React from 'react';
import './load.scss';

interface Props {
  visible: boolean,
  text?: string,
  className?: string,
  loadingType?: string
};

/**
 * @param props loadingType
 * spin 顶部loading
 * fullon 全屏有背景
 * fulloff 全屏无背景
 * 
 */

export default function Loading(props: Props) {
  const {visible, text, loadingType, className} = props;

  return (
    <div className={`loading-container ${visible ? 'show' : 'hide'} ${loadingType} ${className}`}>
      <i className={`load-${loadingType} iconfont`}>&#xe6ac;</i>
      {loadingType !== 'fulloff' && <span>{text}</span>}
    </div>
  );
};


Loading.defaultProps = {
  className: '',
  visible: false,
  text: '数据加载中...',
  loadingType: 'spin'
}
