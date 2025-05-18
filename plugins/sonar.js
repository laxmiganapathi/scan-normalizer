module.exports = function sonarTransformer(data) {
  return data.issues.map(issue => ({
    tool: 'SonarQube',
    id: issue.rule,
    name: issue.message,
    description: issue.message,
    severity: normalizeSeverity(issue.severity),
    location: issue.component,
    sourceTool: 'SonarQube'
  }));

  function normalizeSeverity(sev) {
    const map = { BLOCKER: 'High', CRITICAL: 'High', MAJOR: 'Medium', MINOR: 'Low', INFO: 'Info' };
    return map[sev] || 'Info';
  }
};