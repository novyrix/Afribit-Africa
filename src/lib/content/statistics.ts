import 'server-only';

import { prisma } from '@/lib/prisma';
import type { StatItem } from '@/types';

const fallbackStatistics: StatItem[] = [
  {
    label: 'Bitcoin Transactions',
    value: 2000,
    icon: 'TrendingUp',
    suffix: '+',
  },
  {
    label: 'Merchants Onboarded',
    value: 200,
    icon: 'Users',
    suffix: '+',
  },
  {
    label: 'Active Programs',
    value: 5,
    icon: 'Zap',
  },
  {
    label: 'Community Members',
    value: 1000,
    icon: 'Heart',
    suffix: '+',
  },
];

let loggedFallback = false;

function parseStatValue(value: string): number | string {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : value;
}

export async function listHomepageStatistics(): Promise<StatItem[]> {
  try {
    const statistics = await prisma.statistic.findMany({
      orderBy: [{ order: 'asc' }, { label: 'asc' }],
    });

    if (statistics.length === 0) {
      return fallbackStatistics;
    }

    return statistics.map((statistic) => ({
      label: statistic.label,
      value: parseStatValue(statistic.value),
      icon: statistic.icon || undefined,
    }));
  } catch (error) {
    if (!loggedFallback) {
      loggedFallback = true;
      console.error('Falling back to static statistics:', error);
    }

    return fallbackStatistics;
  }
}