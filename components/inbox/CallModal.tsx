import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { toast } from "sonner";

interface CallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  phoneNumber: string;
  onStartCall?: () => void;
}

export const CallModal = ({
  open,
  onOpenChange,
  contactName,
  phoneNumber,
  onStartCall,
}: CallModalProps) => {
  const handleStartCall = () => {
    toast("Call Started", {
      description: `Calling ${contactName}...`
    });
    onOpenChange(false);
    onStartCall?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Call {contactName}</DialogTitle>
          <DialogDescription>
            {phoneNumber}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-8 space-y-6">
          <div className="h-24 w-24 rounded-full flex items-center justify-center bg-primary">
            <Phone className="h-12 w-12 text-white" />
          </div>
          
          <div className="text-center">
            <p className="text-lg font-medium">{contactName}</p>
            <p className="text-sm text-muted-foreground">Ready to call</p>
          </div>

          <Button
            onClick={handleStartCall}
            size="lg"
            className="gap-2 w-full"
          >
            <Phone className="h-5 w-5" />
            Start Call
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
