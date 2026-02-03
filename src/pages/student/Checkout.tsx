import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { coinPackages } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import {
  Coins,
  CreditCard,
  Check,
  Sparkles,
  Shield,
  Zap,
} from 'lucide-react';

export default function Checkout() {
  const { user, updateUser } = useAuth();
  const [selectedPackage, setSelectedPackage] = useState(coinPackages[1].id);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePurchase = async () => {
    const pkg = coinPackages.find(p => p.id === selectedPackage);
    if (!pkg || !user) return;

    setIsProcessing(true);

    // Simulate Paystack payment
    await new Promise(resolve => setTimeout(resolve, 2000));

    updateUser({ coins: user.coins + pkg.coins + pkg.bonus });

    toast.success('Purchase successful!', {
      description: `${pkg.coins + pkg.bonus} coins have been added to your wallet.`,
    });

    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Buy Coins</h1>
        <p className="text-muted-foreground mt-2">
          Get more coins to unlock premium courses and features
        </p>
      </div>

      {/* Coin Packages */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coinPackages.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => setSelectedPackage(pkg.id)}
            className={cn(
              'relative p-6 rounded-xl border-2 text-left transition-all duration-200',
              'hover:border-primary/50 hover:shadow-lg',
              selectedPackage === pkg.id
                ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                : 'border-border bg-card'
            )}
          >
            {pkg.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                  Most Popular
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 mb-4">
              <Coins className="w-6 h-6 text-coin" />
              <span className="text-2xl font-bold text-foreground">{pkg.coins}</span>
            </div>

            {pkg.bonus > 0 && (
              <div className="flex items-center gap-1 text-sm text-success mb-3">
                <Sparkles className="w-4 h-4" />
                <span>+{pkg.bonus} bonus coins</span>
              </div>
            )}

            <p className="text-2xl font-bold text-foreground">${pkg.price}</p>
            <p className="text-xs text-muted-foreground mt-1">
              ${(pkg.price / (pkg.coins + pkg.bonus)).toFixed(3)} per coin
            </p>

            {selectedPackage === pkg.id && (
              <div className="absolute top-4 right-4">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Payment Form */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Details */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-6">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Details
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                className="font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" type="password" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Secured by Paystack</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-6 rounded-xl bg-card border border-border space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>

          {(() => {
            const pkg = coinPackages.find(p => p.id === selectedPackage);
            if (!pkg) return null;

            return (
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Coin Package</span>
                  <span className="font-medium text-foreground">{pkg.coins} coins</span>
                </div>

                {pkg.bonus > 0 && (
                  <div className="flex justify-between items-center py-3 border-b border-border">
                    <span className="text-success flex items-center gap-1">
                      <Sparkles className="w-4 h-4" />
                      Bonus
                    </span>
                    <span className="font-medium text-success">+{pkg.bonus} coins</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="text-muted-foreground">Total Coins</span>
                  <span className="font-bold text-foreground text-lg">
                    {pkg.coins + pkg.bonus} coins
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-foreground font-medium">Total</span>
                  <span className="text-2xl font-bold text-foreground">${pkg.price}</span>
                </div>

                <Button
                  className="w-full h-12 text-lg"
                  onClick={handlePurchase}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Complete Purchase
                    </>
                  )}
                </Button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
