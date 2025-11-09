"use client";


import { useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContactsTable from "@/components/contacts/ContactsTable";
import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/layout/PageHeader";
import { LeadImportModal } from "@/components/concierge/LeadImportModal";
import { Search, Upload, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Contacts = memo(() => {
  const [searchQuery, setSearchQuery] = useState("");
  const [managedByFilter, setManagedByFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [importModalOpen, setImportModalOpen] = useState(false);

  const managedByOptions = ["All", "AI Concierge", "You"];
  const sourceOptions = ["All", "Website", "Social Media", "Ad", "Imported", "ZIP Code"];
  const statusOptions = ["All", "Subscribed", "Deleted", "Blocked"];

  const headerActions = (
    <Button className="gap-2" onClick={() => setImportModalOpen(true)}>
      <Upload className="w-4 h-4" />
      <span className="hidden sm:inline">Import Leads</span>
      <span className="sm:hidden">Import</span>
    </Button>
  );

  return (
    <PageLayout headerActions={headerActions}>
      <PageHeader
        title="Contacts"
        description="All your leads in one place. AI automatically handles initial conversations for contacts in 'AI Concierge' mode, escalating only when you're needed."
      />

      <div className="border-t border-border my-8" />

      <div className="space-y-6">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between lg:items-center mb-4">
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
              aria-label="Search contacts"
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <span className="truncate">Managed: {managedByFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {managedByOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setManagedByFilter(option)}
                    className={managedByFilter === option ? "bg-accent" : ""}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <span className="truncate">Source: {sourceFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {sourceOptions.map((source) => (
                  <DropdownMenuItem
                    key={source}
                    onClick={() => setSourceFilter(source)}
                    className={sourceFilter === source ? "bg-accent" : ""}
                  >
                    {source}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-10">
                  <span className="truncate">Status: {statusFilter}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {statusOptions.map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={statusFilter === status ? "bg-accent" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Card>
          <ContactsTable searchQuery={searchQuery} managedByFilter={managedByFilter} sourceFilter={sourceFilter} statusFilter={statusFilter} />
        </Card>

        <LeadImportModal open={importModalOpen} onOpenChange={setImportModalOpen} />
      </div>
    </PageLayout>
  );
});

Contacts.displayName = "Contacts";

export default Contacts;
