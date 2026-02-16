// API Route: /api/seed/events
// Creates 12 demo events: 4 created by the current user, 8 where the user is invited

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Demo user data - you can pass these as query params or use defaults
const DEFAULT_MY_EMAIL = 'me@example.com'
const DEFAULT_MY_NAME = 'Me'

// Other users (cartoon characters) for events where I'm invited
const OTHER_USERS = [
  { email: 'marge@example.com', name: 'Marge Simpson' },
  { email: 'homer@example.com', name: 'Homer Simpson' },
  { email: 'charlie@example.com', name: 'Charlie Brown' },
  { email: 'wonderwoman@example.com', name: 'Wonder Woman' },
  { email: 'edna@example.com', name: 'Edna Mode' },
  { email: 'spongebob@example.com', name: 'SpongeBob SquarePants' },
  { email: 'minnie@example.com', name: 'Minnie Mouse' },
  { email: 'peter@example.com', name: 'Peter Griffin' },
]

// Event templates
const EVENT_TEMPLATES = {
  createdByMe: [
    {
      title: 'Summer BBQ Party',
      vibe: 'Casual & Fun',
      description: 'A fun summer gathering with friends and family. Bring your favorite dish!',
      location: 'Central Park',
      startDate: new Date('2025-07-15T18:00:00Z'),
      endDate: new Date('2025-07-15T22:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: false,
    },
    {
      title: 'Family Reunion',
      vibe: 'Warm & Cozy',
      description: 'Annual family reunion at grandma\'s house. All relatives welcome!',
      location: 'Grandma\'s House',
      startDate: new Date('2025-08-20T14:00:00Z'),
      endDate: new Date('2025-08-20T20:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: true,
    },
    {
      title: 'Birthday Celebration',
      vibe: 'Celebratory',
      description: 'Join us for a birthday celebration with cake, music, and good vibes!',
      location: 'My Place',
      startDate: new Date('2025-09-10T19:00:00Z'),
      endDate: new Date('2025-09-11T01:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: true,
    },
    {
      title: 'Weekend Hiking Trip',
      vibe: 'Adventure',
      description: 'Exploring beautiful mountain trails. All fitness levels welcome!',
      location: 'Mountain Trail',
      startDate: new Date('2025-10-05T08:00:00Z'),
      endDate: new Date('2025-10-05T16:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: false,
    },
  ],
  invitedTo: [
    {
      title: 'Q4 Company Meeting',
      vibe: 'Professional',
      description: 'Quarterly company meeting to discuss goals and achievements.',
      location: 'Conference Center',
      startDate: new Date('2025-07-25T09:00:00Z'),
      endDate: new Date('2025-07-25T17:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: true,
      organizerEmail: 'marge@example.com',
    },
    {
      title: 'Wine Tasting Evening',
      vibe: 'Sophisticated',
      description: 'An evening of fine wines and good conversation.',
      location: 'Wine Bar Downtown',
      startDate: new Date('2025-08-10T19:00:00Z'),
      endDate: new Date('2025-08-10T23:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: true,
      organizerEmail: 'homer@example.com',
    },
    {
      title: 'Beach Volleyball Tournament',
      vibe: 'Energetic',
      description: 'Friendly beach volleyball tournament. Teams welcome!',
      location: 'Beach Volleyball Court',
      startDate: new Date('2025-08-28T10:00:00Z'),
      endDate: new Date('2025-08-28T18:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: false,
      organizerEmail: 'charlie@example.com',
    },
    {
      title: 'Art Gallery Opening',
      vibe: 'Cultural',
      description: 'Opening night of the new contemporary art exhibition.',
      location: 'Modern Art Gallery',
      startDate: new Date('2025-09-05T18:00:00Z'),
      endDate: new Date('2025-09-05T21:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: true,
      organizerEmail: 'wonderwoman@example.com',
    },
    {
      title: 'Cooking Class',
      vibe: 'Educational',
      description: 'Learn to cook Italian cuisine with a professional chef.',
      location: 'Culinary School',
      startDate: new Date('2025-09-18T17:00:00Z'),
      endDate: new Date('2025-09-18T20:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: true,
      organizerEmail: 'edna@example.com',
    },
    {
      title: 'Music Festival',
      vibe: 'Festive',
      description: 'Local music festival featuring indie bands and food trucks.',
      location: 'City Park',
      startDate: new Date('2025-09-30T12:00:00Z'),
      endDate: new Date('2025-09-30T23:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: false,
      organizerEmail: 'spongebob@example.com',
    },
    {
      title: 'Book Club Meeting',
      vibe: 'Intellectual',
      description: 'Monthly book club discussion. This month: "The Great Gatsby".',
      location: 'Coffee Shop',
      startDate: new Date('2025-10-12T15:00:00Z'),
      endDate: new Date('2025-10-12T17:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: true,
      organizerEmail: 'minnie@example.com',
    },
    {
      title: 'Charity Fundraiser',
      vibe: 'Philanthropic',
      description: 'Annual charity fundraiser for local community center.',
      location: 'Community Center',
      startDate: new Date('2025-10-20T18:00:00Z'),
      endDate: new Date('2025-10-20T22:00:00Z'),
      timezone: 'UTC',
      isInviteOnly: false,
      organizerEmail: 'peter@example.com',
    },
  ],
}

// POST /api/seed/events - Create demo events
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const myEmail = body.email || request.nextUrl.searchParams.get('email') || DEFAULT_MY_EMAIL
    const myName = body.name || request.nextUrl.searchParams.get('name') || DEFAULT_MY_NAME

    const results = {
      created: [] as string[],
      errors: [] as string[],
    }

    // Find or create the current user (me)
    let me = await prisma.user.findUnique({
      where: { email: myEmail },
    })

    if (!me) {
      me = await prisma.user.create({
        data: {
          email: myEmail,
          name: myName,
        },
      })
      results.created.push(`User: ${myEmail}`)
    }

    // Create or find other users
    const otherUserMap = new Map<string, any>()
    for (const userData of OTHER_USERS) {
      let user = await prisma.user.findUnique({
        where: { email: userData.email },
      })

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: userData.email,
            name: userData.name,
          },
        })
        results.created.push(`User: ${userData.email}`)
      }

      otherUserMap.set(userData.email, user)
    }

    // Create 4 events where I'm the organizer
    for (const eventData of EVENT_TEMPLATES.createdByMe) {
      try {
        const event = await prisma.event.create({
          data: {
            ...eventData,
            organizerId: me.id,
          },
        })
        results.created.push(`Event (created by me): ${event.title}`)
      } catch (error: any) {
        results.errors.push(`Failed to create "${eventData.title}": ${error.message}`)
      }
    }

    // Create 8 events where I'm invited (other users are organizers)
    for (const eventData of EVENT_TEMPLATES.invitedTo) {
      try {
        const organizer = otherUserMap.get(eventData.organizerEmail)
        if (!organizer) {
          results.errors.push(`Organizer not found: ${eventData.organizerEmail}`)
          continue
        }

        const { organizerEmail, ...eventFields } = eventData

        const event = await prisma.event.create({
          data: {
            ...eventFields,
            organizerId: organizer.id,
            participants: {
              connect: [{ id: me.id }],
            },
          },
        })
        results.created.push(`Event (invited): ${event.title} - Organized by ${organizer.name}`)
      } catch (error: any) {
        results.errors.push(`Failed to create "${eventData.title}": ${error.message}`)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Created ${results.created.length} items`,
      created: results.created,
      errors: results.errors,
      summary: {
        eventsCreatedByMe: EVENT_TEMPLATES.createdByMe.length,
        eventsInvitedTo: EVENT_TEMPLATES.invitedTo.length,
        totalEvents: EVENT_TEMPLATES.createdByMe.length + EVENT_TEMPLATES.invitedTo.length,
      },
    })
  } catch (error: any) {
    console.error('Error seeding demo events:', error)
    return NextResponse.json(
      { error: 'Failed to seed demo events', details: error.message },
      { status: 500 }
    )
  }
}



