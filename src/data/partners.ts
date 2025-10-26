export interface Partner {
  name: string;
  description: string;
  logo: string;
  website?: string;
  category: 'Bitcoin' | 'NGO' | 'Tech' | 'Education';
}

export const partners: Partner[] = [
  {
    name: 'Bitcoin Beach',
    description: 'Pioneering Bitcoin adoption initiatives, inspiring our work in Africa.',
    logo: '/Partner logos/bitcoin-beach.png',
    website: 'https://bitcoinbeach.com',
    category: 'Bitcoin',
  },
  {
    name: 'BTCPay Server Foundation',
    description: 'Providing open-source payment infrastructure for our merchant network.',
    logo: '/Partner logos/btcpay.png',
    website: 'https://btcpayserver.org',
    category: 'Tech',
  },
  {
    name: 'Built with Bitcoin Foundation',
    description: 'Supporting Bitcoin education and infrastructure projects globally.',
    logo: '/Partner logos/built-with-bitcoin.png',
    website: 'https://builtwithbitcoin.org',
    category: 'Bitcoin',
  },
  {
    name: 'Local Communities Network',
    description: 'Partnering to reach underserved communities across East Africa.',
    logo: '/Partner logos/community.png',
    category: 'NGO',
  },
  {
    name: 'African Tech Foundation',
    description: 'Collaborative technology initiatives for African development.',
    logo: '/Partner logos/tech-foundation.png',
    category: 'Tech',
  },
  {
    name: 'Bitcoin Education Initiative',
    description: 'Creating educational resources for Bitcoin adoption worldwide.',
    logo: '/Partner logos/education.png',
    category: 'Education',
  },
];
