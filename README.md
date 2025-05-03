# SwiftCart Dashboard

**SwiftCart Dashboard** is a modern, full-featured e-commerce admin panel built with **Next.js**, offering centralized control over multiple storefronts. From product and order management to API access and store-specific configuration, this dashboard is the command center for your SwiftCart ecosystem.

🔗 **Live Demo:** [https://swiftcart-dashboard.vercel.app](https://swiftcart-dashboard.vercel.app)  
📦 **Storefront Repo:** [github.com/naumanch969/swiftcart-store](https://github.com/naumanch969/swiftcart-store)

---

## ✨ Features

* **Multi-Store Support** – Manage multiple e-commerce stores independently.
* **Billboards** – Feature eye-catching banners and promotions.
* **Categories** – Define product hierarchies and organize your catalog.
* **Products** – Add, edit, and delete products with Cloudinary image uploads.
* **Sizes & Colors** – Handle product variants efficiently.
* **Orders** – View and manage all customer orders.
* **Stripe Integration** – Seamless, secure payments.
* **Clerk Authentication** – Robust user auth system.
* **API Access** – Built-in endpoints for frontend or third-party integrations.
* **Zustand State Management** – Lightweight global store handling.

---

## 🧱 Architecture Overview

* Built with **Next.js App Router**
* Backend APIs served via **Next.js API routes**
* **Prisma + MongoDB** for database and ORM
* Full **multi-tenancy support** based on dynamic store IDs
* Deployed on **Vercel**, domain-managed via GoDaddy

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/naumanch969/swiftcart-dashboard.git
cd swiftcart-dashboard
```

### 2. Install Dependencies
```bash
git clone https://github.com/naumanch969/swiftcart-dashboard.git
cd swiftcart-dashboard
```

### 3. Set Up Environment Variables
Create a .env file with:
```bash
DATABASE_URL=your_mongodb_connection_string
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_API_KEY=your_stripe_secret_key
```

### 4. Set Up Prisma
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the Dev Server
```bash
npm run dev
```

Go to http://localhost:3000

## 🐳 Docker Usage
To build and run the app using Docker:
```bash
docker build -t swiftcart-dashboard .
docker run -p 3000:3000 swiftcart-dashboard
```
Make sure to set your .env in Docker properly.


## 🛠 Tech Stack
Framework: Next.js

Database: MongoDB Atlas

ORM: Prisma

Auth: Clerk

Storage: Cloudinary

Payments: Stripe

State: Zustand

Charts: Recharts

UI: Tailwind CSS + ShadCN/UI

Deployment: Vercel

DevOps: Docker


## 🤝 Contributing
We welcome contributions! To get started:

Fork the repo

Create a new branch: ```git checkout -b feature/your-feature```

Commit your changes: ```git commit -m 'Add feature'```

Push to your branch: ```git push origin feature/your-feature```

Submit a pull request

## 📬 Contact
For questions, suggestions, or support:

📧 Email: naumanch969@gmail.com['naumanch969']
🌐 Website: https://swiftcart.iamnauman.com

Thank you for using SwiftCart Dashboard!
