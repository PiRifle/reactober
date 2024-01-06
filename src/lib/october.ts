import { useEffect } from "react";

export function meta(strings: TemplateStringsArray, ...params:any[]){
    return connectArraysAlternately(strings as unknown as string[], params).join("")
}

export function backendData(strings: TemplateStringsArray, ...params:any[]){
    return connectArraysAlternately(strings as unknown as string[], params).join("")
}

export function html(strings: TemplateStringsArray, ...params:any[]){
  return connectArraysAlternately(strings as unknown as string[], params).join("")
}

export function getBackendData<T={}>(){
    return ( Object.keys(window).includes("_pagedata") ? (window as any)._pagedata : {}) as T
}

function connectArraysAlternately(a: any[], b: any[]) {
    const result = [];
  
    // Determine the length of the longer array
    const maxLength = Math.max(a.length, b.length);
  
    for (let i = 0; i < maxLength; i++) {
      // Add element from array A if it exists
      if (i < a.length) {
        result.push(a[i]);
      }
  
      // Add element from array B if it exists
      if (i < b.length) {
        result.push(b[i]);
      }
    }
  
    return result;
  }