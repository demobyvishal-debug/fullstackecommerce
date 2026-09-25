import { NextResponse } from 'next/server';
export const error = (message: string, status = 400) => NextResponse.json({error:message},{status});
export const rupees = (p:number) => `₹${(p/100).toLocaleString('en-IN',{minimumFractionDigits:2})}`;
