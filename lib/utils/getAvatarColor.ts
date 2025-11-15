/**
 * Generates a consistent HSL color for an avatar based on a name
 * Uses a simple hash to ensure the same name always gets the same color
 */
export function getAvatarColor(name: string): string {
  // Simple string hash function
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to hue (0-360)
  const hue = Math.abs(hash % 360);

  // Use consistent saturation and lightness for pleasant colors
  // Saturation: 45-65% for muted but vibrant colors
  // Lightness: 45-55% for good contrast with white text
  const saturation = 45 + (Math.abs(hash) % 20);
  const lightness = 45 + (Math.abs(hash >> 8) % 10);

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
