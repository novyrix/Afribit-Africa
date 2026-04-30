import 'server-only';

import { prisma } from '@/lib/prisma';
import type { StatItem } from '@/types';

const fallbackStatistics: StatItem[] = [
  {
    label: 'Bitcoin Transactions in Kibera',
    value: 4000,
    icon: 'TrendingUp',
    suffix: '+',
  },
  {
    label: 'Youth & Women Trained',
    value: 600,
    icon: 'Users',
    suffix: '+',
  },
  {
    label: 'Boda-Boda Riders Licensed',
    value: 40,
    icon: 'Zap',
    suffix: '+',
  },
  {
    label: 'Merchants Onboarded',
    value: 200,
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
      suffix: statistic.suffix || undefined,
      prefix: statistic.prefix || undefined,
    }));
  } catch (error) {
    if (!loggedFallback) {
      loggedFallback = true;
      console.error('Falling back to static statistics:', error);
    }

    return fallbackStatistics;
  }
}