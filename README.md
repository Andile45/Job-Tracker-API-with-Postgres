# Job‑Tracker API with Postgres  
A RESTful API built in TypeScript, using Express and PostgreSQL, that allows users to manage job applications and track their status through a simple back‑end service.

---

## 🚀 Features  
- Create, read, update, and delete ("CRUD") job applications.  
- Store job information in PostgreSQL (company name, role, application date, status, etc.).  
- TypeScript for type safety and maintainability.  
- Modular architecture: routes, controllers, services, database layer.  
- Environment‑based configuration (e.g., database connection string, port).  
- Ready to deploy (locally or in a cloud environment).

---

## 🧱 Tech Stack  
- Node.js + Express  
- TypeScript  
- PostgreSQL  
- (Optional) Any ORM or query builder if included (check in code)  
- Environment variables with `.env`  

---

## 🔧 Getting Started

### Prerequisites  
- Node.js (v16+ recommended)  
- npm or yarn  
- PostgreSQL server running and accessible  
- (Optional) Postman or similar tool to test API endpoints  

### Setup  
1. Clone the repository  
   ```bash
   git clone https://github.com/Andile45/Job‑Tracker‑API‑with‑Postgres.git  
   cd Job‑Tracker‑API‑with‑Postgres  
   ```  
2. Install dependencies  
   ```bash
   npm install
   # or
   yarn install
   ```  
3. Create a `.env` file in the root directory (you can copy from a sample or `.env.example` if present). Example variables:  
   ```text
   PORT=5000  
   DATABASE_URL=postgresql://username:password@localhost:5432/job_tracker_db  
   NODE_ENV=development  
   ```  
4. Set up the database  
   - Create a new PostgreSQL database (e.g., `job_tracker_db`).  
   - Run any migrations or SQL scripts (if included) to create tables.  
5. Start the server  
   ```bash
   npm run build     # if you compile TypeScript  
   npm start  
   # or for development  
   npm run dev  
   ```  
6. The API should now be running at `http://localhost:PORT` (default `PORT=5000` if above).

---

## 📚 API Endpoints  
| Method | Path                     | Description                        |
|--------|--------------------------|------------------------------------|
| GET    | `/api/jobs`              | Get all job applications            |
| GET    | `/api/jobs/:id`          | Get a single job application       |
| POST   | `/api/jobs`              | Create a new job application       |
| PUT    | `/api/jobs/:id`          | Update an existing job application |
| DELETE | `/api/jobs/:id`          | Delete a job application           |

---

## 🧪 Testing  
```bash
npm run test
```

---

## 📐 Project Structure  
```
/src  
  /controllers  
  /services  
  /models  
  /routes  
  index.ts  
tsconfig.json  
package.json  
```

---

## ✅ Contributing  
Contributions are welcome!  
1. Fork the repository  
2. Create a feature branch (`git checkout -b feature/my‑feature`)  
3. Commit your changes (`git commit -m "Add my feature"`)  
4. Push to your branch (`git push origin feature/my‑feature`)  
5. Open a pull request

--- 

---

## 🤝 Acknowledgements  
- Thanks to all contributors and open‑source libraries used.  
- Inspired by job tracking tools and REST API best practices.


🗄️ Database Schema (PostgreSQL)

Below are example SQL statements you can use to create the necessary tables:

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Applications table
CREATE TABLE applications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    company_name VARCHAR(100) NOT NULL,
    job_title VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'Applied',
    date_applied DATE DEFAULT CURRENT_DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: trigger to update the updated_at column automatically
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_job_timestamp
BEFORE UPDATE ON applications
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

🧩 Example Data

You can insert some test data like this:

INSERT INTO users (email, password_hash)
VALUES ('test@example.com', 'hashed_password_here');

INSERT INTO applications (user_id, company_name, job_title, status, notes)
VALUES
(1, 'Google', 'Software Engineer', 'Interviewing', 'First round passed'),
(1, 'Amazon', 'Backend Developer', 'Applied', 'Waiting for response');

✅ Database Relationship Overview

One-to-many: One user can have many job applications.

When a user is deleted, all their applications are deleted automatically (ON DELETE CASCADE).
