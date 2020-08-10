import './main.scss';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from './components/Dialog';
import Toast from './components/Toast';
import Mask from './components/Mask';
import Loading from './components/Loading';
import {AlexPulling} from '../dist/tools.es5';


const btn = ['test dialog', 'test toast', 'test mask', 'test loding'];

function App() {
  const [dialogMsg, setDialog] = React.useState(null);
  const [toastMsg, setToast] = React.useState(null);
  const [maskMsg, setMask] = React.useState(false);
  const [loadingMsg, setLoading] = React.useState(false);

  function setTestContent(val) {
    switch (true) {
      case val == 'test dialog':
          setDialog(val);
        break;
      
      case val == 'test toast':
        setToast(val)
      break;

      case val == 'test mask':
        setMask(true)
      break;

      case val == 'test loding':
        setLoading(true)
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
          onClick={() => setTestContent(v)}
        >{v}</button>  
      )}
    </AlexPulling>
  </>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

