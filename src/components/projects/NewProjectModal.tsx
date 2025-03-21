
import React, { useState } from "react";
import { 
  Image as ImageIcon, 
  Calendar as CalendarIcon,
  Clipboard
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DraggableModal from "@/components/ui/draggable-modal";

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: {
    title: string;
    description: string;
    startDate: string;
    dueDate: string;
    thumbnail?: string;
  }) => void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject
}) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: t("error"),
        description: t("projectTitleRequired"),
        variant: "destructive"
      });
      return;
    }
    
    if (!dueDate) {
      toast({
        title: t("error"),
        description: t("projectDueDateRequired"),
        variant: "destructive"
      });
      return;
    }
    
    // Create new project
    onCreateProject({
      title,
      description,
      startDate,
      dueDate,
      thumbnail: thumbnailUrl || undefined
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setStartDate(new Date().toISOString().split('T')[0]);
    setDueDate("");
    setThumbnailUrl("");
    
    // Close modal
    onClose();
    
    // Show success message
    toast({
      title: t("success"),
      description: t("projectCreatedSuccess")
    });
  };
  
  // Calculate minimum due date (start date or today)
  const minDueDate = startDate || new Date().toISOString().split('T')[0];
  
  return (
    <DraggableModal
      isOpen={isOpen}
      onClose={onClose}
      title={t("newProject")}
      width="max-w-md"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("projectTitle")} *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("projectTitlePlaceholder")}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">{t("projectDescription")}</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t("projectDescriptionPlaceholder")}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">{t("startDate")}</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="start-date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="due-date">{t("dueDate")} *</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="due-date"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={minDueDate}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="thumbnail">{t("projectThumbnail")}</Label>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="thumbnail"
                type="url"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder={t("projectThumbnailUrlPlaceholder")}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            {t("cancel")}
          </Button>
          <Button
            type="submit"
            variant="gradient"
          >
            <Clipboard className="mr-2" />
            {t("createProject")}
          </Button>
        </div>
      </form>
    </DraggableModal>
  );
};

export default NewProjectModal;
