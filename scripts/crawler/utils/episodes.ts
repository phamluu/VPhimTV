import { getDB } from './database';
import chalk from 'chalk';

export async function insertEpisode(
  movieId: string,
  episodeGroup: any[],
  movieName?: string,
) {
  const db = await getDB();

  for (const episodeList of episodeGroup) {
    for (const episode of episodeList.server_data) {
      try {
        const [rows] = await db.execute(
          `SELECT 1 FROM episodes WHERE server_name = ? AND slug = ? AND movie_id = ?`,
          [episodeList.server_name, episode.slug, movieId],
        );

        if ((rows as any[]).length > 0) {
          console.log(
            chalk.yellow(
              `Tập ${episodeList.server_name} - ${episode.slug} của phim ${movieName} đã tồn tại`,
            ),
          );
          continue;
        }

        await db.execute(
          `INSERT INTO episodes (movie_id, server_name, episode_name, slug, file_name, link_embed, link_m3u8, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [
            movieId,
            episodeList.server_name,
            episode.name,
            episode.slug,
            episode.filename,
            episode.link_embed,
            episode.link_m3u8,
            'active',
          ],
        );
        console.log(
          chalk.green(
            `Thêm tập thành công: ${episodeList.server_name} - ${episode.slug} cho phim ${movieName}`,
          ),
        );
      } catch (err) {
        console.log(chalk.red(`Lỗi khi thêm tập: ${err}`));
      }
    }
  }

  console.log(chalk.blue(`Thêm tập phim thành công cho phim ${movieName}`));
}
