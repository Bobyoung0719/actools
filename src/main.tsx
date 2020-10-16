import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from './components/Dialog';
import Toast from './components/Toast';
import Mask from './components/Mask';
import Empty from './components/Empty';
import Share from './components/Share';
import Loading from './components/Loading';
import AlexPulling from './components/AlexPulling';

import http from './tool/http';
import { pageInit, onAppear } from './tool/jsSdk';

const btn = ['test-dialog', 'test-toast', 'test-mask', 'test-loding', 'test-share', 'go-login'];

const {useEffect} = React;
function App() {
  const [dialogMsg, setDialog] = React.useState(null);
  const [toastMsg, setToast] = React.useState(null);
  const [maskMsg, setMask] = React.useState(false);
  const [loadingMsg, setLoading] = React.useState(false);

  const [shareVisible, setShareVisible] = React.useState(false);

  function setTestContent(val) {
    switch (true) {
      case val == 'test-dialog':
          setDialog(val);
        break;
      
      case val == 'test-toast':
        setToast(val)
      break;

      case val == 'test-mask':
        setMask(!maskMsg)
      break;

      case val == 'test-loding':
        setLoading(!loadingMsg)
      break;

      case val == 'test-share':
        setShareVisible(!shareVisible)
      break;

      case val == 'go-login':

        window.location.href = `http://118.25.154.99/login?backUrl=${location.href}`
      break;

      default:
        break;
    }
  }

  function handlePull(success) {
    setTimeout(() => {
      success('下拉刷新完成！！！')
    }, 1000);

  }

  useEffect(() => {
    async function init() {
      // get
      const dq = await http(`${location.origin}/ybbApi/loginStatus`)

      console.log(dq, '=====111111111');

      // post
      // const data = await http(`${location.origin}/ybbApi/postList`, {dishId: 10000}, 'post')

      // console.log(data, '====');
    }
    init();

    onAppear(visible => {
      console.log('visible', visible);
    })
  }, [])

  function handleShare(type) {

  pageInit({url: 'https://www.gjzq.cn', user: 'alex_young'});
    // 暂时没有介入微信分享，只能做复制链接手动分享
    const input = document.createElement('input')
    document.body.appendChild(input);
    input.setAttribute('value', `${location.href}?shareType=${type}`);
    input.select();

    if (document.execCommand('copy')) {
      document.execCommand('copy')
      setToast('复制链接成功');

      setTimeout(() => {
        setShareVisible(false);
      }, 10);
    }
  }

  return <>
    <Dialog 
      content={dialogMsg}
      onAction={() => setDialog(null)}
    />

    <Toast 
      content={toastMsg}
      onHide={() => setToast(null)}
    />

    <Mask 
      visible={maskMsg}
      onMask={() => console.log('object')}
    />

    <Loading 
      visible={loadingMsg}
    />    
    <AlexPulling 
      onRefresh={handlePull}
    >
      {btn.map(v => 
        <button 
          key={v}
          className="test-btn"
          style={{
            padding: '10px', 
            color: '#f00',
            fontSize: '14px',
            margin: '5px 10px'
          }}
          onClick={() => setTestContent(v)}
        >{v}</button>  
      )}
      <Empty />
     
    </AlexPulling>
    <Share 
      visible={shareVisible}
      onAction={handleShare}
    />
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
