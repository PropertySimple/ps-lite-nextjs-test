import { format, formatDistanceToNow, isAfter, subHours } from "date-fns";

/**
 * Formats a timestamp intelligently:
 * - If >24 hours ago: "Dec 15, 2:30 PM"
 * - If <24 hours ago: "3h ago"
 */
export function formatTime(timestamp: string | Date): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  const now = new Date();
  const twentyFourHoursAgo = subHours(now, 24);

  if (isAfter(date, twentyFourHoursAgo)) {
    // Less than 24 hours ago - show relative time
    return formatDistanceToNow(date, { addSuffix: true });
  } else {
    // More than 24 hours ago - show formatted date
    return format(date, "MMM d, h:mm a");
  }
}
