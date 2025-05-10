import axios, { AxiosInstance } from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';

const axiosCache = new Map<string, AxiosInstance>();

export const createAxiosInstance = (proxy: string): AxiosInstance => {
  const agent = new HttpProxyAgent(proxy);

  return axios.create({
    httpAgent: agent,
    httpsAgent: agent,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
    },
  });
};

export function getAxiosWithProxy(proxy: string): AxiosInstance {
  if (!axiosCache.has(proxy)) {
    axiosCache.set(proxy, createAxiosInstance(proxy));
  }
  return axiosCache.get(proxy)!;
}
