import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const sessions = await prisma.focusSession.findMany({
      orderBy: { startTime: 'desc' },
      take: 20,
    })
    return new Response(JSON.stringify(sessions), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch focus sessions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const session = await prisma.focusSession.create({
      data: {
        title: data.title,
        duration: data.duration,
        type: data.type,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
      },
    })
    return new Response(JSON.stringify(session), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to create focus session' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}