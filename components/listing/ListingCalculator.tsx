'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, Calculator } from 'lucide-react';

interface ListingCalculatorProps {
  price: number;
  propertyTax: number;
  hoa: number;
}

export function ListingCalculator({ price, propertyTax, hoa }: ListingCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(7.0);
  const [loanTerm, setLoanTerm] = useState(30);

  const downPayment = (price * downPaymentPercent) / 100;
  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  // Calculate monthly mortgage payment (P&I)
  const monthlyPI =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Additional monthly costs
  const monthlyPropertyTax = propertyTax / 12;
  const monthlyInsurance = price * 0.0035 / 12; // Estimate 0.35% annually
  const monthlyHOA = hoa;

  // Total monthly payment
  const totalMonthly = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyHOA;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="p-6 md:p-8 grain-texture">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <h2 className="text-3xl font-bold">Mortgage Calculator</h2>
      </div>

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="monthly">Monthly Payment</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-6">
          {/* Monthly Payment Display */}
          <div className="text-center p-6 bg-primary/5 rounded-lg border-2 border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">Estimated Monthly Payment</div>
            <div className="text-4xl md:text-5xl font-bold text-primary">
              {formatCurrency(totalMonthly)}
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              Principal & Interest: {formatCurrency(monthlyPI)}
            </div>
          </div>

          {/* Down Payment Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Down Payment</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-20 h-9 text-right"
                  min="0"
                  max="100"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <Slider
              value={[downPaymentPercent]}
              onValueChange={(value) => setDownPaymentPercent(value[0])}
              max={100}
              min={0}
              step={1}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground text-right">
              {formatCurrency(downPayment)}
            </div>
          </div>

          {/* Interest Rate Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Interest Rate</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-20 h-9 text-right"
                  min="0"
                  max="15"
                  step="0.1"
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <Slider
              value={[interestRate * 10]}
              onValueChange={(value) => setInterestRate(value[0] / 10)}
              max={150}
              min={20}
              step={1}
              className="w-full"
            />
          </div>

          {/* Loan Term */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label>Loan Term</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-20 h-9 text-right"
                  min="10"
                  max="30"
                  step="5"
                />
                <span className="text-sm text-muted-foreground">years</span>
              </div>
            </div>
            <div className="flex gap-2">
              {[15, 20, 30].map((term) => (
                <button
                  key={term}
                  onClick={() => setLoanTerm(term)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    loanTerm === term
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  {term} years
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="space-y-3">
            <CostBreakdownRow
              label="Principal & Interest"
              amount={monthlyPI}
              icon={<DollarSign className="h-4 w-4" />}
            />
            <CostBreakdownRow
              label="Property Tax"
              amount={monthlyPropertyTax}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <CostBreakdownRow
              label="Home Insurance"
              amount={monthlyInsurance}
              icon={<DollarSign className="h-4 w-4" />}
              note="Estimated"
            />
            <CostBreakdownRow
              label="HOA Fees"
              amount={monthlyHOA}
              icon={<DollarSign className="h-4 w-4" />}
            />

            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Monthly</span>
                <span className="font-bold text-2xl text-primary">
                  {formatCurrency(totalMonthly)}
                </span>
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Home Price</span>
              <span className="font-semibold">{formatCurrency(price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Down Payment ({downPaymentPercent}%)</span>
              <span className="font-semibold">{formatCurrency(downPayment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Loan Amount</span>
              <span className="font-semibold">{formatCurrency(loanAmount)}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center mt-4">
            This calculator provides estimates only. Actual payments may vary. Consult with a lender for accurate figures.
          </p>
        </TabsContent>
      </Tabs>
    </Card>
  );
}

function CostBreakdownRow({
  label,
  amount,
  icon,
  note
}: {
  label: string;
  amount: number;
  icon: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="flex justify-between items-center py-3 px-4 bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="text-primary">{icon}</div>
        <div>
          <div className="font-medium">{label}</div>
          {note && <div className="text-xs text-muted-foreground">{note}</div>}
        </div>
      </div>
      <div className="font-bold">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0
        }).format(amount)}
      </div>
    </div>
  );
}
