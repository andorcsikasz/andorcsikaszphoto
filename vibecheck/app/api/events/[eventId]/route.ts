// API Route: /api/events/[eventId]
// Handles individual event operations

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateEventSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  vibe: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  locationLat: z.number().optional(),
  locationLng: z.number().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  timezone: z.string().optional(),
  isInviteOnly: z.boolean().optional(),
}).strict()

// GET /api/events/[eventId] - Get event details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        participants: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
        decisions: {
          include: {
            options: {
              orderBy: {
                order: 'asc',
              },
            },
            votes: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    avatar: true,
                  },
                },
                option: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        discussions: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'asc',
          },
          take: 50, // Last 50 messages
        },
      },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Error fetching event:', error)
    return NextResponse.json(
      { error: 'Failed to fetch event' },
      { status: 500 }
    )
  }
}

// PATCH /api/events/[eventId] - Update event
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ eventId: string }> }
) {
  try {
    const { eventId } = await params
    const existing = await prisma.event.findUnique({ where: { id: eventId } })
    if (!existing) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const body = await request.json()
    const data = updateEventSchema.parse(body)

    const updateData: Record<string, unknown> = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.vibe !== undefined) updateData.vibe = data.vibe
    if (data.description !== undefined) updateData.description = data.description
    if (data.location !== undefined) updateData.location = data.location
    if (data.locationLat !== undefined) updateData.locationLat = data.locationLat
    if (data.locationLng !== undefined) updateData.locationLng = data.locationLng
    if (data.startDate !== undefined) updateData.startDate = new Date(data.startDate)
    if (data.endDate !== undefined) updateData.endDate = new Date(data.endDate)
    if (data.timezone !== undefined) updateData.timezone = data.timezone
    if (data.isInviteOnly !== undefined) updateData.isInviteOnly = data.isInviteOnly

    const event = await prisma.event.update({
      where: { id: eventId },
      data: updateData,
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

    return NextResponse.json({ event })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }
    console.error('Error updating event:', error)
    return NextResponse.json(
      { error: 'Failed to update event' },
      { status: 500 }
    )
  }
}





