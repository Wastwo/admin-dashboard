# API Reference

> Auto-generated from source code docblocks. Last updated: 2026-08-30.

## Table of Contents

- [Overview](#overview)
- [Modules](#modules)
  - [useAuth](#useauth)
  - [useUsers](#useusers)
  - [mockUsers](#mockusers)
  - [router](#router)
- [Types](#types)
  - [MockUser](#mockuser)
- [Components](#components)

## Overview

The Admin Dashboard exposes its functionality through two composable functions (`useAuth`, `useUsers`), a static data module (`mockUsers`), and a configured Vue Router instance. All composables follow the Vue 3 Composition API pattern and return reactive refs alongside action functions.

---

## Modules

### useAuth

> Singleton authentication composable providing login, logout, and session persistence via localStorage.

**Source:** `src/composables/useAuth.js`

#### `useAuth(): AuthReturn`

Returns reactive authentication state and actions. State refs are exposed as `readonly` to prevent accidental mutation outside of `login` / `logout`.

**Returns:** `Object`

| Property | Type | Description |
|----------|------|-------------|
| `isAuthenticated` | `Readonly<Ref<boolean>>` | Whether a user session is currently active |
| `currentUsername` | `Readonly<Ref<string\|null>>` | The active user's display name |
| `loginTime` | `Readonly<Ref<string\|null>>` | ISO-8601 timestamp of session start |
| `login` | `(username: string, password: string) => Promise<boolean>` | Authenticate a user |
| `logout` | `() => void` | Destroy the current session |
| `checkAuth` | `() => boolean` | Check if a session exists (used by router guard) |

**Example:**

```js
const { isAuthenticated, login, logout } = useAuth()
await login('admin', 'password')
console.log(isAuthenticated.value) // true
```

---

#### `login(username, password): Promise<boolean>`

Authenticates a user against hardcoded demo credentials. Simulates a 1-second network delay, then persists the session to both reactive state and localStorage.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `username` | `string` | Yes | The username to authenticate |
| `password` | `string` | Yes | The plaintext password to validate |

**Returns:** `Promise<boolean>` — `true` if credentials are valid, `false` otherwise.

---

#### `logout(): void`

Destroys the current session by clearing reactive state and localStorage.

**Returns:** `void`

---

#### `checkAuth(): boolean`

Checks whether a user is currently authenticated. Used by the router `beforeEach` guard.

**Returns:** `boolean` — `true` if a valid session exists.

---

### useUsers

> Composable for accessing the shared user list and fetching individual user details.

**Source:** `src/composables/useUsers.js`

#### `useUsers(): UsersReturn`

Provides reactive access to the user collection and per-user fetch logic.

**Returns:** `Object`

| Property | Type | Description |
|----------|------|-------------|
| `users` | `Ref<MockUser[]>` | Shared reactive list of all users |
| `currentUser` | `Ref<MockUser\|null>` | Most recently fetched user |
| `isLoading` | `Ref<boolean>` | Whether a fetch is in progress |
| `errorMessage` | `Ref<string\|null>` | Error from the last failed fetch |
| `fetchUserById` | `(rawId: string\|number) => Promise<MockUser\|null>` | Fetch a single user |

**Example:**

```js
const { users, fetchUserById, isLoading } = useUsers()
await fetchUserById(1)
```

---

#### `fetchUserById(rawId): Promise<Object|null>`

Fetches a single user by ID with simulated 600 ms latency. Sets `isLoading` and `errorMessage` reactively.

**Parameters:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `rawId` | `string\|number\|null\|undefined` | Yes | The user ID |

**Returns:** `Promise<Object|null>` — The matching user object, or `null` on failure.

**Throws:**

| Error | Condition |
|-------|-----------|
| `Error` | If `rawId` is null, undefined, or empty string |
| `Error` | If no user exists with the given ID |

---

### mockUsers

> Static mock dataset representing the application's user directory.

**Source:** `src/data/mockUsers.js`

#### `mockUsers: MockUser[]`

Array of 5 user objects, each containing profile data, stats, permissions, activity logs, and sessions. See the [MockUser](#mockuser) type definition below.

---

### router

> Application router configuration using Vue Router 4.

**Source:** `src/router/index.js`

#### Route table

| Path | Name | Component | Auth Required | Title |
|------|------|-----------|---------------|-------|
| `/login` | `login` | `LoginView` | No | Login |
| `/admin` | `admin` | `AdminLayout` (wrapper) | Yes | — |
| `/admin` (child) | `dashboard` | `DashboardView` | Yes | Overview |
| `/admin/users` | `users` | `UserListView` | Yes | User Management |
| `/admin/users/:id` | `user-detail` | `UserDetailView` | Yes | User Details |
| `/` | — | redirect → `/admin` | — | — |
| `/:pathMatch(.*)*` | `not-found` | `NotFoundView` | No | 404 Not Found |

#### Navigation guards

- **`beforeEach`** — Redirects unauthenticated users to `/login` (preserving `redirect` query param). Redirects authenticated users away from `/login` to `/admin`.
- **`afterEach`** — Sets `document.title` from route meta and scrolls to top.

---

## Types

### MockUser

Represents a single user profile with all nested data structures.

```js
/**
 * @typedef {Object} MockUser
 */
{
  id: number,           // Unique numeric identifier
  name: string,         // Full display name
  email: string,        // Contact email address
  username: string,     // Short login handle
  role: string,         // Role label (e.g. "Administrator")
  avatar: string,       // Two-letter initials for avatar placeholder
  status: 'active' | 'inactive',
  lastActive: string,   // Human-readable relative timestamp
  joinDate: string,     // Formatted account creation date
  location: string,     // City and state
  timezone: string,     // IANA-style timezone label
  stats: Stat[],        // Dashboard stat cards
  accountInfo: AccountInfo[],
  permissions: Permission[],
  activityLog: ActivityEntry[],
  sessions: Session[],
}
```

| Field | Type | Description |
|-------|------|-------------|
| `id` | `number` | Unique identifier |
| `name` | `string` | Full name |
| `email` | `string` | Email address |
| `username` | `string` | Login handle |
| `role` | `string` | Role label |
| `avatar` | `string` | Initials for avatar |
| `status` | `'active'\|'inactive'` | Account status |
| `stats` | `Array<{label, value}>` | KPI stat cards |
| `accountInfo` | `Array<{label, value, tone}>` | Account detail rows |
| `permissions` | `Array<{label, granted}>` | Permission flags |
| `activityLog` | `Array<{action, detail, time, icon, security}>` | Activity entries |
| `sessions` | `Array<{device, browser, location, active, lastActive, icon}>` | Active sessions |

---

## Components

### Layout Components

| Component | Source | Description |
|-----------|--------|-------------|
| `AdminLayout` | `src/components/layout/AdminLayout.vue` | Root authenticated shell (sidebar + header + content) |
| `AdminSidebar` | `src/components/layout/AdminSidebar.vue` | Collapsible navigation sidebar |
| `AdminHeader` | `src/components/layout/AdminHeader.vue` | Sticky top bar with user dropdown |

### UI Components

| Component | Source | Props | Emits | Description |
|-----------|--------|-------|-------|-------------|
| `UserCard` | `src/components/ui/UserCard.vue` | `user: Object` (required), `showEmail: boolean` (default: true), `showStatus: boolean` (default: true) | `selected(userId: number)` | Clickable user row with avatar, name, status |

### View Components

| Component | Source | Route | Description |
|-----------|--------|-------|-------------|
| `App` | `src/App.vue` | — | Root component (RouterView wrapper) |
| `LoginView` | `src/views/LoginView.vue` | `/login` | Login form with validation and error handling |
| `DashboardView` | `src/views/DashboardView.vue` | `/admin` | KPI stats, top users, activity feed |
| `UserListView` | `src/views/UserListView.vue` | `/admin/users` | Searchable user list |
| `UserDetailView` | `src/views/UserDetailView.vue` | `/admin/users/:id` | Tabbed user profile page |
| `NotFoundView` | `src/views/NotFoundView.vue` | `/*` | 404 error page |
