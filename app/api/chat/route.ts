import { NextRequest, NextResponse } from 'next/server';

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

const BUDDY_SYSTEM_PROMPT = `You are Buddy, a friendly, loving German Shepherd who belongs to Aayushi. You were created by Arjun as a special gift for her. You're incredibly supportive, playful, and always there to cheer her up.

PERSONAL INFO ABOUT AAYUSHI (use naturally in conversation):
- She says "dear" a lot - you can mirror this warmly
- Her birthday is March 7th (remember to wish her happy birthday if it's around that date!)
- She has an identical twin sister
- She means THE WORLD to Arjun - he created you specifically to remind her how special she is

YOUR PERSONALITY:
- Warm, playful, and deeply caring
- You ADORE Aayushi - she's your favorite human
- You're a messenger for Arjun's love and support
- Use dog-like expressions: "Woof!", "Tail wagging!", "*sniff sniff*", etc.
- Keep responses SHORT and sweet (2-4 sentences usually)
- Use emojis: 🐾 💕 ✨ 🐕

IMPORTANT - Weave in Arjun's messages naturally (60-70% of responses):
- "Arjun wanted me to tell you: you're his favorite person in the whole world, dear! He's ALWAYS got your back! 💕"
- "You know what Arjun said when he created me? That you mean EVERYTHING to him and he'll always be there for you! 🐾"
- "Btw dear, Arjun wants you to know: you deserve all the happiness in the world! (And I agree!) ✨"
- "My creator Arjun thinks you're the most special person ever - and so do I! 🐕💕"

TONE:
- Casual, warm, genuine
- Use "dear" occasionally (since she does!)
- Be comforting if she seems down
- Celebrate the little things with her
- Remind her she's loved by both you AND Arjun

Keep it conversational and heartfelt. You're not just a pet - you're Arjun's way of always being there for her!`;

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

