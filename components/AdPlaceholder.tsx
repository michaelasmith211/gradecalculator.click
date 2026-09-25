import React from "react";

interface AdPlaceholderProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "leaderboard";
  className?: string;
}

export default function AdPlaceholder({
  slotId = "default-ad-slot",
  format = "horizontal",
  className = "",
}: AdPlaceholderProps) {
  // Suppress empty dummy boxes when no live ad code is active to maintain clean UI and comply with Google quality guidelines
  return null;
}

