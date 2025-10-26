'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bitcoin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { InvoiceStatus } from './InvoiceStatus';

const donationSchema = z.object({
  amount: z.number().min(1, 'Minimum donation is $1'),
  customAmount: z.string().optional(),
  donorName: z.string().min(2, 'Name must be at least 2 characters').optional(),
  donorEmail: z.string().email('Invalid email address').optional(),
  program: z.string().optional(),
  message: z.string().max(500, 'Message too long').optional(),
  isAnonymous: z.boolean(),
});

type DonationFormData = z.infer<typeof donationSchema>;

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgram?: string;
  defaultAmount?: number;
}

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];

export function DonationModal({
  isOpen,
  onClose,
  defaultProgram,
  defaultAmount,
}: DonationModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(defaultAmount || null);
  const [isCustom, setIsCustom] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [invoiceData, setInvoiceData] = useState<{
    invoiceId: string;
    checkoutLink: string;
    donationId: string;
  } | null>(null);
  const [currentStep, setCurrentStep] = useState<'amount' | 'details' | 'payment'>('amount');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: defaultAmount || 0,
      program: defaultProgram || '',
      isAnonymous: false,
    },
  });

  const isAnonymous = watch('isAnonymous');

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setIsCustom(false);
    setValue('amount', amount);
  };

  const handleCustomAmount = (value: string) => {
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount > 0) {
      setSelectedAmount(amount);
      setValue('amount', amount);
    }
  };

  const onSubmit = async (data: DonationFormData) => {
    if (!selectedAmount || selectedAmount < 1) {
      toast.error('Please select or enter a donation amount');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/donations/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: selectedAmount,
          currency: 'USD',
          donorName: data.isAnonymous ? undefined : data.donorName,
          donorEmail: data.isAnonymous ? undefined : data.donorEmail,
          program: data.program || undefined,
          message: data.message || undefined,
          isAnonymous: data.isAnonymous,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setInvoiceData({
          invoiceId: result.data.invoiceId,
          checkoutLink: result.data.checkoutLink,
          donationId: result.data.donationId,
        });
        setCurrentStep('payment');
        toast.success('Invoice created! Redirecting to payment...');

        // Redirect to BTCPay checkout
        setTimeout(() => {
          window.open(result.data.checkoutLink, '_blank');
        }, 1000);
      } else {
        toast.error(result.error || 'Failed to create donation invoice');
      }
    } catch (error) {
      console.error('Error creating donation:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedAmount(defaultAmount || null);
    setIsCustom(false);
    setCurrentStep('amount');
    setInvoiceData(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Make a Donation</DialogTitle>
        </DialogHeader>

        {currentStep === 'payment' && invoiceData ? (
          <InvoiceStatus
            invoiceId={invoiceData.invoiceId}
            checkoutLink={invoiceData.checkoutLink}
            amount={selectedAmount || 0}
            onClose={handleClose}
          />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Tabs
              value={currentStep}
              onValueChange={(value) => setCurrentStep(value as 'amount' | 'details')}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="amount">Amount</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>

              <TabsContent value="amount" className="space-y-6 mt-6">
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Select Amount (USD)
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {PRESET_AMOUNTS.map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant={selectedAmount === amount && !isCustom ? 'default' : 'outline'}
                        onClick={() => handleAmountSelect(amount)}
                        className="h-16 text-lg font-semibold"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="customAmount">Custom Amount</Label>
                  <Input
                    id="customAmount"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="Enter custom amount"
                    onChange={(e) => {
                      setIsCustom(true);
                      handleCustomAmount(e.target.value);
                    }}
                    className="text-lg h-12"
                  />
                </div>

                {selectedAmount && (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Your donation</p>
                    <p className="text-3xl font-bold text-primary">
                      ${selectedAmount.toFixed(2)}
                    </p>
                  </div>
                )}

                <Button
                  type="button"
                  onClick={() => setCurrentStep('details')}
                  disabled={!selectedAmount || selectedAmount < 1}
                  className="w-full"
                  size="lg"
                >
                  Continue to Details
                </Button>
              </TabsContent>

              <TabsContent value="details" className="space-y-6 mt-6">
                <div>
                  <Label htmlFor="program">Support a Program (Optional)</Label>
                  <Select
                    value={watch('program') || ''}
                    onValueChange={(value) => setValue('program', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="General Donation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">General Donation</SelectItem>
                      <SelectItem value="bitcoin-education">Bitcoin Education</SelectItem>
                      <SelectItem value="boda-boda">Boda-Boda</SelectItem>
                      <SelectItem value="waste-management">Waste Management</SelectItem>
                      <SelectItem value="business-accelerator">Business Accelerator</SelectItem>
                      <SelectItem value="equipment-program">Equipment Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isAnonymous"
                    {...register('isAnonymous')}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="isAnonymous" className="cursor-pointer">
                    Make this donation anonymous
                  </Label>
                </div>

                {!isAnonymous && (
                  <>
                    <div>
                      <Label htmlFor="donorName">Your Name</Label>
                      <Input
                        id="donorName"
                        {...register('donorName')}
                        placeholder="Enter your name"
                      />
                      {errors.donorName && (
                        <p className="text-sm text-red-500 mt-1">{errors.donorName.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="donorEmail">Your Email</Label>
                      <Input
                        id="donorEmail"
                        type="email"
                        {...register('donorEmail')}
                        placeholder="Enter your email"
                      />
                      {errors.donorEmail && (
                        <p className="text-sm text-red-500 mt-1">{errors.donorEmail.message}</p>
                      )}
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    {...register('message')}
                    placeholder="Leave a message..."
                    rows={3}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep('amount')}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" loading={isSubmitting} className="flex-1" size="lg">
                    {isSubmitting ? (
                      'Processing...'
                    ) : (
                      <>
                        <Bitcoin className="mr-2 h-4 w-4" />
                        Donate ${selectedAmount?.toFixed(2) || '0.00'}
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
