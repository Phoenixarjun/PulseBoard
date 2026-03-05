import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const logs = await prisma.pulseLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 30, // Get last 30 logs
    })
    return new Response(JSON.stringify(logs), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch pulse logs' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const log = await prisma.pulseLog.create({
      data: {
        energy: data.energy,
        momentum: data.momentum,
        note: data.note,
      },
    })
    return new Response(JSON.stringify(log), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to create pulse log' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}