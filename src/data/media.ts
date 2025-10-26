// Media coverage and press mentions
export interface MediaCoverage {
  id: string;
  outlet: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  date: string;
  category: 'international' | 'local' | 'community';
}

export const mediaCoverage: MediaCoverage[] = [
  {
    id: 'bbc-news',
    outlet: 'BBC News',
    title: 'Bitcoin Adoption in Kenya',
    description: 'BBC News covers the growing Bitcoin adoption movement in Kenyan communities and how Afribit Africa is driving financial inclusion.',
    youtubeUrl: 'https://www.youtube.com/watch?v=rPVoaYFiIDg',
    youtubeId: 'rPVoaYFiIDg',
    date: '2024',
    category: 'international',
  },
  {
    id: 'firstpost',
    outlet: 'FirstPost',
    title: 'Africa\'s Bitcoin Revolution',
    description: 'FirstPost explores how Bitcoin is transforming financial systems and empowering communities across Africa.',
    youtubeUrl: 'https://www.youtube.com/watch?v=l4mUySspn1E',
    youtubeId: 'l4mUySspn1E',
    date: '2024',
    category: 'international',
  },
  {
    id: 'ap-archive',
    outlet: 'AP Archive News',
    title: 'Bitcoin in African Markets',
    description: 'Associated Press documents the real-world impact of Bitcoin adoption in African street markets and small businesses.',
    youtubeUrl: 'https://www.youtube.com/watch?v=RBUj98JhpWY',
    youtubeId: 'RBUj98JhpWY',
    date: '2024',
    category: 'international',
  },
  {
    id: 'abc-news',
    outlet: 'ABC News',
    title: 'Financial Freedom Through Bitcoin',
    description: 'ABC News highlights how Bitcoin is providing financial sovereignty and economic opportunities in underserved African communities.',
    youtubeUrl: 'https://www.youtube.com/watch?v=0Ov1vgy8Gag',
    youtubeId: '0Ov1vgy8Gag',
    date: '2024',
    category: 'international',
  },
  {
    id: 'capital-fm',
    outlet: 'Capital FM Kenya',
    title: 'Bitcoin Adoption in Kenya',
    description: 'Capital FM Kenya reports on the grassroots Bitcoin movement and its impact on local merchants and communities.',
    youtubeUrl: 'https://www.youtube.com/watch?v=d6mT2J1lHh0',
    youtubeId: 'd6mT2J1lHh0',
    date: '2024',
    category: 'local',
  },
  {
    id: 'joe-nakamoto',
    outlet: 'Joe Nakamoto',
    title: 'Bitcoin in Africa - Community Perspective',
    description: 'An in-depth look at Bitcoin adoption from a community perspective, featuring stories from Afribit Africa beneficiaries.',
    youtubeUrl: 'https://www.youtube.com/watch?v=LRSQSkiil0M',
    youtubeId: 'LRSQSkiil0M',
    date: '2024',
    category: 'community',
  },
];

export function getMediaByCategory(category: MediaCoverage['category']): MediaCoverage[] {
  return mediaCoverage.filter(m => m.category === category);
}

export function getMediaById(id: string): MediaCoverage | undefined {
  return mediaCoverage.find(m => m.id === id);
}
