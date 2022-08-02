# JavaVuln

JavaVuln allows you to view your projects, the libraries they depend on and the vulnerabilities (CVEs) they may have.

# Getting Started

1. Clone the repo
2. Create a `.env` file under `javavuln-api` with the properties found under `javavuln-api/example.env`
3. Create a `.env` file under `javavuln` with the properties found under `javavuln/example.env`
4. Populate a Sqlite database in accordance with the following schema:

```sql
CREATE TABLE projects (
    id INTEGER PRIMARY KEY,
    project_name TEXT
);

CREATE TABLE libraries (
    id INTEGER PRIMARY KEY,
    path TEXT,
    name TEXT,
    version TEXT,
    group_id TEXT,
    artifact_id TEXT,
    latest_version TEXT,
    max_cvss_v3 REAL,
    count_cves INTEGER,
    count_unknown INTEGER,
    count_none INTEGER,
    count_low INTEGER,
    count_medium INTEGER,
    count_high INTEGER,
    count_critical INTEGER
);

CREATE TABLE cves (
    cve TEXT,
    cvss_v3 REAL,
    severity TEXT,
    published_date TEXT,
    last_modified_date TEXT,
    json_data TEXT
);

-- Not currently used
CREATE TABLE project_project_dependencies (
    id INTEGER PRIMARY KEY,
    project_id INTEGER,
    depends_on_id INTEGER,
    depends_on_name TEXT
);

-- Sqlite uses INTEGER for BOOL (hence direct is an INTEGER)
CREATE TABLE project_library_dependencies (
    id INTEGER PRIMARY KEY,
    project_id INTEGER,
    library_id INTEGER,
    direct INTEGER
);

-- Sqlite uses INTEGER for BOOL (hence direct is an INTEGER)
CREATE TABLE library_cves (
    id INTEGER PRIMARY KEY,
    library_id INTEGER,
    cve TEXT,
    direct INTEGER
);
```

5. Open a terminal window and change directory into the `javavuln-api` subdirectory.
6. Run `npm install`
7. Run `npm start` or `npm run dev` to start the API server.
8. Open a second terminal window and change into the `javavuln` subdirectory.
9. Run `npm install`
10. Run `npm run dev -- --open` to start the web server.
