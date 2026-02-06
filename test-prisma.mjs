import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
console.log('DATABASE_URL', process.env.DATABASE_URL);
try {
  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
  const p = new PrismaClient({ adapter });
  console.log('PrismaClient constructed');
} catch (e) {
  console.error('PrismaClient construction error:', e);
}
