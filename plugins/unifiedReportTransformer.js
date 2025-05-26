// Transformer functions for security tool reports into a unified format

// SonarQube Transformer
function transformSonarQube(json) {
  if (!json.issues) return [];
  return json.issues.map(issue => ({
    tool: "SonarQube",
    id: issue.key,
    severity: issue.severity,
    component: issue.component,
    project: issue.project,
    message: issue.message,
    line: issue.line,
    status: issue.status,
    type: issue.type,
    additional_info: {}
  }));
}

// Snyk Transformer
function transformSnyk(json) {
  if (!json.vulnerabilities) return [];
  return json.vulnerabilities.map(vuln => ({
    tool: "Snyk",
    id: vuln.id,
    severity: vuln.severity,
    component: vuln.packageName,
    project: vuln.projectName || "",
    message: vuln.title,
    line: vuln.lineNumber || null,
    status: vuln.isUpgradable ? "UPGRADABLE" : "NOT_UPGRADABLE",
    type: vuln.type || "VULNERABILITY",
    additional_info: { from: vuln.from }
  }));
}

// Nessus Transformer (assuming JSON input)
function transformNessus(json) {
  if (!json.vulnerabilities) return [];
  return json.vulnerabilities.map(vuln => ({
    tool: "Nessus",
    id: vuln.plugin_id,
    severity: vuln.severity,
    component: vuln.plugin_name,
    project: vuln.host || "",
    message: vuln.description,
    line: null,
    status: vuln.see_also ? "REFER" : "",
    type: vuln.risk_factor,
    additional_info: { port: vuln.port }
  }));
}

// ZAP Transformer
function transformZap(json) {
  if (!json.site) return [];
  return json.site.flatMap(site =>
    (site.alerts || []).map(alert => ({
      tool: "ZAP",
      id: alert.pluginId,
      severity: alert.risk,
      component: alert.name,
      project: site.name,
      message: alert.description,
      line: null,
      status: "OPEN",
      type: alert.alert,
      additional_info: { url: alert.url }
    }))
  );
}

// Combine all reports
function unifyReports({ sonarJson, snykJson, nessusJson, zapJson }) {
  return [
    ...transformSonarQube(sonarJson || {}),
    ...transformSnyk(snykJson || {}),
    ...transformNessus(nessusJson || {}),
    ...transformZap(zapJson || {})
  ];
}

module.exports = {
  transformSonarQube,
  transformSnyk,
  transformNessus,
  transformZap,
  unifyReports
};
