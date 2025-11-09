"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { BasicRichTextEditor } from "@/components/ui/basic-rich-text-editor";
import { ListingData, School } from "@/types/adBuilder";
import { ImagePlus, X, Star, Plus, ArrowLeft, Save } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ListingDetailsFormProps {
  initialData?: Partial<ListingData>;
  onSubmit: (data: ListingData) => void;
  onBack: () => void;
  onDelete?: () => void;
}

export const ListingDetailsForm = ({ initialData, onSubmit, onBack, onDelete }: ListingDetailsFormProps) => {
  const [formData, setFormData] = useState<ListingData>({
    id: initialData?.id || crypto.randomUUID(),
    isDraft: initialData?.isDraft ?? true,
    status: initialData?.status || "Active",
    listingType: initialData?.listingType || "For Sale",
    isManuallyCreated: initialData?.isManuallyCreated ?? true,
    images: initialData?.images || [],
    primaryImageIndex: initialData?.primaryImageIndex || 0,
    address: initialData?.address || { street: "", city: "", state: "", zip: "" },
    price: initialData?.price || 0,
    propertyType: initialData?.propertyType || "Single Family",
    mlsNumber: initialData?.mlsNumber || "",
    bedrooms: initialData?.bedrooms || 0,
    bathrooms: initialData?.bathrooms || 0,
    squareFeet: initialData?.squareFeet || 0,
    lotSize: initialData?.lotSize || 0,
    lotSizeUnit: initialData?.lotSizeUnit || "sqft",
    yearBuilt: initialData?.yearBuilt || new Date().getFullYear(),
    stories: initialData?.stories || 1,
    garageSpaces: initialData?.garageSpaces || 0,
    features: initialData?.features || {
      pool: false,
      spa: false,
      fireplace: false,
      centralAC: false,
      hardwoodFloors: false,
      updatedKitchen: false,
      updatedBathrooms: false,
      smartHome: false,
      hasHOA: false,
      gatedCommunity: false,
      waterfront: false,
    },
    description: initialData?.description || "",
    schools: initialData?.schools || [],
    hoaFees: initialData?.hoaFees,
    propertyTax: initialData?.propertyTax,
    daysOnMarket: initialData?.daysOnMarket,
    heating: initialData?.heating,
    cooling: initialData?.cooling,
    parking: initialData?.parking,
  });

  const [newSchool, setNewSchool] = useState<Partial<School>>({
    name: "",
    type: "Elementary",
    distance: "",
    rating: undefined,
  });

  const handleSaveDraft = () => {
    onSubmit({ ...formData, isDraft: true });
  };

  const handleSaveActive = () => {
    onSubmit({ ...formData, isDraft: false });
  };

  const addSchool = () => {
    if (newSchool.name && newSchool.distance) {
      setFormData({
        ...formData,
        schools: [
          ...formData.schools,
          {
            id: Date.now().toString(),
            name: newSchool.name,
            type: newSchool.type as School["type"],
            distance: newSchool.distance,
            rating: newSchool.rating,
          },
        ],
      });
      setNewSchool({ name: "", type: "Elementary", distance: "", rating: undefined });
    }
  };

  const removeSchool = (id: string) => {
    setFormData({
      ...formData,
      schools: formData.schools.filter((school) => school.id !== id),
    });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center gap-2 p-4 sm:p-6 pb-4 border-b flex-shrink-0">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h3 className="font-semibold">Edit Listing Details</h3>
          <p className="text-xs sm:text-sm text-muted-foreground">Review and update your listing information</p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 sm:p-6">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="basic" className="text-xs sm:text-sm">Basic</TabsTrigger>
              <TabsTrigger value="details" className="text-xs sm:text-sm">Details</TabsTrigger>
              <TabsTrigger value="features" className="text-xs sm:text-sm">Features</TabsTrigger>
              <TabsTrigger value="description" className="text-xs sm:text-sm">Description</TabsTrigger>
              <TabsTrigger value="additional" className="text-xs sm:text-sm">Additional</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6">
              {/* Photo Gallery */}
              <Card>
                <CardContent className="pt-6">
                  <Label className="text-base mb-4 block">Photo Gallery</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="relative aspect-video border rounded-lg overflow-hidden">
                        <Image src={img} alt={`Listing ${idx + 1}`} width={400} height={300} className="w-full h-full object-cover" unoptimized={img.startsWith("http")} />
                        {idx === formData.primaryImageIndex && (
                          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                    <button className="aspect-video border-2 border-dashed rounded-lg flex items-center justify-center hover:border-primary transition-colors">
                      <div className="text-center">
                        <ImagePlus className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Add Photo</p>
                      </div>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Address */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <Label className="text-base">Address</Label>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={formData.address.street}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, street: e.target.value } })}
                        placeholder="123 Main St"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.address.city}
                          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.address.state}
                          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                          placeholder="CA"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP</Label>
                        <Input
                          id="zip"
                          value={formData.address.zip}
                          onChange={(e) => setFormData({ ...formData, address: { ...formData.address, zip: e.target.value } })}
                          placeholder="90210"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price & Type */}
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                        placeholder="500000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="propertyType">Property Type</Label>
                      <Select
                        value={formData.propertyType}
                        onValueChange={(value: string) => setFormData({ ...formData, propertyType: value as ListingData["propertyType"] })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Single Family">Single Family</SelectItem>
                          <SelectItem value="Condo">Condo</SelectItem>
                          <SelectItem value="Townhouse">Townhouse</SelectItem>
                          <SelectItem value="Multi-Family">Multi-Family</SelectItem>
                          <SelectItem value="Land">Land</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Listing Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value: string) => setFormData({ ...formData, status: value as ListingData["status"] })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="listingType">Listing Type</Label>
                      <Select
                        value={formData.listingType}
                        onValueChange={(value: string) => setFormData({ ...formData, listingType: value as ListingData["listingType"] })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="For Sale">For Sale</SelectItem>
                          <SelectItem value="For Rent">For Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="mlsNumber">MLS Number</Label>
                    <Input
                      id="mlsNumber"
                      value={formData.mlsNumber}
                      onChange={(e) => setFormData({ ...formData, mlsNumber: e.target.value })}
                      placeholder="MLS-123456"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Property Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Input
                        id="bedrooms"
                        type="number"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Input
                        id="bathrooms"
                        type="number"
                        step="0.5"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="squareFeet">Square Feet</Label>
                      <Input
                        id="squareFeet"
                        type="number"
                        value={formData.squareFeet}
                        onChange={(e) => setFormData({ ...formData, squareFeet: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lotSize">Lot Size</Label>
                      <div className="flex gap-2">
                        <Input
                          id="lotSize"
                          type="number"
                          value={formData.lotSize}
                          onChange={(e) => setFormData({ ...formData, lotSize: Number(e.target.value) })}
                          className="flex-1"
                        />
                        <Select
                          value={formData.lotSizeUnit}
                          onValueChange={(value: string) => setFormData({ ...formData, lotSizeUnit: value as "sqft" | "acres" })}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sqft">sq ft</SelectItem>
                            <SelectItem value="acres">acres</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="yearBuilt">Year Built</Label>
                      <Input
                        id="yearBuilt"
                        type="number"
                        value={formData.yearBuilt}
                        onChange={(e) => setFormData({ ...formData, yearBuilt: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stories">Stories</Label>
                      <Input
                        id="stories"
                        type="number"
                        value={formData.stories}
                        onChange={(e) => setFormData({ ...formData, stories: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="garageSpaces">Garage Spaces</Label>
                      <Input
                        id="garageSpaces"
                        type="number"
                        value={formData.garageSpaces}
                        onChange={(e) => setFormData({ ...formData, garageSpaces: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Features & Amenities Tab */}
            <TabsContent value="features" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <Label className="text-base mb-4 block">Features & Amenities</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(formData.features).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Checkbox
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) =>
                            setFormData({
                              ...formData,
                              features: { ...formData.features, [key]: checked },
                            })
                          }
                        />
                        <Label htmlFor={key} className="text-sm font-normal cursor-pointer">
                          {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </Label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Schools */}
              <Card>
                <CardContent className="pt-6">
                  <Label className="text-base mb-4 block">Nearby Schools</Label>
                  <div className="space-y-3">
                    {formData.schools.map((school) => (
                      <div key={school.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{school.name}</span>
                            {school.rating && (
                              <div className="flex items-center gap-1 text-xs">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span>{school.rating}/10</span>
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {school.type} • {school.distance}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeSchool(school.id)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <div className="grid grid-cols-12 gap-2 mt-4">
                      <Input
                        placeholder="School Name"
                        value={newSchool.name}
                        onChange={(e) => setNewSchool({ ...newSchool, name: e.target.value })}
                        className="col-span-4"
                      />
                      <Select
                        value={newSchool.type}
                        onValueChange={(value: string) => setNewSchool({ ...newSchool, type: value as School["type"] })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Elementary">Elementary</SelectItem>
                          <SelectItem value="Middle">Middle</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        placeholder="Distance"
                        value={newSchool.distance}
                        onChange={(e) => setNewSchool({ ...newSchool, distance: e.target.value })}
                        className="col-span-2"
                      />
                      <Input
                        type="number"
                        placeholder="Rating"
                        value={newSchool.rating || ""}
                        onChange={(e) => setNewSchool({ ...newSchool, rating: Number(e.target.value) || undefined })}
                        className="col-span-2"
                      />
                      <Button onClick={addSchool} size="sm" className="col-span-1">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Description Tab */}
            <TabsContent value="description" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <Label className="text-base mb-4 block">Listing Description</Label>
                  <BasicRichTextEditor
                    value={formData.description}
                    onChange={(value) => setFormData({ ...formData, description: value })}
                    placeholder="Enter a detailed description of the property..."
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    {formData.description.length} characters
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Additional Information Tab */}
            <TabsContent value="additional" className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hoaFees">HOA Fees (Monthly)</Label>
                      <Input
                        id="hoaFees"
                        type="number"
                        value={formData.hoaFees || ""}
                        onChange={(e) => setFormData({ ...formData, hoaFees: Number(e.target.value) || undefined })}
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <Label htmlFor="propertyTax">Property Tax (Annual)</Label>
                      <Input
                        id="propertyTax"
                        type="number"
                        value={formData.propertyTax || ""}
                        onChange={(e) => setFormData({ ...formData, propertyTax: Number(e.target.value) || undefined })}
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <Label htmlFor="daysOnMarket">Days on Market</Label>
                      <Input
                        id="daysOnMarket"
                        type="number"
                        value={formData.daysOnMarket || ""}
                        onChange={(e) => setFormData({ ...formData, daysOnMarket: Number(e.target.value) || undefined })}
                        placeholder="Optional"
                      />
                    </div>
                    <div>
                      <Label htmlFor="heating">Heating</Label>
                      <Input
                        id="heating"
                        value={formData.heating || ""}
                        onChange={(e) => setFormData({ ...formData, heating: e.target.value })}
                        placeholder="e.g., Central, Gas"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cooling">Cooling</Label>
                      <Input
                        id="cooling"
                        value={formData.cooling || ""}
                        onChange={(e) => setFormData({ ...formData, cooling: e.target.value })}
                        placeholder="e.g., Central A/C"
                      />
                    </div>
                    <div>
                      <Label htmlFor="parking">Parking Details</Label>
                      <Input
                        id="parking"
                        value={formData.parking || ""}
                        onChange={(e) => setFormData({ ...formData, parking: e.target.value })}
                        placeholder="e.g., 2-car garage, driveway"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {/* Sticky Footer */}
      <div className="border-t p-3 sm:p-4 bg-background flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-2">
          <div className="flex gap-2 order-2 sm:order-1">
            <Button variant="outline" onClick={handleSaveDraft} className="gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            {onDelete && (
              <Button variant="destructive" onClick={onDelete} className="gap-2">
                <X className="w-4 h-4" />
                Delete
              </Button>
            )}
          </div>
          <Button onClick={handleSaveActive} className="gap-2 order-1 sm:order-2">
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
