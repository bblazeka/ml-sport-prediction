import axios from "axios";
import newsapi from "../keys/newsapi.json";
import mapbox from "../keys/mapbox.json";

async function nhlApiRequest(path) {
  const response = await axios.get(`http://statsapi.web.nhl.com${path}`);
  return response.data;
}

async function enhancedNhlApiRequest(path) {
  const response = await axios.get(`https://api.nhle.com${path}`);
  return response.data;
}

async function newsApiRequest(path) {
  const response = await axios.get(
    `http://newsapi.org${path}&apiKey=${newsapi.key}`
  );
  return response.data;
}

async function mapboxApiRequest(query): Promise<TApiMapboxLocations> {
  const response = await axios.get(
    `https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      query
    )}.json?access_token=${mapbox.key}`
  );
  return response.data;
}

async function wikiApiRequest(query) {
  const response = await axios.get(
    `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${encodeURIComponent(
      query
    )}`
  );
  const pages = response.data.query.pages;
  return pages[Object.keys(pages)[0]];
}

async function playerWikiRequest(query, optionalQuery = "") {
  let result = await wikiApiRequest(query);
  if (result.extract.includes("may refer to") && optionalQuery.length > 0) {
    result = await wikiApiRequest(`${query} (ice hockey)`);
    if (
      result.extract.includes("may refer to") ||
      Object.prototype.hasOwnProperty.call(result, "missing")
    ) {
      result = await wikiApiRequest(`${query} ${optionalQuery}`);
    }
  }
  return result;
}

async function wikiApiAdvancedRequest(mainQuery, subQuery) {
  let res = await wikiApiRequest(`${mainQuery} ${subQuery}`);
  if (res === undefined || res.ns == 0) {
    res = await wikiApiRequest(`${mainQuery}`);
  }
  return res;
}

export {
  nhlApiRequest,
  enhancedNhlApiRequest,
  newsApiRequest,
  mapboxApiRequest,
  wikiApiRequest,
  playerWikiRequest,
  wikiApiAdvancedRequest,
};
