// API Route: /api/discussions
// Handles discussion messages and AI task extraction

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { extractTasksFromChat } from '@/lib/ai/task-extraction'
import { z } from 'zod'

const createMessageSchema = z.object({
  eventId: z.string(),
  userId: z.string(),
  message: z.string().min(1).max(2000),
})

// POST /api/discussions - Create discussion message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createMessageSchema.parse(body)

    // Verify event exists
    const event = await prisma.event.findUnique({
      where: { id: data.eventId },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Create discussion message
    const discussion = await prisma.discussion.create({
      data: {
        eventId: data.eventId,
        userId: data.userId,
        message: data.message,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    // Get recent messages for AI processing
    const recentMessages = await prisma.discussion.findMany({
      where: { eventId: data.eventId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
    })

    // Extract tasks using AI
    const extractedTasks = await extractTasksFromChat(
      recentMessages.map((msg: { user: { name: string }, message: string, createdAt: Date }) => ({
        author: msg.user.name,
        message: msg.message,
        timestamp: msg.createdAt,
      })),
      event.startDate
    )

    // Update discussion with extracted tasks
    if (extractedTasks.length > 0) {
      await prisma.discussion.update({
        where: { id: discussion.id },
        data: {
          aiExtractedTasks: JSON.stringify(extractedTasks),
        },
      })
    }

    return NextResponse.json(
      {
        discussion,
        suggestedTasks: extractedTasks.filter((t) => (t.confidence ?? 0) > 0.7),
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating discussion:', error)
    return NextResponse.json(
      { error: 'Failed to create discussion' },
      { status: 500 }
    )
  }
}






