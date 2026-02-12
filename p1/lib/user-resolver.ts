/**
 * Resolve userId from string - could be cuid, email, or name
 */
import { prisma } from './prisma'

export async function resolveUserId(identifier: string): Promise<string | null> {
  if (!identifier?.trim()) return null
  const s = identifier.trim()
  // If it looks like a cuid (starts with c, 25 chars)
  if (/^c[a-z0-9]{24}$/i.test(s)) {
    const user = await prisma.user.findUnique({ where: { id: s }, select: { id: true } })
    return user?.id ?? null
  }
  // Try email
  const byEmail = await prisma.user.findUnique({
    where: { email: s },
    select: { id: true },
  })
  if (byEmail) return byEmail.id
  // Try name (first match)
  const byName = await prisma.user.findFirst({
    where: { name: { equals: s, mode: 'insensitive' } },
    select: { id: true },
  })
  return byName?.id ?? null
}

export async function getOrCreateUser(email: string, name: string, avatar?: string) {
  let user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) {
    user = await prisma.user.create({
      data: { email, name, avatar },
    })
  } else if (name && user.name !== name) {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { name, avatar },
    })
  }
  return user
}
