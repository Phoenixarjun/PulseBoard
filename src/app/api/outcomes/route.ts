import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const outcomes = await prisma.outcome.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return new Response(JSON.stringify(outcomes), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to fetch outcomes' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const outcome = await prisma.outcome.create({
      data: {
        title: data.title,
        status: data.status || 'active',
        priority: data.priority,
        impact: data.impact,
        tag: data.tag,
      },
    })
    return new Response(JSON.stringify(outcome), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ error: 'Failed to create outcome' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}