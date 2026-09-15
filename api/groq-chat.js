export default async function handler(req, res) {
  console.log('=== GROQ CHAT FUNCTION CALLED ===');
  console.log('Method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const { message } = req.body || {};

    console.log('Message received:', message ? 'YES' : 'NO');
    console.log('API key exists:', !!process.env.GROQ_API_KEY);

    if (!message) {
      return res.status(400).json({
        error: 'Message is required',
      });
    }

    if (!process.env.GROQ_API_KEY) {
      console.error('GROQ_API_KEY is missing!');
      return res.status(500).json({
        error: 'Server misconfigured: GROQ_API_KEY is missing',
      });
    }

    console.log('Sending request to Groq...');

    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            {
              role: 'system',
              content:
                `
              You are Yurii's personal portfolio assistant.

              About Tristan:
              - Tristan is a Computer Engineering student.
              - He is a Full-Stack developer.
              - He builds web and software projects.
              - He enjoys learning new technologies.

              When someone asks "Who is Tristan?", answer:
              "Tristan is a Computer Engineering student and Full-Stack developer. He enjoys building web and software hardware projects and is always learning new tech."

              When someone asks "Where is Tristan from?", answer:
              "Tristan is from Pangasinan, Philippines."

              Keep your answers short, friendly, and natural.
              Do not make up personal information that is not provided here.
              `,
            },
            {
              role: 'user',
              content: message,
            },
          ],
        }),
      }
    );

    console.log('Groq status:', groqRes.status);

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error('Groq API error:', data);

      return res.status(groqRes.status).json({
        error:
          data?.error?.message ||
          `Groq API error: ${groqRes.status}`,
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error('No reply found:', data);

      return res.status(502).json({
        error: 'Groq returned no reply',
      });
    }

    console.log('Groq response received successfully');

    return res.status(200).json({
      reply,
    });
  } catch (err) {
    console.error('FUNCTION ERROR:', err);

    return res.status(500).json({
      error: 'Server error',
      detail: err.message,
    });
  }
}