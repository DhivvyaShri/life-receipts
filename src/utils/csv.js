import Papa from 'papaparse';
/** Robust quoted-field CSV parsing performed once by the dataset loaders. */
export function parseCSV(text){return Papa.parse(text,{header:true,skipEmptyLines:true,transformHeader:key=>key.trim()}).data}
