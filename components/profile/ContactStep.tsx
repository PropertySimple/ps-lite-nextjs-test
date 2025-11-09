import React from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Upload } from "lucide-react";
import { WizardStepProps } from "./types";

const ContactStep: React.FC<WizardStepProps> = ({
  form,
  headshot,
  setHeadshot,
  brokerageLogo,
  setBrokerageLogo,
  emailError,
}) => {
  const useLoginAsContact = form.watch("useLoginAsContact");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setHeadshot(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setBrokerageLogo(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Contact & Professional Info</h2>
        <p className="text-muted-foreground mt-1">
          Basic contact details and professional information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Login Email */}
          <FormField
            control={form.control}
            name="loginEmail"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Login Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your.email@example.com" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Email address used to log into your account
                </FormDescription>
                {emailError && (
                  <div className="text-sm text-destructive">
                    {emailError}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Use Login Email as Contact Toggle */}
          <FormField
            control={form.control}
            name="useLoginAsContact"
            render={({ field }: { field: any }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <FormLabel>Use login email for contact</FormLabel>
                  <FormDescription>
                    Use the same email for both login and contact purposes
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Contact Email - Conditional */}
          {!useLoginAsContact && (
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>Contact Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="contact@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Email address for client inquiries and communications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Professional Headshot & Logo */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Professional Headshot */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Professional Headshot</label>
                <div className="flex items-center gap-4">
                  {headshot ? (
                    <div className="w-16 h-16 border rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      <Image src={headshot} alt="Headshot" width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 border-2 border-dashed rounded-full bg-muted flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="headshot"
                    />
                    <label
                      htmlFor="headshot"
                      className="inline-flex items-center gap-2 px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </label>
                  </div>
                </div>
              </div>

              {/* Brokerage Logo */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Brokerage Logo</label>
                <div className="flex items-center gap-4">
                  {brokerageLogo ? (
                    <div className="w-16 h-16 border rounded-md overflow-hidden bg-muted flex items-center justify-center">
                      <Image src={brokerageLogo} alt="Logo" width={64} height={64} className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 border-2 border-dashed rounded-md bg-muted flex items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo"
                    />
                    <label
                      htmlFor="logo"
                      className="inline-flex items-center gap-2 px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Logo
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Details</CardTitle>
          <CardDescription>Your business and licensing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* License Number */}
          <FormField
            control={form.control}
            name="licenseNumber"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>License Number</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your license number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Brokerage Name */}
          <FormField
            control={form.control}
            name="brokerageName"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Brokerage Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your brokerage name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Business Address */}
          <FormField
            control={form.control}
            name="businessAddress"
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Business Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your business address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactStep;