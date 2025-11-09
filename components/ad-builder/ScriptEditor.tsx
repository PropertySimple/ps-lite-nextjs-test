
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Play } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ScriptEditorProps {
  /** Current script content */
  script: string;
  /** Whether script has been reviewed */
  scriptReviewed: boolean;
  /** Callback when script content changes */
  onScriptChange: (script: string) => void;
  /** Callback when script review status changes */
  onScriptReviewChange: (reviewed: boolean) => void;
}

/**
 * Script editor component with preview and AI improvement functionality
 */
const ScriptEditor = ({ 
  script, 
  scriptReviewed, 
  onScriptChange, 
  onScriptReviewChange 
}: ScriptEditorProps) => {
  /**
   * Handles script preview functionality
   * Currently shows a toast notification - can be extended with actual audio preview
   */
  const handlePreviewScript = () => {
    toast({
      title: "Script Preview",
      description: "Playing script preview..."
    });
  };

  /**
   * Handles AI script improvement functionality
   * Currently shows a toast notification - can be extended with actual AI integration
   */
  const handleImproveWithAI = () => {
    toast({
      title: "AI Improvement",
      description: "Improving script with AI..."
    });
  };

  /**
   * Handles the checkbox state change for script review
   * Converts the CheckedState type to boolean
   */
  const handleScriptReviewChange = (checked: boolean | "indeterminate") => {
    onScriptReviewChange(checked === true);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Script</h3>
      <Textarea 
        value={script} 
        onChange={e => onScriptChange(e.target.value)} 
        className="min-h-32" 
        placeholder="Enter your script here..." 
      />
      
      <div className="flex flex-col sm:flex-row gap-2">
        <Button variant="outline" size="sm" onClick={handlePreviewScript} className="gap-2 w-full">
          <Play className="w-4 h-4" />
          <span className="hidden sm:inline">Preview script in actor's voice</span>
          <span className="sm:hidden">Preview script</span>
        </Button>
        <Button variant="outline" size="sm" onClick={handleImproveWithAI} className="w-full">
          Improve with AI
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
        Please listen to your entire script to ensure correct pronunciation.
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="reviewed" 
          checked={scriptReviewed} 
          onCheckedChange={handleScriptReviewChange} 
        />
        <label htmlFor="reviewed" className="text-sm">
          I have listened to and approve the script.
        </label>
      </div>
    </div>
  );
};

export default ScriptEditor;
