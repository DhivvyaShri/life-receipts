import {useMemo,useState} from 'react';

// A point is a date/source cluster, not an individual raw listening record.
export default function LifeConstellation({records,onSelect}){
  const [source,setSource]=useState('all');
  const clusters=useMemo(()=>{
    const groups=new Map();
    records.forEach(record=>{
      if(source!=='all'&&record.source!==source)return;
      const key=`${record.timestamp.slice(0,10)}-${record.source}`;
      const cluster=groups.get(key)||{key,source:record.source,day:record.timestamp.slice(0,10),records:[]};
      cluster.records.push(record);groups.set(key,cluster);
    });
    return [...groups.values()].sort((a,b)=>b.records.length-a.records.length).slice(0,144);
  },[records,source]);
  return <section className="panel constellation"><div className="section-head"><div><p className="eyebrow">INTERACTIVE ATLAS</p><h2>Life constellation</h2></div><select aria-label="Constellation source" value={source} onChange={e=>setSource(e.target.value)}><option value="all">All traces</option><option value="spotify">Music</option><option value="transaction">Purchases</option><option value="household">Daily life</option></select></div><p className="muted">Each point is an aggregated daily cluster. Select it to reveal a representative safe receipt.</p><div className="stars" role="list" aria-label="Aggregated life clusters">{clusters.map((cluster,i)=><button key={cluster.key} role="listitem" title={`${cluster.day}: ${cluster.records.length} ${cluster.source} traces`} aria-label={`Open ${cluster.records.length} ${cluster.source} traces on ${cluster.day}`} onClick={()=>onSelect(cluster.records[0])} className={'star '+cluster.source} style={{left:`${(i*37)%96+2}%`,top:`${(i*61)%86+5}%`,width:`${7+Math.min(cluster.records.length,5)*2}px`,height:`${7+Math.min(cluster.records.length,5)*2}px`}}/>)}<div className="orbit o1"/><div className="orbit o2"/></div><div className="legend"><span>🎵 Music</span><span>💳 Purchases</span><span>🏠 Daily life</span><span>{clusters.length} clusters · connections emerge through time, date and behavior.</span></div></section>
}
