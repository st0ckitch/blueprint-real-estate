import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContactDialogProps {
  children: React.ReactNode;
}

const ContactDialog = ({ children }: ContactDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const phoneNumber = "+995557123456";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "გმადლობთ!",
      description: "ჩვენ მალე დაგიკავშირდებით",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">დაგვიკავშირდით</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Phone Number */}
          <a 
            href={`tel:${phoneNumber}`}
            className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">დარეკეთ ახლავე</p>
              <p className="text-lg font-semibold text-foreground">{phoneNumber}</p>
            </div>
          </a>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">ან შეავსეთ ფორმა</span>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">სახელი</Label>
              <Input 
                id="name" 
                placeholder="თქვენი სახელი" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">ტელეფონი</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+995 XXX XX XX XX" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">ელ-ფოსტა</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="example@mail.com" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">შეტყობინება</Label>
              <Textarea 
                id="message" 
                placeholder="თქვენი შეტყობინება..." 
                rows={4}
                required 
              />
            </div>
            
            <Button type="submit" className="w-full">
              გაგზავნა
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
