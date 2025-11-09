"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { useState } from "react";

export const CustomInstructions = () => {
  const [instructions, setInstructions] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Custom Instructions
        </CardTitle>
        <CardDescription>
          Add specific details about your business that the AI should know. 
          For example: "I only work with buyers and sellers, not renters. If someone asks about rentals, politely let them know I don't handle those."
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Enter custom instructions for your AI assistant..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="min-h-[120px] resize-none"
        />
      </CardContent>
    </Card>
  );
};
