import * as axios from 'axios';
 
async function http(params: object = {}, reqUrl: string, methods: string = 'get') {

  try {
    const {data = {}, status} = await axios[methods](reqUrl, params);

    if(status == 200) {
      data.status = 200;
      data.message = 'success';
      return data;
    } else {
      return {status, message: 'fail'}
    }
  } catch (err) {
    throw new Error(JSON.stringify(err.message));
  }
}

export default http;