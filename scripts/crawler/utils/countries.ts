import axios from 'axios';
import { getDB } from './database';
import chalk from 'chalk';

export async function crawlerCountries() {
  const db = await getDB();
  const url = `${process.env.MOVIE_API}/quoc-gia`;

  const result = await axios.get(url);

  if (result.status !== 200) {
    return console.log(chalk.red('Lỗi khi lấy danh sách quốc gia'));
  }

  const countries = result.data;

  for (const country of countries) {
    const [rows] = await db.execute('SELECT 1 FROM countries WHERE slug = ?', [
      country.slug,
    ]);

    if ((rows as any[]).length === 0) {
      try {
        await db.execute(
          'INSERT INTO countries (name, slug, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
          [country.name, country.slug],
        );
        console.log(chalk.green(`Thêm thành công: ${country.name}`));
      } catch (err) {
        console.log(chalk.red(`Lỗi khi thêm quốc gia: ${err}`));
      }
    } else {
      console.log(chalk.yellow(`Bỏ qua (đã tồn tại): ${country.name}`));
    }
  }
}

export async function findIdCountry(slug: string) {
  const db = await getDB();

  try {
    const [rows] = await db.execute('SELECT id FROM countries WHERE slug = ?', [
      slug,
    ]);

    return (rows as any[])[0].id;
  } catch (error) {
    console.log(`Error finding country: ${error}`);
  }
}
