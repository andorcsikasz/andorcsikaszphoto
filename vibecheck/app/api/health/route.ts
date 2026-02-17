/**
 * Health check endpoint - from RAZ fullstack template
 * Used by Railway and container orchestration for readiness probes.
 */

import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}
