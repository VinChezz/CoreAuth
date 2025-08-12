# CoreAuth

CoreAuth is a **JWT-based authentication service** built with **NestJS** and **Prisma**.
It provides a ready-to-use backend for user registration, login, logout, token refreshing, verify email, qrcode login and password reset via email.
The project is designed to be clean, extensible, and production-ready.

## ✨ Features

- **User Authentication**
  - Email & Password registration and login
  - Secure password hashing with bcrypt
  - Access & Refresh token system (JWT)
  - Cookie-based refresh token storage
  - OAuth system by Google and Facebook
- **Password Reset**
  - Email-based password reset flow
  - 6-digit verification code support
- **Email Service**
  - Nodemailer integration
  - Customizable email templates
- **API Documentation**
  - Swagger UI integration
- **Database**
  - Prisma ORM with Postgresql with service Neon (configurable)
- **Security**
  - CORS configuration
  - Cookie parser
  - Environment variable-based secrets

---

## 🛠 Tech Stack

- **Backend Framework**: [NestJS](https://nestjs.com/)
- **Database ORM**: [Prisma](https://www.prisma.io/)
- **Database**: Postgresql (default) — configurable by [Neon](https://neon.com/)
- **Authentication**: JWT (Access + Refresh tokens)
- **Authorization**: OAuth 2.0 [passportjs](https://www.passportjs.org/)
- **Email Service**: Nodemailer
- **Documentation**: Swagger

---

## ⚙️ Environment Variables

Create a `.env` file in the root with the following values:

```env
DATABASE_URL=postgresql://...
PORT=3000

JWT_SECRET=your_jwt_secret

SERVER_URL=your_url or hosting platform
SERVER_DOMAIN=localhost or your_own

NODE_ENV=development

GOOGLE_CLIENT_ID=your_google_client
GOOGLE_CLIENT_SECRET=your_google_client_secret

FACEBOOK_CLIENT_ID=your_facebook_client
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret

EMAIL_USER=your_email_user
EMAIL_PASSWORD=your_email_password
EMAIL_CONFIRMATION_URL=your_email_confirmation_url
EMAIL_RESET_PASSWORD_URL=your_email_reset_password_url
```

---

## 🧪 Local Development

1. Clone the repo

```
git clone https://github.com/VinChezz/CoreAuth.git
cd core-auth
```

2. Install dependencies:

```
npm install
# or
yarn install
# or
bun install
```

3. Set up Prisma:

```
npx prisma generate
npx prisma migrate dev
```

4. Run the development server:

```
npm start
# or
yarn run
# or
bun run
```

---

## 📖 API Documentation

To open the Swagger documentation page you need

1. Run the development server:

   ```
   npm start
   # or
   yarn run
   # or
   bun run
   ```

2. Open a browser and follow the link `http://localhost:3000/api`
   ```
   http://localhost:3000/api
   ```

---

## 📬 Contact

If you have any suggestions or questions, please write:

**Email**: [vin4auzer@gmail.com](mailto:vin4auzer@gmail.com)

**GitHub Issues**: [Issue](https://github.com/VinChezz/vivid-ai/issues)
