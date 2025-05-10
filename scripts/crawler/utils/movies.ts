import { findIdCountry } from './countries';
import { getDB } from './database';
import chalk from 'chalk';

async function findIdMovieType(slug: string) {
  const db = await getDB();

  try {
    const [rows] = await db.execute(
      'SELECT id FROM movie_types WHERE slug = ?',
      [slug],
    );

    if ((rows as any[]).length === 0) {
      const result = await db.execute(
        `INSERT INTO movie_types(name, slug, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`,
        [slug, slug],
      );

      return (result[0] as any).insertId;
    } else {
      return (rows as any[])[0].id;
    }
  } catch (error) {
    console.log(`Error finding movie type: ${error}`);
  }
}

export async function insertMovie(data: any) {
  const db = await getDB();

  try {
    const [rows] = await db.execute(`SELECT id FROM movies WHERE slug = ?`, [
      data.slug,
    ]);

    if ((rows as any[]).length > 0) {
      console.log(chalk.yellow(`Phim đã tồn tại: ${data.name}`));
      return rows[0].id;
    }

    const movieTypeId = await findIdMovieType(data.type);
    const countryId = await findIdCountry(data.country[0].slug);

    let sql = `
      INSERT INTO movies(name, slug, original_name, content, type_id, status, trailer_url, poster_url, thumb_url, time, episode_current, episode_total, quality, language, year, actor, director, country_id, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;
    let params = [
      data.name,
      data.slug,
      data.origin_name,
      data.content,
      movieTypeId,
      data.status,
      data.trailer_url,
      data.poster_url,
      data.thumb_url,
      data.time,
      data.episode_current,
      data.episode_total,
      data.quality,
      data.lang,
      data.year,
      data.actor.join(', '),
      data.director.join(', '),
      countryId,
    ];

    try {
      const [result] = await db.execute(sql, params);
      console.log(chalk.blue(`Thêm phim ${data.name} thành công`));
      return (result as any).insertId;
    } catch (error) {
      console.log(chalk.red(`Lỗi khi thêm phim: ${error}`));
      console.log(chalk.red(`Dữ liệu: ${JSON.stringify(params)}`));
      throw error;
    }
  } catch (error) {
    console.log(chalk.red(`Lỗi khi kiểm tra phim: ${error}`));
    throw error;
  }
}
