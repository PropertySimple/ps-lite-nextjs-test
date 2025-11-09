"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link2, Database } from "lucide-react";
import { toast } from "sonner";

interface LeadImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LeadImportModal = ({ open, onOpenChange }: LeadImportModalProps) => {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
    }
  };

  const handleCsvImport = () => {
    if (!csvFile) {
      toast.error("Please select a CSV file");
      return;
    }
    toast.success(`Importing leads from ${csvFile.name}...`);
    onOpenChange(false);
  };

  const handleWebhookConnect = () => {
    if (!webhookUrl) {
      toast.error("Please enter a webhook URL");
      return;
    }
    toast.success("Webhook connected successfully");
    onOpenChange(false);
  };

  const handlePortalConnect = () => {
    if (!apiKey) {
      toast.error("Please enter an API key");
      return;
    }
    toast.success("Property portal connected successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Leads</DialogTitle>
          <DialogDescription>
            Connect your lead sources to automatically capture and import leads
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="csv" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="csv">
              <Upload className="h-4 w-4 mr-2" />
              CSV Upload
            </TabsTrigger>
            <TabsTrigger value="webhook">
              <Link2 className="h-4 w-4 mr-2" />
              Web Forms
            </TabsTrigger>
            <TabsTrigger value="portal">
              <Database className="h-4 w-4 mr-2" />
              Portals
            </TabsTrigger>
          </TabsList>

          <TabsContent value="csv" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="csv-file">Upload CSV File</Label>
              <Input
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleCsvUpload}
              />
              <p className="text-sm text-muted-foreground">
                CSV should include: Name, Email, Phone, Source, Property Interest (optional)
              </p>
            </div>
            {csvFile && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">Selected file: {csvFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(csvFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            )}
            <Button onClick={handleCsvImport} className="w-full">
              Import Leads
            </Button>
          </TabsContent>

          <TabsContent value="webhook" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                placeholder="https://your-website.com/form-handler"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Connect your website contact forms to automatically capture leads
              </p>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              <p className="text-sm font-medium">How it works:</p>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                <li>Copy your webhook URL</li>
                <li>Add it to your website form settings</li>
                <li>Leads will automatically sync to your dashboard</li>
              </ol>
            </div>
            <Button onClick={handleWebhookConnect} className="w-full">
              Connect Webhook
            </Button>
          </TabsContent>

          <TabsContent value="portal" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="portal-select">Property Portal</Label>
              <select
                id="portal-select"
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a portal</option>
                <option value="zillow">Zillow</option>
                <option value="realtor">Realtor.com</option>
                <option value="redfin">Redfin</option>
                <option value="trulia">Trulia</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">API Key</Label>
              <Input
                id="api-key"
                type="password"
                placeholder="Enter your API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Connect to property portals to automatically import leads
              </p>
            </div>
            <Button onClick={handlePortalConnect} className="w-full">
              Connect Portal
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
