import {useEffect,useState}from'react';
import {motion}from'framer-motion';
import {X,ArrowRight,ArrowLeft,GitBranch,Sparkles}from'lucide-react';
import {makeStory}from'../utils/storyEngine';
export default function StoryMode({thread,onClose,onSelect}){
  const [step,setStep]=useState(0);
  useEffect(()=>{setStep(0)},[thread]);
  useEffect(()=>{if(!thread)return;const key=e=>{if(e.key==='Escape')onClose();if(e.key==='ArrowRight')setStep(s=>Math.min(s+1,Math.max(0,(thread.records?.length||1)-1)));if(e.key==='ArrowLeft')setStep(s=>Math.max(0,s-1))};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[thread,onClose]);
  if(!thread)return null;
  const story=makeStory(thread), records=story.steps||[];
  return <div className="story" role="dialog" aria-modal="true" aria-labelledby="story-title">
    <button className="close-story" onClick={onClose}><X/> Back to life</button>
    <motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} className="story-inner">
      <p className="eyebrow"><Sparkles/> ONE MOMENT. MANY RECEIPTS.</p>
      <h1 id="story-title">{story.headline}</h1>
      <p className="lead">{story.body}</p>
      <div className="story-signal"><GitBranch/><div><b>{Math.round((thread.connection?.strength||0)*100)}% connection signal</b><span>{thread.connection?.reason||'Cross-dataset pattern'}</span></div></div>
      <div className="story-steps">{records.map((s,i)=><motion.div initial={{opacity:0,x:-12}} animate={{opacity:i<=step?1:.45,x:0}} transition={{delay:i*.04}} className={'story-step '+(i===step?'current':'')} key={s.record.id}>
        <small>{s.label}</small>
        <button onClick={()=>{setStep(i);onSelect(s.record)}} aria-label={`Open ${s.record.title}`}><b>{s.record.source==='spotify'?'🎵':s.record.source==='transaction'?'💳':'🏠'}</b><span>{s.record.title}<em>{new Date(s.record.timestamp).toLocaleString()}</em></span><ArrowRight/></button>
      </motion.div>)}</div>
      <section className="story-meaning"><p className="eyebrow">WHAT DOES IT MEAN?</p><h2>The connection</h2><p>What looked like separate receipts may represent one period of activity. The thread is based on the actual time, date and cross-dataset signals in the supplied records.</p></section>
      <div className="story-controls"><button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}><ArrowLeft/> Previous</button><span>{Math.min(step+1,records.length)} / {records.length||1}</span><button onClick={()=>setStep(s=>Math.min(s+1,Math.max(0,records.length-1)))} disabled={step>=records.length-1}><ArrowRight/> Next</button></div>
    </motion.div>
  </div>
}
