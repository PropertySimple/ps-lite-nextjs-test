"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, KeyRound, Building2, Check } from "lucide-react";
import { useState } from "react";

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  questions: string[];
  instructions: string;
}

const templates: Template[] = [
  {
    id: "buyer",
    name: "Buyer Leads",
    description: "Optimized for home buyers looking to purchase property",
    icon: Home,
    questions: [
      "Are you pre-approved for a mortgage?",
      "What's your budget range?",
      "What areas are you interested in?",
      "How many bedrooms do you need?",
      "What's your ideal move-in timeline?"
    ],
    instructions: "Focus on understanding their budget, timeline, and must-have features. Be warm and helpful. Ask about pre-approval early to qualify serious buyers."
  },
  {
    id: "seller",
    name: "Seller Leads",
    description: "Designed for homeowners looking to list their property",
    icon: KeyRound,
    questions: [
      "What's the address of your property?",
      "When are you looking to sell?",
      "Have you worked with a realtor before?",
      "What's motivating your sale?",
      "Are you also looking to buy a new home?"
    ],
    instructions: "Be consultative and professional. Focus on their timeline and motivation. Emphasize your market expertise and marketing capabilities."
  },
  {
    id: "rental",
    name: "Rental Inquiries",
    description: "Tailored for renters seeking rental properties",
    icon: Building2,
    questions: [
      "What's your desired move-in date?",
      "What's your monthly budget?",
      "How many bedrooms do you need?",
      "Do you have pets?",
      "What areas are you considering?"
    ],
    instructions: "Be quick and efficient. Renters often contact multiple properties. Focus on availability, pricing, and scheduling viewings promptly."
  }
];

interface TemplateSelectorProps {
  onApplyTemplate: (template: Template) => void;
}

export const TemplateSelector = ({ onApplyTemplate }: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const handleApply = (template: Template) => {
    setSelectedTemplate(template.id);
    onApplyTemplate(template);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Templates</CardTitle>
        <CardDescription>
          Choose a pre-configured template to automatically set up qualifying questions and AI instructions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => {
            const Icon = template.icon;
            const isSelected = selectedTemplate === template.id;

            return (
              <Card
                key={template.id}
                className={`relative transition-all cursor-pointer hover:shadow-md ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    {isSelected && (
                      <Badge className="bg-green-500">
                        <Check className="w-3 h-3 mr-1" />
                        Applied
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base">{template.name}</CardTitle>
                  <CardDescription className="text-xs">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Includes {template.questions.length} qualifying questions
                    </p>
                  </div>
                  <Button
                    onClick={() => handleApply(template)}
                    variant={isSelected ? "outline" : "default"}
                    size="sm"
                    className="w-full"
                  >
                    {isSelected ? "Applied" : "Use Template"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
