module.exports = function nessusTransformer(data) {
  return data.vulnerabilities.map(vuln => ({
    tool: 'Nessus',
    id: vuln.plugin_id,
    name: vuln.plugin_name,
    description: vuln.description,
    severity: normalizeSeverity(vuln.severity),
    location: vuln.host + ':' + vuln.port,
    sourceTool: 'Nessus'
  }));

  function normalizeSeverity(sev) {
    const map = { 0: 'Info', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Critical' };
    return map[parseInt(sev)] || 'Info';
  }
};