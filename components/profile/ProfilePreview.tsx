"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, MapPin, Award, Pencil, Check, X } from "lucide-react";

interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  brokerage: string;
  license: string;
  experience: string;
  specialties: string[];
  photoUrl: string;
}

// Mock data - Sarah auto-filled this
const mockProfile: ProfileData = {
  name: "Sarah Mitchell",
  title: "Your Trusted Sarasota Real Estate Expert",
  bio: "With over 15 years of experience in the Sarasota real estate market, I specialize in helping families find their dream homes along Florida's Gulf Coast. My deep knowledge of local neighborhoods, market trends, and dedication to personalized service ensures you'll have a seamless home buying or selling experience.",
  email: "sarah.mitchell@realty.com",
  phone: "(941) 555-0123",
  location: "Sarasota, FL",
  brokerage: "Coastal Realty Group",
  license: "FL BK3284756",
  experience: "15+ years",
  specialties: ["Luxury Homes", "Waterfront Properties", "First-Time Buyers"],
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
      {/* Header Card - Photo, Name, Title */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative group">
              <Avatar className="w-32 h-32">
                <AvatarImage src={profile.photoUrl} alt={profile.name} className="object-cover" />
                <AvatarFallback>{profile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            </div>

            {/* Name and Title */}
            <div className="flex-1 space-y-4">
              {/* Name */}
              <div>
                {editingField === "name" ? (
                  <div className="flex gap-2">
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="text-2xl font-bold"
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
                    className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors group"
                    onClick={() => startEdit("name", profile.name)}
                  >
                    <h1 className="text-2xl md:text-3xl font-bold">{profile.name}</h1>
                    <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
              </div>

              {/* Title/Headline */}
              <div>
                {editingField === "title" ? (
                  <div className="flex gap-2">
                    <Input
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="text-lg"
                      autoFocus
                    />
                    <Button size="sm" onClick={() => saveEdit("title")}>
                      <Check className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={cancelEdit}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex items-start gap-2 cursor-pointer hover:text-primary transition-colors group"
                    onClick={() => startEdit("title", profile.title)}
                  >
                    <p className="text-lg text-muted-foreground flex-1">{profile.title}</p>
                    <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </div>
                )}
              </div>

              {/* Experience Badge */}
              <div>
                <Badge variant="secondary" className="text-sm">
                  <Award className="w-3 h-3 mr-1" />
                  {profile.experience} experience
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">About</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {editingField === "bio" ? (
              <div className="space-y-2">
                <Textarea
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  rows={5}
                  autoFocus
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveEdit("bio")}>
                    <Check className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="ghost" onClick={cancelEdit}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="cursor-pointer hover:bg-accent/50 rounded-lg p-3 -m-3 transition-colors group relative"
                onClick={() => startEdit("bio", profile.bio)}
              >
                <p className="text-muted-foreground leading-relaxed pr-8">{profile.bio}</p>
                <Pencil className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Contact & Professional Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact & Professional Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email */}
          {editingField === "email" ? (
            <div className="flex items-center gap-3 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">Email</span>
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
              className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors"
              onClick={() => startEdit("email", profile.email)}
            >
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">Email</span>
              <span className="font-medium flex-1">{profile.email}</span>
              <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Phone */}
          {editingField === "phone" ? (
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">Phone</span>
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
              className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors"
              onClick={() => startEdit("phone", profile.phone)}
            >
              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">Phone</span>
              <span className="font-medium flex-1">{profile.phone}</span>
              <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Location */}
          {editingField === "location" ? (
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">Location</span>
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
              className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors"
              onClick={() => startEdit("location", profile.location)}
            >
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">Location</span>
              <span className="font-medium flex-1">{profile.location}</span>
              <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* Brokerage */}
          {editingField === "brokerage" ? (
            <div className="flex items-center gap-3 text-sm">
              <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">Brokerage</span>
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
              className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors"
              onClick={() => startEdit("brokerage", profile.brokerage)}
            >
              <Building2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">Brokerage</span>
              <span className="font-medium flex-1">{profile.brokerage}</span>
              <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}

          {/* License */}
          {editingField === "license" ? (
            <div className="flex items-center gap-3 text-sm">
              <Award className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">License</span>
              <div className="flex gap-2 flex-1">
                <Input
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="h-8 text-sm"
                  autoFocus
                />
                <Button size="sm" className="h-8" onClick={() => saveEdit("license")}>
                  <Check className="w-3 h-3" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8" onClick={cancelEdit}>
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div
              className="group flex items-center gap-3 text-sm cursor-pointer hover:bg-accent/50 rounded-lg p-2 -m-2 transition-colors"
              onClick={() => startEdit("license", profile.license)}
            >
              <Award className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground min-w-[100px]">License</span>
              <span className="font-medium flex-1">{profile.license}</span>
              <Pencil className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Specialties */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Specialties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {profile.specialties.map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {specialty}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-900">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Sarah filled this out for you</strong> using information from your brokerage and listing history.
            Click any field to edit.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePreview;
