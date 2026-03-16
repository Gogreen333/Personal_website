# 🚀 MERN Stack Portfolio Website

A production-ready, fully responsive developer portfolio built with MongoDB, Express, React, and Node.js — featuring Tailwind CSS, shadcn/ui, Framer Motion animations, dark/light mode, an admin panel, and more.

---

# Features

-Responsive Design — Mobile-first, looks great on all devices
-Dark / Light Mode — Toggle with persistent preference
-Animated UI — Framer Motion section reveals, floating elements, typed text
-Glassmorphism Styling — Modern translucent UI aesthetic
-Full Backend API — REST API with Express & MongoDB
-Admin Panel — Secure CRUD for projects + view messages
-Contact Form — Validated form that stores messages to MongoDB
-Project Filtering — Filter by technology, search by keyword
-Loading Skeletons — Smooth loading states
-SEO Optimized — Meta tags, semantic HTML
-**Scroll-to-Top** — Floating scroll button

---

# Project Structure


portfolio/
├── client/                         # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx      # Sticky nav with mobile menu
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── ScrollToTop.jsx
│   │   │   ├── sections/
│   │   │   │   ├── Hero.jsx        # Typed animation, CTA buttons
│   │   │   │   ├── About.jsx       # Bio, highlights, education
│   │   │   │   ├── Skills.jsx      # Categorized skill bars
│   │   │   │   ├── Projects.jsx    # API-fetched, filterable cards
│   │   │   │   ├── Experience.jsx  # Timeline layout
│   │   │   │   └── Contact.jsx     # Validated form + toast
│   │   │   └── ui/
│   │   │       ├── button.jsx      # shadcn-style Button
│   │   │       ├── index.jsx       # Card, Badge, Input, Textarea, Label
│   │   │       └── toast.jsx       # Toast notification system
│   │   ├── hooks/
│   │   │   ├── useTheme.js         # Dark/light mode hook
│   │   │   └── useInView.js        # Intersection Observer hook
│   │   ├── lib/
│   │   │   ├── api.js              # Axios API client
│   │   │   ├── data.js             # Skills, experience, sample projects
│   │   │   └── utils.js            # cn() utility
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── Admin.jsx           # Protected admin panel
│   │   ├── styles/
│   │   │   └── globals.css         # Tailwind + CSS variables + custom classes
│   │   ├── App.jsx                 # Router setup
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
│── server/                         # Node.js / Express Backend
│   ├── controllers/
│   │   ├── projectController.js    # CRUD for projects
│   │   ├── contactController.js    # Messages CRUD
│   │   └── authController.js       # Admin login
│   ├── routes/
│   │   ├── projects.js
│   │   ├── contact.js
│   │   └── auth.js
│   ├── models/
│   │   ├── Project.js              # Mongoose schema
│   │   └── Message.js
│   ├── middleware/
│   │   └── auth.js                 # JWT middleware
│   ├── index.js                    # Express app entry
│   └── package.json
│──index.html
│──assets
│──favicon.ico
└──README.md


```

---

## Tech Stack
Frontend
| Tool | Purpose |
|------|---------|
| React 18 + Vite | UI framework & build tool |
| Tailwind CSS | Utility-first styling |
| shadcn/ui pattern | Accessible component architecture |
| Framer Motion | Animations & transitions |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| Lucide React | Icon library |

Backend
| Tool | Purpose |
|------|---------|
| Node.js | Runtime |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| express-validator | Input validation |

---

# Installation

Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

1. Clone the repository
bash
git clone https://github.com/yourusername/mern-portfolio.git
cd mern-portfolio


2. Install dependencies
bash
# Install all at once
npm run install:all

Or individually:
cd server && npm install
cd ../client && npm install
```

3.Environment Variables

*Server* — create `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_admin_password
CLIENT_URL=http://localhost:3333
```

*Client* — create `client/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

4.Run the development servers

Open two terminals:

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

- Frontend: http://localhost:3333
- Backend API: http://localhost:5000/api
- Admin Panel: http://localhost:5173/admin

---

#API Endpoints

Projects
```
GET    /api/projects          — Get all projects (public)
POST   /api/projects          — Create project (admin only)
PUT    /api/projects/:id      — Update project (admin only)
DELETE /api/projects/:id      — Delete project (admin only)
```

Contact
```
POST   /api/contact                   — Submit contact message
GET    /api/contact/messages          — Get all messages (admin)
PATCH  /api/contact/messages/:id/read — Mark as read (admin)
DELETE /api/contact/messages/:id      — Delete message (admin)
```

Auth
```
POST   /api/auth/login        — Admin login (returns JWT)
```

---

Database Schemas

#Project
```js
{
  title:        String (required),
  description:  String (required),
  image:        String,
  technologies: [String],
  githubLink:   String,
  liveLink:     String,
  featured:     Boolean,
  order:        Number,
  timestamps:   true
}
```

#Message
```js
{
  name:       String (required),
  email:      String (required),
  message:    String (required),
  read:       Boolean,
  timestamps: true
}
```

---

#Customization

#Update personal information
Edit `client/src/lib/data.js` to change:
- Skills & proficiency levels
- Experience / timeline entries
- Sample projects (used as fallback)

#Update contact details
Edit `client/src/components/sections/Contact.jsx` and `Hero.jsx`

#Change color scheme
Modify CSS variables in `client/src/styles/globals.css`:
```css
:root {
  --primary: 165 80% 40%;   /* emerald */
  --accent:  192 91% 40%;   /* cyan */
}
```

#Add your resume
Place your resume PDF at `client/public/resume.pdf`

---

#Deployment

#Frontend — Vercel
1. Push to GitHub
2. Connect repo to [vercel.com](https://vercel.com)
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

#Backend — Render
1. Connect repo to [render.com](https://render.com)
2. Create a new **Web Service**
3. Root directory: `server`
4. Build command: `npm install`
5. Start command: `node index.js`
6. Add all environment variables from `server/.env`

#Database — MongoDB Atlas
1. Create account at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Create database user
4. Get connection string → paste into `MONGODB_URI`
5. Add your server IP to the IP allowlist (or use 0.0.0.0/0 for all)

---

#Admin Panel

Access the admin panel at `/admin`

Credentials are set via environment variables:
```env
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD=your_secure_password
```

*Features:*
- Add / edit / delete projects
- View contact messages
- Mark messages as read
- JWT-protected routes

---

#Responsive Breakpoints

| Breakpoint | Size |
|-----------|------|
| Mobile | < 640px |
| Tablet | 640px – 1024px |
| Desktop | > 1024px |

---

#Credits

- Icons: [Lucide React](https://lucide.dev)
- Components: [shadcn/ui](https://ui.shadcn.com) pattern
- Animations: [Framer Motion](https://www.framer.com/motion)
- Fonts: [Fontshare](https://www.fontshare.com) (Clash Display, Satoshi)

---

#License

MIT — free to use for personal and commercial projects.
