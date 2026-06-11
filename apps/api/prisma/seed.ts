import { PrismaClient, Role, ServiceType, AppointmentStatus, QuoteStatus } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const passwordHash = await argon2.hash('Admin@123456', {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });

  const admin = await prisma.user.upsert({
    where: { email: 'admin@proplumb.com' },
    update: {},
    create: {
      email: 'admin@proplumb.com',
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });
  console.log(`✅ Admin user created: ${admin.email}`);

  // Create customers
  const customers = await Promise.all([
    prisma.customer.upsert({
      where: { email: 'john.smith@email.com' },
      update: {},
      create: { name: 'John Smith', email: 'john.smith@email.com', phone: '(555) 234-5678', address: '456 Oak Street, Houston, TX 77002' },
    }),
    prisma.customer.upsert({
      where: { email: 'sarah.johnson@email.com' },
      update: {},
      create: { name: 'Sarah Johnson', email: 'sarah.johnson@email.com', phone: '(555) 345-6789', address: '789 Maple Ave, Dallas, TX 75201' },
    }),
    prisma.customer.upsert({
      where: { email: 'mike.williams@email.com' },
      update: {},
      create: { name: 'Mike Williams', email: 'mike.williams@email.com', phone: '(555) 456-7890', address: '321 Pine Road, Austin, TX 73301' },
    }),
    prisma.customer.upsert({
      where: { email: 'emily.davis@email.com' },
      update: {},
      create: { name: 'Emily Davis', email: 'emily.davis@email.com', phone: '(555) 567-8901', address: '654 Cedar Lane, Phoenix, AZ 85001' },
    }),
    prisma.customer.upsert({
      where: { email: 'robert.brown@email.com' },
      update: {},
      create: { name: 'Robert Brown', email: 'robert.brown@email.com', phone: '(555) 678-9012', address: '987 Elm Boulevard, Miami, FL 33101' },
    }),
  ]);
  console.log(`✅ ${customers.length} customers created`);

  // Create appointments
  const now = new Date();
  const appointments = await Promise.all([
    prisma.appointment.create({
      data: { customerId: customers[0]!.id, serviceType: ServiceType.EMERGENCY, scheduledAt: new Date(now.getTime() + 86400000), status: AppointmentStatus.CONFIRMED, technicianNote: 'Burst pipe in kitchen' },
    }),
    prisma.appointment.create({
      data: { customerId: customers[1]!.id, serviceType: ServiceType.DRAIN_CLEANING, scheduledAt: new Date(now.getTime() + 172800000), status: AppointmentStatus.PENDING },
    }),
    prisma.appointment.create({
      data: { customerId: customers[2]!.id, serviceType: ServiceType.WATER_HEATER, scheduledAt: new Date(now.getTime() + 259200000), status: AppointmentStatus.CONFIRMED, technicianNote: 'Tankless water heater installation' },
    }),
    prisma.appointment.create({
      data: { customerId: customers[3]!.id, serviceType: ServiceType.LEAK_DETECTION, scheduledAt: new Date(now.getTime() - 86400000), status: AppointmentStatus.COMPLETED },
    }),
    prisma.appointment.create({
      data: { customerId: customers[4]!.id, serviceType: ServiceType.TOILET_REPAIR, scheduledAt: new Date(now.getTime() + 345600000), status: AppointmentStatus.PENDING },
    }),
  ]);
  console.log(`✅ ${appointments.length} appointments created`);

  // Create quotes
  const quotes = await Promise.all([
    prisma.quote.create({
      data: { customerId: customers[0]!.id, serviceType: ServiceType.PIPE_REPLACEMENT, description: 'Need to replace old galvanized pipes in the entire house with PEX.', address: '456 Oak Street, Houston, TX 77002', status: QuoteStatus.REVIEWING, estimatedCost: 4500 },
    }),
    prisma.quote.create({
      data: { customerId: customers[1]!.id, serviceType: ServiceType.SEWER_LINE, description: 'Sewer line backed up. Need camera inspection and possible replacement.', address: '789 Maple Ave, Dallas, TX 75201', status: QuoteStatus.NEW },
    }),
    prisma.quote.create({
      data: { customerId: customers[2]!.id, serviceType: ServiceType.COMMERCIAL, description: 'Restaurant needs grease trap installation and full plumbing inspection.', address: '123 Business Park, Austin, TX 73301', status: QuoteStatus.QUOTED, estimatedCost: 8200 },
    }),
  ]);
  console.log(`✅ ${quotes.length} quotes created`);

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: { customerName: 'John Smith', rating: 5, review: 'ProPlumb USA saved us during a midnight pipe burst! Their technician arrived within 45 minutes and had the issue fixed in under two hours. Professional, courteous, and fair pricing. Cannot recommend enough!', serviceType: 'Emergency Plumbing', isApproved: true, isPublished: true, source: 'google' },
    }),
    prisma.testimonial.create({
      data: { customerName: 'Sarah Johnson', rating: 5, review: 'Had a complete kitchen drain overhaul done by ProPlumb. The team was incredibly thorough, explained every step, and cleaned up perfectly after. My drains have never worked better!', serviceType: 'Drain Cleaning', isApproved: true, isPublished: true, source: 'yelp' },
    }),
    prisma.testimonial.create({
      data: { customerName: 'Mike Williams', rating: 5, review: 'Installed a new tankless water heater. The installation was flawless, and they helped me choose the right model for my family size. Already saving on energy bills!', serviceType: 'Water Heater', isApproved: true, isPublished: true, source: 'google' },
    }),
    prisma.testimonial.create({
      data: { customerName: 'Emily Davis', rating: 4, review: 'Used their leak detection service and they found a hidden leak behind the bathroom wall that had been causing mold. Very impressed with their thermal imaging technology.', serviceType: 'Leak Detection', isApproved: true, isPublished: true, source: 'direct' },
    }),
    prisma.testimonial.create({
      data: { customerName: 'Robert Brown', rating: 5, review: 'Our restaurant needed an emergency plumbing fix on a busy Friday night. ProPlumb sent someone within 30 minutes and had us back open in no time. They are our go-to plumbing service now!', serviceType: 'Commercial Plumbing', isApproved: true, isPublished: true, source: 'google' },
    }),
    prisma.testimonial.create({
      data: { customerName: 'Lisa Martinez', rating: 5, review: 'Excellent service for our whole-house repiping project. They replaced all the old pipes with PEX in just two days with minimal disruption. Very competitive pricing too.', serviceType: 'Pipe Replacement', isApproved: true, isPublished: true, source: 'yelp' },
    }),
  ]);
  console.log(`✅ ${testimonials.length} testimonials created`);

  // Create blog posts
  const blogPosts = await Promise.all([
    prisma.blogPost.create({
      data: {
        title: '10 Signs You Need Emergency Plumbing Service',
        slug: '10-signs-emergency-plumbing',
        excerpt: 'Learn the warning signs that indicate you need immediate professional plumbing help to prevent costly water damage.',
        content: `<h2>When to Call for Emergency Plumbing</h2><p>Plumbing emergencies can strike at any time, and knowing when to call a professional can save you thousands in water damage repairs.</p><h3>1. Burst Pipes</h3><p>A burst pipe is one of the most urgent plumbing emergencies. If you notice water spraying from a pipe, turn off your main water valve immediately and call us.</p><h3>2. Severe Drain Blockage</h3><p>If multiple drains in your home are backing up simultaneously, this could indicate a main sewer line blockage that requires immediate attention.</p><h3>3. No Hot Water</h3><p>A sudden loss of hot water, especially in winter, can be both uncomfortable and indicate a water heater malfunction that needs urgent repair.</p><h3>4. Gas Leak Smell</h3><p>If you smell rotten eggs near your water heater or gas lines, evacuate immediately and call emergency services, then call us for repairs.</p><h3>5. Overflowing Toilet</h3><p>An overflowing toilet that won't stop with a plunger needs professional intervention to prevent water damage and health hazards.</p>`,
        coverImageUrl: '/images/blog/emergency-plumbing.webp',
        category: 'Emergency Prep',
        authorId: admin.id,
        tags: ['emergency', 'tips', 'prevention'],
        readTimeMin: 5,
        isPublished: true,
        publishedAt: new Date(now.getTime() - 604800000),
        seoTitle: '10 Signs You Need Emergency Plumbing Service | ProPlumb USA',
        seoDescription: 'Discover the top warning signs that indicate you need immediate emergency plumbing service to prevent costly damage.',
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'How to Prevent Frozen Pipes This Winter',
        slug: 'prevent-frozen-pipes-winter',
        excerpt: 'Protect your home from costly frozen pipe damage with these essential winterization tips from our master plumbers.',
        content: `<h2>Winterize Your Plumbing</h2><p>Frozen pipes are one of the most common and costly plumbing issues during winter months. Here's how to prevent them.</p><h3>Insulate Exposed Pipes</h3><p>Use foam pipe insulation on all exposed pipes in unheated areas like basements, crawl spaces, and garages.</p><h3>Keep a Slow Drip</h3><p>During extreme cold snaps, let faucets drip slightly to keep water moving through the pipes.</p><h3>Seal Air Leaks</h3><p>Check for and seal any air leaks near pipes, especially where plumbing enters your home through exterior walls.</p>`,
        coverImageUrl: '/images/blog/frozen-pipes.webp',
        category: 'Home Maintenance',
        authorId: admin.id,
        tags: ['winter', 'prevention', 'maintenance'],
        readTimeMin: 4,
        isPublished: true,
        publishedAt: new Date(now.getTime() - 1209600000),
        seoTitle: 'How to Prevent Frozen Pipes This Winter | ProPlumb USA',
        seoDescription: 'Essential winterization tips to protect your plumbing from frozen pipes and costly water damage.',
      },
    }),
    prisma.blogPost.create({
      data: {
        title: 'Tankless vs. Tank Water Heaters: Which is Right for You?',
        slug: 'tankless-vs-tank-water-heaters',
        excerpt: 'Compare the pros and cons of tankless and traditional tank water heaters to make the best choice for your home.',
        content: `<h2>Choosing the Right Water Heater</h2><p>When it's time to replace your water heater, you'll face the choice between traditional tank and modern tankless models.</p><h3>Tank Water Heaters</h3><p>Traditional tank water heaters store 40-80 gallons of hot water, providing a ready supply. They're less expensive upfront but use more energy.</p><h3>Tankless Water Heaters</h3><p>Tankless models heat water on demand, offering unlimited hot water and energy savings of up to 30%. They're more expensive initially but last longer.</p>`,
        coverImageUrl: '/images/blog/water-heaters.webp',
        category: 'Plumbing Tips',
        authorId: admin.id,
        tags: ['water heater', 'comparison', 'energy efficiency'],
        readTimeMin: 6,
        isPublished: true,
        publishedAt: new Date(now.getTime() - 1814400000),
        seoTitle: 'Tankless vs. Tank Water Heaters Comparison | ProPlumb USA',
        seoDescription: 'Expert comparison of tankless and tank water heaters to help you choose the best option for your home.',
      },
    }),
  ]);
  console.log(`✅ ${blogPosts.length} blog posts created`);

  // Create contact messages
  await Promise.all([
    prisma.contactMessage.create({
      data: { name: 'Tom Wilson', email: 'tom@email.com', phone: '(555) 111-2222', message: 'I need a quote for remodeling two bathrooms. Can you send someone for an estimate?' },
    }),
    prisma.contactMessage.create({
      data: { name: 'Anna Lee', email: 'anna@email.com', phone: '(555) 333-4444', message: 'Do you service the Sugar Land area? I have a dripping faucet that needs repair.' },
    }),
  ]);
  console.log('✅ Contact messages created');

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
