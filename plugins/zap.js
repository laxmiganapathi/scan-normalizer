module.exports = function zapTransformer(data) {
  return data.site.flatMap(site => site.alerts.map(alert => ({
    tool: 'ZAP',
    id: alert.pluginid,
    name: alert.alert,
    description: alert.description || '',
    severity: normalizeSeverity(alert.riskdesc),
    location: site['@name'],
    evidence: alert.instances?.[0]?.evidence || '',
    sourceTool: 'ZAP'
  })));

  function normalizeSeverity(risk) {
    const level = risk.toLowerCase();
    if (level.includes("high")) return "High";
    if (level.includes("medium")) return "Medium";
    if (level.includes("low")) return "Low";
    return "Info";
  }
};