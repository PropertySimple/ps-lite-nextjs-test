"use client";

import React, { useState } from "react";
// NOTE: Temporarily providing mock implementations for react-hook-form and @hookform/resolvers
// These are not installed but are needed by this component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useForm = <T extends Record<string, any>>(config: any) => {
  return {} as any;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const zodResolver = (schema: any) => (values: any) => ({});

import { logger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { profileFormSchema, ProfileFormData } from "./types";
import ContactStep from "./ContactStep";
import CustomizationStep from "./CustomizationStep";
import BrandingStep from "./BrandingStep";

const ProfileWizard = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [headshot, setHeadshot] = useState<string | null>(null);
  const [brokerageLogo, setBrokerageLogo] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const totalSteps = 3;

  // Mock function to simulate checking if email is already in use
  const checkEmailExists = async (email: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const existingEmails = ["admin@example.com", "test@example.com", "user@propertysimple.com"];
    return existingEmails.includes(email.toLowerCase());
  };

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "Lee",
      lastName: "Moore",
      phoneNumber: "(555) 123-4567",
      loginEmail: "lee.moore@propertysimple.com",
      contactEmail: "lee.moore@propertysimple.com", 
      useLoginAsContact: true,
      licenseNumber: "",
      brokerageName: "Leamani Home Sales",
      businessAddress: "",
      backgroundColor: "#f8fafc",
      backgroundImage: "",
      headline: "",
      bio: "I am committed to helping you navigate the housing market with ease. With extensive knowledge of local neighborhoods and a passion for client satisfaction, I am here to assist you in buying or selling your home.",
      yearsExperience: 8,
      showYearsExperience: true,
      areasOfExpertise: ["Seller Agent", "First Time Buyers", "Income Properties"],
      primaryMarket: "San Francisco, CA",
    },
  });

  const useLoginAsContact = form.watch("useLoginAsContact");
  const loginEmail = form.watch("loginEmail");

  // Update contact email when toggle is on and login email changes
  React.useEffect(() => {
    if (useLoginAsContact && loginEmail) {
      form.setValue("contactEmail", loginEmail);
    }
  }, [useLoginAsContact, loginEmail, form]);

  const onSubmit = async (values: ProfileFormData) => {
    setEmailError(null);
    
    try {
      // Check if login email is already in use
      const emailExists = await checkEmailExists(values.loginEmail);
      if (emailExists) {
        setEmailError("This email address is already in use. Please choose a different email.");
        toast({
          title: "Email Already in Use",
          description: "Please choose a different email address.",
          variant: "destructive",
        });
        setCurrentStep(1);
        return;
      }

      // Check contact email if it's different from login email
      if (!values.useLoginAsContact && values.contactEmail && values.contactEmail !== values.loginEmail) {
        const contactEmailExists = await checkEmailExists(values.contactEmail);
        if (contactEmailExists) {
          setEmailError("This contact email address is already in use. Please choose a different email.");
          toast({
            title: "Contact Email Already in Use",
            description: "Please choose a different contact email address.",
            variant: "destructive",
          });
          setCurrentStep(1);
          return;
        }
      }

      logger.log(values);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    } catch (_error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof ProfileFormData)[] = [];
    
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["firstName", "lastName", "loginEmail", "brokerageName"];
        if (!useLoginAsContact) {
          fieldsToValidate.push("contactEmail");
        }
        break;
      case 2:
        fieldsToValidate = ["backgroundColor"];
        break;
      case 3:
        fieldsToValidate = ["areasOfExpertise"];
        break;
    }

    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    const stepProps = {
      form,
      headshot,
      setHeadshot,
      brokerageLogo,
      setBrokerageLogo,
      emailError,
      checkEmailExists,
    };

    switch (currentStep) {
      case 1:
        return <ContactStep {...stepProps} />;
      case 2:
        return <CustomizationStep {...stepProps} />;
      case 3:
        return <BrandingStep {...stepProps} />;
      default:
        return <ContactStep {...stepProps} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              onClick={() => goToStep(step)}
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                step <= currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {step < currentStep ? <Check className="h-4 w-4" /> : step}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Contact Info</span>
          <span>Customization</span>
          <span>Branding</span>
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {renderStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex items-center gap-2"
              >
                <Check className="h-4 w-4" />
                Save Profile
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileWizard;