export function unifiedTimeline(records,limit=300){return [...records].sort((a,b)=>new Date(a.timestamp)-new Date(b.timestamp)).slice(-limit)}
