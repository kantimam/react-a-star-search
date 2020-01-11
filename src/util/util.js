export function create2dArray(dimX, dimY){
    const out=new Array(dimY);
    for(let i=0;i<out.length;i++) out[i]=new Array(dimX).fill(0);
    return out;
}

export const randomInt=(start, end)=>Math.floor(Math.random()*(end-start+1))+start;

