'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, ExternalLink, Loader2, XCircle } from 'lucide-react';

interface InvoiceStatusProps {
  invoiceId: string;
  checkoutLink: string;
  amount: number;
  onClose: () => void;
}

type DonationStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

export function InvoiceStatus({
  invoiceId,
  checkoutLink,
  amount,
  onClose,
}: InvoiceStatusProps) {
  const [status, setStatus] = useState<DonationStatus>('PENDING');
  const [isPolling, setIsPolling] = useState(true);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    if (!isPolling) return;

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/donations/check-status/${invoiceId}`);
        const result = await response.json();

        if (result.success) {
          setStatus(result.data.status);

          // Stop polling if status is final
          if (['COMPLETED', 'FAILED', 'EXPIRED'].includes(result.data.status)) {
            setIsPolling(false);
          }
        }
      } catch (error) {
        console.error('Error checking status:', error);
      }

      setPollCount((prev) => prev + 1);

      // Stop polling after 60 attempts (5 minutes at 5-second intervals)
      if (pollCount >= 60) {
        setIsPolling(false);
      }
    };

    // Poll immediately
    pollStatus();

    // Then poll every 5 seconds
    const interval = setInterval(pollStatus, 5000);

    return () => clearInterval(interval);
  }, [invoiceId, isPolling, pollCount]);

  const getStatusIcon = () => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="h-16 w-16 text-green-500" />;
      case 'PROCESSING':
        return <Clock className="h-16 w-16 text-blue-500" />;
      case 'FAILED':
      case 'EXPIRED':
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return <Loader2 className="h-16 w-16 text-primary animate-spin" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'COMPLETED':
        return {
          title: 'Thank You! 🎉',
          message: `Your donation of $${amount.toFixed(2)} has been received and confirmed. Your support makes a real difference in empowering African communities through Bitcoin.`,
        };
      case 'PROCESSING':
        return {
          title: 'Payment Received',
          message: 'Your payment has been detected and is being confirmed on the blockchain. This usually takes a few minutes.',
        };
      case 'FAILED':
        return {
          title: 'Payment Failed',
          message: 'The payment could not be processed. Please try again or contact support if the issue persists.',
        };
      case 'EXPIRED':
        return {
          title: 'Invoice Expired',
          message: 'This payment invoice has expired. Please create a new donation to try again.',
        };
      default:
        return {
          title: 'Waiting for Payment',
          message: 'Please complete the payment on BTCPay Server. We\'re monitoring the Bitcoin network for your transaction.',
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center text-center space-y-4">
        {getStatusIcon()}
        <div>
          <h3 className="text-2xl font-bold mb-2">{statusInfo.title}</h3>
          <p className="text-muted-foreground">{statusInfo.message}</p>
        </div>
      </div>

      <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-semibold">${amount.toFixed(2)} USD</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Status:</span>
          <span className="font-semibold capitalize">{status.toLowerCase()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Invoice ID:</span>
          <span className="font-mono text-xs">{invoiceId.slice(0, 16)}...</span>
        </div>
      </div>

      {status === 'PENDING' && (
        <div className="flex flex-col gap-2">
          <Button
            onClick={() => window.open(checkoutLink, '_blank')}
            className="w-full"
            size="lg"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open Payment Page
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            {isPolling ? 'Checking for payment...' : 'Stopped checking. Click above to retry payment.'}
          </p>
        </div>
      )}

      {status === 'PROCESSING' && (
        <div className="text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Confirming transaction on the blockchain...
          </p>
        </div>
      )}

      {status === 'COMPLETED' && (
        <Button onClick={onClose} className="w-full" size="lg">
          Done
        </Button>
      )}

      {(status === 'FAILED' || status === 'EXPIRED') && (
        <div className="flex gap-2">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Close
          </Button>
          <Button onClick={() => window.location.reload()} className="flex-1">
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}
