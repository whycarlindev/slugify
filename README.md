# 🔗 Slugify - URL Shortener API

A robust URL shortener API built with **TypeScript**, following **Clean Architecture** and **Domain-Driven Design (DDD)** principles.

## 🎯 About the Project

Slugify is a professional URL shortening service that allows you to create custom short links, track accesses, and manage link validity. The project was developed with a focus on scalability, maintainability, and code quality.

## ✨ Key Features

- 🏗️ **Clean Architecture & DDD**: Clear separation of concerns with domain, application, and infrastructure layers
- 🔐 **Authentication**: Administrative route protection with Basic Auth
- 📊 **Access Tracking**: Analytics system to monitor link clicks
- ⏰ **Temporary Links**: Support for link expiration dates
- 🎨 **Customizable Slugs**: Create personalized or auto-generated URLs
- 🧪 **Automated Testing**: Complete unit test coverage
- 🐳 **Docker Ready**: Containerized development environment
- 📝 **TypeScript Strict**: Complete type-safety throughout the codebase

## 🛠️ Tech Stack

### Core
- **Node.js** + **TypeScript** - Application foundation
- **Fastify** - High-performance web framework
- **Zod** - Schema validation and runtime type-safety

### Database
- **PostgreSQL** - Relational database
- **Knex.js** - Query builder and migrations

### Architecture & Patterns
- **Awilix** - Dependency Injection Container
- **Either Pattern** - Functional error handling
- **Repository Pattern** - Data access abstraction
- **Use Cases** - Isolated business logic

### Quality & Testing
- **Vitest** - Fast and modern testing framework
- **Biome** - High-performance linter and formatter
- **In-Memory Repositories** - Isolated unit tests

### DevOps
- **Docker** + **Docker Compose** - Containerization
- **pnpm** - Efficient package manager

## 📐 Architecture

The project follows a layered architecture inspired by Clean Architecture and DDD:

```
src/
├── domain/              # Domain layer (business rules)
│   └── links/
│       ├── application/     # Use cases and interfaces
│       │   ├── repositories/
│       │   └── use-cases/
│       └── enterprise/      # Entities and value objects
│           └── entities/
├── infra/               # Infrastructure layer
│   ├── database/           # Knex, migrations and repositories
│   ├── http/               # Controllers, routes and schemas
│   ├── container/          # Dependency Injection
│   ├── auth/               # Authentication
│   └── env/                # Environment configuration
└── core/                # Shared across domains
    ├── entities/
    ├── errors/
    └── types/
```

### Request Flow

```
HTTP Request → Route → Controller → Use Case → Repository → Database
                  ↓         ↓           ↓
              Validation  DI Container  Domain Entities
```

## 🚀 Features

### 📝 Link Management

- **Create Short Link** - Generate slug automatically or custom
- **Edit Original URL** - Update the destination of an existing link
- **Deactivate Link** - Mark links as inactive
- **Search Link** - By ID or slug
- **Redirection** - Redirect and register access

### 🔒 Security

- Basic Auth authentication for administrative routes
- Schema validation with Zod
- Typed and validated environment variables

### 📊 Analytics

- Track every link access
- Access timestamp logging
- Click count per link

## 📦 Installation and Usage

### Prerequisites

- Node.js >= 18
- pnpm >= 10
- Docker and Docker Compose (optional)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd slugify
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit the `.env` file with your settings:
```env
NODE_ENV=local
HOST=0.0.0.0
PORT=7070

DB_HOST=localhost
DB_PORT=5432
DB_NAME=slugify
DB_USER=postgres
DB_PASSWORD=postgres

BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=secret
```

4. **Start the database (Docker)**
```bash
docker-compose up -d
```

5. **Run migrations**
```bash
pnpm db:migrate
```

6. **Start the server**
```bash
# Development
pnpm dev

# Production
pnpm build
pnpm start
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch
```

## 📚 API Endpoints

### Public

```http
GET /:slug
# Redirects to the original URL and registers the access
```

### Administrative (requires authentication)

```http
POST /links
# Create a new short link
Body: {
  "originalUrl": "https://example.com",
  "customSlug": "custom" // optional
  "expirationDate": "2025-12-31" // optional
}

PATCH /links/:id
# Edit the original URL of a link
Body: {
  "originalUrl": "https://new-url.com"
}

DELETE /links/:id
# Deactivate a link

GET /links/:id
# Search link by ID

GET /links/slug/:slug
# Search link by slug
```

## 🎯 Implemented Use Cases

- ✅ `CreateShortLinkUseCase` - Create link with custom or auto-generated slug
- ✅ `EditOriginalUrlUseCase` - Update destination URL
- ✅ `GetLinkByIdUseCase` - Search link by ID
- ✅ `GetLinkBySlugUseCase` - Search and register access
- ✅ `MakeLinkInactiveUseCase` - Deactivate links

## 🧩 Design Patterns

### Either Pattern
```typescript
type CreateShortLinkUseCaseOutput = Either<
  SlugAlreadyExistsError | ExpirationDateMustBeFutureError,
  { link: Link }
>
```

### Dependency Injection
```typescript
export class CreateShortLinkUseCase {
  constructor(private readonly linksRepository: LinksRepository) {}
}
```

### Repository Pattern
```typescript
export abstract class LinksRepository {
  abstract create(link: Link): Promise<void>
  abstract findBySlug(slug: string): Promise<Link | null>
  abstract findById(id: string): Promise<Link | null>
}
```

## 📈 Future Improvements

- [ ] Rate limiting
- [ ] Cache with Redis
- [ ] Metrics with Prometheus
- [ ] E2E tests
- [ ] OpenAPI/Swagger documentation
- [ ] Analytics dashboard
- [ ] CI/CD pipeline

## 🤝 Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## 📝 License

This project is under the ISC license.

---

<div align="center">
  <p>Built with 💙 and TypeScript</p>
  <p>
    <a href="#-slugify---url-shortener-api">⬆ Back to top</a>
  </p>
</div>
