import axios from 'axios';
import { getDB } from './database';
import chalk from 'chalk';

export async function crawlerCategories() {
  const db = await getDB();
  const url = `${process.env.MOVIE_API}/the-loai`;

  const result = await axios.get(url);

  if (result.status !== 200) {
    return console.log(chalk.red('Lỗi khi lấy danh sách thể loại'));
  }

  const categories = result.data;

  for (const cat of categories) {
    const [rows] = await db.execute('SELECT 1 FROM categories WHERE slug = ?', [
      cat.slug,
    ]);

    if ((rows as any[]).length === 0) {
      try {
        await db.execute(
          'INSERT INTO categories (name, slug, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
          [cat.name, cat.slug],
        );

        console.log(chalk.green(`Thêm thành công thể loại ${cat.name}`));
      } catch (err) {
        console.log(chalk.red(`Lỗi khi thêm thể loại: ${err}`));
      }
    } else {
      console.log(chalk.yellow(`Bỏ qua (đã tồn tại): ${cat.name}`));
    }
  }
}

export async function insertMovieCategory(
  movieId: string,
  categories: any[],
  movieName?: string,
) {
  const db = await getDB();

  for (const category of categories) {
    try {
      const [rows] = await db.execute(
        'SELECT id FROM categories WHERE slug = ?',
        [category.slug],
      );

      const categoryId = (rows as any[])[0].id;

      const [rows2] = await db.execute(
        `SELECT 1 FROM movie_categories WHERE movie_id = ? AND category_id = ?`,
        [movieId, categoryId],
      );

      if ((rows2 as any[]).length === 0) {
        await db.execute(
          `INSERT INTO movie_categories (movie_id, category_id, created_at, updated_at) VALUES (?, ?, NOW(), NOW())`,
          [movieId, categoryId],
        );

        console.log(
          chalk.green(
            `Thêm thành công thể loại ${category.name} vào phim ${movieName}`,
          ),
        );
      } else {
        console.log(
          `Thể loại ${category.name} đã tồn tại trong phim ${movieName}`,
        );
      }
    } catch (err) {
      console.log(`Lỗi khi thêm thể loại phim: ${err}`);
    }
  }

  console.log(chalk.blue(`Thêm thể loại thành công cho phim ${movieName}`));
}
