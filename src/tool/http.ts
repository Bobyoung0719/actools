import * as axios from 'axios';

interface reqParams {
  [key: string]: any
};
 
async function http(reqUrl: string, params?:reqParams) {
  try {
    let { token, method = 'get', ...lastParams } = params;  

    // 针对使用nestjs作为服务请求层，auth认证需要在headers中添加一个Authorization字段，且值为token
    if(token) {
      lastParams.headers = { Authorization: `Bearer ${token}` };
    }

    const { data = {}, status } = await axios[method](reqUrl, lastParams);

    if(+status < 300) {
      return {
        result: data,
        code: status,
        message: 'Request succeeded!'
      };
    } else {
      return { code: status, message: 'Request Fail', result: '' };
    }
  } catch (err) {
    throw new Error(JSON.stringify(err.message));
  }
}

export default http;