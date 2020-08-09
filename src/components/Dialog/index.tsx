import * as React from 'react';
import '../Mask';
import './dialog.scss';
import Mask from '../Mask';

interface Props {
  title?: string,
  content: string,
  className?: string,
  btnText?: string,
  children?: any,
  isNeedMask?: boolean,
  onAction?: () => void
}

export default function Dialog(props: Props) {
  const {title, className, btnText, content, children, onAction, isNeedMask} = props;

  const visible = !!content;
  
  return (
    <>
      {isNeedMask && <Mask visible={visible} />}
      <div className={`dialog-box ${className} ${visible ? 'show' : 'hide'}`}>
        {title && <h3 className="title">{title}</h3>}
        {children ? children :
          <>
            <div className="content">
              {content}
            </div>
            <div 
              onClick={onAction}
              className="sure-btn"
            >{btnText}</div>
          </>
        }
      </div>
    </>
  );
};

Dialog.defaultProps = {
  title: '标题',
  isNeedMask: true,
  content: '这里是内容',
  className: '',
  btnText: '我知道了',
  children: null,
  onAction() {
    alert('sure');
  }
};