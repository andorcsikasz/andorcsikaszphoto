// API Route: /api/events
// Handles event creation and retrieval

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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
})

// GET /api/events - List events
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const organizerId = searchParams.get('organizerId')
    const participantId = searchParams.get('participantId')

    const where: any = {}

    if (organizerId) {
      where.organizerId = organizerId
    }

    if (participantId) {
      where.participants = {
        some: {
          id: participantId,
        },
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
            tasks: true,
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
        organizerId: data.organizerId,
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





