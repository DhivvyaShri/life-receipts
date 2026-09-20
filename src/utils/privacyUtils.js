export const safeText=(value='')=>String(value).replace(/\b\d{12,19}\b/g,'••••').slice(0,180);
export const safeLocation=(city,state)=>[city,state].filter(Boolean).join(', ') || 'Location private';
