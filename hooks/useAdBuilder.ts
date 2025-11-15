
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import type { AdBuilderState, OpenHouseEvent } from "@/types/adBuilder";
import { campaignData } from "@/data/mockData";

/**
 * Custom hook for managing Ad Builder state and actions
 * Supports both creation mode (new campaigns) and edit mode (existing campaigns)
 *
 * Modes:
 * - Creation: No URL params - empty state for new campaign
 * - Edit: ?campaign=ID - loads existing campaign data
 */
export const useAdBuilder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignId = searchParams?.get("campaign");
  const isEditMode = !!campaignId;

  // Initialize state with default values - first photo pre-selected and starred
  const [state, setState] = useState<AdBuilderState>({
    selectedPhotos: [0],
    coverPhotoIndex: 0,
    adCopy: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    callToAction: "",
    openHouses: [],
    selectedActors: [0], // Pre-select first actor for new campaigns
    script: "Welcome to this stunning property! This beautiful home offers everything you've been looking for. With spacious rooms, modern amenities, and a perfect location, this is an opportunity you don't want to miss. Let me show you why this could be your dream home.",
    scriptReviewed: false,
    selectedMusicId: "upbeat-1",
    openStep: "step1",
    listings: [],
  });

  /**
   * Loads existing campaign data for editing
   * @param id - The campaign ID to load
   */
  const loadCampaignData = useCallback((id: string) => {
    // Get campaign from mock data
    const campaign = campaignData[id as keyof typeof campaignData];

    if (!campaign) {
      toast({
        title: "Campaign not found",
        description: "Could not load campaign data",
        variant: "destructive",
      });
      router.push("/campaigns");
      return;
    }

    // Populate state with existing campaign data
    setState({
      selectedPhotos: [0, 1, 2, 3, 4], // Mock: 5 photos selected
      coverPhotoIndex: 0,
      adCopy: "Discover your dream home at " + campaign.property + ". This stunning property offers modern living at its finest. Schedule your showing today!",
      callToAction: "book-showing",
      openHouses: [],
      selectedActors: [0], // Mock: First actor selected
      script: "Welcome to " + campaign.property + "! This beautiful home offers everything you've been looking for. With spacious rooms, modern amenities, and a perfect location, this is an opportunity you don't want to miss.",
      scriptReviewed: true,
      selectedMusicId: "upbeat-1",
      openStep: "step1", // Start with first step open in edit mode
      listings: [],
    });
  }, [router]);

  // Load existing campaign data in edit mode
  useEffect(() => {
    if (isEditMode && campaignId) {
      setTimeout(() => loadCampaignData(campaignId), 0);
    }
  }, [campaignId, isEditMode, loadCampaignData]);

  /**
   * Toggles photo selection state with 9-photo limit
   * @param index - The index of the photo to toggle
   */
  const handlePhotoSelect = (index: number) => {
    setState(prev => {
      const isCurrentlySelected = prev.selectedPhotos.includes(index);
      
      if (isCurrentlySelected) {
        // Deselecting - remove from selected photos and clear cover if it was the cover
        const newSelectedPhotos = prev.selectedPhotos.filter(i => i !== index);
        const newCoverPhotoIndex = prev.coverPhotoIndex === index 
          ? (newSelectedPhotos.length > 0 ? newSelectedPhotos[0] : null)
          : prev.coverPhotoIndex;
        
        return {
          ...prev,
          selectedPhotos: newSelectedPhotos,
          coverPhotoIndex: newCoverPhotoIndex
        };
      } else {
        // Selecting - check if we've reached the 9-photo limit
        if (prev.selectedPhotos.length >= 9) {
          return prev; // Don't allow selection if already at limit
        }
        
        const newSelectedPhotos = [...prev.selectedPhotos, index];
        const newCoverPhotoIndex = prev.coverPhotoIndex === null ? index : prev.coverPhotoIndex;
        
        return {
          ...prev,
          selectedPhotos: newSelectedPhotos,
          coverPhotoIndex: newCoverPhotoIndex
        };
      }
    });
  };

  /**
   * Sets a selected photo as the cover photo
   * @param index - The index of the photo to set as cover
   */
  const setCoverPhoto = (index: number) => {
    setState(prev => ({
      ...prev,
      coverPhotoIndex: index
    }));
  };

  /**
   * Handles actor selection - only one actor can be selected at a time
   * @param index - The index of the actor to select
   */
  const handleActorSelect = (index: number) => {
    setState(prev => ({
      ...prev,
      selectedActors: prev.selectedActors.includes(index) ? [] : [index]
    }));
  };

  /**
   * Updates the ad copy text
   * @param copy - The new ad copy text
   */
  const updateAdCopy = (copy: string) => {
    setState(prev => ({ ...prev, adCopy: copy }));
  };

  /**
   * Updates the call-to-action selection
   * @param cta - The new call-to-action value
   */
  const updateCallToAction = (cta: string) => {
    setState(prev => ({ ...prev, callToAction: cta }));
  };

  /**
   * Updates the open houses list
   * @param openHouses - The new open houses array
   */
  const updateOpenHouses = (openHouses: OpenHouseEvent[]) => {
    setState(prev => ({ ...prev, openHouses }));
  };

  /**
   * Updates the script content
   * @param script - The new script content
   */
  const updateScript = (script: string) => {
    setState(prev => ({ ...prev, script }));
  };

  /**
   * Updates the script review status
   * @param reviewed - Whether the script has been reviewed
   */
  const updateScriptReviewed = (reviewed: boolean) => {
    setState(prev => ({ ...prev, scriptReviewed: reviewed }));
  };

  /**
   * Updates the selected music track
   * @param musicId - The ID of the selected music track
   */
  const updateSelectedMusic = (musicId: string) => {
    setState(prev => ({ ...prev, selectedMusicId: musicId }));
  };

  /**
   * Updates the currently open accordion step
   * @param step - The step identifier to open
   */
  const setOpenStep = (step: string) => {
    setState(prev => ({ ...prev, openStep: step }));
  };

  /**
   * Adds or updates a listing
   * @param listing - The listing data to save
   */
  const saveListing = (listing: AdBuilderState["listings"][0]) => {
    setState(prev => {
      const existingIndex = prev.listings.findIndex(l => l.id === listing.id);
      if (existingIndex >= 0) {
        const newListings = [...prev.listings];
        newListings[existingIndex] = listing;
        return { ...prev, listings: newListings };
      }
      return { ...prev, listings: [...prev.listings, listing] };
    });
    
    toast({
      title: "Success!",
      description: listing.isDraft ? "Listing saved as draft" : "Listing saved successfully",
    });
  };

  /**
   * Deletes a listing
   * @param listingId - The ID of the listing to delete
   */
  const deleteListing = (listingId: string) => {
    setState(prev => ({
      ...prev,
      listings: prev.listings.filter(l => l.id !== listingId)
    }));
    
    toast({
      title: "Deleted",
      description: "Listing removed successfully",
    });
  };

  /**
   * Saves the campaign and navigates appropriately
   * In edit mode: updates existing campaign and returns to campaign detail
   * In create mode: creates new campaign and navigates to dashboard
   */
  const handleSave = () => {
    if (isEditMode && campaignId) {
      toast({
        title: "Changes saved!",
        description: "Your campaign has been updated successfully",
      });
      router.push(`/campaign-detail/${campaignId}`);
    } else {
      toast({
        title: "Campaign created!",
        description: "Your ad campaign has been created successfully",
      });
      router.push("/campaign-welcome/1"); // Mock campaign ID
    }
  };

  /**
   * Cancels editing and returns to previous page
   */
  const handleCancel = () => {
    if (isEditMode && campaignId) {
      router.push(`/campaign-detail/${campaignId}`);
    } else {
      router.push("/campaigns");
    }
  };

  return {
    state,
    isEditMode,
    campaignId,
    actions: {
      handlePhotoSelect,
      handleActorSelect,
      updateAdCopy,
      updateCallToAction,
      updateOpenHouses,
      updateScript,
      updateScriptReviewed,
      updateSelectedMusic,
      setOpenStep,
      handleSave,
      handleCancel,
      setCoverPhoto,
      saveListing,
      deleteListing,
    }
  };
};
