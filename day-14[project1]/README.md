# 📸 InstaClone — Full Stack Social Media App

A full-stack Instagram-inspired social media application built with the **MERN stack** (MongoDB, Express, React, Node.js). This project explores real-world backend architecture, scalable database design, and a clean 4-layer frontend pattern.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), React Router, SCSS, Context API |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt, cookie-parser |
| File Storage | ImageKit CDN |
| File Upload | Multer (memory storage) |
| HTTP Client | Axios (with credentials) |

---

## ✨ Features

- 🔐 User Authentication — Register & Login with bcrypt password hashing + JWT stored in cookies
- 👤 User Profiles — Bio, profile image (with ImageKit default), get logged-in user info
- 📝 Create Posts — Upload image (via ImageKit CDN) with a caption
- 📰 Feed — View all posts with real-time `isLiked` status per user
- ❤️ Like Posts — Edge-collection-based like system (no duplicate likes)
- 👥 Follow System — Follow / Unfollow users with a **pending → accepted / rejected** request flow
- 🔒 Protected Routes — JWT middleware on all authenticated endpoints

---

## 🏗️ Project Structure

```
project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js             # MongoDB connection via Mongoose
│   │   ├── controllers/
│   │   │   ├── auth.controller.js      # Register, Login, Get current user
│   │   │   ├── post.controller.js      # Create post, Get posts, Feed, Like
│   │   │   └── user.controller.js      # Follow, Unfollow, Follow response
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js      # JWT verification (identifyUser)
│   │   ├── models/
│   │   │   ├── user.model.js           # User schema
│   │   │   ├── post.model.js           # Post schema
│   │   │   ├── like.model.js           # Edge collection for likes
│   │   │   └── follow.model.js         # Edge collection for follows (with status)
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── post.routes.js
│   │   │   └── user.routes.js
│   │   └── app.js
│   └── server.js
│
└── frontend/
    └── src/
        ├── features/
        │   ├── auth/
        │   │   ├── pages/
        │   │   │   ├── Login.jsx       # [UI] Login form page
        │   │   │   └── Register.jsx    # [UI] Register form page
        │   │   ├── hooks/
        │   │   │   └── useAuth.js      # [Hook] handleLogin, handleRegister
        │   │   ├── services/
        │   │   │   └── auth.api.js     # [API] login(), register(), getUser()
        │   │   └── auth.context.jsx    # [State] user, loading, setUser, setLoading
        │   └── post/
        │       ├── pages/
        │       │   └── Feed.jsx        # [UI] Renders feed of all posts
        │       ├── components/
        │       │   └── Post.jsx        # [UI] Single post card (like, comment, share, save icons)
        │       ├── hooks/
        │       │   └── usePost.js      # [Hook] handleGetFeed, handleLike, handleUnLike
        │       ├── services/
        │       │   └── post.api.js     # [API] getPosts() → /posts/feed
        │       └── post.context.jsx    # [State] posts, feed, loading
        ├── shared/
        │   └── components/
        │       └── nav.jsx             # [UI] Shared navigation bar
        ├── App.jsx                     # Wraps app in AuthProvider + PostContextProvider
        ├── AppRoutes.jsx               # React Router routes: /, /login, /register
        └── main.jsx                    # React entry point
```

---

## 🧱 4-Layer Frontend Architecture

The frontend strictly follows a **4-layer model** where each layer has one job and never crosses into another layer's responsibility.

```
┌─────────────────────────────────────┐
│         UI Layer (Presentation)     │
│  Login, Register, Feed, Post, Nav   │
└──────────────┬──────────────────────┘
               │ calls
┌──────────────▼──────────────────────┐
│       Hook Layer (Orchestration)    │
│        useAuth.js, usePost.js       │
└──────────┬──────────────┬───────────┘
           │ reads/writes │ calls
┌──────────▼──────┐  ┌───▼───────────────────────┐
│   State Layer   │  │       API Layer            │
│ auth.context    │  │  auth.api.js, post.api.js  │
│ post.context    │  │                            │
└─────────────────┘  └────────────────────────────┘
```

---

### Layer 1 — UI (Presentation)

**Files:** `Login.jsx`, `Register.jsx`, `Feed.jsx`, `Post.jsx`, `nav.jsx`

Responsible for rendering the interface and collecting user input. UI components only call hooks — they never touch `axios`, context, or business logic directly.

```jsx
// Login.jsx — UI just calls the hook
const { handleLogin } = useAuth();
await handleLogin(userName, password);
navigate("/");
```

The `Post.jsx` component receives `handleLike` and `handleUnLike` as props and toggles the heart icon based on the `post.isLiked` flag coming from the feed.

---

### Layer 2 — Hooks (Orchestration)

**Files:** `useAuth.js`, `usePost.js`

The hook is the **manager** — it receives intent from the UI, calls the API, and updates the State. Neither the UI nor the context ever runs async logic.

```js
// useAuth.js — coordinates the full login flow
const handleLogin = async (userName, password) => {
    setLoading(true);
    try {
        const response = await login(userName, password); // → API layer
        setUser(response.user);                           // → State layer
    } finally {
        setLoading(false);                                // → State layer
    }
}
```

```js
// usePost.js — fetches feed and pushes it into state
const handleGetFeed = async () => {
    setLoading(true);
    const res = await getPosts();   // → API layer
    setFeed(res.getFeed);           // → State layer
}
```

---

### Layer 3 — State (Context / Memory)

**Files:** `auth.context.jsx`, `post.context.jsx`

Pure storage. Holds shared data and exposes setters. No API calls, no async logic, no navigation — just `useState` and a `Provider`.

```jsx
// auth.context.jsx
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
// Exposes: { user, loading, setUser, setLoading }

// post.context.jsx
const [posts, setPosts] = useState(null);
const [feed, setFeed] = useState(null);
const [loading, setLoading] = useState(false);
// Exposes: { posts, feed, loading, setPosts, setFeed, setLoading }
```

Both providers are mounted at the root in `App.jsx`, so any component in the tree can access shared state.

---

### Layer 4 — API (Backend Communication)

**Files:** `auth.api.js`, `post.api.js`

Pure HTTP. Each file creates an `axios` instance pointed at the backend and exports clean async functions. No React, no state updates — just requests and responses.

```js
// auth.api.js — axios instance with credentials (for JWT cookies)
const api = axios.create({ baseURL: "http://localhost:3000/api/auth", withCredentials: true });

export async function login(userName, password) {
    const response = await api.post("/login", { userName, password });
    return response.data;
}

// post.api.js
export const getPosts = async () => {
    const response = await api.get("/posts/feed");
    return response.data;
};
```

`withCredentials: true` is set on both axios instances so JWT cookies are automatically sent with every request.

---

## 📡 API Reference

### Auth — `/api/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/register` | ❌ | Register new user, returns JWT cookie |
| POST | `/login` | ❌ | Login with userName or email + password |
| GET | `/get-user` | ✅ | Get currently logged-in user's profile |

### Posts — `/api/posts`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | ✅ | Create a post (multipart/form-data with image) |
| GET | `/` | ✅ | Get all posts by the logged-in user |
| GET | `/details/:postID` | ✅ | Get a single post (owner only) |
| POST | `/like/:postID` | ✅ | Like a post (no duplicate likes) |
| GET | `/feed` | ✅ | Get all posts with `isLiked` flag per user |

### Users — `/api/users`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/follow/:userName` | ✅ | Send a follow request (status: pending) |
| POST | `/unFollow/:userName` | ✅ | Unfollow a user |
| POST | `/followResponse` | ✅ | Accept or reject a follow request |

---

## 🧠 Backend Design Decisions

### Edge Collections (Follows & Likes)

Instead of storing arrays inside User documents, **separate edge collections** handle both follows and likes.

```js
// follow.model.js
{ follower: String, followee: String, status: "pending" | "accepted" | "rejected" }

// like.model.js
{ postID: ObjectId → ref: "posts", userName: String }
```

Both use compound unique indexes to prevent duplicates and keep lookups at O(log n).

---

### Follow Request State Machine

```
User A sends follow  →  status: "pending"
User B responds      →  status: "accepted" or "rejected"
```

Guards in place: can't follow yourself, can't duplicate a request, can't respond to an already-resolved request.

---

### ImageKit Image Upload Flow

```
POST /api/posts
  → Multer buffers image in memory
  → Backend uploads to ImageKit (/cohort-2/insta-clone/posts/)
  → ImageKit returns CDN URL
  → Only the URL is saved in MongoDB
```

---

### Feed with isLiked + Promise.all

```js
// For each post, check if the current user has liked it
post.isLiked = Boolean(await likeModel.findOne({ postID: post._id, userName: user.userName }));
```

All like-checks run in **parallel** via `Promise.all`. `.lean()` converts Mongoose documents to plain objects for better performance.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- ImageKit account

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs on `http://localhost:5173`, backend on `http://localhost:3000`.

---

## 📦 Dependencies

### Backend
| Package | Purpose |
|---|---|
| `express` | Web framework |
| `mongoose` | MongoDB ODM |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT auth |
| `cookie-parser` | Cookie handling |
| `cors` | Cross-origin requests |
| `multer` | File upload (memory storage) |
| `@imagekit/nodejs` | ImageKit CDN integration |
| `dotenv` | Environment variables |

### Frontend
| Package | Purpose |
|---|---|
| `react` + `vite` | UI framework + build tool |
| `react-router-dom` | Client-side routing |
| `axios` | HTTP client with credentials support |
| `sass` | SCSS styling |

---

## 📚 Concepts Explored

- **Edge Collections** — Modeling many-to-many relationships without embedding arrays
- **B+ Tree Indexing** — MongoDB index internals and query optimization
- **Follow Request State Machine** — Pending / accepted / rejected social connection flow
- **ImageKit CDN Integration** — Server-side upload, only URL persisted in DB
- **Feed Enrichment with Promise.all** — Per-user `isLiked` state merged into shared feed
- **4-Layer React Architecture** — UI / Hooks / State / API separation
- **JWT + Cookie Auth** — Stateless auth with `withCredentials` on axios

---

## 🙋 Author

**BeastEren**
- GitHub: [@BeastEren](https://github.com/BeastEren)

---

> Built as part of a backend development learning journey 🚀
