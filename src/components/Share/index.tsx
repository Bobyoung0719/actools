import * as React from 'react';
import Mask from '../Mask';
import './share.scss';

interface Props {
  isMask?: boolean,
  visible: boolean,
  onAction: Function
};

const shareList = [
  { id: 'wx', name: '微信好友', icon: '\ue61a' },
  { id: 'pyq', name: '朋友圈', icon: '\ue65b' },
  { id: 'qq', name: 'QQ好友', icon: '\ue610' }
]

export default function Share(props: Props) {
  const { visible, onAction, isMask } = props;

  return (
    <>
      {isMask && <Mask visible={visible}/>}
      <div className={`share-container ${visible ? 'show' : 'hide'}`}>
        {shareList.map(v => 
          <ul
            key={v.id}
            className="box"
            onClick={() => onAction(v.id)}
          >
            <i className={`iconfont ${v.id}`}>{v.icon}</i>
            <span>{v.name}</span>
          </ul>
        )}
      </div>
    </>
  );
};

Share.defaultProps = {
  isMask: true,
  visible: false,
  onAction(res) {
    console.log(res);
  }
}
