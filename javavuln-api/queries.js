const TOP_LEVEL_AGG_QUERY = `
WITH p AS (
    SELECT COUNT(1) AS c
    FROM projects
), l AS (
    SELECT COUNT(1) AS c
    FROM libraries
), v AS (
    SELECT COUNT(1) AS c
    FROM cves
)
SELECT 
p.c AS projects,
l.c AS libraries,
v.c AS vulnerabilities
FROM p
JOIN l ON 1=1
JOIN v ON 1=1
;
`

const PROJECTS_AGG_QUERY =
    `WITH vulns AS (SELECT 
    p.id, 
    p.project_name, 
    COUNT(1) AS count_cves, 
    MAX(c.cvss_v3) AS max_cvss_v3
    FROM projects p 
    JOIN project_library_dependencies pld 
    ON pld.project_id = p.id 
    JOIN libraries l 
    ON l.id = pld.library_id 
    JOIN library_cves lc 
    ON lc.library_id = l.id 
    JOIN cves c 
    ON c.cve = lc.cve 
    GROUP BY p.id, p.project_name),
deps AS (
    SELECT 
    p.id, 
    project_name, 
    COUNT(DISTINCT(pld.library_id)) AS count_dependencies, 
    COUNT(DISTINCT(d.library_id)) AS count_direct_dependencies 
    FROM projects p 
    JOIN project_library_dependencies pld 
    ON pld.project_id = p.id 
    LEFT JOIN project_library_dependencies d 
    ON d.project_id = p.id 
    AND d.direct = 1 
    GROUP BY p.id, project_name
),
unknown AS (SELECT 
    p.id, 
    p.project_name, 
    COUNT(1) AS count_cves, 
    MAX(c.cvss_v3) AS max_cvss_v3
    FROM projects p 
    JOIN project_library_dependencies pld 
    ON pld.project_id = p.id 
    JOIN libraries l 
    ON l.id = pld.library_id 
    JOIN library_cves lc 
    ON lc.library_id = l.id 
    JOIN cves c 
    ON c.cve = lc.cve 
    WHERE c.severity is NULL
    GROUP BY p.id, p.project_name
),
none AS (SELECT 
    p.id, 
    p.project_name, 
    COUNT(1) AS count_cves
    FROM projects p 
    JOIN project_library_dependencies pld 
    ON pld.project_id = p.id 
    JOIN libraries l 
    ON l.id = pld.library_id 
    JOIN library_cves lc 
    ON lc.library_id = l.id 
    JOIN cves c 
    ON c.cve = lc.cve 
    WHERE c.severity = 'NONE'
    GROUP BY p.id, p.project_name
),
low AS (SELECT 
    p.id, 
    p.project_name, 
    COUNT(1) AS count_cves, 
    MAX(c.cvss_v3) AS max_cvss_v3
    FROM projects p 
    JOIN project_library_dependencies pld 
    ON pld.project_id = p.id 
    JOIN libraries l 
    ON l.id = pld.library_id 
    JOIN library_cves lc 
    ON lc.library_id = l.id 
    JOIN cves c 
    ON c.cve = lc.cve 
    WHERE c.severity = 'LOW'
    GROUP BY p.id, p.project_name
),
medium AS (SELECT 
    p.id, 
    p.project_name, 
    COUNT(1) AS count_cves, 
    MAX(c.cvss_v3) AS max_cvss_v3
    FROM projects p 
    JOIN project_library_dependencies pld 
    ON pld.project_id = p.id 
    JOIN libraries l 
    ON l.id = pld.library_id 
    JOIN library_cves lc 
    ON lc.library_id = l.id 
    JOIN cves c 
    ON c.cve = lc.cve 
    WHERE c.severity = 'MEDIUM'
    GROUP BY p.id, p.project_name
),
high AS (SELECT 
    p.id, 
    p.project_name, 
    COUNT(1) AS count_cves, 
    MAX(c.cvss_v3) AS max_cvss_v3
    FROM projects p 
    JOIN project_library_dependencies pld 
    ON pld.project_id = p.id 
    JOIN libraries l 
    ON l.id = pld.library_id 
    JOIN library_cves lc 
    ON lc.library_id = l.id 
    JOIN cves c 
    ON c.cve = lc.cve 
    WHERE c.severity = 'HIGH'
    GROUP BY p.id, p.project_name
),
critical AS (SELECT 
    p.id, 
    p.project_name, 
    COUNT(1) AS count_cves, 
    MAX(c.cvss_v3) AS max_cvss_v3
    FROM projects p 
    JOIN project_library_dependencies pld 
    ON pld.project_id = p.id 
    JOIN libraries l 
    ON l.id = pld.library_id 
    JOIN library_cves lc 
    ON lc.library_id = l.id 
    JOIN cves c 
    ON c.cve = lc.cve 
    WHERE c.severity = 'CRITICAL'
    GROUP BY p.id, p.project_name
)

SELECT 
    d.id, 
    d.project_name, 
    d.count_dependencies, 
    d.count_direct_dependencies,
    v.count_cves, 
    v.max_cvss_v3,
    COALESCE(u.count_cves, 0) as count_unknown,
    COALESCE(n.count_cves, 0) as count_none,
    COALESCE(l.count_cves, 0) as count_low,
    COALESCE(m.count_cves, 0) as count_medium,
    COALESCE(h.count_cves, 0) as count_high,
    COALESCE(c.count_cves, 0) as count_critical
FROM vulns v
JOIN deps d ON v.id = d.id
LEFT JOIN unknown u ON u.id = d.id
LEFT JOIN none n ON n.id = d.id
LEFT JOIN low l ON l.id = d.id
LEFT JOIN medium m ON m.id = d.id
LEFT JOIN high h ON h.id = d.id
LEFT JOIN critical c ON c.id = d.id
;`



// Could add l.path here if desired
const Q_PROJECT_LIBRARIES = `
SELECT l.id, l.name, l.group_id, l.artifact_id, l.version, l.count_cves, l.max_cvss_v3
FROM
projects p
JOIN project_library_dependencies pld
ON pld.project_id = p.id
JOIN libraries l ON l.id = pld.library_id
WHERE p.id = ?
ORDER BY l.count_cves DESC
`

const Q_PROJECT_FROM_ID = `
SELECT *
FROM projects
WHERE id = ?`

const Q_LIBRARIES = `SELECT * FROM libraries ORDER BY count_critical DESC`
const Q_LIBRARY_DETAIL = `
SELECT * FROM libraries WHERE id = ? LIMIT 1;`

const Q_LIBRARY_PROJECTS = `
SELECT DISTINCT p.id, p.project_name 
FROM projects p
JOIN project_library_dependencies pld
ON pld.project_id = p.id
JOIN libraries l ON l.id = pld.library_id
WHERE l.id = ?`

const Q_LIBRARY_CVES = `
SELECT DISTINCT 
    c.cve, 
    c.cvss_v3, 
    c.severity,
    lc.direct,
    c.published_date, 
    c.last_modified_date, 
    c.json_data
FROM cves c
JOIN library_cves lc
ON lc.cve = c.cve
WHERE lc.library_id = ?
ORDER BY c.cvss_v3 DESC, c.cve;`


const Q_CVES = `SELECT DISTINCT 
c.cve, 
c.cvss_v3, 
c.severity, 
c.published_date, 
c.last_modified_date, 
c.json_data
FROM cves c
ORDER BY c.cvss_v3 DESC, c.cve;`

const Q_CVE_DETAIL = `SELECT * FROM cves WHERE cve = ?`

const Q_CVE_LIBRARIES = `SELECT 
DISTINCT
    l.id, l.name, l.group_id, l.artifact_id, l.version, 
    l.count_cves, l.max_cvss_v3
FROM
    library_cves lc
JOIN libraries l ON l.id = lc.library_id
WHERE lc.cve = ?
ORDER BY l.name`

const Q_CVE_PROJECTS = `SELECT 
DISTINCT
    p.project_name
FROM
    library_cves lc
JOIN libraries l ON l.id = lc.library_id
JOIN project_library_dependencies pld ON pld.library_id = l.id
JOIN projects p ON p.id = pld.project_id
WHERE lc.cve = ?
ORDER BY l.name`

module.exports = {
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
}
