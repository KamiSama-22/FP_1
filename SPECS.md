# Event Management API Specification

Panduan API mengenai proyek yang dibuat dengan **NestJS**

---

## 1. Gambaran Project

**Backend Qurbankan**

### Teknologi yang dipakai

- Node.js
- NestJS
- REST API
- JSON
- JWT Authentication
- Swagger / OpenAPI
- Class Validator

### Base URL

```text
/
```

langsung digunakan tanpa /api

Contoh :

```text
http://localhost:3000/
```

# 2. Konsep API

API menggunakan format JSON.

## Success Response

Contoh response ketika request berhasil:

```json
{
  "success": true,
  "message": "Data hewan berhasil diambil",
  "data": {}
}
```

## Error Response

Contoh response ketika terjadi error:

```json
{
  "success": false,
  "message": "Barang tidak ditemukan",
  "error": "Not Found",
  "statusCode": 404
}
```

---

# 3. HTTP Status Code

| Status Code | Keterangan |
|---|---|
| `200` | Request berhasil |
| `201` | Data berhasil dibuat |
| `204` | Berhasil tanpa response body |
| `400` | Request tidak valid |
| `401` | Belum login atau token tidak valid |
| `403` | Tidak memiliki permission |
| `404` | Data tidak ditemukan |
| `409` | Terjadi conflict |
| `422` | Validation error |
| `500` | Internal server error |

---

# 4. Authentication

Authentication menggunakan **Bearer Token**.

Setiap endpoint yang membutuhkan authentication harus mengirimkan header:

```http
Authorization: Bearer {accessToken}
```

Contoh:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```
---

# 5. Authentication API

## 5.1 Register

Mendaftarkan user baru.

### Endpoint

```http
POST /auth/register
```

### Request Body

```json
{
  "name": "Fakhri",
  "email": "fakhri@gmail.com",
  "password": "24090113",
  "confirmPassword": "24090113"
}
```

### Response

**HTTP 201 Created**

```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "user": {
      "id": 1,
      "name": "Fakhri",
      "email": "fakhri@gmail.com"
    },
    "accessToken": "dhU5H3Ids23djala0..."
  }
}
```

---

## 5.2 Login

Login user ke dalam aplikasi.

### Endpoint

```http
POST /auth/login
```

### Request Body

```json
{
    "email": "fakhri@gmail.com",
    "password": "24090113"
}
```

### Response

**HTTP 200 OK**

```json
{
  "success": true,
  "message": "Login Berhasil",
  "data": {
    "user": {
      "id": 1,
      "name": "Fakhri",
      "email": "fakhri@gmail.com"
    },
    "accessToken": "dhU5H3Ids23djala0..."
  }
}
```

---


Logout user.

### Endpoint

```http
POST /auth/logout
```

### Headers

```http
Authorization: Bearer {accessToken}
```

### Response

```json
{
  "success": true,
  "message": "Logout berhasil"
}
```

---

# 6. Input hewan API

Data hewan adalah data utama dalam Event Management System.

Entitas hewan memiliki informasi seperti:

- Foto
- Nama
- Jenis
- Deskripsi
- Harga

---


## 6.1 Get All Hewan

Mengambil Semua daftar Hewan.

### Endpoint

```http
GET /allhewan
```

### Query Parameters

| Parameter | Type | Required | Keterangan |
|---|---|---|---|
| `page` | integer | No | Nomor halaman |
| `limit` | integer | No | Jumlah data |
| `search` | string | No | Pencarian event |
| `jenis` | string | No | Filter jenis hewan |

### Contoh Request

```http
GET /events?page=1&limit=20&search=sapi
```

### Response

```json
{
  "success": true,
  "message": "Data hewan berhasil diambil",
  "data": [
    {
      "id": 1,
      "foto": "img_id12.webp",
      "nama": "kambing etawa",
      "jenis": "kambing",
      "deskripsi": "kambing jenis etawa umur 2,5 tahun bobot 15kg",
      "harga": 2250000
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "totalPages": 3
  }
}
```

---

# 7. Get Hewan Detail

Mengambil detail satu Hewan.

### Endpoint

```http
GET /hewan/:id
```

### Contoh Request

```http
GET /hewan/1
```

### Response

```json
{
  "success": true,
  "message": "Event retrieved successfully",
  "data": {
      "id": 1,
      "foto": "img_id12.webp",
      "nama": "kambing etawa",
      "jenis": "kambing",
      "deskripsi": "kambing jenis etawa umur 2,5 tahun bobot 15kg",
      "harga": 2250000,
      "createdby": "Hendra farming",
      "cratedat": 2026-10-14 09-45-04,
      "updateby": " ",
      "updatedat": " "
    }
}
```

---

# 8. Create Hewan

Menambah Hewan baru.

### Endpoint

```http
POST /hewan
```

### Authorization

```http
Authorization: Bearer {accessToken}
```

### Request Body

```json
{
    "id": 1,
    "foto": "img_id12.webp",
    "nama": "kambing etawa",
    "jenis": "kambing",
    "deskripsi": "kambing jenis etawa umur 2,5 tahun bobot 15kg",
    "harga": 2250000
}
```

### Response

**HTTP 201 Created**

```json
{
    "success": true,
    "message": "data heawn berhasil dibuat",
    "data": {
        "id": 1,
        "foto": "img_id12.webp",
        "nama": "kambing etawa",
        "jenis": "kambing",
        "deskripsi": "kambing jenis etawa umur 2,5 tahun bobot 15kg",
        "harga": 2250000
    }
}
```

---

# 9. Update Hewan

Mengubah data event.

### Endpoint

```http
PATCH /hewan/:id
```

### Authorization

```http
Authorization: Bearer {accessToken}
```

### Request Body

```json
{
  "foto": "img_id12.webp",
  "harga": 2250000
}
```

### Response

```json
{
  "success": true,
  "message": "data hewan berhasil diupdate",
  "data": {
    "id": 1,
    "foto": "img_id12.webp",
    "harga": 2250000
  }
}
```

> `PATCH` digunakan karena hanya field yang ingin diubah yang perlu dikirimkan.

---

# 10. Delete Event

Menghapus event.

### Endpoint

```http
DELETE /hewan/:id
```

### Authorization

```http---
Authorization: Bearer {accessToken}
```

---

# 11. Validation Error

Project NestJS dapat menggunakan `ValidationPipe` untuk melakukan validasi request.

Contoh ketika user membuat data hewan tanpa `nama`:

```json
{
  "success": false,
  "message": [
    "nama harus di isi",
    "nama harus menggunakan string"
  ],
  "error": "Unprocessable Entity",
  "statusCode": 422
}
```

Contoh konfigurasi:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
```

---

# 12. DTO Example

Contoh DTO untuk membuat data hewan baru:

```typescript
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateHewanDto {
  @IsNotEmpty()
  @IsString()
  foto: string;

  @IsNotEmpty()
  @IsString()
  nama: string;

  @IsNotEmpty()
  @IsString()
  jenis: string;

  @IsNotEmpty()
  @IsString()
  deskripsi: string;

  @IsNumber()
  @Min(0)
  harga: number;
}

```

---

# 13. API Endpoint Summary

Berikut seluruh endpoint utama yang terdapat pada project untuk saat ini.

## Authentication

| Method | Endpoint | Authentication |
|---|---|---|
| `POST` | `/auth/register` | No |
| `POST` | `/auth/login` | No |
| `POST` | `/auth/logout` | Yes |

## Hewan

| Method | Endpoint | Authentication |
|---|---|---|
| `GET` | `/allhewan` | No |
| `GET` | `/hewan` | No |
| `POST` | `/hewan` | Yes |
| `PUT` | `/hewan/:id` | Yes |
| `DELETE` | `/hewan/:id` | Yes |

---

# 14. Struktur Module NestJS

API di atas dapat diimplementasikan dengan struktur module seperti berikut:


```text
src/
├── auth/
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   └── guards/
│
├── users/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── entities/
│
├── hewan/
│   ├── hewan.controller.ts
│   ├── hewan.service.ts
│   ├── hewan.module.ts
│   ├── dto/
│   └── entities/
│
├── common/
│   ├── guards/
│   ├── filters/
│   ├── interceptors/
│   ├── decorators/
│   └── pipes/
│
├── app.module.ts
└── main.ts
```

---

# 15. Rekomendasi Tahapan Pengerjaan

Project Event Management dapat dikerjakan secara bertahap.

## Phase 1 — Basic CRUD

Pelajari:

- Module
- Controller
- Service
- DTO
- CRUD
- Database
- Entity

Fitur:

```text
User
hewan
```

---

## Phase 2 — Authentication

Pelajari:

- JWT
- Authentication
- Guards
- Password hashing
- Authorization header

Fitur:

```text
Register
Login
Logout
Protected Route
```
---

## Phase 3 — Role & Permission

Pelajari:

- Roles Guard
- Custom Decorator
- Authorization

Contoh role:

```text
admin
farmer
user
```

Contoh permission:

```text
admin
    └── mengelola jalannya aplikasi

farmer 
    └── mengatur data hewan serta kondisinya

attendee
    └── melihat dan melakukan investasi atau pembelian
```

## Phase 5 — Dashboard

Pelajari:

- Aggregation query
- Reporting
- Pagination
- Filtering

Dashboard menampilkan:

```text
Total hewan
Total user
Data keuangan
Revenue
```

---

## Phase 6 — Production Ready

Pelajari:

- Exception Filter
- Interceptor
- Logging
- Swagger
- Rate Limiting
- Caching
- Unit Testing
- E2E Testing
- Environment Configuration


---

# 16. Final API Architecture

Secara keseluruhan, API memiliki struktur:

```text
/
│
├── auth
│   ├── POST   /register
│   ├── POST   /login
│   └── POST   /logout
│
├── users
│   ├── GET    /users
│   ├── POST   /users
│   ├── PATCH  /users
│   └── DELETE /users
│
├── hewan
│   ├── GET    /hewan
│   ├── POST   /hewan
│   ├── GET    /hewan/:id
│   ├── PATCH  /hewan/:id
│   ├── DELETE /hewan/:id
│
│
└── dashboard
    └── GET    /overview
```

---

# 17. Validation Schema

Bagian ini mendefinisikan aturan validasi input untuk setiap endpoint yang menerima request body atau query parameter.

Tujuan validation schema adalah memastikan:

1. Data yang dikirim client memiliki format yang benar.
2. Field wajib tidak boleh kosong.
3. Tipe data sesuai dengan API contract.
4. Nilai berada dalam batas yang diperbolehkan.
5. Data yang tidak valid ditolak sebelum diproses oleh business logic.

Pada NestJS, validation dapat diimplementasikan menggunakan:

```bash
npm install class-validator class-transformer
```

Kemudian aktifkan `ValidationPipe` secara global:

```typescript
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
);
```

`whitelist: true` digunakan untuk menghapus property yang tidak didefinisikan pada DTO.

`transform: true` digunakan agar data request dapat ditransformasikan sesuai kebutuhan DTO.

---

# 18. Authentication Validation

## 18.1 Register

### Endpoint

```http
POST /auth/register
```

### Validation Schema

| Field | Type | Required | Validation |
|---|---|---:|---|
| `name` | string | Yes | 2–100 karakter |
| `email` | string | Yes | Format email valid |
| `password` | string | Yes | Minimal 8 karakter |
| `passwordConfirmation` | string | Yes | Harus sama dengan `password` |

### Example Valid Request

```json
{
  "name": "Fakhri",
  "email": "fakhri@gmail.com",
  "password": "24090113",
  "confirmPassword": "24090113"
}
```

### DTO

```typescript
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  passwordConfirmation: string;
}
```

> Pengecekan bahwa `passwordConfirmation` sama dengan `password` merupakan business validation tambahan dan dapat dilakukan di service atau menggunakan custom validator.

---

## 18.2 Login

### Endpoint

```http
POST /api/v1/auth/login
```

### Validation Schema

| Field | Type | Required | Validation |
|---|---|---:|---|
| `email` | string | Yes | Format email valid |
| `password` | string | Yes | Minimal 8 karakter |

### DTO

```typescript
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
```
