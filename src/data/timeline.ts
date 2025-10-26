export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  milestone: boolean;
  image?: string;
}

export const timeline: TimelineEvent[] = [
  {
    year: '2020',
    title: 'Foundation',
    description: 'Afribit Africa founded with a vision to bring Bitcoin financial freedom to African communities.',
    milestone: true,
  },
  {
    year: '2021',
    title: 'First Merchant Onboarded',
    description: 'Successfully onboarded our first merchant accepting Bitcoin payments in Kampala, Uganda.',
    milestone: true,
  },
  {
    year: '2021',
    title: 'Education Program Launch',
    description: 'Launched comprehensive Bitcoin education workshops reaching 100+ community members.',
    milestone: false,
  },
  {
    year: '2022',
    title: 'BTCPay Server Integration',
    description: 'Deployed self-hosted BTCPay Server infrastructure to support merchant payments.',
    milestone: true,
  },
  {
    year: '2022',
    title: '50 Merchants Milestone',
    description: 'Reached 50 active merchants accepting Bitcoin across East Africa.',
    milestone: false,
  },
  {
    year: '2023',
    title: 'Boda-Boda Program',
    description: 'Launched Bitcoin payment system for motorcycle taxi drivers, reaching 30+ drivers.',
    milestone: true,
  },
  {
    year: '2023',
    title: 'International Partnerships',
    description: 'Formed partnerships with global Bitcoin organizations and education initiatives.',
    milestone: false,
  },
  {
    year: '2024',
    title: '200 Merchants Network',
    description: 'Expanded merchant network to 200+ businesses, creating a thriving Bitcoin economy.',
    milestone: true,
  },
  {
    year: '2024',
    title: 'Waste Management Initiative',
    description: 'Introduced Bitcoin incentives for waste collection and recycling programs.',
    milestone: false,
  },
  {
    year: '2025',
    title: '2000+ Transactions',
    description: 'Processed over 2000 Bitcoin transactions, demonstrating real-world utility.',
    milestone: true,
  },
  {
    year: '2025',
    title: 'Community Growth',
    description: 'Active community of 1000+ members learning and using Bitcoin daily.',
    milestone: false,
  },
];
