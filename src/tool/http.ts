import * as axios from 'axios';
 
async function http(reqUrl: string, params: object = {}, methods: string = 'get') {

  try {
    const { data = {}, status } = await axios[methods](reqUrl, params);

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