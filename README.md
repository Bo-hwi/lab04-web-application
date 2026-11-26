# Lab 4: Hen Ho Nhung Khong Yeu

An accessible keyboard/pointer card queue with MongoDB-backed history. All three seeded profiles are fictional. The local browser session UUID identifies a classroom session; it is not a login or access-control system.

## Run

Use Node 22.12 or newer and a running MongoDB instance. From this branch's root:

```powershell
npm.cmd --prefix client ci
npm.cmd --prefix server ci
Copy-Item server/.env.example server/.env
```

Set `MONGODB_URI` in `server/.env` to a dedicated database. Defaults use `mongodb://127.0.0.1:27017/lab4_swipe`. No database credentials belong in Git.

In one terminal:

```powershell
npm.cmd --prefix server start
```

In another:

```powershell
npm.cmd --prefix client run dev
```

Open the Vite URL and `/swipe`. The client forwards `/api` to `127.0.0.1:3000`. Production preview uses the same proxy while the API is running. For deployment on another host, configure a same-origin reverse proxy and set `CLIENT_ORIGIN` appropriately.

## Controls and scoring

- Left arrow / left swipe / Pass: -5.
- Right arrow / right swipe / Like: +10.
- Up arrow / upward swipe / Super like: +20.
- Backspace / Undo: restore the latest card and reverse its score.

Keyboard shortcuts apply while focus is inside the deck. Buttons provide a non-drag alternative. Pointer movements below 50px and cancelled gestures do not swipe. Saves finish before advancing the card; failed saves keep the queue and score unchanged. A retry of the same choice reuses its request UUID. Reload restores history from MongoDB.

## Checks

```powershell
npm.cmd --prefix client test
npm.cmd --prefix client run lint
npm.cmd --prefix client run build
npm.cmd --prefix server test
npm.cmd --prefix server run lint
```

The server tests start a separate real MongoDB 8.0.17 process and clean up its test database after execution. The first run downloads MongoDB into `server/.cache/mongodb` (ignored by Git); later runs reuse that binary. Tests never use `MONGODB_URI` or erase the configured application database.

## API and persistence

See `TASK_DECOMPOSITION.md` for request/response contracts. Reads use Mongoose `.lean()`. Model validation and unique indexes protect stored actions. The API whitelists payload fields; client-supplied IDs, scores and administrative fields are ignored. Undo is session-scoped and LIFO. Writes are serialized per session in one API process; multiple production workers would require a database transaction/sequence design for cross-worker LIFO guarantees.

Implementation references: [Mongoose 8 models](https://mongoosejs.com/docs/8.x/docs/models.html), [lean queries](https://mongoosejs.com/docs/8.x/docs/tutorials/lean.html), [validation](https://mongoosejs.com/docs/8.x/docs/validation.html).

Actual test/browser results and remaining manual checks are recorded in `VERIFICATION.md`.

## Other Lab 4 exercises

Use the [repository submission guide](https://github.com/Bo-hwi/lab04-web-application/blob/main/README.md) to locate all exercise branches. HW1, HW2 and HW3 are intentionally separate from this swipe application.

Implementation checkpoint [a2d5b05](https://github.com/Bo-hwi/lab04-web-application/commit/a2d5b05) was verified on origin on 2026-11-27. See [VERIFICATION.md](VERIFICATION.md) for the recorded test and browser evidence.
