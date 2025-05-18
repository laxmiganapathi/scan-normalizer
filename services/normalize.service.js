const plugins = {
  zap: require('../plugins/zap'),
  sonar: require('../plugins/sonar'),
  nessus: require('../plugins/nessus'),
  snyk: require('../plugins/snyk')
};

function normalize(toolName, rawData) {
  const plugin = plugins[toolName.toLowerCase()];
  if (!plugin) throw new Error(`No plugin found for tool: ${toolName}`);
  return plugin(rawData);
}
module.exports = { normalize };