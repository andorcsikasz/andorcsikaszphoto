// API Route: /api/connections
// Manage connections (friends, family) for auto-invite

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resolveUserId } from '@/lib/user-resolver'
import { z } from 'zod'

const createConnectionSchema = z.object({
  userId: z.string().min(1),
  connectedUserId: z.string().min(1),
  type: z.enum(['friend', 'family']),
})

// GET /api/connections?userId=xxx - List my connections (both directions)
export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId')
    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      )
    }

    const resolvedId = await resolveUserId(userId)
    if (!resolvedId) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get connections where I'm either from or to (bidirectional)
    const connections = await prisma.connection.findMany({
      where: {
        OR: [
          { fromUserId: resolvedId },
          { toUserId: resolvedId },
        ],
      },
      include: {
        fromUser: {
          select: { id: true, name: true, email: true, avatar: true },
        },
        toUser: {
          select: { id: true, name: true, email: true, avatar: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Normalize: always return the "other" user and the connection type
    const normalized = connections.map((c) => {
      const otherUser = c.fromUserId === resolvedId ? c.toUser : c.fromUser
      const direction = c.fromUserId === resolvedId ? 'outgoing' : 'incoming'
      return {
        id: c.id,
        type: c.type,
        direction,
        user: otherUser,
        createdAt: c.createdAt,
      }
    })

    return NextResponse.json({ connections: normalized })
  } catch (error) {
    console.error('Error fetching connections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch connections' },
      { status: 500 }
    )
  }
}

// POST /api/connections - Create connection
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createConnectionSchema.parse(body)

    const fromId = await resolveUserId(data.userId)
    const toId = await resolveUserId(data.connectedUserId)

    if (!fromId || !toId) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    if (fromId === toId) {
      return NextResponse.json(
        { error: 'Cannot connect to yourself' },
        { status: 400 }
      )
    }

    // Create connection (fromUserId adds toUserId)
    const connection = await prisma.connection.upsert({
      where: {
        fromUserId_toUserId: {
          fromUserId: fromId,
          toUserId: toId,
        },
      },
      create: {
        fromUserId: fromId,
        toUserId: toId,
        type: data.type,
      },
      update: { type: data.type },
      include: {
        toUser: {
          select: { id: true, name: true, email: true, avatar: true },
        },
      },
    })

    return NextResponse.json({
      connection: {
        id: connection.id,
        type: connection.type,
        user: connection.toUser,
        createdAt: connection.createdAt,
      },
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error creating connection:', error)
    return NextResponse.json(
      { error: 'Failed to create connection' },
      { status: 500 }
    )
  }
}
