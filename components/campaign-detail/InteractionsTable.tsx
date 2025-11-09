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
import { useRouter } from "next/navigation";

const interactionsData = [
  {
    id: 1,
    name: "Emily Rodriguez",
    interaction: "Requested Info",
    details: "Lead Captured",
    date: "10/23/2025",
    platform: "Facebook",
  },
  {
    id: 2,
    name: "Mike Chen",
    interaction: "Requested Info",
    details: "Lead Captured",
    date: "10/23/2025",
    platform: "Instagram",
  },
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
    interaction: "Interaction",
    details: "Like",
    date: "10/22/2025",
    platform: "Instagram",
  },
];

const InteractionsTable = () => {
  const router = useRouter();

  const handleMoreInfo = (interactionId: number) => {
    router.push(`/contact/${interactionId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactions</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead className="min-w-[120px]">Name</TableHead>
                <TableHead className="min-w-[100px]">Interaction</TableHead>
                <TableHead className="min-w-[150px]">Details</TableHead>
                <TableHead className="w-[100px]">Date</TableHead>
                <TableHead className="w-[100px]">Platform</TableHead>
                <TableHead className="text-right w-[100px]">More Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interactionsData.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell className="font-medium">{interaction.id}</TableCell>
                  <TableCell className="font-medium">{interaction.name}</TableCell>
                  <TableCell>{interaction.interaction}</TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    {interaction.details}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {interaction.date}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      interaction.platform === 'Facebook' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                    }`}>
                      {interaction.platform}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleMoreInfo(interaction.id)}
                    >
                      <span className="hidden sm:inline">More Info</span>
                      <span className="sm:hidden">Info</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InteractionsTable;
