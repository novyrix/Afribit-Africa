export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: 'David Mukwaya',
    role: 'Founder & Executive Director',
    bio: 'Bitcoin advocate and educator with 5+ years of experience in cryptocurrency adoption across East Africa. Passionate about financial inclusion and community empowerment.',
    image: '/Images/team/david.jpg',
    twitter: '@davidmukwaya',
    email: 'david@afribit.africa',
  },
  {
    name: 'Sarah Nakato',
    role: 'Program Director',
    bio: 'Community organizer with expertise in grassroots education and merchant onboarding. Leads our Bitcoin training programs across Uganda.',
    image: '/Images/team/sarah.jpg',
    email: 'sarah@afribit.africa',
  },
  {
    name: 'James Ochieng',
    role: 'Technical Lead',
    bio: 'Software engineer and Bitcoin developer. Manages our BTCPay Server infrastructure and provides technical support to merchants.',
    image: '/Images/team/james.jpg',
    linkedin: 'james-ochieng',
    email: 'james@afribit.africa',
  },
  {
    name: 'Grace Namata',
    role: 'Community Manager',
    bio: 'Building and nurturing our growing community of Bitcoin users across Africa. Coordinates events, workshops, and online engagement.',
    image: '/Images/team/grace.jpg',
    twitter: '@gracenamata',
    email: 'grace@afribit.africa',
  },
];
