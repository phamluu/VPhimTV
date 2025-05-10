import dotenv from 'dotenv';
import path from 'path';
import { exit } from 'process';
import { insertMovie } from './utils/movies';
import { readHistory, writeHistory } from './utils/logger';
import axios, { AxiosInstance } from 'axios';
import { crawlerCategories, insertMovieCategory } from './utils/categories';
import { insertEpisode } from './utils/episodes';
import { crawlerCountries } from './utils/countries';
import { getProxy } from './utils/proxy';
import { getAxiosWithProxy } from './utils/axios';
import chalk from 'chalk';

dotenv.config({ path: path.join(__dirname, '../../VPhimTV_BE/.env') });

async function retryRequest<T>(
  axiosInstances: (() => Promise<AxiosInstance>)[],
  url: string,
  maxRetries = 3,
  initialDelay = 1000,
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    for (const getInstance of axiosInstances) {
      try {
        const instance = await getInstance();
        const response = await instance.get(url);
        if (response.status === 200) return response.data;
      } catch (err: any) {
        const status = err?.response?.status;
        if (status === 429 || err.code === 'ECONNREFUSED') {
          const delay = initialDelay * attempt;
          console.log(chalk.yellow(`[${status}] Retry sau ${delay}ms`));
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
      }
    }
  }
  throw new Error(`Thất bại khi gọi API sau ${maxRetries} lần`);
}

async function handleCrawlerMovie() {
  let page = 1;
  let slugInfo = '';
  let hashMore = true;
  let proxyIndex = 0;

  const proxies = await getProxy();
  const useProxy = proxies.length > 0;

  const history = await readHistory();

  if (history) {
    page = history.page;
    slugInfo = history.movieInfoSlug;
  }

  while (hashMore) {
    const urlList = `${process.env.MOVIE_API}/danh-sach/phim-moi-cap-nhat-v2?page=${page}&limit=64`;

    try {
      const listResult = await axios.get(urlList);

      if (listResult.status !== 200) {
        console.log(chalk.red('Lỗi khi lấy danh sách phim mới'));
        await writeHistory(page, slugInfo);
        break;
      } else if (listResult.data.items.length === 0) {
        console.log(chalk.blue('Không còn phim mới nào để lấy'));
        await writeHistory(page, slugInfo);
        break;
      }

      const slugs = listResult.data.items.map((item: any) => item.slug);

      for (const slug of slugs) {
        const urlInfo = `${process.env.MOVIE_API}/phim/${slug}`;
        slugInfo = slug;

        await new Promise((resolve) =>
          setTimeout(resolve, Math.random() * 2500 + 500),
        );

        const proxy = useProxy
          ? proxies[proxyIndex % proxies.length]
          : undefined;
        proxyIndex++;

        try {
          const axiosInstance = proxy ? getAxiosWithProxy(proxy) : axios;

          const infoData: any = await retryRequest(
            [async () => axiosInstance, async () => axios],
            urlInfo,
          );

          const episodes = infoData.episodes;
          const categories = infoData.movie.category;
          const movieName = infoData.movie.name;

          const movieId = await insertMovie(infoData.movie);
          await insertMovieCategory(movieId, categories, movieName);
          await insertEpisode(movieId, episodes, movieName);
          console.log(chalk.bgCyan(`Trang hiện tại: ${page}`));
          console.log(chalk.bgCyan(`Phim hiện tại: ${slugInfo}`));
        } catch (e) {
          console.log(chalk.red(`Lỗi khi lấy phim ${slug}`), e);
        }
      }

      page++;
    } catch (err) {
      console.log(chalk.red('Lỗi khi lấy danh sách phim mới'), err);
      await writeHistory(page, slugInfo);
      break;
    }
  }
}

(async () => {
  // await crawlerCategories();
  // await crawlerCountries();
  await handleCrawlerMovie();
  exit(0);
})();
