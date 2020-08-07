import * as React from 'react';
import './mask.scss';

interface Props {
  visible: boolean,
  onMask?: () => void,
  className?: string,
  children?: any
};

export default function Mask(props: Props) {
  const {visible, onMask, className, children} = props;

  return (
    <div 
      onClick={onMask}
      className={`mask-container ${visible ? 'show' : 'hide'} ${className}`}
    >
      {children && children}
    </div>
  );
};

Mask.defaultProps = {
  visible: false,
  children: null,
  className: '',
  onMask() {
    console.log('mask');
  }
}
