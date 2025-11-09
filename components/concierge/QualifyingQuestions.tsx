"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GripVertical, Plus, X } from "lucide-react";
import { useState } from "react";

interface Question {
  id: string;
  text: string;
}

export const QualifyingQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { id: "1", text: "What is your name?" },
    { id: "2", text: "Are you looking to buy or sell?" },
    { id: "3", text: "What is your budget?" },
    { id: "4", text: "Which neighborhood are you interested in?" },
    { id: "5", text: "What is your email address?" },
  ]);
  const [newQuestion, setNewQuestion] = useState("");

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, { id: Date.now().toString(), text: newQuestion }]);
      setNewQuestion("");
    }
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Qualifying Questions</CardTitle>
        <CardDescription>
          The AI will try to answer these questions in order of priority. 
          Drag to reorder from most to least important. The AI may not get to all questions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center">
                {index + 1}
              </span>
              <span className="flex-1 text-sm">{question.text}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(question.id)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Add custom qualifying question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addQuestion()}
          />
          <Button onClick={addQuestion} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
