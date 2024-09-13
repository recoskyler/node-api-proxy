# Node API Proxy

This is a simple proxy for APIs that require authentication.

Currently, it supports:

- `GET` requests

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Copy `sample.env` to `.env` and fill in the required variables
4. Run `npm start`

### Using PM2

After doing the above steps, you can use PM2 to run the proxy in the background. Don't forget to set the environment variables in the `ecosystem.config.json` file.

```bash
pm2 start ecosystem.config.json
```

## Usage

To use the proxy, you need to make a request to the proxy server with the following headers:

- `Authorization`: The value of the `AUTH_TOKEN` environment variable.

For example, if the `AUTH_TOKEN` is `secret`, you can make a request to the proxy server like this:

```bash
curl -H "Authorization: secret" http://localhost:5000/api/v1/users
```

## About

By [recoskyler](https://github.com/recoskyler) - 2024, inspired by [this repository](https://github.com/bradtraversy/node-api-proxy-server).
