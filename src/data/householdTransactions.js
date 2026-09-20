import {parseCSV} from '../utils/csv'; import {normalizeHousehold} from '../utils/normalizeData';
export async function loadHousehold(){const r=await fetch('/data/Daily Household Transactions.csv');if(!r.ok)throw Error('Daily Household Transactions.csv');return normalizeHousehold(parseCSV(await r.text()))}
