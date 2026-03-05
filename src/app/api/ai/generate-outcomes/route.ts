import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { z } from 'zod';

export async function POST(req: Request) {
  try {
    const { intention } = await req.json();

    if (!intention) {
      return new Response(JSON.stringify({ error: 'Intention is required' }), { status: 400 });
    }

    // Check if OPENAI_API_KEY is configured
    if (!process.env.OPENAI_API_KEY) {
      // Return mock data if no API key is provided for demonstration/testing
      const mockOutcomes = [
        {
          title: `Analyze system logs related to: ${intention.substring(0, 30)}...`,
          impact: "Identifies the root cause to formulate a targeted fix",
          tag: "Deep Work"
        },
        {
          title: "Implement code changes to address the identified issue",
          impact: "Resolves the problem for end users and improves stability",
          tag: "Shipping"
        },
        {
          title: "Deploy fix and verify metrics post-deployment",
          impact: "Confirms the fix is successful in production without regressions",
          tag: "High Impact"
        }
      ];

      return new Response(JSON.stringify({ outcomes: mockOutcomes }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { object } = await generateObject({
      model: openai('gpt-4o'),
      schema: z.object({
        outcomes: z.array(z.object({
          title: z.string().describe("A specific, measurable, binary outcome that proves progress."),
          impact: z.string().describe("The strategic value or why this outcome matters right now."),
          tag: z.enum(["Deep Work", "Shipping", "High Impact"]).describe("A categorization for this work.")
        })).length(3).describe("Exactly 3 top outcomes")
      }),
      prompt: `Act as a productivity and engineering coach.
      The user has provided a vague intention or brain dump for what they want to achieve today: "${intention}".
      Transform this intention into exactly 3 clear, binary, and measurable outcomes.
      Make sure they sound like tasks an engineer or product maker would write.`
    });

    return new Response(JSON.stringify({ outcomes: object.outcomes }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating outcomes:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate outcomes' }), { status: 500 });
  }
}