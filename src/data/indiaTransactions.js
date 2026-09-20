import {parseCSV} from '../utils/csv'; import {normalizeIndia} from '../utils/normalizeData';
export async function loadIndia(){const r=await fetch('/data/Augmented_IndiaTransactMultiFacet2024.csv');if(!r.ok)throw Error('Augmented_IndiaTransactMultiFacet2024.csv');return normalizeIndia(parseCSV(await r.text()))}
