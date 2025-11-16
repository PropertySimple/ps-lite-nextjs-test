'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { MessageCircle, CheckCircle, Loader2, Smartphone } from 'lucide-react';
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
  const [showTyping, setShowTyping] = useState(false);
  const [showSmsPreview, setShowSmsPreview] = useState(false);

  // Store timeout IDs for cleanup
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const smsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeouts on unmount or when success screen is closed
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      if (smsTimeoutRef.current) {
        clearTimeout(smsTimeoutRef.current);
      }
    };
  }, []);

  // Clear timeouts when success screen is closed
  useEffect(() => {
    if (!showSuccess) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      if (smsTimeoutRef.current) {
        clearTimeout(smsTimeoutRef.current);
        smsTimeoutRef.current = null;
      }
    }
  }, [showSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Clear any existing timeouts
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    if (smsTimeoutRef.current) clearTimeout(smsTimeoutRef.current);

    // Step 1: Show success
    setShowSuccess(true);

    // Step 2: Show typing indicator after 2s
    typingTimeoutRef.current = setTimeout(() => {
      setShowTyping(true);
    }, 2000);

    // Step 3: Show SMS preview after 12s total
    smsTimeoutRef.current = setTimeout(() => {
      setShowTyping(false);
      setShowSmsPreview(true);
    }, 12000);
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
          {!showSmsPreview ? (
            <>
              {/* Success State */}
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-success/10">
                  <CheckCircle className="h-12 w-12 text-success" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  {showTyping
                    ? "Sarah, Jessica's assistant, is texting you now..."
                    : "We received your message and are preparing a response"}
                </p>
              </div>

              {/* Typing Indicator */}
              {showTyping && (
                <div className="flex justify-center items-center gap-2 py-4">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground animate-pulse">
                    Sarah is typing
                  </span>
                </div>
              )}
            </>
          ) : (
            <>
              {/* SMS Preview */}
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-primary/10">
                  <Smartphone className="h-12 w-12 text-primary" />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-2">Check Your Phone!</h3>
                <p className="text-muted-foreground mb-4">
                  Sarah just sent you a text message
                </p>
              </div>

              {/* SMS Message Preview */}
              <div className="bg-muted/50 rounded-2xl p-6 text-left max-w-md mx-auto border-2 border-primary/20">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Sarah (Jessica&apos;s Assistant)</div>
                    <div className="text-xs text-muted-foreground">Just now</div>
                  </div>
                </div>
                <div className="bg-primary text-primary-foreground rounded-2xl rounded-tl-sm p-4 text-sm leading-relaxed">
                  Hi! This is Sarah, Jessica&apos;s assistant. I&apos;d love to help you see {address.street}!
                  I have openings Saturday at 2pm or 4pm, or Sunday at 11am. Which works best for you?
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Reply to Sarah&apos;s text to schedule your showing
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setShowSuccess(false);
                  setShowSmsPreview(false);
                }}
              >
                Send Another Message
              </Button>
            </>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 md:p-8 grain-texture">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Answers Instantly</h2>
        <p className="text-muted-foreground">
          Available 24/7 • You&apos;ll hear back instantly, even at 2am
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
          <span className="text-muted-foreground">Instant response guaranteed</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-muted-foreground">Available 24/7 - even on weekends</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="h-2 w-2 rounded-full bg-success" />
          <span className="text-muted-foreground">Your information is kept private</span>
        </div>
      </div>
    </Card>
  );
}
