import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export async function seedTemplates() {
  // 🌐 Create shared Resources
  const [resource1, resource2] = await Promise.all([
    prisma.resource.create({
      data: {
        name: "Getting Started Guide",
        type: "PDF",
        url: "https://example.com/start-guide.pdf",
      },
    }),
    prisma.resource.create({
      data: {
        name: "API Reference",
        type: "DOC",
        url: "https://example.com/api-docs",
      },
    }),
  ]);

  // 📦 Create Templates with TemplateResource
  const templates = [
    {
      type: "SaaS App Starter",
      description: "Kickstart your SaaS MVP with auth, billing, and dashboard.",
      tags: ["saas", "mvp", "starter"],
      guide: "https://example.com/guides/saas-starter",
    },
    {
      type: "Mobile App Backend",
      description: "Ready-to-deploy backend for mobile apps using REST APIs.",
      tags: ["mobile", "backend", "rest"],
      guide: "https://example.com/guides/mobile-backend",
    },
    {
      type: "AI Product Launch Kit",
      description: "Template for building and launching AI-based MVPs.",
      tags: ["ai", "launch", "producthunt"],
      guide: "https://example.com/guides/ai-launch",
    },
  ];

  for (const template of templates) {
    await prisma.template.create({
      data: {
        ...template,
        TemplateResource: {
          create: [
            { Resource: { connect: { id: resource1.id } } },
            { Resource: { connect: { id: resource2.id } } },
          ],
        },
      },
    });
  }

  console.log("✅ Seeded templates and resources");
}

