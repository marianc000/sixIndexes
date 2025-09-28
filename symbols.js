import companies from './symbols.json' with {type:'json'};

console.log('>companies',companies);

export const symbols=companies.map(o=>o.code);


export function symbolToName(s){
return companies.find(o=>o.code===s)?.name;
}