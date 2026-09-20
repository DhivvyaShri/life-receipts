import {useEffect} from 'react';
import {X,GitBranch,Clock,CalendarDays,Tag,MapPin} from 'lucide-react';

export default function ReceiptDetail({record,onClose,connections=[],records=[]}){
  useEffect(()=>{
    if(!record)return;
    const onKey=e=>{if(e.key==='Escape')onClose()};
    window.addEventListener('keydown',onKey);
    return()=>window.removeEventListener('keydown',onKey);
  },[record,onClose]);
  if(!record)return null;
  const related=connections.filter(c=>c.sourceId===record.id||c.targetId===record.id).slice(0,4).map(c=>{
    const id=c.sourceId===record.id?c.targetId:c.sourceId;
    return {...c,record:records.find(r=>r.id===id)};
  }).filter(x=>x.record);
  const source=record.source==='spotify'?'🎵 Music':record.source==='transaction'?'💳 Purchase':'🏠 Daily life';
  return <div className="dialog-back" role="presentation" onMouseDown={onClose}>
    <aside className="receipt" role="dialog" aria-modal="true" aria-labelledby="receipt-title" onMouseDown={e=>e.stopPropagation()}>
      <button className="icon" onClick={onClose} aria-label="Close details"><X/></button>
      <span className={'source '+record.source}>{source}</span>
      <h2 id="receipt-title">{record.title}</h2>
      <p>{record.description}</p>
      <dl>
        <dt><Clock/>When</dt><dd>{new Date(record.timestamp).toLocaleString()}</dd>
        {record.amount>0&&<><dt><Tag/>Amount</dt><dd>₹{record.amount.toLocaleString()}</dd></>}
        {record.location&&<><dt><MapPin/>Place</dt><dd>{record.location}</dd></>}
        <dt><CalendarDays/>Date</dt><dd>{new Date(record.timestamp).toLocaleDateString()}</dd>
        {record.metadata?.artist&&<><dt>Artist</dt><dd>{record.metadata.artist}</dd></>}
        <dt>Category</dt><dd>{record.category}</dd>
      </dl>
      <section className="connection-box" aria-labelledby="connection-title">
        <div className="connection-head"><GitBranch/><div><p className="eyebrow">DISCOVERY SIGNAL</p><h3 id="connection-title">Connected moments</h3></div></div>
        {related.length?<>
          {related.map(c=><div className="related" key={c.sourceId+c.targetId}>
            <span>{c.record.source==='spotify'?'🎵':c.record.source==='transaction'?'💳':'🏠'}</span>
            <div><b>{c.record.title}</b><small>{c.reason} · {Math.round(c.strength*100)}% signal</small></div>
          </div>)}
          <div className="signal"><span>Connection strength</span><b>{Math.round(Math.max(...related.map(x=>x.strength))*100)}%</b><div><i style={{width:`${Math.round(Math.max(...related.map(x=>x.strength))*100)}%`}}/></div></div>
          <div className="why"><b>WHY THESE ARE CONNECTED</b><span>✓ Same or nearby time</span><span>✓ Cross-dataset activity</span><span>✓ Shared life period</span></div>
        </>:<p className="muted">No strong cross-dataset connection was found for this receipt yet. Explore nearby moments to discover a thread.</p>}
      </section>
    </aside>
  </div>;
}
