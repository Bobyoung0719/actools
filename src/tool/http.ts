import * as axios from 'axios';
 
async function http(reqUrl: string, params: object = {}, methods: string = 'get') {

  try {
    const {data = {}, status} = await axios[methods](reqUrl, params);

    if(status == 200) {
      data.status = 200;
      data.message = 'success';
      return data;
    } else {
      return { status, message: 'fail' };
    }
  } catch (err) {
    throw new Error(JSON.stringify(err.message));
  }
}

export default http;