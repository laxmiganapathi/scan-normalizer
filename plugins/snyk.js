module.exports = function snykTransformer(data) {
  return data.vulnerabilities.map(vuln => ({
    tool: 'Snyk',
    id: vuln.id,
    name: vuln.title,
    description: vuln.description,
    severity: vuln.severity.charAt(0).toUpperCase() + vuln.severity.slice(1),
    location: vuln.packageName,
    sourceTool: 'Snyk'
  }));
};