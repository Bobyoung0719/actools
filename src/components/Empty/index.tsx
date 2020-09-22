import * as React from 'react';
import './empty.scss';

interface Props {
  text?: string,
  className?: string
}

export default function Empty(props: Props) {
  const {text, className} = props;

  return (
    <div className={`empty ${className}`}>
      <i className={`iconfont `}>&#xe60b;</i>
      <span>{text}</span>
    </div>
  );
};

Empty.defaultProps = {
  className: '',
  text: '暂无数据...'
}
