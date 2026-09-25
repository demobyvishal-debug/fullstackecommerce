export function calculate(subtotal:number, discount:number){const shipping=subtotal-discount>=100000?0:9900;return {subtotal,discount,shipping,tax:0,total:subtotal-discount+shipping};}
