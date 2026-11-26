# Lab 4 - Submission guide

Current branch: **ex1**. The other exercises are on separate branches; use the links below to inspect their code.

| Exercise | Branch / source | Entry route |
| --- | --- | --- |
| Exercise 1: router, lazy loading and master-detail | [ex1](https://github.com/Bo-hwi/lab04-web-application/tree/ex1) | /people/1 |
| Exercise 2: synchronous context form and inspector | [ex2](https://github.com/Bo-hwi/lab04-web-application/tree/ex2) | /form |
| Exercise 3: forum and Express REST API | [ex3](https://github.com/Bo-hwi/lab04-web-application/tree/ex3) | /forum/nasa |
| Homework 1: gallery and category filtering | [hw1-photo-gallery](https://github.com/Bo-hwi/lab04-web-application/tree/hw1-photo-gallery) | /gallery |
| Homework 2: dossiers, form, SLA and derived comparison | [hw2-appeal-tribunal](https://github.com/Bo-hwi/lab04-web-application/tree/hw2-appeal-tribunal) | /dossier/himass and /dossier/tanvuu |
| Homework 3: native dialog synchronized with URL | [hw3-photo-dialog](https://github.com/Bo-hwi/lab04-web-application/tree/hw3-photo-dialog) | /gallery?category=nature&photoId=photo-001 |
| Homework 4: pointer/keyboard swipe, undo and MongoDB | [hw4-card-swipe](https://github.com/Bo-hwi/lab04-web-application/tree/hw4-card-swipe) | /swipe |

## Run an exercise from a fresh checkout

Use Node 22.12 or newer. For example, clone the gallery branch into its own directory:

```powershell
git clone --branch hw1-photo-gallery --single-branch https://github.com/Bo-hwi/lab04-web-application.git lab4-gallery
cd lab4-gallery
npm.cmd --prefix client ci
npm.cmd --prefix client run dev
```

Open the Vite URL and the entry route from the table. Run commands from the selected branch root. Use the same approach with another branch name and a different destination directory; no local repair/worktree directories are required.

For **ex3**, also run `npm.cmd --prefix server ci` and `npm.cmd --prefix server start` in another terminal. The forum uses an in-memory store; it does not require MongoDB.

For **HW4**, follow the [MongoDB and server setup guide](https://github.com/Bo-hwi/lab04-web-application/blob/hw4-card-swipe/README.md). Set MONGODB_URI in server/.env using server/.env.example, then run the API and client in separate terminals. MongoDB is required for this exercise.

## Verification and evidence

Each exercise branch contains TASK_DECOMPOSITION.md, VERIFICATION.md and AI_FAILURE_AUDIT.md. Those files distinguish executed checks from historical observations and remaining manual checks.

- [Verification summary and published implementation commits](https://github.com/Bo-hwi/lab04-web-application/blob/hw3-photo-dialog/REPAIR_SUMMARY.md)
- [HW1 Lighthouse reports and screenshots](https://github.com/Bo-hwi/lab04-web-application/tree/hw1-photo-gallery/evidence)
- [HW3 Lighthouse reports and browser checks](https://github.com/Bo-hwi/lab04-web-application/tree/hw3-photo-dialog/evidence)
- [HW4 tests and persistence verification](https://github.com/Bo-hwi/lab04-web-application/blob/hw4-card-swipe/VERIFICATION.md)
- [Accessibility review and remaining manual evidence](https://github.com/Bo-hwi/lab04-web-application/blob/hw3-photo-dialog/ACCESSIBILITY_REVIEW.md)

The recorded suites total 118 client tests and 13 server tests across the six repaired branches; ex2 has its own historical verification record. Saved gallery runs reached Performance/Accessibility 100/100, with earlier attempts retained as history. These are recorded results, not a guarantee for every environment.

## Scope

Homework numbering differs between specification and code-contract slides. This repository consistently uses HW1 for the gallery, HW2 for the tribunal, HW3 for the URL dialog and HW4 for card-swipe/Mongoose.

Tribunal comparison values, the SLA deadline and swipe profiles are labelled demonstrations. Native screen-reader speech output and the course live defense have not been independently verified. No blanket exhaustive WCAG certification or LMS submission is claimed.
