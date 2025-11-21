"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Mail, Phone, MapPin, Pencil, Check, X, Smartphone, ChevronDown, ChevronUp } from "lucide-react";

interface ProfileData {
  name: string;
  headline: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  cellPhone: string;
  location: string;
  brokerage: string;
  license: string;
  experience: string;
  yearsExperience: string;
  photoUrl: string;
}

// Mock data - Sarah auto-filled this
const mockProfile: ProfileData = {
  name: "Sarah Mitchell",
  headline: "Luxury Home Specialist",
  title: "Sarasota Real Estate Expert",
  bio: "15+ years helping families find their dream homes on Florida's Gulf Coast.",
  email: "sarah.mitchell@realty.com",
  phone: "(941) 555-0123",
  cellPhone: "(941) 555-4567",
  location: "Sarasota, FL",
  brokerage: "Coastal Realty Group",
  license: "FL BK3284756",
  experience: "15+ years",
  yearsExperience: "15",
  photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
};

const ProfilePreview = () => {
  const [profile, setProfile] = useState<ProfileData>(mockProfile);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>("");

  const startEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const saveEdit = (field: keyof ProfileData) => {
    setProfile({ ...profile, [field]: tempValue });
    setEditingField(null);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setTempValue("");
  };

  return (
    <div className="space-y-6">
      {/* HERO: Lead Contact Number - THE most important thing */}
      <Card className="border-2 border-primary bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-1">
                Lead Contact Number
              </p>
              {editingField === "cellPhone" ? (
                <div className="flex gap-2 justify-center max-w-sm mx-auto">
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="text-2xl font-bold text-center"
                    autoFocus
                  />
                  <Button size="sm" onClick={() => saveEdit("cellPhone")}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={cancelEdit}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="cursor-pointer hover:text-primary transition-colors group inline-block"
                  onClick={() => startEdit("cellPhone", profile.cellPhone)}
                >
                  <p className="text-3xl md:text-4xl font-bold tracking-tight">
                    {profile.cellPhone}
                  </p>
                  <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity inline-block ml-2" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              This is where we'll text your leads. Make sure it's a number you check regularly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Profile Summary - Compact */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative group shrink-0">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile.photoUrl} alt={profile.name} className="object-cover" />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute -bottom-1 -right-1 rounded-full w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Pencil className="w-3 h-3" />
              </Button>
            </div>

            {/* Name and basic info */}
            <div className="flex-1 min-w-0">
              {editingField === "name" ? (
                <div className="flex gap-2">
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="font-semibold"
                    autoFocus
                  />
                  <Button size="sm" onClick={() => saveEdit("name")}>
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={cancelEdit}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div
                  className="cursor-pointer hover:text-primary transition-colors group"
                  onClick={() => startEdit("name", profile.name)}
                >
                  <h2 className="font-semibold text-lg truncate">
                    {profile.name}
                    <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity inline-block ml-2" />
                  </h2>
                </div>
              )}

              {/* Headline */}
              {editingField === "headline" ? (
                <div className="flex gap-2 mt-2">
                  <Input
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="h-7 text-sm"
                    placeholder="Luxury Home Specialist"
                    autoFocus
                  />
                  <Button size="sm" className="h-7" onClick={() => saveEdit("headline")}>
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-7" onClick={cancelEdit}>
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div
                  className="cursor-pointer hover:text-primary transition-colors group mt-1"
                  onClick={() => startEdit("headline", profile.headline)}
                >
                  <p className="text-sm text-muted-foreground">
                    {profile.headline}
                    <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity inline-block ml-2" />
                  </p>
                </div>
              )}

              {/* Years of Experience */}
              {profile.yearsExperience && (
                <>
                  {editingField === "yearsExperience" ? (
                    <div className="flex gap-2 mt-1">
                      <Input
                        value={tempValue}
                        onChange={(e) => setTempValue(e.target.value)}
                        className="h-7 text-sm"
                        placeholder="Years of experience"
                        autoFocus
                      />
                      <Button size="sm" className="h-7" onClick={() => saveEdit("yearsExperience")}>
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7" onClick={cancelEdit}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="cursor-pointer hover:text-primary transition-colors group"
                      onClick={() => startEdit("yearsExperience", profile.yearsExperience)}
                    >
                      <p className="text-sm text-muted-foreground">
                        {profile.yearsExperience}+ years of experience
                        <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity inline-block ml-2" />
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-4 pt-4 border-t space-y-4">
              {/* Email */}
              {editingField === "email" ? (
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button size="sm" className="h-8" onClick={() => saveEdit("email")}>
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8" onClick={cancelEdit}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-3 -m-3 transition-colors"
                  onClick={() => startEdit("email", profile.email)}
                >
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1 truncate">{profile.email}</span>
                  <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              )}

              {/* Cell Phone */}
              {editingField === "cellPhone" ? (
                <div className="flex items-center gap-3 text-sm">
                  <Smartphone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button size="sm" className="h-8" onClick={() => saveEdit("cellPhone")}>
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8" onClick={cancelEdit}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-3 -m-3 transition-colors"
                  onClick={() => startEdit("cellPhone", profile.cellPhone)}
                >
                  <Smartphone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1">{profile.cellPhone} <span className="text-muted-foreground">(Cell)</span></span>
                  <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              )}

              {/* Office Phone */}
              {editingField === "phone" ? (
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button size="sm" className="h-8" onClick={() => saveEdit("phone")}>
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8" onClick={cancelEdit}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-3 -m-3 transition-colors"
                  onClick={() => startEdit("phone", profile.phone)}
                >
                  <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1">{profile.phone} <span className="text-muted-foreground">(Office)</span></span>
                  <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              )}

              {/* Location */}
              {editingField === "location" ? (
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button size="sm" className="h-8" onClick={() => saveEdit("location")}>
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8" onClick={cancelEdit}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-3 -m-3 transition-colors"
                  onClick={() => startEdit("location", profile.location)}
                >
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1">{profile.location}</span>
                  <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              )}

              {/* Brokerage */}
              {editingField === "brokerage" ? (
                <div className="flex items-center gap-3 text-sm">
                  <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <div className="flex gap-2 flex-1">
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="h-8 text-sm"
                      autoFocus
                    />
                    <Button size="sm" className="h-8" onClick={() => saveEdit("brokerage")}>
                      <Check className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8" onClick={cancelEdit}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-3 -m-3 transition-colors"
                  onClick={() => startEdit("brokerage", profile.brokerage)}
                >
                  <Building2 className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="flex-1">{profile.brokerage}</span>
                  <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              )}
            </div>
        </CardContent>
      </Card>

      {/* Simple info note */}
      <p className="text-xs text-muted-foreground text-center">
        Profile auto-filled from your brokerage. Click any field to edit.
      </p>
    </div>
  );
};

export default ProfilePreview;
