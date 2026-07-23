Hi! Below are the step-by-step instructions for running the task manager API:

- First, create the "node_modules" folder using "npm i";
- Create a .env file and configure your DATABASE_URL, JWT_SECRET, and PORT in it;
- Start the database with "docker compose up -d"
- Generate the Prisma client with "npm prisma generate dev"
- Then run the first migration with "npx prisma generate"

After running these commands, the project is ready to run locally.
