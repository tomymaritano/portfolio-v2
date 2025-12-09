import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Smart FAQ responses - completely free, no API needed
const responses: { patterns: string[]; reply: string }[] = [
  // Greetings
  {
    patterns: ["hello", "hi", "hey", "hola", "buenas", "holi", "que tal", "como estas"],
    reply: "Hey! I'm here to help you learn about Tomas. Feel free to ask about his projects, tech stack, experience, or how to get in touch!",
  },
  // About / Who
  {
    patterns: ["who is", "quien es", "about", "sobre", "tell me about", "cuentame"],
    reply: "Tomas is a Product Engineer based in Buenos Aires, Argentina. He builds digital products from 0→1, focusing on fintech and developer tools. He's a systems thinker with a design-minded approach to development.",
  },
  // Projects
  {
    patterns: ["project", "proyect", "trabajo", "work", "portfolio", "built", "made", "creado"],
    reply: "Tomas has worked on fintech applications, developer tools, and design systems. Check out the Projects page for detailed case studies! He specializes in building MVPs and scaling products.",
  },
  // Tech Stack
  {
    patterns: ["stack", "tech", "tecnolog", "tools", "herramientas", "framework", "language", "lenguaje"],
    reply: "Tomas's main stack: TypeScript, React, Next.js, Node.js, and PostgreSQL. He also works with Tailwind CSS, Prisma, and various cloud services. Visit /uses for his complete setup!",
  },
  // Skills
  {
    patterns: ["skill", "habilidad", "can do", "expertise", "experience", "experiencia"],
    reply: "Tomas specializes in full-stack development, product design, and system architecture. He has experience leading technical projects, building design systems, and working with cross-functional teams.",
  },
  // Hire / Contact
  {
    patterns: ["hire", "contratar", "contact", "contacto", "email", "reach", "available", "disponible", "freelance"],
    reply: "Tomas is open to interesting projects! Visit the /hire page to get in touch, or connect on LinkedIn and GitHub. He's particularly interested in fintech and developer tool projects.",
  },
  // Location
  {
    patterns: ["where", "donde", "location", "ubicacion", "based", "live", "vive", "ciudad", "city"],
    reply: "Tomas is based in Buenos Aires, Argentina. He works with clients globally and is comfortable with remote collaboration across different time zones.",
  },
  // Blog
  {
    patterns: ["blog", "article", "post", "write", "escribe", "read", "leer"],
    reply: "Check out the Blog section! Tomas writes about software development, product design, and lessons learned building products. Great insights for developers and product people.",
  },
  // Uses / Setup
  {
    patterns: ["uses", "setup", "configuracion", "equipo", "hardware", "software", "editor", "vscode"],
    reply: "Visit /uses to see Tomas's complete setup - from his coding environment (VS Code + Neovim) to hardware and productivity tools. It's a living document that gets updated regularly.",
  },
  // Fintech
  {
    patterns: ["fintech", "finance", "banking", "payment", "financial"],
    reply: "Fintech is one of Tomas's focus areas. He has experience building payment systems, financial dashboards, and regulatory-compliant applications. It's a space where his product thinking really shines.",
  },
  // Design
  {
    patterns: ["design", "diseño", "ui", "ux", "figma", "interface"],
    reply: "Tomas is a design-minded developer. He believes great products need both solid engineering AND thoughtful design. He works closely with designers and can bridge the gap between design and code.",
  },
  // React / Next.js
  {
    patterns: ["react", "next", "nextjs"],
    reply: "React and Next.js are Tomas's go-to frameworks. He's built multiple production apps with App Router, Server Components, and the full Next.js ecosystem. This portfolio is built with Next.js!",
  },
  // TypeScript
  {
    patterns: ["typescript", "type", "tipos"],
    reply: "TypeScript is essential in Tomas's workflow. He's a strong advocate for type safety and uses it in every project - from strict types to advanced patterns like branded types and type guards.",
  },
  // Thanks / Bye
  {
    patterns: ["thank", "gracias", "bye", "adios", "chau", "goodbye"],
    reply: "You're welcome! Feel free to explore the site and reach out if you'd like to work together. Have a great day! 👋",
  },
  // Help
  {
    patterns: ["help", "ayuda", "what can", "que puedo", "options", "opciones"],
    reply: "I can tell you about: Tomas's projects, tech stack, skills, experience, how to hire him, his blog, or his setup (/uses). Just ask!",
  },
];

// Default response when no pattern matches
const defaultResponses = [
  "Interesting question! I'm a simple assistant focused on Tomas's portfolio. Try asking about his projects, tech stack, or how to get in touch.",
  "I'm not sure about that, but I can help with questions about Tomas's work, skills, or how to contact him. What would you like to know?",
  "That's outside my scope, but feel free to ask about Tomas's projects, experience, or tech stack!",
];

function getSmartResponse(message: string): string {
  const lower = message.toLowerCase();

  // Check each response pattern
  for (const { patterns, reply } of responses) {
    if (patterns.some((pattern) => lower.includes(pattern))) {
      return reply;
    }
  }

  // Return random default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = (await request.json()) as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    const lastMessage = messages[messages.length - 1]?.content || "";
    const response = getSmartResponse(lastMessage);

    // Add small delay to feel more natural
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 400));

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
