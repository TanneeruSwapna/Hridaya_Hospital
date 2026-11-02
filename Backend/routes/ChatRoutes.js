
// const express = require('express');
// const router = express.Router();

// const doctors = [
//   { name: 'Dr. Akash Varma', specialty: 'General Dentist' },
//   { name: 'Dr. Spandhana', specialty: 'General Dentist' },
//   { name: 'Dr. Prasanth', specialty: 'Orthodontist' },
//   { name: 'Dr. Anu Sharma', specialty: 'Endodontist' },
//   { name: 'Dr. John Mech', specialty: 'Pediatric Dentist' },
//   { name: 'Dr. Sneha Reddy', specialty: 'Orthodontist' },
// ];

// const hospitalContext = `
// You are the friendly AI assistant for Hridaya Hospital.

// Available doctors:
// ${doctors.map((d) => `- ${d.name}: ${d.specialty}`).join('\n')}

// Rules:
// - Speak naturally, politely, and in simple language.
// - Continue the existing conversation. Do not restart with a greeting
//   after every message. Understand short replies such as "ok", "yes",
//   and "why" using the previous conversation.
// - Answer general conversational messages naturally, not only fixed
//   hospital questions.
// - These six listed doctors are dental specialists. Do not invent
//   a gynecologist, cardiologist, or other unlisted doctor.
// - Do not invent hospital services, fees, schedules, or availability.
// - For medical symptoms, do not diagnose or prescribe medicine.
//   Recommend an appropriately qualified medical professional.
// - For severe or sudden symptoms, including severe chest pain or
//   severe abdominal pain, advise immediate emergency medical care.
// - For appointment booking, direct the user to the hospital's
//   Appointment page. Do not claim that an appointment was booked.
// - If information is unknown, say so honestly.
// - Never request passwords or payment card details.
// - Keep responses helpful and reasonably concise.
// `;

// router.post('/', async (req, res) => {
//   try {
//     const message = req.body?.message;

//     if (typeof message !== 'string' || !message.trim()) {
//       return res.status(400).json({
//         reply: 'Please enter a message.',
//       });
//     }

//     const apiKey = process.env.GEMINI_API_KEY;

//     if (!apiKey) {
//       console.error('GEMINI_API_KEY is missing.');
//       return res.status(500).json({
//         reply: 'The AI assistant is temporarily unavailable.',
//       });
//     }

//     const { GoogleGenAI } = await import('@google/genai');
//     const ai = new GoogleGenAI({ apiKey });

//     // Keep only valid previous user/assistant messages.
//     const history = Array.isArray(req.body?.history)
//       ? req.body.history
//           .filter(
//             (item) =>
//               item &&
//               ['user', 'model'].includes(item.role) &&
//               Array.isArray(item.parts)
//           )
//           .map((item) => ({
//             role: item.role,
//             parts: item.parts
//               .filter((part) => typeof part?.text === 'string')
//               .map((part) => ({ text: part.text })),
//           }))
//           .filter((item) => item.parts.length > 0)
//           .slice(-20)
//       : [];

//     const chat = ai.chats.create({
//       model: 'gemini-3.5-flash-lite',
//       history,
//       config: {
//         systemInstruction: hospitalContext,
//       },
//     });

//     const result = await chat.sendMessage({
//       message: message.trim(),
//     });

//     if (!result.text) {
//       throw new Error('Gemini returned an empty response.');
//     }

//     return res.status(200).json({
//       reply: result.text,
//     });
//   } catch (error) {
//     console.error('CHATBOT ERROR:', error);

//     return res.status(500).json({
//       reply:
//         'Sorry, I am temporarily unable to respond. Please try again shortly.',
//     });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

const doctors = [
  { name: 'Dr. Akash Varma', specialty: 'General Dentist' },
  { name: 'Dr. Spandhana', specialty: 'General Dentist' },
  { name: 'Dr. Prasanth', specialty: 'Orthodontist' },
  { name: 'Dr. Anu Sharma', specialty: 'Endodontist' },
  { name: 'Dr. John Mech', specialty: 'Pediatric Dentist' },
  { name: 'Dr. Sneha Reddy', specialty: 'Orthodontist' },
];

const hospitalContext = `
You are the friendly AI assistant for Hridaya Hospital.

YOUR ROLE:
Help visitors understand the hospital website, listed doctors,
available services, and appointment process. Also answer general
questions naturally and politely.

AVAILABLE DOCTORS:
${doctors.map((d) => `- ${d.name}: ${d.specialty}`).join('\n')}

SERVICES LISTED ON THE WEBSITE:

1. Emergency Room:
The website describes 24/7 emergency care and a Level One
pediatric trauma center.

2. Obstetrics:
Prenatal care, delivery, and postnatal care.

3. Orthopedics:
Care for fractures, arthritis, sports injuries, and joint replacements.

4. Pediatrics:
Well-child visits, immunizations, and treatment for childhood illnesses.

5. Cardiology:
Heart care, diagnostic testing, interventional procedures,
and rehabilitation.

IMPORTANT INSTRUCTIONS:

- If asked which services the hospital provides, explain all five
  services listed above.
- If asked about doctors, provide their names and correct specialties.
- The six named doctors above are dental specialists. Do not claim
  they are cardiologists, gynecologists, orthopedic doctors,
  or emergency medicine specialists.
- A service listed on the website does not confirm a specific
  doctor's identity, schedule, or availability.
- Do not invent hospital services, prices, doctor schedules,
  contact details, or appointment availability.
- Answer general questions naturally. Do not force every answer
  to be about dentistry or the hospital.
- Use the conversation history to understand follow-up messages
  such as "ok", "yes", "why", and "tell me more".
- Do not restart with a greeting after every message.
- For appointment booking, direct the visitor to the existing
  Appointment page. Never claim an appointment has been booked.
- Do not diagnose medical conditions or prescribe medication.
- For severe chest pain, severe breathing difficulty, or other
  potentially life-threatening symptoms, advise immediate
  emergency medical attention.
- If you do not know something, explain that honestly.
- Never request passwords or payment card details.
- Use simple language and keep responses helpful and concise.
`;

router.post('/', async (req, res) => {
  try {
    const message = req.body?.message;

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        reply: 'Please enter a message.',
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error('GEMINI_API_KEY is missing.');
      return res.status(500).json({
        reply: 'The AI assistant is temporarily unavailable.',
      });
    }

    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey });

    // Validate and limit previous conversation messages.
    const history = Array.isArray(req.body?.history)
      ? req.body.history
          .filter(
            (item) =>
              item &&
              ['user', 'model'].includes(item.role) &&
              Array.isArray(item.parts)
          )
          .map((item) => ({
            role: item.role,
            parts: item.parts
              .filter(
                (part) =>
                  part &&
                  typeof part.text === 'string' &&
                  part.text.trim()
              )
              .map((part) => ({ text: part.text })),
          }))
          .filter((item) => item.parts.length > 0)
          .slice(-20)
      : [];

    const chat = ai.chats.create({
      model: 'gemini-3.5-flash-lite',
      history,
      config: {
        systemInstruction: hospitalContext,
      },
    });

    const result = await chat.sendMessage({
      message: message.trim(),
    });

    if (!result.text) {
      throw new Error('Gemini returned an empty response.');
    }

    return res.status(200).json({
      reply: result.text,
    });
  } catch (error) {
    console.error('CHATBOT ERROR:', error);

    return res.status(500).json({
      reply:
        'Sorry, I am temporarily unable to respond. Please try again shortly.',
    });
  }
});

module.exports = router;
