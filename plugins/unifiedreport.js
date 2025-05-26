const fs = require('fs');
const { unifyReports } = require('./plugins/unifiedReportTransformer');

const sonarJson = JSON.parse(fs.readFileSync('sonarqube_report.json'));
const snykJson = JSON.parse(fs.readFileSync('snyk_report.json'));
const nessusJson = JSON.parse(fs.readFileSync('nessus_report.json'));
const zapJson = JSON.parse(fs.readFileSync('zap_report.json'));

const unified = unifyReports({ sonarJson, snykJson, nessusJson, zapJson });
fs.writeFileSync('unified_report.json', JSON.stringify(unified, null, 2));
