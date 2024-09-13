import needle from 'needle';
import 'dotenv/config';

const API_BASE_URL = process.env.API_BASE_URL ?? '';
const API_KEY_QUERY_PARAM = process.env.API_KEY_QUERY_PARAM ?? '';
const API_KEY = process.env.API_KEY ?? '';

const router = async (req, res, next) => {
  try {
    const query = req.url.split('?').pop();
    const params = req.params[0];

    const url = `${API_BASE_URL}/${params}?${query}&${API_KEY_QUERY_PARAM}=${API_KEY}`;

    const apiRes = await needle('get', url);
    const data = apiRes.body;

    // Log the request to the public API
    if (process.env.NODE_ENV !== 'production') {
      console.log(`REQUEST: ${url}`);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export default router;
