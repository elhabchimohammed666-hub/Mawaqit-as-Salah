# Mawaqit as-Salah — مواقيت الصلاة

Application web d’horaires de prière (MERN) : React + Vite + Tailwind, API Express, données **AlAdhan**.

## Structure

```
priere2/
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── index.js
│       ├── config/          # env, MongoDB optionnel
│       ├── middleware/
│       ├── models/          # préférences utilisateur
│       ├── routes/          # prayers, qibla, methods, search, preferences
│       └── services/        # proxy AlAdhan + Nominatim
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── api/
        ├── components/      # Navbar, PrayerCard, Countdown, LocationSelector, Dashboard
        ├── hooks/
        └── lib/
```

## Prérequis

- Node.js 18+
- MongoDB (optionnel) : uniquement si vous voulez persister les préférences côté serveur

## Installation

### 1. Backend

```bash
cd backend
copy .env.example .env
npm install
npm run dev
```

Le serveur écoute sur `http://localhost:5050`.

Variables `.env` :

```
PORT=5050
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173
ALADHAN_BASE_URL=https://api.aladhan.com/v1
MONGO_URI=
```

Laissez `MONGO_URI` vide si vous n’utilisez pas MongoDB. Les réglages (méthode, école, ville) sont alors sauvegardés dans `localStorage`.

### 2. Frontend

Dans un second terminal :

```bash
cd frontend
npm install
npm run dev
```

Ouvrez `http://localhost:5173`. Vite proxifie `/api` vers le backend.

## API interne

| Route | Description |
| --- | --- |
| `GET /api/health` | Santé du serveur |
| `GET /api/prayers/by-coords?lat=&lng=&method=&school=` | Horaires par GPS |
| `GET /api/prayers/by-city?city=&country=&method=&school=` | Horaires par ville |
| `GET /api/qibla?lat=&lng=` | Direction de la Qibla |
| `GET /api/methods` | Méthodes de calcul AlAdhan |
| `GET /api/search/city?q=` | Autocomplétion de villes (Nominatim) |
| `GET/PUT /api/preferences/:clientId` | Préférences (si MongoDB) |

`method` par défaut : **3** (Muslim World League). `school` : **0** Standard, **1** Hanafi.
