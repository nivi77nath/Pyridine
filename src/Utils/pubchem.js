import axios from "axios";

export async function getCID(chemicalName) {
  const URL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${chemicalName}/cids/TXT`;
  return await (
    await axios.get(URL)
  ).data;
}

export function getImage(CID) {
  return `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${CID}/PNG`;
}

export async function getSynonyms(CID) {
  const URL = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${CID}/synonyms/TXT`;
  return await (
    await axios.get(URL)
  ).data;
}

export async function getAutoComplete(term) {
  const URL = `https://pubchem.ncbi.nlm.nih.gov/rest/autocomplete/compound/${term}/jsonp`;
  return await (
    await axios.get(URL)
  ).data;
}
