import { adminUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { error } from '@/lib/http';
import { z } from 'zod';
const schema=z.object({name:z.string().min(2),slug:z.string().regex(/^[a-z0-9-]+$/),description:z.string().min(5),imageUrl:z.string().url().optional(),categoryId:z.string(),sku:z.string().min(2),price:z.number().int().positive(),stock:z.number().int().nonnegative()});
export async function POST(req:Request){if(!await adminUser()) return error('Forbidden',403); const parsed=schema.safeParse(await req.json()); if(!parsed.success)return error('Invalid product');const {sku,price,stock,...data}=parsed.data;try {const product=await db.product.create({data:{...data,variants:{create:{sku,price,stock,label:'Default'}}},include:{variants:true}});return Response.json(product,{status:201});}catch{return error('Product could not be created',409);}}
