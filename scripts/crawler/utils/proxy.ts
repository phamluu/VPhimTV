import axios from 'axios';
import { HttpProxyAgent } from 'http-proxy-agent';
import chalk from 'chalk';
import pLimit from 'p-limit';

const limit = pLimit(10);

const testProxy = async (proxy: string): Promise<boolean> => {
  try {
    const agent = new HttpProxyAgent(proxy);
    const response = await axios.get('https://httpbin.org/ip', {
      httpAgent: agent,
      httpsAgent: agent,
      timeout: 3000,
    });

    console.log(chalk.green(`[✔️ Proxy sống]: ${proxy}`));
    return response.status === 200;
  } catch {
    console.log(chalk.red(`[❌ Proxy chết]: ${proxy}`));
    return false;
  }
};

export async function getProxy(): Promise<string[]> {
  const timeout = 500;
  const url = `https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&protocol=http&proxy_format=protocolipport&format=text&timeout=${timeout}`;
  // const url = `https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies&country=vn&protocol=http&proxy_format=protocolipport&format=text&timeout=${timeout}`;
  const response = await axios.get(url);

  if (response.status !== 200) {
    console.log(chalk.red('Lỗi khi lấy danh sách proxy'));
    return [];
  }

  console.log('Tổng proxy:', response.data.split('\n').length);

  const rawProxies = response.data
    .split('\n')
    .map((p: string) => p.trim())
    .filter(Boolean);

  const results = await Promise.all(
    rawProxies.map((proxy) =>
      limit(async () => {
        const isAlive = await testProxy(proxy);
        return isAlive ? proxy : null;
      }),
    ),
  );

  return results.filter(Boolean) as string[];
}
