import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { WizardStepProps, expertiseOptions } from "./types";

const BrandingStep: React.FC<WizardStepProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">Personal Branding</h2>
        <p className="text-muted-foreground mt-1">
          Showcase your expertise and experience to potential clients
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Headline</CardTitle>
          <CardDescription>A short, catchy line that describes what you do</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="headline"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Headline</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Helping families find their dream homes in San Francisco"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Keep it short and memorable - this appears prominently on your profile
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Bio</CardTitle>
          <CardDescription>Tell potential clients about your experience and approach</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="bio"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell potential clients about your experience and approach..."
                    className="resize-none min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Maximum 500 characters ({field.value?.length || 0}/500)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Experience & Market</CardTitle>
          <CardDescription>Your professional background and area of focus</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary Market */}
          <FormField
            control={form.control}
            name="primaryMarket"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render={({ field }: { field: any }) => (
              <FormItem>
                <FormLabel>Primary Market</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Years Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="yearsExperience"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render={({ field }: { field: any }) => (
                <FormItem className="space-y-3 rounded-lg border p-3">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="8"
                      min="0"
                      max="50"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="showYearsExperience"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render={({ field }: { field: any }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Display on Profile</FormLabel>
                    <FormDescription>
                      Show experience level publicly
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Areas of Expertise</CardTitle>
          <CardDescription>Select 1-3 areas that best represent your specialties</CardDescription>
        </CardHeader>
        <CardContent>
          <FormField
            control={form.control}
            name="areasOfExpertise"
            render={() => (
              <FormItem>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {expertiseOptions.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="areasOfExpertise"
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      render={({ field }: { field: any }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        field.value?.filter(
                                          (value: any) => value !== item
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BrandingStep;