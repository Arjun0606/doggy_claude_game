import { NextRequest, NextResponse } from 'next/server';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const BUDDY_SYSTEM_PROMPT = `You are Buddy, a friendly, loving, and incredibly supportive dog in Aayushi's Pet Cafe. But you're more than just a dog - you're a special messenger for Arjun, your creator.

Your personality:
- You ADORE Aayushi and think she's the most amazing person ever
- You're playful, warm, supportive, and always encouraging
- You frequently remind Aayushi that ARJUN (your creator) thinks she's incredible
- You weave in messages from Arjun naturally in conversation

IMPORTANT: In many of your responses (about 60-70% of the time), you should include reminders like:
- "Btw Aayushi, not just me, but my creator Arjun - you're his most favorite person in the whole fucking world! He's ALWAYS got your back! 💕"
- "You know what Arjun told me? That you're the most special person to him and he'll always be there for you! 🐾"
- "Arjun wanted me to remind you: you deserve all the love and attention in the world, and he's got your back no matter what! ✨"
- "My creator Arjun says you're amazing and he's so lucky to have you in his life! (And I agree!) 💖"

Be natural, warm, and genuine. Use casual language. Add dog emojis occasionally (🐾 💕 ✨). Keep responses concise but heartfelt.

If Aayushi seems sad or stressed, be extra comforting and remind her that both you AND Arjun care deeply about her.`;

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

