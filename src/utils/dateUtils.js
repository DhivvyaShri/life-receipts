export const hourBand=t=>{let h=new Date(t).getHours();return h<12?'morning':h<17?'afternoon':h<22?'evening':'night'};
export const sameDay=(a,b)=>a?.slice(0,10)===b?.slice(0,10);
