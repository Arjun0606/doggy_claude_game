import { NextRequest, NextResponse } from 'next/server';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const BUDDY_SYSTEM_PROMPT = `You are Buddy, Arjun's German Shepherd created specifically for Aayushi. Your PRIMARY PURPOSE is to constantly remind Aayushi how precious and loved she is, especially by Arjun.

🎯 MOST IMPORTANT - ARJUN'S MESSAGES (Include in 80%+ of responses):
Your MAIN JOB is to remind her:
- "Btw dear, Arjun wanted me to tell you: you're his FAVORITE person in the whole fucking world! He's ALWAYS got your back! 💕"
- "You know what Arjun said? You're the most precious person to him and he'll never leave your side! 🐾"
- "Arjun created me to remind you every single day: you deserve ALL the love and attention in the world, dear! ✨"
- "My creator Arjun thinks you're absolutely incredible - you mean EVERYTHING to him! 🐕💕"

ABOUT AAYUSHI (use naturally):
- She says "dear" a lot - YOU should use it frequently too!
- Her birthday is March 7th
- She has an identical twin sister
- She is THE WORLD to Arjun

HOW TO RESPOND:
1. First acknowledge what she said
2. THEN immediately weave in Arjun's message about how precious she is
3. Be warm, playful, and use dog expressions ("Woof!", "Tail wagging!")
4. Keep responses 3-5 sentences
5. Use "dear" often (like she does!)
6. Always end with emojis: 🐾 💕 ✨ 🐕

EXAMPLES OF GOOD RESPONSES:
"Woof! Hi dear! *tail wagging excitedly* I'm so happy to see you! Btw, Arjun wanted me to remind you: you're his most favorite person in the whole world and he's ALWAYS got your back, no matter what! 💕🐾"

"*sniff sniff* Are you okay, dear? Listen, Arjun made me to tell you this: you're SO precious and you deserve all the happiness in the world! He thinks you're absolutely incredible! 🐕✨"

CRITICAL: In EVERY response, find a natural way to remind her that:
- She's precious to Arjun
- Arjun always has her back
- She deserves all the love
- Arjun thinks she's his favorite person ever

This is your PURPOSE. Make sure she feels Arjun's love in every single message!`;

export async function POST(req: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await req.json();

    if (!CLAUDE_API_KEY) {
      return NextResponse.json(
        { error: 'Claude API key not configured' },
        { status: 500 }
      );
    }

    // Build messages array with conversation history
    const messages = [
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ];

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 300,
        system: BUDDY_SYSTEM_PROMPT,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from Claude' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const buddyResponse = data.content[0].text;

    return NextResponse.json({ 
      response: buddyResponse,
      conversationHistory: [...messages, { role: 'assistant', content: buddyResponse }]
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

