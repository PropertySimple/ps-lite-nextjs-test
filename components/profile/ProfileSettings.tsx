"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { logger } from "@/lib/logger";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User, Upload, Palette, Star, Wand2, Image as ImageIcon, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { profileFormSchema, type ProfileFormData, expertiseOptions } from "./types";

// NOTE: This component uses react-hook-form and @hookform/resolvers which are not installed.
// The component is kept for reference but is not currently used in the app.
// To use this component, install: npm install react-hook-form @hookform/resolvers

// Mock useForm hook for type checking
const useForm = <T extends Record<string, any>>(config: any) => {
  return {} as any;
};

// Mock zodResolver for type checking
const zodResolver = (schema: any) => (values: any) => ({});

const ProfileSettings = () => {
  const {
    toast
  } = useToast();
  const [headshot, setHeadshot] = useState<string | null>(null);
  const [brokerageLogo, setBrokerageLogo] = useState<string | null>(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "Sarah",
      lastName: "Johnson",
      phoneNumber: "(555) 123-4567",
      loginEmail: "sarah.johnson@example.com",
      contactEmail: "sarah.johnson@example.com",
      useLoginAsContact: true,
      licenseNumber: "",
      brokerageName: "",
      businessAddress: "",
      backgroundColor: "#f8fafc",
      backgroundImage: "",
      headline: "",
      bio: "",
      yearsExperience: 0,
      showYearsExperience: false,
      areasOfExpertise: [],
      primaryMarket: ""
    }
  });
  const useLoginAsContact = form.watch("useLoginAsContact");
  const contactEmail = form.watch("contactEmail");

  // Watch all form values for styling purposes
  const formValues = form.watch();

  // Helper function to determine if field is filled
  const isFieldFilled = (value: string | number | boolean | string[] | undefined) => {
    if (typeof value === 'string') return value.trim().length > 0;
    if (typeof value === 'number') return value > 0;
    if (Array.isArray(value)) return value.length > 0;
    return !!value;
  };

  // Helper component to render indicator for unfilled fields
  const UnfilledIndicator = ({ show }: { show: boolean }) => {
    if (!show) return null;
    return <AlertCircle className="h-4 w-4 text-amber-500 inline-block ml-1" />;
  };

  // Helper function to get input className based on filled state
  const getInputClassName = (fieldName: keyof ProfileFormData) => {
    const isFilled = isFieldFilled(formValues[fieldName]);
    return isFilled ? "bg-[hsl(var(--input-filled))] border-input" : "bg-[hsl(var(--input-empty))] border-input";
  };

  // Update login email when toggle is on and contact email changes
  useEffect(() => {
    if (useLoginAsContact && contactEmail) {
      form.setValue("loginEmail", contactEmail);
    }
  }, [useLoginAsContact, contactEmail, form]);

  // Mock function to check if email exists
  const checkEmailExists = async (email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return email === "existing@example.com";
  };
  const onSubmit = async (data: ProfileFormData) => {
    try {
      // Validate email if it has changed
      if (data.loginEmail) {
        const emailExists = await checkEmailExists(data.loginEmail);
        if (emailExists) {
          setEmailError("This email is already in use");
          return;
        }
      }
      setEmailError(null);
      logger.log("Profile data:", data);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully."
      });
    } catch (error) {
      logger.error("Profile update error:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  };
  const handleHeadshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setHeadshot(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBrokerageLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setBrokerageLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBackgroundImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        setBackgroundImagePreview(imageUrl);
        form.setValue("backgroundImage", imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const enhanceHeadlineWithAI = async () => {
    // Mock AI enhancement - replace with actual AI call
    const enhancedHeadlines = ["Your Trusted Real Estate Professional - Turning Dreams Into Keys", "Experienced Real Estate Expert - Making Home Dreams Reality", "Dedicated Real Estate Professional - Your Success Is My Priority", "Local Market Expert - Exceptional Service, Proven Results"];
    const randomHeadline = enhancedHeadlines[Math.floor(Math.random() * enhancedHeadlines.length)];
    form.setValue("headline", randomHeadline);
    toast({
      title: "Headline Enhanced",
      description: "Your professional headline has been enhanced with AI."
    });
  };
  const enhanceBioWithAI = async () => {
    // Mock AI enhancement - replace with actual AI call
    const enhancedBios = ["With years of dedicated experience in real estate, I pride myself on providing exceptional service and deep market knowledge to help my clients achieve their goals. Whether you're buying your first home or selling a cherished property, I'm committed to making your real estate journey smooth and successful.", "As a passionate real estate professional, I combine local market expertise with personalized service to deliver outstanding results for my clients. My commitment to excellence and attention to detail ensures that every transaction is handled with the utmost care and professionalism.", "I bring a unique blend of market knowledge, negotiation skills, and genuine care for my clients to every real estate transaction. My goal is to not just meet your expectations, but to exceed them while making the buying or selling process as seamless as possible."];
    const randomBio = enhancedBios[Math.floor(Math.random() * enhancedBios.length)];
    form.setValue("bio", randomBio);
    toast({
      title: "Bio Enhanced",
      description: "Your professional bio has been enhanced with AI."
    });
  };
  const gradientOptions = [{
    name: "Blue & Purple",
    value: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
    style: "linear-gradient(135deg, #3b82f6, #8b5cf6)"
  }, {
    name: "Pink & Purple",
    value: "linear-gradient(135deg, #ec4899, #8b5cf6)",
    style: "linear-gradient(135deg, #ec4899, #8b5cf6)"
  }, {
    name: "Yellow & Orange",
    value: "linear-gradient(135deg, #fbbf24, #f97316)",
    style: "linear-gradient(135deg, #fbbf24, #f97316)"
  }, {
    name: "Shadow",
    value: "linear-gradient(135deg, #000000, transparent)",
    style: "linear-gradient(135deg, #000000, transparent)"
  }];
  return <Form {...form}>
      <form id="profile-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Accordion type="single" collapsible defaultValue="contact-info" className="space-y-4">
          {/* Contact & Professional Info Section */}
          <AccordionItem value="contact-info">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardHeader className="p-0 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Info
                  </CardTitle>
                  <CardDescription className="text-left">
                    Your basic contact information and professional details
                  </CardDescription>
                </CardHeader>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0 space-y-6">
                  {/* Professional Headshot & Logo */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Professional Headshot */}
                      <div className="space-y-2">
                        <Label>Professional Headshot</Label>
                        <div className="flex items-center gap-4">
                          <Avatar className="h-20 w-20">
                            {headshot ? <AvatarImage src={headshot} alt="Professional headshot" /> : <AvatarFallback>
                                <User className="h-10 w-10" />
                              </AvatarFallback>}
                          </Avatar>
                          <div>
                            <input type="file" accept="image/*" onChange={handleHeadshotUpload} className="hidden" id="headshot-upload" />
                            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById("headshot-upload")?.click()}>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Photo
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Brokerage Logo */}
                      <div className="space-y-2">
                        <Label>Brokerage Logo</Label>
                        <div className="flex items-center gap-4">
                          <div className="h-20 w-20 border-2 border-dashed border-muted-foreground/25 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                            {brokerageLogo ? <Image src={brokerageLogo} alt="Brokerage logo" width={80} height={80} className="h-full w-full object-contain" /> : <Upload className="h-8 w-8 text-muted-foreground" />}
                          </div>
                          <div>
                            <input type="file" accept="image/*" onChange={handleBrokerageLogoUpload} className="hidden" id="logo-upload" />
                            <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById("logo-upload")?.click()}>
                              <Upload className="h-4 w-4 mr-2" />
                              Upload Logo
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({
                    field
                  }: { field: any }) => <FormItem>
                          <FormLabel>
                            First Name *
                            <UnfilledIndicator show={!isFieldFilled(formValues.firstName)} />
                          </FormLabel>
                           <FormControl>
                             <Input placeholder="Enter your first name" className={getInputClassName("firstName")} {...field} />
                           </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    <FormField control={form.control} name="lastName" render={({
                    field
                  }: { field: any }) => <FormItem>
                          <FormLabel>
                            Last Name *
                            <UnfilledIndicator show={!isFieldFilled(formValues.lastName)} />
                          </FormLabel>
                           <FormControl>
                             <Input placeholder="Enter your last name" className={getInputClassName("lastName")} {...field} />
                           </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField control={form.control} name="contactEmail" render={({
                      field
                    }: { field: any }) => <FormItem>
                            <FormLabel>
                              Contact Email *
                              <UnfilledIndicator show={!isFieldFilled(formValues.contactEmail)} />
                            </FormLabel>
                             <FormControl>
                               <Input placeholder="your@email.com" className={getInputClassName("contactEmail")} {...field} />
                             </FormControl>
                            <FormDescription>
                              Email address for client inquiries and communications
                            </FormDescription>
                            <FormMessage />
                          </FormItem>} />
                      <FormField control={form.control} name="phoneNumber" render={({
                      field
                    }: { field: any }) => <FormItem>
                            <FormLabel>
                              Phone Number
                              <UnfilledIndicator show={!isFieldFilled(formValues.phoneNumber)} />
                            </FormLabel>
                             <FormControl>
                               <Input placeholder="(555) 123-4567" className={getInputClassName("phoneNumber")} {...field} />
                             </FormControl>
                            <FormMessage />
                          </FormItem>} />
                    </div>

                    {/* Use Contact Email as Login Toggle */}
                    <FormField control={form.control} name="useLoginAsContact" render={({
                    field
                  }: { field: any }) => <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                          <div className="space-y-0.5">
                            <FormLabel>Use my contact email as my login email</FormLabel>
                            <FormDescription>
                              Use the same email for both contact and login purposes
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>} />

                    {/* Login Email - Conditional */}
                    {!form.watch("useLoginAsContact") && <FormField control={form.control} name="loginEmail" render={({
                    field
                  }: { field: any }) => <FormItem>
                            <FormLabel>
                              Login Email *
                              <UnfilledIndicator show={!isFieldFilled(formValues.loginEmail)} />
                            </FormLabel>
                             <FormControl>
                               <Input type="email" placeholder="login@example.com" className={getInputClassName("loginEmail")} {...field} />
                             </FormControl>
                            <FormDescription>
                              Email address used to log into your account
                            </FormDescription>
                            {emailError && <FormMessage>{emailError}</FormMessage>}
                            <FormMessage />
                          </FormItem>} />}
                  </div>

                  {/* Professional Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="licenseNumber" render={({
                    field
                  }: { field: any }) => <FormItem>
                          <FormLabel>
                            License Number
                            <UnfilledIndicator show={!isFieldFilled(formValues.licenseNumber)} />
                          </FormLabel>
                           <FormControl>
                             <Input placeholder="RE123456" className={getInputClassName("licenseNumber")} {...field} />
                           </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    <FormField control={form.control} name="brokerageName" render={({
                    field
                  }: { field: any }) => <FormItem>
                          <FormLabel>
                            Brokerage Name *
                            <UnfilledIndicator show={!isFieldFilled(formValues.brokerageName)} />
                          </FormLabel>
                           <FormControl>
                             <Input placeholder="Your Brokerage Name" className={getInputClassName("brokerageName")} {...field} />
                           </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>

                  <FormField control={form.control} name="businessAddress" render={({
                  field
                }: { field: any }) => <FormItem>
                        <FormLabel>
                          Business Address
                          <UnfilledIndicator show={!isFieldFilled(formValues.businessAddress)} />
                        </FormLabel>
                         <FormControl>
                           <Input placeholder="123 Main St, City, State 12345" className={getInputClassName("businessAddress")} {...field} />
                         </FormControl>
                        <FormMessage />
                      </FormItem>} />
                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Personal Branding Section */}
          <AccordionItem value="branding">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardHeader className="p-0 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Professional Info
                  </CardTitle>
                  <CardDescription className="text-left">
                    Showcase your expertise and professional experience
                  </CardDescription>
                </CardHeader>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0 space-y-6">
                  {/* Professional Headline */}
                   <FormField control={form.control} name="headline" render={({
                  field
                }: { field: any }) => <FormItem>
                         <div className="flex items-center justify-between">
                           <FormLabel>
                             Professional Headline
                             <UnfilledIndicator show={!isFieldFilled(formValues.headline)} />
                           </FormLabel>
                           <Button type="button" variant="outline" size="sm" onClick={enhanceHeadlineWithAI} className="gap-2 h-7 text-xs">
                             <Wand2 className="h-3 w-3" />
                             Enhance with AI
                           </Button>
                         </div>
                         <FormControl>
                            <Input placeholder="e.g., Your Trusted Real Estate Professional" className={getInputClassName("headline")} {...field} />
                         </FormControl>
                         <FormDescription>
                           A short, compelling tagline that describes your expertise
                         </FormDescription>
                         <FormMessage />
                       </FormItem>} />

                   {/* Bio */}
                   <FormField control={form.control} name="bio" render={({
                  field
                }: { field: any }) => <FormItem>
                         <div className="flex items-center justify-between">
                           <FormLabel>
                             Professional Bio
                             <UnfilledIndicator show={!isFieldFilled(formValues.bio)} />
                           </FormLabel>
                           <Button type="button" variant="outline" size="sm" onClick={enhanceBioWithAI} className="gap-2 h-7 text-xs">
                             <Wand2 className="h-3 w-3" />
                             Enhance with AI
                           </Button>
                         </div>
                         <FormControl>
                            <Textarea placeholder="Tell potential clients about your experience, approach, and what makes you unique..." className={`min-h-[100px] ${getInputClassName("bio")}`} {...field} />
                         </FormControl>
                         <FormDescription>
                           Share your story and what sets you apart (max 500 characters)
                         </FormDescription>
                         <FormMessage />
                       </FormItem>} />

                   {/* Years Experience */}
                  <div className="space-y-4">
                    <FormField control={form.control} name="showYearsExperience" render={({
                    field
                  }: { field: any }) => <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Display Years of Experience
                            </FormLabel>
                             <FormDescription>
                               Show your experience level to potential clients (*Visible on your website with a Website Plan.)
                             </FormDescription>
                          </div>
                          <FormControl>
                            <Switch checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                        </FormItem>} />

                    {form.watch("showYearsExperience") && <FormField control={form.control} name="yearsExperience" render={({
                    field
                  }: { field: any }) => <FormItem>
                            <FormLabel>
                              Years of Experience
                              <UnfilledIndicator show={!isFieldFilled(formValues.yearsExperience)} />
                            </FormLabel>
                            <FormControl>
                               <Input type="number" min="0" max="50" className={getInputClassName("yearsExperience")} {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>} />}
                  </div>

                  {/* Areas of Expertise */}
                  <FormField control={form.control} name="areasOfExpertise" render={() => <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">Areas of Expertise</FormLabel>
                          <FormDescription>Select up to 3 areas that best describe your specialties� (*Visible on your website with a Website Plan.)</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {expertiseOptions.map(item => <FormField key={item} control={form.control} name="areasOfExpertise" render={({
                      field
                    }: { field: any }) => {
                      return <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox checked={field.value?.includes(item)} onCheckedChange={checked => {
                            const current = field.value || [];
                            if (checked) {
                              if (current.length < 3) {
                                field.onChange([...current, item]);
                              }
                            } else {
                              field.onChange(current.filter((value: any) => value !== item));
                            }
                          }} disabled={!field.value?.includes(item) && (field.value?.length || 0) >= 3} />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {item}
                                    </FormLabel>
                                  </FormItem>;
                    }} />)}
                        </div>
                        <FormMessage />
                      </FormItem>} />

                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>

          {/* Profile Customization Section */}
          <AccordionItem value="customization">
            <Card>
              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                <CardHeader className="p-0 space-y-0">
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Branding
                  </CardTitle>
                  <CardDescription className="text-left">
                    Customize your free public profile's visual appearance
                  </CardDescription>
                </CardHeader>
              </AccordionTrigger>
              <AccordionContent>
                <CardContent className="pt-0 space-y-6">
                  {/* Background Color */}
                  <FormField control={form.control} name="backgroundColor" render={({
                  field
                }: { field: any }) => <FormItem>
                        <FormLabel>Select a Background Color</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <div className="grid grid-cols-4 gap-2">
                              {gradientOptions.map(gradient => <button key={gradient.name} type="button" className={`h-10 w-full rounded-lg border-2 transition-all hover:scale-105 ${field.value === gradient.value ? "border-primary shadow-md" : "border-muted-foreground/20 hover:border-foreground"}`} style={{
                          background: gradient.style
                        }} onClick={() => field.onChange(gradient.value)} />)}
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                  {/* Background Image */}
                  <FormField control={form.control} name="backgroundImage" render={({
                  field
                }: { field: any }) => <FormItem>
                        <FormLabel>Background Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                              {backgroundImagePreview ? <div className="relative w-full h-32 rounded overflow-hidden">
                                  <Image src={backgroundImagePreview} alt="Background preview" width={600} height={200} className="w-full h-full object-cover" />
                                  {form.watch("backgroundColor") && <div className="absolute inset-0 opacity-60" style={{
                            background: form.watch("backgroundColor")
                          }} />}
                                </div> : <div className="text-center">
                                  <div className="mx-auto h-12 w-12 text-muted-foreground">
                                    <Upload className="h-full w-full" />
                                  </div>
                                  <p className="mt-2 text-sm text-muted-foreground">
                                    No image selected
                                  </p>
                                </div>}
                            </div>
                            <div className="flex gap-2">
                              <input type="file" accept="image/*" onChange={handleBackgroundImageUpload} className="hidden" id="background-upload" />
                              <Button type="button" variant="outline" onClick={() => document.getElementById("background-upload")?.click()}>
                                <Upload className="h-4 w-4 mr-2" />
                                Upload Image
                              </Button>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>} />

                </CardContent>
              </AccordionContent>
            </Card>
          </AccordionItem>
        </Accordion>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Save Profile
          </Button>
        </div>
      </form>
    </Form>;
};
export default ProfileSettings;