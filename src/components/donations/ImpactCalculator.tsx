'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Users, GraduationCap, Smartphone, TrendingUp } from 'lucide-react';

interface ImpactCalculatorProps {
  defaultAmount?: number;
}

interface ImpactMetric {
  icon: React.ReactNode;
  label: string;
  calculate: (amount: number) => string;
  color: string;
}

const IMPACT_METRICS: ImpactMetric[] = [
  {
    icon: <Users className="h-5 w-5" />,
    label: 'People Reached',
    calculate: (amount) => Math.floor(amount / 5).toString(),
    color: 'text-blue-500',
  },
  {
    icon: <GraduationCap className="h-5 w-5" />,
    label: 'Training Sessions',
    calculate: (amount) => Math.floor(amount / 25).toString(),
    color: 'text-green-500',
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    label: 'Bitcoin Wallets Setup',
    calculate: (amount) => Math.floor(amount / 10).toString(),
    color: 'text-purple-500',
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    label: 'Merchants Onboarded',
    calculate: (amount) => Math.floor(amount / 50).toString(),
    color: 'text-orange-500',
  },
];

export function ImpactCalculator({ defaultAmount = 50 }: ImpactCalculatorProps) {
  const [amount, setAmount] = useState(defaultAmount);

  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-2">Calculate Your Impact</h3>
        <p className="text-sm text-muted-foreground">
          See how your donation can make a difference
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <span className="text-sm font-medium">Donation Amount</span>
          <span className="text-3xl font-bold text-primary">${amount}</span>
        </div>

        <Slider
          value={[amount]}
          onValueChange={([value]) => setAmount(value)}
          min={10}
          max={1000}
          step={10}
          className="w-full"
        />

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>$10</span>
          <span>$1,000</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {IMPACT_METRICS.map((metric, index) => (
          <div
            key={index}
            className="p-4 bg-secondary/50 rounded-lg space-y-2"
          >
            <div className={`flex items-center gap-2 ${metric.color}`}>
              {metric.icon}
              <span className="text-xs font-medium">{metric.label}</span>
            </div>
            <p className="text-2xl font-bold">{metric.calculate(amount)}</p>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          * Impact estimates based on average program costs and reach. Actual impact may vary.
        </p>
      </div>
    </Card>
  );
}
