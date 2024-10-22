import needle from 'needle';
import 'dotenv/config';
import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL ?? '';
const API_KEY_QUERY_PARAM = process.env.API_KEY_QUERY_PARAM ?? '';
const API_KEY = process.env.API_KEY ?? '';

const router = async (req, res, next) => {
  try {
    const query = req.url.split('?').pop();
    const params = req.params[0];
    const method = {
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'delete',
      PATCH: 'patch',
      OPTIONS: 'options',
    }[req.method] ?? 'get';
    const hasBody = method === 'post' || method === 'put' || method === 'patch';

    const url = `${API_BASE_URL}/${params}?${query}&${API_KEY_QUERY_PARAM}=${API_KEY}`;

    if ( ( req.method ?? 'get' ).toUpperCase() === 'POST' ) {
      console.log( 'POST request to', params, query );

      const body = typeof req.body === 'string'
        ? JSON.parse( req.body )
        : req.body;

      const apiRes = await axios.post( url, body, {
        validateStatus: () => true,
        headers: {
          'Content-Type': 'application/json',
        },
      } );

      res.status( apiRes.status ).json( apiRes.data );
    } else {
      console.log( method.toUpperCase(), 'request to', params, query );

      const apiRes = await needle( method, url, hasBody ? req.body : undefined, hasBody ? { json: true } : undefined );

      res.status( apiRes.statusCode ?? 200 ).json( apiRes.body );
    }
  } catch (error) {
    next(error);
  }
};

export default router;
