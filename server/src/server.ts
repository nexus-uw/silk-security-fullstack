import express from 'express'
import sqlite3, { Statement } from 'sqlite3'
import { open, Database } from 'sqlite'
import cors from 'cors'
// todo proper db input to routes
let db: Database<sqlite3.Database, Statement>
// this is a top-level await
(async () => {
  // open the database
  db = await open({
    filename: `${__dirname}/../findings.db`,
    driver: sqlite3.Database,
    mode: sqlite3.OPEN_READONLY
  })
})()


const app = express()
app.use(cors()) // todo: limit to dev only environments
const port = parseInt(process.env.PORT || '3000')
const PREFIX = '/api/v1/'
// auth would be nice
// authorization would also be nice

app.get(`${PREFIX}display-grouped-findings`, async (req, res) => {
  // todo pagination
  const data = await db.all(`SELECT
    id,
    grouping_type,
    grouping_key,
    severity,
    grouped_finding_created,
    sla,
    description,
    security_analyst,
    owner,
    workflow,
    status,
    progress
  FROM grouped_findings`)
  res.send({
    data
  })
})

app.get(`${PREFIX}display-findings/:grouped_finding_id`, async (req, res) => {
  const data = await db.all(`SELECT
    id,
    source_security_tool_name,
    source_security_tool_id,
    source_collaboration_tool_name,
    source_collaboration_tool_id,
    severity,
    finding_created,
    ticket_created,
    description,
    asset,
    status,
    remediation_url,
    remediation_text
  FROM raw_findings
  WHERE grouped_finding_id = :grouped_finding_id`,
    { ':grouped_finding_id': req.params['grouped_finding_id'] })

  res.send({
    data
  })
})

app.get(`${PREFIX}display-grouped-findings-counts`, async (_, res) => {
  const data = await db.all(`SELECT
    severity,
    COUNT(*) as count
  FROM grouped_findings
  GROUP BY severity
  ORDER BY COUNT(*) DESC`)
  res.send({
    data
  })
})

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`server running on port ${port}`)
})

process.on('SIGTERM', async () => {
  await db.close()

  server.close(() => {
    console.log('HTTP server closed')
  })
})
process.on('SIGINT', function () {
  process.exit()
})


// todo: on shutdown db.close()