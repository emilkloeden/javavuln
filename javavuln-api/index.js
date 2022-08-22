require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors')

const nodeEnv = process.env["NODE_ENV"] || "dev";
const apiPort = process.env["API_PORT"] || 3001;
const frontEndPort = process.env["FRONT_END_PORT"] || 5173;
const dbName = process.env["DB_NAME"];

const queries = require('./queries.js')
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error(err);
        exit(1)
    }
})


const app = express()

const corsOptions = {
    origin: `http://localhost:${frontEndPort}`
}

// app.use(cors(corsOptions))
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(bodyParser.json())

const {
    PROJECTS_AGG_QUERY,
    TOP_LEVEL_AGG_QUERY,
    Q_PROJECT_LIBRARIES,
    Q_PROJECT_FROM_ID,
    Q_LIBRARIES,
    Q_LIBRARY_DETAIL,
    Q_LIBRARY_PROJECTS,
    Q_LIBRARY_CVES,
    Q_CVES,
    Q_CVE_DETAIL,
    Q_CVE_LIBRARIES,
    Q_CVE_PROJECTS,
} = queries;



app.get('/', (req, res) => {
    db.get(TOP_LEVEL_AGG_QUERY, (err, row) => {
        if (err) {
            res.status(404)
            res.send()
        }
        res.json(row)
    })
})

app.get('/projects', (req, res) => {
    db.all(PROJECTS_AGG_QUERY, (err, rows) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(rows)
        }
    })
})

app.get('/projects/:projectId', (req, res) => {
    const { projectId } = req.params;
    console.log(projectId)
    const stmt = db.prepare(Q_PROJECT_FROM_ID, [projectId])
    stmt.get((err, row) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(row)
        }
    })
})


app.get('/projects/:projectId/libraries', (req, res) => {
    const { projectId } = req.params;
    console.log(projectId)
    const stmt = db.prepare(Q_PROJECT_LIBRARIES, [projectId])
    stmt.all((err, rows) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(rows)
        }
    })
})

app.get('/libraries', (req, res) => {
    db.all(Q_LIBRARIES, (err, rows) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(rows)
        }
    })
})

app.get('/libraries/:libraryId', (req, res) => {
    const { libraryId } = req.params;
    const stmt = db.prepare(Q_LIBRARY_DETAIL, [libraryId])
    stmt.get((err, row) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(row)
        }
    })
})

app.get('/libraries/:libraryId/projects', (req, res) => {
    const { libraryId } = req.params;
    const stmt = db.prepare(Q_LIBRARY_PROJECTS, [libraryId])
    stmt.all((err, rows) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(rows)
        }
    })
})

app.get('/libraries/:libraryId/cves', (req, res) => {
    const { libraryId } = req.params;
    const stmt = db.prepare(Q_LIBRARY_CVES, [libraryId])
    stmt.all((err, rows) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            const libCves = rows2CVEs(rows)
            res.json(libCves)
        }
    })
})

app.get('/cves/', (req, res) => {
    db.all(Q_CVES, (err, rows) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(rows2CVEs(rows))
        }
    })
})

app.get('/cves/:cve', (req, res) => {
    const { cve } = req.params;
    const stmt = db.prepare(Q_CVE_DETAIL, [cve])
    stmt.get((err, row) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            try {
                const cveDetail =
                    row2CVEDetail(row)

                res.json(cveDetail)
            } catch {
                res.status(500)
                res.send()
            }
        }
    })
})

app.get('/cves/:cve/libraries', (req, res) => {
    const { cve } = req.params
    const stmt = db.prepare(Q_CVE_LIBRARIES, [cve])
    stmt.all((err, rows) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(rows)
        }
    })
})

app.get('/cves/:cve/projects', (req, res) => {
    const { cve } = req.params
    const stmt = db.prepare(Q_CVE_PROJECTS, [cve])
    stmt.all((err, rows) => {
        if (err) {
            res.status(404)
            res.send()
        } else {
            res.json(rows)
        }
    })
})

app.listen(apiPort, () => console.log(`JavaVuln API Running in ${nodeEnv} mode, listening on ${apiPort}, using CORS config: ${JSON.stringify(corsOptions)}`))

function rows2CVEs(rows) {
    return rows.map(row2CVE);
}
function row2CVE(row) {
    const {
        cve, cvss_v3, direct, severity, published_date, last_modified_date, json_data
    } = row;
    const data = JSON.parse(json_data);
    const cwes_ = data?.cve?.problemtype?.problemtype_data?.[0]?.description || [];
    const cwes = cwes_.map(cwe => cwe.value);
    const d = data?.cve?.description?.description_data?.[0]?.value || '';
    return {
        cve,
        cvss_v3,
        direct,
        severity,
        published_date,
        last_modified_date,
        description: d,
        cwes
    };
}

function row2CVEDetail(row) {
    const {
        cve, cvss_v3, severity, published_date, last_modified_date, json_data
    } = row;
    const data = JSON.parse(json_data);
    const cwes_ = data?.cve?.problemtype?.problemtype_data?.[0]?.description || [];
    const cwes = cwes_.map(cwe => cwe.value);
    const d = data?.cve?.description?.description_data?.[0]?.value || '';
    const references = data?.cve?.references?.reference_data || [];
    const { impact } = data;
    const cvss_v3_data = impact?.baseMetricV3?.cvssV3
    const cvss_v2_data = impact?.baseMetricV2?.cvssV2
    return {
        cve,
        cvss_v3,
        severity,
        published_date,
        last_modified_date,
        description: d,
        cwes,
        cvss_v3_data,
        cvss_v2_data,
        references,
        data
        // data
    };
}