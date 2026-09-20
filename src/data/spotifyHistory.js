import {parseCSV} from '../utils/csv'; import {normalizeSpotify} from '../utils/normalizeData';
export async function loadSpotify(){const r=await fetch('/data/spotify_history.csv');if(!r.ok)throw Error('spotify_history.csv');return normalizeSpotify(parseCSV(await r.text()))}
