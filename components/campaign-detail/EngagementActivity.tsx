"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const engagementData = [
  {
    id: 3,
    name: "John Johnson",
    interaction: "Comment",
    details: "What's the HOA?",
    date: "10/22/2025",
    platform: "Facebook",
  },
  {
    id: 4,
    name: "Sarah Frost",
    interaction: "Comment",
    details: "Nice place!",
    date: "10/22/2025",
    platform: "Instagram",
  },
  {
    id: 5,
    name: "Jeff Fisher",
    interaction: "Like",
    details: "Liked the post",
    date: "10/22/2025",
    platform: "Instagram",
  },
];

const EngagementActivity = () => {
  const router = useRouter();

  const handleViewDetails = (interactionId: number) => {
    router.push(`/contact/${interactionId}`);
  };

  // Count different types of engagement
  const commentCount = engagementData.filter(e => e.interaction === "Comment").length;
  const likeCount = engagementData.filter(e => e.interaction === "Like").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="text-base sm:text-lg">Engagement Activity</CardTitle>
            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary">
                {commentCount} Comment{commentCount !== 1 ? 's' : ''}
              </Badge>
              <Badge variant="secondary">
                {likeCount} Like{likeCount !== 1 ? 's' : ''}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      {(
        <CardContent className="p-0">
          <div className="relative w-full overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Name</TableHead>
                  <TableHead className="min-w-[150px]">Message</TableHead>
                  <TableHead className="w-[100px] hidden sm:table-cell">Platform</TableHead>
                  <TableHead className="w-[100px] hidden md:table-cell">Date</TableHead>
                  <TableHead className="text-right w-[120px] hidden md:table-cell">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {engagementData.map((engagement) => (
                  <TableRow key={engagement.id}>
                    <TableCell className="font-medium">
                      <div>
                        <div className="flex items-center gap-1">
                          {engagement.interaction === "Comment" && (
                            <MessageCircle className="h-3 w-3 text-muted-foreground" />
                          )}
                          <span>{engagement.name}</span>
                        </div>
                        <div className="text-xs text-muted-foreground md:hidden mt-1">
                          {engagement.date}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={engagement.interaction === "Comment" ? "font-medium" : "text-muted-foreground"}>
                        {engagement.details}
                      </div>
                      {engagement.interaction === "Comment" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(engagement.id)}
                          className="md:hidden mt-1 h-7 text-xs px-2"
                        >
                          Reply
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        engagement.platform === 'Facebook'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                      }`}>
                        {engagement.platform}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm hidden md:table-cell">
                      {engagement.date}
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell">
                      {engagement.interaction === "Comment" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(engagement.id)}
                        >
                          Reply
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default EngagementActivity;
