'use client';

import { useState, FormEvent } from 'react';
import { MessageCircle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface ListingContactFormProps {
  address: {
    street: string;
    city: string;
  };
  agentName: string;
}

export function ListingContactForm({ address, agentName }: ListingContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I'm interested in ${address.street}, ${address.city}. When can I schedule a showing?`
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (showSuccess) {
    return (
      <Card className="p-8 grain-texture">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-success/10">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
            <p className="text-muted-foreground">
              {agentName} will contact you shortly about {address.street}
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            Check your email and phone for a response
          </div>

          <Button
            variant="outline"
            onClick={() => setShowSuccess(false)}
          >
            Send Another Message
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 grain-texture">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Contact {agentName}</h2>
        <p className="text-muted-foreground">
          Ask about this property or schedule a showing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Smith"
            className="h-11"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              className="h-11"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell us what you're looking for..."
            className="resize-none"
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-12 text-lg bg-primary hover:bg-primary/90 gap-2"
          >
            <MessageCircle className="h-5 w-5" />
            Send Message
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-3">
            By submitting, you agree to be contacted by {agentName} via call, text, and email.
          </p>
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-muted-foreground">Fast response time</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-muted-foreground">Your information is kept private</span>
        </div>
      </div>
    </Card>
  );
}
