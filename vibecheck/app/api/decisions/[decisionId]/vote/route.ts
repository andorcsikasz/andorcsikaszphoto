// API Route: /api/decisions/[decisionId]/vote
// Handles voting on decisions

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { calculateConsensus } from '@/lib/consensus-engine'

const voteSchema = z.object({
  userId: z.string(),
  optionId: z.string().optional(), // For multiple choice
  rankedChoices: z.array(z.string()).optional(), // For ranked choice
  dateValue: z.string().datetime().optional(), // For DATE type decisions
  textValue: z.string().optional(), // For free text answers
})

// POST /api/decisions/[decisionId]/vote - Cast vote
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ decisionId: string }> }
) {
  try {
    const { decisionId } = await params
    const body = await request.json()
    const data = voteSchema.parse(body)

    // Get decision with options
    const decision = await prisma.decision.findUnique({
      where: { id: decisionId },
      include: {
        options: true,
        votes: {
          include: {
            option: true,
          },
        },
      },
    })

    if (!decision) {
      return NextResponse.json({ error: 'Decision not found' }, { status: 404 })
    }

    // Check if user already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_decisionId: {
          userId: data.userId,
          decisionId,
        },
      },
    })

    if (existingVote && !decision.allowMultiple) {
      // Update existing vote
      const vote = await prisma.vote.update({
        where: { id: existingVote.id },
        data: {
          optionId: data.optionId || undefined,
          rankedChoices: data.rankedChoices
            ? JSON.stringify(data.rankedChoices)
            : undefined,
          dateValue: data.dateValue ? new Date(data.dateValue) : undefined,
          textValue: data.textValue || undefined,
        },
        include: {
          option: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      })

      // Calculate consensus
      const updatedDecision = await prisma.decision.findUnique({
        where: { id: decisionId },
        include: {
          options: true,
          votes: {
            include: {
              option: true,
            },
          },
        },
      })

      const consensus = calculateConsensus(updatedDecision!)

      return NextResponse.json({ vote, consensus })
    } else {
      // Create new vote
      const vote = await prisma.vote.create({
        data: {
          userId: data.userId,
          decisionId,
          optionId: data.optionId || undefined,
          rankedChoices: data.rankedChoices
            ? JSON.stringify(data.rankedChoices)
            : undefined,
          dateValue: data.dateValue ? new Date(data.dateValue) : undefined,
          textValue: data.textValue || undefined,
        },
        include: {
          option: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      })

      // Calculate consensus
      const updatedDecision = await prisma.decision.findUnique({
        where: { id: decisionId },
        include: {
          options: true,
          votes: {
            include: {
              option: true,
            },
          },
        },
      })

      const consensus = calculateConsensus(updatedDecision!)

      return NextResponse.json({ vote, consensus }, { status: 201 })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error casting vote:', error)
    return NextResponse.json(
      { error: 'Failed to cast vote' },
      { status: 500 }
    )
  }
}

// GET /api/decisions/[decisionId]/vote - Get consensus results
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ decisionId: string }> }
) {
  try {
    const { decisionId } = await params
    const decision = await prisma.decision.findUnique({
      where: { id: decisionId },
      include: {
        options: {
          orderBy: {
            order: 'asc',
          },
        },
        votes: {
          include: {
            option: true,
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    })

    if (!decision) {
      return NextResponse.json({ error: 'Decision not found' }, { status: 404 })
    }

    const consensus = calculateConsensus(decision)

    return NextResponse.json({ consensus, decision })
  } catch (error) {
    console.error('Error fetching consensus:', error)
    return NextResponse.json(
      { error: 'Failed to fetch consensus' },
      { status: 500 }
    )
  }
}


