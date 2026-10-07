# Simple MERN Deployment Demo – Student Management

A deliberately simple MERN application for teaching deployment.

- Frontend: React + Vite → Vercel
- Backend: Node.js + Express + Mongoose → Render
- Database: MongoDB Atlas
- Source code: GitHub

## Project structure

```text
mern-deployment-simple/
├── frontend/
└── backend/
```

## 1. MongoDB Atlas

Create a MongoDB Atlas database and obtain the connection string.

Example:

```text
mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

## 2. Run backend locally

```bash
cd backend
npm install
```

Create `.env` from `.env.example`:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
CLIENT_URL=http://localhost:5173
```

Start:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

Test:

```text
http://localhost:5000/api/health
```

## 3. Run frontend locally

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env` from `.env.example`:

```env
VITE_API_URL=http://localhost:5000
```

Start:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## 4. Deploy backend to Render

Push the project to GitHub.

Create a Render Web Service and select the repository.

Set:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Add environment variables:

```text
MONGO_URI=<your MongoDB Atlas connection string>
CLIENT_URL=<your Vercel frontend URL>
NODE_ENV=production
```

Deploy.

Copy the Render URL, for example:

```text
https://student-api.onrender.com
```

## 5. Deploy frontend to Vercel

Create a Vercel project from the same GitHub repository.

Set:

```text
Root Directory: frontend
```

Add:

```text
VITE_API_URL=https://student-api.onrender.com
```

Deploy.

## 6. Important

After Vercel gives you the final frontend URL, update the Render variable:

```text
CLIENT_URL=https://your-app.vercel.app
```

Then redeploy/restart the backend.

The application intentionally uses MongoDB Atlas only. There is no in-memory database or fallback.
