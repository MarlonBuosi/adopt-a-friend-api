# adopt-a-friend-api

to run this project:
  - npm i
  - create a .env based on the example
  - npm run start:dev

this project database is created using a docker postgresql image, also has a docker compose to create a image on your local machine
  - make sure you have docker installed on your machine
  - to create an image: docker compose up -d
  - to stop using the image docker compose stop

migrations:
  - create the model of the table inside the schema.prisma
  - npx prisma migrate dev
  - enter your migration name

check database locally:
  - npx prisma studio
