"use client";


import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Phone, Mail, Globe, Facebook, Megaphone, Upload, MapPin, ChevronUp, ChevronDown, ArrowUpDown, CheckCircle, XCircle, Trash2 } from "lucide-react";
import ContactsPagination from "./ContactsPagination";
import { mockLeads, type Lead } from "@/data/mockLeads";
import { formatDistanceToNow } from "date-fns";

interface ContactsTableProps {
  searchQuery: string;
  managedByFilter: string;
  sourceFilter: string;
  statusFilter: string;
  onFilteredCountChange?: (filteredCount: number, totalCount: number) => void;
}

const ContactsTable = ({ searchQuery, managedByFilter, sourceFilter, statusFilter, onFilteredCountChange }: ContactsTableProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<string | null>('lastContact');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [mounted, setMounted] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  const allContacts: Lead[] = mockLeads;

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "Website":
        return Globe;
      case "Social Media":
        return Facebook;
      case "Ad":
        return Megaphone;
      case "Imported":
        return Upload;
      case "ZIP Code":
        return MapPin;
      default:
        return Globe;
    }
  };

  const _getStatusIcon = (status: string) => {
    switch (status) {
      case "Subscribed":
        return CheckCircle;
      case "Deleted":
        return XCircle;
      case "Blocked":
        return Trash2;
      default:
        return CheckCircle;
    }
  };

  const _getStatusColor = (status: string) => {
    switch (status) {
      case "Subscribed":
        return "text-green-600";
      case "Deleted":
        return "text-yellow-600";
      case "Blocked":
        return "text-red-600";
      default:
        return "text-green-600";
    }
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return ArrowUpDown;
    return sortDirection === 'asc' ? ChevronUp : ChevronDown;
  };

  const getManagedByColor = (managedBy: string) => {
    switch (managedBy) {
      case "AI Concierge":
        return "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300";
      case "You":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-300";
    }
  };

  // Filter contacts based on search query, managed by filter, source filter, and status filter
  const filteredContacts = allContacts.filter((contact) => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.phone.includes(searchQuery);
    
    const matchesManagedBy = managedByFilter === "All" || contact.managedBy === managedByFilter;
    
    const matchesSource = sourceFilter === "All" || contact.source === sourceFilter;
    
    const matchesStatus = statusFilter === "All" || contact.status === statusFilter;
    
    return matchesSearch && matchesManagedBy && matchesSource && matchesStatus;
  });

  // Sort contacts
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    if (!sortField) return 0;

    let aValue: string | number;
    let bValue: string | number;

    switch (sortField) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'lastContact':
        aValue = new Date(a.lastContact).getTime();
        bValue = new Date(b.lastContact).getTime();
        break;
      case 'managedBy':
        aValue = a.managedBy.toLowerCase();
        bValue = b.managedBy.toLowerCase();
        break;
      case 'status':
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentContacts = sortedContacts.slice(startIndex, endIndex);

  // Notify parent component of filtered count changes
  useEffect(() => {
    if (onFilteredCountChange) {
      onFilteredCountChange(sortedContacts.length, allContacts.length);
    }
  }, [sortedContacts.length, allContacts.length, onFilteredCountChange]);


  return (
    <div className="space-y-4">
      {/* Responsive Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">
              <Button 
                variant="ghost"
                onClick={() => handleSort('name')}
                className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground justify-start"
              >
                Name
                {React.createElement(getSortIcon('name'), { className: "h-4 w-4 ml-2" })}
              </Button>
            </TableHead>
            <TableHead className="hidden lg:table-cell w-[140px]">
              <Button 
                variant="ghost"
                onClick={() => handleSort('managedBy')}
                className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground justify-start"
              >
                Managed By
                {React.createElement(getSortIcon('managedBy'), { className: "h-4 w-4 ml-2" })}
              </Button>
            </TableHead>
            <TableHead className="hidden xl:table-cell w-[80px]">Last Message</TableHead>
            <TableHead className="hidden xl:table-cell w-[200px]">Source</TableHead>
            <TableHead className="hidden md:table-cell w-[120px]">
              <Button 
                variant="ghost"
                onClick={() => handleSort('lastContact')}
                className="h-auto p-0 font-medium text-muted-foreground hover:text-foreground justify-start"
              >
                Last Activity
                {React.createElement(getSortIcon('lastContact'), { className: "h-4 w-4 ml-2" })}
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell w-[120px]">Drip Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentContacts.map((contact) => (
            <TableRow 
              key={contact.id} 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => router.push(`/contact/${contact.id}`)}
            >
              <TableCell className="font-medium">
                <div className="space-y-1">
                  <div>{contact.name}</div>
                  {/* Show compact info on mobile/tablet */}
                  <div className="xl:hidden space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="truncate max-w-[150px]">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{contact.phone}</span>
                    </div>
                    <div className="lg:hidden">
                      <Badge className={`text-xs ${getManagedByColor(contact.managedBy)}`}>
                        {contact.managedBy}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden lg:table-cell">
                <Badge className={getManagedByColor(contact.managedBy)}>
                  {contact.managedBy}
                </Badge>
              </TableCell>
              <TableCell className="hidden xl:table-cell text-sm">
                <div className="flex items-start gap-2">
                  {contact.lastMessageSender === "Contact" && contact.managedBy === "You" && (
                    <div className="flex-shrink-0 mt-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  )}
                  <span className={contact.lastMessageSender === "Contact" && contact.managedBy === "You" ? "font-semibold text-foreground truncate block" : "text-muted-foreground truncate block"}>
                    {contact.lastMessage.length > 45 ? contact.lastMessage.slice(0, 45) + '...' : contact.lastMessage}
                  </span>
                </div>
              </TableCell>
              <TableCell className="hidden xl:table-cell text-sm">
                <div className="flex items-center gap-2">
                  {(() => {
                    const SourceIcon = getSourceIcon(contact.source);
                    return <SourceIcon className="h-4 w-4 text-muted-foreground" />;
                  })()}
                  <span>{contact.source}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                {mounted ? formatDistanceToNow(new Date(contact.lastContact), { addSuffix: true }) : '—'}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {contact.source === "Imported" || contact.managedBy === "You" ? (
                  <Badge variant="outline" className="text-muted-foreground">
                    Not Enrolled
                  </Badge>
                ) : contact.lastMessageSender === "Contact" ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300">
                    Responded
                  </Badge>
                ) : (
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    Active
                  </Badge>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Show "No contacts found" message when filtered results are empty */}
      {currentContacts.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>No contacts found matching your search.</p>
        </div>
      )}

      {/* Pagination */}
      {sortedContacts.length > 0 && (
        <div className="px-4 lg:px-6 pb-6">
          <ContactsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={sortedContacts.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </div>
  );
};

export default ContactsTable;
