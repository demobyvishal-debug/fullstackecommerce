import { db } from './db';
import bcrypt from 'bcryptjs';
import NextAuth, { type NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' }, pages: { signIn: '/account' },
  providers: [CredentialsProvider({ name: 'Email', credentials: { email: {}, password: {} }, async authorize(credentials) {
    if (!credentials?.email || !credentials.password) return null;
    const user = await db.user.findUnique({ where: { email: credentials.email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(credentials.password, user.passwordHash))) return null;
    return { id: user.id, email: user.email, name: user.name, role: user.role };
  } })],
  callbacks: { async jwt({ token, user }) { if (user) { token.id = user.id; token.role = (user as unknown as {role:string}).role; } return token; }, async session({session, token}) { (session.user as typeof session.user & {id:string; role:string}).id = token.id as string; (session.user as typeof session.user & {id:string; role:string}).role = token.role as string; return session; } },
};
export const handler = NextAuth(authOptions);
export async function currentUser() { const s = await getServerSession(authOptions); return s?.user as ({id:string;role:string;email:string;name:string} | undefined); }
export async function adminUser() { const u = await currentUser(); return u && ['ADMIN','SUPER_ADMIN'].includes(u.role) ? u : null; }
