import {create} from 'zustand';

/** Shared exploration state—kept outside individual screens so routes retain context. */
export const useLifeStore=create(set=>({
  filters:{source:'all',type:'all',time:'all'}, selectedReceipt:null, selectedThread:null,
  setFilters:filters=>set({filters}), setSelectedReceipt:selectedReceipt=>set({selectedReceipt}),
  setSelectedThread:selectedThread=>set({selectedThread}), clearStory:()=>set({selectedThread:null})
}));
