import { db } from "./index";
import * as schema from "@shared/schema";

async function seed() {
  try {
    console.log("Seeding database...");

    // Seed testimonials
    const existingTestimonials = await db.query.testimonials.findMany();
    if (existingTestimonials.length === 0) {
      console.log("Seeding testimonials...");
      await db.insert(schema.testimonials).values([
        {
          content: "The care provided to my mother has been exceptional. The caregivers are professional, compassionate, and have become like family to us. They go above and beyond in their duties and have given our family peace of mind.",
          author: "Jane D.",
          relationship: "Daughter of client",
          isActive: true
        },
        {
          content: "Since Super Health Care began providing live-in care for my father, his quality of life has improved dramatically. The carer is attentive, respectful, and has built a wonderful rapport with him. We couldn't be more grateful.",
          author: "Robert T.",
          relationship: "Son of client",
          isActive: true
        },
        {
          content: "The team at Super Health Care provided excellent end-of-life care for my husband. Their sensitivity, professionalism, and genuine compassion made a difficult time much more manageable. I will be forever thankful.",
          author: "Margaret S.",
          relationship: "Wife of client",
          isActive: true
        }
      ]);
      console.log("Testimonials seeded successfully");
    } else {
      console.log("Testimonials already exist, skipping seed");
    }

    // Seed services
    const existingServices = await db.query.services.findMany();
    if (existingServices.length === 0) {
      console.log("Seeding services...");
      
      // Insert services
      const personalCare = await db.insert(schema.services).values({
        slug: "personal-care",
        title: "Personal Care",
        description: "Assistance with daily activities including bathing, dressing, grooming, medication reminders, and mobility support.",
        imageUrl: "https://images.unsplash.com/photo-1556911073-38141963c9e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        isFeatured: false,
        displayOrder: 1
      }).returning();

      const liveInCare = await db.insert(schema.services).values({
        slug: "live-in-care",
        title: "Live-in Care",
        description: "Round-the-clock support from a dedicated caregiver who lives in your home, providing continuous assistance and companionship.",
        imageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        isFeatured: true,
        displayOrder: 2
      }).returning();

      const domesticSupport = await db.insert(schema.services).values({
        slug: "domestic-support",
        title: "Domestic Support",
        description: "Help with household tasks including meal preparation, light cleaning, laundry, shopping, and other everyday activities.",
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        isFeatured: false,
        displayOrder: 3
      }).returning();

      const companionship = await db.insert(schema.services).values({
        slug: "companionship",
        title: "Companionship",
        description: "Friendly company, conversation, and emotional support, along with assistance for social activities and outings.",
        imageUrl: "https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
        isFeatured: false,
        displayOrder: 4
      }).returning();

      const specializedCare = await db.insert(schema.services).values({
        slug: "specialized-care",
        title: "Specialized Care",
        description: "Tailored support for conditions such as dementia, Parkinson's, stroke recovery, and end-of-life care.",
        imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        isFeatured: false,
        displayOrder: 5
      }).returning();

      const respiteCare = await db.insert(schema.services).values({
        slug: "respite-care",
        title: "Respite Care",
        description: "Temporary support that allows regular family caregivers to take a break and recharge while knowing their loved one is in good hands.",
        imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400",
        isFeatured: false,
        displayOrder: 6
      }).returning();

      // Add features for live-in care service
      if (liveInCare[0]) {
        await db.insert(schema.serviceFeatures).values([
          {
            serviceId: liveInCare[0].id,
            feature: "Personal care and medication management",
            displayOrder: 1
          },
          {
            serviceId: liveInCare[0].id,
            feature: "Meal preparation and household tasks",
            displayOrder: 2
          },
          {
            serviceId: liveInCare[0].id,
            feature: "Companionship and emotional support",
            displayOrder: 3
          },
          {
            serviceId: liveInCare[0].id,
            feature: "Specialized care for various conditions",
            displayOrder: 4
          },
          {
            serviceId: liveInCare[0].id,
            feature: "24/7 peace of mind for family members",
            displayOrder: 5
          }
        ]);
      }
      
      console.log("Services seeded successfully");
    } else {
      console.log("Services already exist, skipping seed");
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
