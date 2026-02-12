// API Route: /api/decisions
// Handles decision/poll creation

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createDecisionSchema = z.object({
  eventId: z.string(),
  question: z.string().min(1).max(500),
  type: z.enum(['MULTIPLE_CHOICE', 'RANKED_CHOICE', 'YES_NO', 'TEXT', 'DATE']),
  allowMultiple: z.boolean().default(false),
  rankedChoice: z.boolean().default(false),
  closesAt: z.string().datetime().optional(),
  options: z.array(z.object({
    text: z.string().min(1).max(200),
    dateValue: z.string().datetime().optional(), // For DATE type
    order: z.number().default(0),
    allowFreeText: z.boolean().default(false), // Allow free text answer
  })).min(1), // DATE type can have date ranges, so min 1
})

// GET /api/decisions - Get decisions for an event
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const eventId = searchParams.get('eventId')

    if (!eventId) {
      return NextResponse.json(
        { error: 'eventId is required' },
        { status: 400 }
      )
    }

    const decisions = await prisma.decision.findMany({
      where: { eventId },
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
    })

    return NextResponse.json({ decisions })
  } catch (error) {
    console.error('Error fetching decisions:', error)
    return NextResponse.json(
      { error: 'Failed to fetch decisions' },
      { status: 500 }
    )
  }
}

// POST /api/decisions - Create decision/poll
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createDecisionSchema.parse(body)

    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    const decision = await prisma.decision.create({
      data: {
        eventId: data.eventId,
        question: data.question,
        type: data.type,
        allowMultiple: data.allowMultiple,
        rankedChoice: data.rankedChoice,
        closesAt: data.closesAt ? new Date(data.closesAt) : null,
        options: {
          create: data.options.map((opt, index) => ({
            text: opt.text,
            dateValue: opt.dateValue ? new Date(opt.dateValue) : null,
            order: opt.order || index,
            allowFreeText: opt.allowFreeText || false,
          })),
        },
      },
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
    })

    return NextResponse.json({ decision }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating decision:', error)
    return NextResponse.json(
      { error: 'Failed to create decision' },
      { status: 500 }
    )
  }
}


