
import "@babel/polyfill";

const fetch = require('node-fetch');
const crypto = require('crypto');

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId },
  { plugins, ...options }
) => {

  const apiUrl = `https://api.openweathermap.org/data/2.5/${options.type}?q=${options.location}&units=${options.units}&apikey=${options.apikey}`;
  const response = await fetch(apiUrl);
  const data = await response.json();




  createNode({

    
    ...data,
    id: createNodeId(`weather-${data.id}`),
    parent: null,
    children: [],
    resolve: `gatsby-source-openweathermap`,
    options: {
      apikey: '54b1a419ae1170ccfee95b5d97a47f8e',
      location: 'York',
      units: 'metric',
      type: 'forecast'
    },
    internal: {
        
      type: 'OpenWeather',
      content: JSON.stringify(data),
      contentDigest: crypto
        .createHash('md5')
        .update(JSON.stringify(data))
        .digest('hex'),

    },
  });
};