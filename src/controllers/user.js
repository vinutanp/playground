import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import uuid from 'uuid';

let prisma;

function getPrisma() {
  if (!prisma) {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
    prisma = new PrismaClient({ adapter });
  }
  return prisma;
}

export async function handleUserInput(req, res) {
    // Debug: log Content-Type and body to diagnose missing body
    console.log('handleUserInput - Content-Type:', req.headers['content-type']);
    console.log('handleUserInput - req.body:', req.body);

    if (!req.body) {
        return res.status(400).json({ error: 'Missing request body' });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'name, email and password are required' });
    }

    try {
        const user = await getPrisma().user.create({
            data: { name, email, password },
        });
        return res.render("home", { user });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

export async function userLogin(req, res) {
    // Debug: log Content-Type and body
    console.log('userLogin - Content-Type:', req.headers['content-type']);
    console.log('userLogin - req.body:', req.body);

    if (!req.body) {
        return res.status(400).json({ error: 'Missing request body' });
    }

    const { username, email, password } = req.body;
    if (!password || (!username && !email)) {
        return res.status(400).json({ error: 'username/email and password are required' });
    }

    try {
        const identifier = username ?? email;
        const user = await getPrisma().user.findFirst({
            where: {
                AND: [
                    { password },
                    {
                        OR: [
                            { name: identifier },
                            { email: identifier }
                        ]
                    }
                ]
            }
        });

        if (user) {
            return res.render("home", { user });
        }

        const sessionToken = uuid.v4();
        return res.status(401).json({ error: "Invalid credentials" });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}