Hi! Below are the step-by-step instructions for running the task manager API:

# Run local:

  - First, create the "node_modules" folder using "npm i";
  - Create a .env file and configure your DATABASE_URL, JWT_SECRET, and PORT in it;
  - Start the database with "docker compose up -d"
  - Generate the Prisma client with "npm prisma generate dev"
  - Then run the first migration with "npx prisma generate"

After running these commands, the project is ready to run locally.

# Deploy

We’ll use Render to deploy the application.
Log in to your account or sign up if you don’t have one. Then, click “New” -> Postgres and fill in the following fields:
  - Instance name (I recommend using the name of the application + the database to be used);
  - Database name;
  - Region: Default or another of your choice;
  - Plan: Free; if you plan to use it for other purposes, choose a plan that meets your needs.

Once the database is created, click "Create Database"

Wait a few seconds for the database to be created; the status will change to "Available". Click on Dashboard, and you'll see your newly created database in the list.

## Beekeeper Studio

If you want to connect the database to another database management tool (for example, Beekeeper Studio), you must use the external URL.
  - In Beekeeper, under New Connection, click "Import from URL" and paste the external URL.
  - Check "Enable SSL."
  - If you want to save this connection, enter a name in "Save Connection" and click "Save". You need to leave "Save Passwords" enabled so you don't have to enter your password every time you want to connect.

## Deploying the Node Application

Click New -> Web Service and select your GitHub repository.
Once you’ve done that, verify the following:
  - Web Service Name;
  - Language: Node;
  - Branch: Main;
  - Build Command (in exactly that order!):
    - npm install && npx prisma generate && npm run build && npx prisma migrate deploy
  - npm install: installs the dependencies;
  - npm prisma generate: generate the Prisma client;
  - npm run build: generates the application build;
  - npx prisma migrate deploy: creates the database tables; “deploy” is the name of the migration and indicates that it is for the production environment.
  - Start Command: npm start
  - Plan: Free or another plan of your choice
  - Under "Environment Variables," set the following variables:
    - DATABASE_URL
    - JWT_SECRET
    - PORT
In Environment Variables, set the following variables:
  - DATABASE_URL
  - JWT_SECRET
  - PORT
    Note:
    - For DATABASE_URL, use the internal URL of the database.
    - For JWT_SECRET, use a password of your choice; I recommend using the MD5 Hash Generator website to encrypt this password for greater security.
    - PORT is typically set to 3000 in production.
Finally, click "Deploy Web Service."


