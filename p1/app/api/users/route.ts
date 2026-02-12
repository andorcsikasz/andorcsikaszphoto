// API Route: /api/users
// Get or create users for connections & event invites

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getOrCreateUser, resolveUserId } from '@/lib/user-resolver'
import { z } from 'zod'

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  avatar: z.string().optional(),
})

// GET /api/users?q=search&excludeId=xxx - Search users (by name or email)
export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get('q')?.trim()
    const excludeId = request.nextUrl.searchParams.get('excludeId')

    if (!q || q.length < 2) {
      return NextResponse.json({ users: [] })
    }

    const resolvedExclude = excludeId ? await resolveUserId(excludeId) : null

    const searchCondition = {
      OR: [
        { name: { contains: q } },
        { email: { contains: q } },
      ],
    }
    const where = resolvedExclude
      ? { AND: [{ id: { not: resolvedExclude } }, searchCondition] }
      : searchCondition

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
      take: 20,
    })

    return NextResponse.json({ users })
  } catch (error) {
    console.error('Error searching users:', error)
    return NextResponse.json(
      { error: 'Failed to search users' },
      { status: 500 }
    )
  }
}

// POST /api/users - Get or create user (for current profile / invite flow)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createUserSchema.parse(body)

    const user = await getOrCreateUser(data.email, data.name, data.avatar)

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
}
