# Adopt-a-Friend API

API to manage pet registration and adoption, connecting NGOs (ORGs) with people interested in adopting.

---

## Features

- Register pets for adoption
- List available pets by city
- Filter pets by characteristics (optional)
- View pet details
- Register NGOs (ORGs)
- NGO login

---

## Business Rules

- City is required to list pets
- An ORG must have an address and WhatsApp number
- Every pet must be linked to an ORG
- Adoption contact is made via the ORG's WhatsApp
- All filters except city are optional
- Only logged-in ORGs can access administrative features

---

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/adopt-a-friend-api.git
   cd adopt-a-friend-api
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env` file with the required settings (e.g., database, JWT secret, etc).

4. **Start the application:**
   ```sh
   npm run start:dev
   ```

---

## Running Docker Compose

If you want to start the required services (such as the database) using Docker Compose, run:

```sh
npm run docker:dev
```

This will start all services defined in your `docker-compose.yml` file in detached mode.

---

## Database Migrations (Prisma)

To create and apply a new migration using Prisma:

1. **Edit your Prisma schema**

   Update your database schema in the file:
   ```
   prisma/schema.prisma
   ```

2. **Create a new migration**

   Run the following command, replacing `"migration-name"` with a descriptive name:
   ```sh
   npm run migrate:dev -- --name migration-name
   ```
   Example:
   ```sh
   npm run migrate:dev -- --name add-pet-age
   ```

3. **Check the result**

   - Prisma will apply the migration and update your database.
   - Check the `prisma/migrations` folder for the new migration files.

4. **(Optional) Generate Prisma Client**

   If you want to regenerate the Prisma Client after the migration:
   ```sh
   npx prisma generate
   ```

**Tip:**  
To see all available Prisma commands, run:
```sh
npx prisma --help
```

---

## Running and Adding Tests

This project uses [Vitest](https://vitest.dev/) for both unit and end-to-end (e2e) testing.

### Run Unit Tests

To run all unit tests:
```sh
npm test
```

To run unit tests in watch mode (re-runs on file changes):
```sh
npm run test:watch
```

### Run End-to-End (E2E) Tests

To run all e2e tests:
```sh
npm run test:e2e
```

To run e2e tests in watch mode:
```sh
npm run test:e2e:watch
```

### Run Tests with Coverage

To generate a coverage report:
```sh
npm run test:coverage
```

### Test UI

To open the Vitest UI for interactive test running:
```sh
npm run test:ui
```

### Adding New Tests

- **Unit tests:**  
  Place your unit test files in the appropriate directory (commonly `src/__tests__` or similar) and use the `.test.ts` or `.spec.ts` suffix.

- **E2E tests:**  
  Place your e2e test files in the directory configured for e2e tests (commonly `test/e2e` or similar) and use the `.test.ts` or `.spec.ts` suffix.

Refer to the [Vitest documentation](https://vitest.dev/guide/) for more details on writing and organizing tests.

---

## API Documentation

Access the full API documentation via Postman:

[Postman Documentation](https://marlonbuosi-5937812.postman.co/workspace/Marlon-Buosi's-Workspace~a728eca0-b781-4063-8fc5-d4a0ab8979d2/collection/46793449-9c6ce278-a798-4bf7-af07-2dc69d1ac324?action=share&source=copy-link&creator=46793449)

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

## License

This project is licensed under the MIT License.
