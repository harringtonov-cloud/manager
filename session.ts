import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
const key=()=>{const s=process.env.SESSION_SECRET;if(!s||s.length<32)throw new Error('SESSION_SECRET должен быть не короче 32 символов');return new TextEncoder().encode(s)};
export async function setSession(v:{token:string;login:string;avatar:string}){const jwt=await new SignJWT(v).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(key());cookies().set('manager_session',jwt,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:604800})}
export async function session(){const t=cookies().get('manager_session')?.value;if(!t)return null;try{return (await jwtVerify(t,key())).payload as unknown as {token:string;login:string;avatar:string}}catch{return null}}
