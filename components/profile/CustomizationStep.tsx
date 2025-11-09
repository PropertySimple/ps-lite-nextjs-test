"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Upload, Palette, Image as ImageIcon, Search } from "lucide-react";
import { WizardStepProps } from "./types";

const CustomizationStep: React.FC<WizardStepProps> = ({ form }) => {
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null);
  const [showUnsplashSearch, setShowUnsplashSearch] = useState(false);

  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBackgroundImagePreview(result);
        form.setValue("backgroundImage", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const defaultColors = [
    "#f8fafc", // light gray
    "#1e293b", // dark blue
    "#059669", // green
    "#dc2626", // red
    "#7c3aed", // purple
    "#ea580c", // orange
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Profile Customization</h2>
        <p className="text-muted-foreground mt-1">
          Customize the visual appearance of your profile
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Background Color</CardTitle>
          <CardDescription>Choose a background color for your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="backgroundColor"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Background Color</FormLabel>
                <div className="space-y-4">
                  {/* Color Input */}
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input
                        type="color"
                        className="w-16 h-10 p-1 rounded border"
                        {...field}
                      />
                    </FormControl>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="#f8fafc"
                        className="font-mono"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  
                  {/* Preset Colors */}
                  <div className="flex gap-2 flex-wrap">
                    {defaultColors.map((color) => (
                      <button
                        key={color}
                        type="button"
                        className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        onClick={() => field.onChange(color)}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Background Image</CardTitle>
          <CardDescription>Add a background image to your profile</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Background Image Preview */}
          {backgroundImagePreview && (
            <div className="w-full h-32 border rounded-lg overflow-hidden bg-muted">
              <Image
                src={backgroundImagePreview}
                alt="Background preview"
                width={600}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Upload Options */}
          <div className="flex gap-3">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleBackgroundImageUpload}
                className="hidden"
                id="background-image"
              />
              <label
                htmlFor="background-image"
                className="inline-flex items-center gap-2 px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium cursor-pointer"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </label>
            </div>
            
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowUnsplashSearch(!showUnsplashSearch)}
              className="flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Browse Stock Photos
            </Button>
          </div>

          {/* Unsplash Search Placeholder */}
          {showUnsplashSearch && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground mb-3">Search for professional background images:</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Search for images..."
                  className="flex-1"
                />
                <Button type="button" size="sm">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Stock photo integration coming soon
              </p>
            </div>
          )}

          {/* Default background image if none selected */}
          {!backgroundImagePreview && (
            <div className="w-full h-32 border-2 border-dashed rounded-lg bg-muted flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No background image selected</p>
                <p className="text-xs text-muted-foreground">Upload an image or browse stock photos</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Live Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Preview
          </CardTitle>
          <CardDescription>See how your profile customization looks</CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="w-full h-24 rounded-lg border relative overflow-hidden"
            style={{ 
              backgroundColor: form.watch("backgroundColor"),
              backgroundImage: backgroundImagePreview ? `url(${backgroundImagePreview})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <p className="text-white text-sm font-medium">Profile Background Preview</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomizationStep;