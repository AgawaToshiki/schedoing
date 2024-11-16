import { useState, useEffect } from "react"
import { supabase } from '../lib/supabase'
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

type RealTimeListenerOptions<T extends { [key: string]: any }> = {
  table: string;
  defaultData: T[] | null;
  isValidData: (obj: any) => obj is T;
}

export const useRealtimeListener = <T extends { [key: string]: any }>({ table, defaultData, isValidData,}: RealTimeListenerOptions<T>): T[] | null => {

  const [data, setData] = useState<T[] | null>(defaultData);

  const listenData = async() => {
    const channel = supabase
    .channel(table)
    .on('postgres_changes',
      { 
        event: '*', 
        schema: 'public', 
        table: table,
      }, 
      (payload: RealtimePostgresChangesPayload<T>) => {
        setData((currentData): T[] | null => {
          if(!currentData){
            if(isValidData(payload.new)){
              return [payload.new]
            }
            return null
          }
          switch(payload.eventType) {
            case 'INSERT':
              return [...currentData, payload.new]
            case 'UPDATE':
              return currentData.map((item) => (
                item.id === payload.new.id ? { ...item, ...payload.new } : item
              ))
            case 'DELETE':
              return currentData.filter((item) => item.id !== payload.old.id)
            default:
              return currentData
          }
        })
      }
    )
    .subscribe()
    return () => {
      channel.unsubscribe();
    };
  }

  useEffect(() => {
    listenData();
  }, [])
  
  return data
}