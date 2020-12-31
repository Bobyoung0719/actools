import './main.scss';
import Dialog from './components/Dialog';
import Toast from './components/Toast';
import Mask from './components/Mask';
import Loading from './components/Loading';
import AlexPulling from './components/AlexPulling';

import http from './tool/http';
import { px, isProd, checkLogin } from './tool/tool';
import { toast, setTitle, isContainer, onAppear, goBack, pageInit, login } from './tool/jsSdk';

export {
  px,
  isProd,
  Dialog, 
  Toast, 
  Mask, 
  Loading, 
  AlexPulling, 
  http,
  toast,
  setTitle,
  isContainer,
  onAppear,
  goBack,
  pageInit,
  login,
  checkLogin
};
