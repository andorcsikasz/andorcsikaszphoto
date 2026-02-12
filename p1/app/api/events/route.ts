// API Route: /api/events
// Handles event creation and retrieval

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resolveUserId, getOrCreateUser } from '@/lib/user-resolver'
import { z } from 'zod'

const createEventSchema = z.object({
  title: z.string().min(1).max(200),
  vibe: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  locationLat: z.number().optional(),
  locationLng: z.number().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  timezone: z.string().default('UTC'),
  isInviteOnly: z.boolean().default(false),
  organizerId: z.string(),
  // Auto-invite: user IDs from connections or emails
  participantIds: z.array(z.string()).optional(),
  inviteeEmails: z.array(z.string().email()).optional(),
})

// GET /api/events - List events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const organizerId = searchParams.get('organizerId')
    const participantId = searchParams.get('participantId')

    const where: Record<string, unknown> = {}

    if (organizerId) {
      const resolved = await resolveUserId(organizerId)
      if (resolved) where.organizerId = resolved
    }

    if (participantId) {
      const resolved = await resolveUserId(participantId)
      if (resolved) {
        where.participants = {
          some: {
            id: resolved,
          },
        }
      }
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            participants: true,
            decisions: true,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    })

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

// POST /api/events - Create event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createEventSchema.parse(body)

    const organizerId = await resolveUserId(data.organizerId)
    if (!organizerId) {
      return NextResponse.json(
        { error: 'Organizer not found. Please set up your profile first.' },
        { status: 400 }
      )
    }

    // Resolve participants: from IDs and/or emails
    const participantUserIds: string[] = []

    if (data.participantIds?.length) {
      for (const id of data.participantIds) {
        const resolved = await resolveUserId(id)
        if (resolved) participantUserIds.push(resolved)
      }
    }

    if (data.inviteeEmails?.length) {
      for (const email of data.inviteeEmails) {
        const name = email.split('@')[0].replace(/[._]/g, ' ')
        const user = await getOrCreateUser(email, name)
        if (user && !participantUserIds.includes(user.id)) {
          participantUserIds.push(user.id)
        }
      }
    }

    const event = await prisma.event.create({
      data: {
        title: data.title,
        vibe: data.vibe,
        description: data.description,
        location: data.location,
        locationLat: data.locationLat,
        locationLng: data.locationLng,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        timezone: data.timezone,
        isInviteOnly: data.isInviteOnly,
        organizerId,
        participants: participantUserIds.length
          ? { connect: participantUserIds.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        _count: {
          select: { participants: true, decisions: true },
        },
      },
    })

    return NextResponse.json({ event }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating event:', error)
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    )
  }
}





