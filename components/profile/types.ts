import * as z from "zod/v4";

// Mock type for react-hook-form (not installed in this project)
export type UseFormReturn<T extends Record<string, any> = {}> = any;

export const profileFormSchema = z.object({
  // Contact & Professional Info (Step 1)
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
  loginEmail: z.string().email("Please enter a valid email address"),
  contactEmail: z.string().email("Please enter a valid email address").optional(),
  useLoginAsContact: z.boolean().default(true),
  licenseNumber: z.string().optional(),
  brokerageName: z.string().min(1, "Brokerage name is required"),
  businessAddress: z.string().optional(),
  
  // Profile Customization (Step 2)
  backgroundColor: z.string().default("#f8fafc"), // default light gray
  backgroundImage: z.string().optional(),
  
  // Personal Branding (Step 3)
  headline: z.string().optional(),
  bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
  yearsExperience: z.number().min(0).max(50).default(0),
  showYearsExperience: z.boolean().default(false),
  areasOfExpertise: z.array(z.string()).max(3, "Select up to 3 areas of expertise"),
  primaryMarket: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

export const expertiseOptions = [
  "Seller Agent",
  "Buyer Agent", 
  "High-Volume Agent",
  "First Time Buyers",
  "Luxury Homes", 
  "Income Properties",
  "Leases",
  "New Builds",
  "Vacation Rentals",
  "Commercial Properties",
  "Condos"
];

export interface WizardStepProps {
  form: UseFormReturn<ProfileFormData>;
  headshot: string | null;
  setHeadshot: (url: string | null) => void;
  brokerageLogo: string | null;
  setBrokerageLogo: (url: string | null) => void;
  emailError: string | null;
  checkEmailExists: (email: string) => Promise<boolean>;
}