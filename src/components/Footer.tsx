import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";
import { useTranslation } from 'react-i18next';
import logoFull from "@/assets/logo-full.svg";

const contactSchema = z.object({
  name: z.string().trim().min(2, "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო").max(100, "სახელი უნდა იყოს მაქსიმუმ 100 სიმბოლო"),
  email: z.string().trim().email("არასწორი ელ. ფოსტის ფორმატი").max(255, "ელ. ფოსტა უნდა იყოს მაქსიმუმ 255 სიმბოლო"),
  message: z.string().trim().min(10, "შეტყობინება უნდა იყოს მინიმუმ 10 სიმბოლო").max(1000, "შეტყობინება უნდა იყოს მაქსიმუმ 1000 სიმბოლო")
});
const Footer = () => {
  const { t } = useTranslation();
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    try {
      const validated = contactSchema.parse(formData);

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "წარმატებით გაიგზავნა",
        description: "მალე დაგიკავშირდებით"
      });
      setFormData({
        name: "",
        email: "",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0].toString()] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  return <footer className="bg-accent/5 border-t border-border/50">
      <div className="max-w-[1200px] mx-auto px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <img src={logoFull} alt="MODX" className="h-8 dark:invert" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="space-y-2">
              <a href="tel:+995557123456" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group" aria-label="დარეკეთ ნომერზე +995 557 123 456">
                <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>+995 557 123 456</span>
              </a>
              <a href="mailto:info@modex.ge" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors group" aria-label="გამოგვიგზავნეთ ელ. ფოსტა info@modex.ge">
                <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>info@modex.ge</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>ვაჟა-ფშაველას გამზირი 45, თბილისი</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">{t('footer.quickLinks')}</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transition-transform">
                {t('footer.home')}
              </Link>
              <Link to="/projects/saburtalo" className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transition-transform">
                {t('footer.projects')}
              </Link>
              <Link to="/renders" className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transition-transform">
                {t('footer.renders')}
              </Link>
              <Link to="/blog" className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transition-transform">
                {t('footer.blog')}
              </Link>
            </nav>
          </div>

          {/* Project Locations */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">{t('footer.locations')}</h4>
            <nav className="space-y-2">
              <Link to="/projects/saburtalo" className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transition-transform">
                {t('footer.saburthalo')}
              </Link>
              <Link to="/projects/gldani" className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transition-transform">
                {t('footer.gldani')}
              </Link>
              <Link to="/projects/varketili" className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transition-transform">
                {t('footer.varketili')}
              </Link>
              <Link to="/projects/mtskheta" className="block text-sm text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transition-transform">
                {t('footer.mtskheta')}
              </Link>
            </nav>
          </div>

          {/* Contact Form */}
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wider">{t('footer.contactUs')}</h4>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Input type="text" name="name" placeholder={t('footer.yourName')} value={formData.name} onChange={handleChange} className={errors.name ? "border-destructive" : ""} aria-label="სახელი" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
                {errors.name && <p id="name-error" className="text-xs text-destructive mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Input type="email" name="email" placeholder={t('footer.yourEmail')} value={formData.email} onChange={handleChange} className={errors.email ? "border-destructive" : ""} aria-label="ელექტრონული ფოსტა" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                {errors.email && <p id="email-error" className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <Textarea name="message" placeholder={t('footer.yourMessage')} value={formData.message} onChange={handleChange} rows={3} className={errors.message ? "border-destructive" : ""} aria-label="შეტყობინება" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
                {errors.message && <p id="message-error" className="text-xs text-destructive mt-1">{errors.message}</p>}
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting} aria-label="გაგზავნა">
                {isSubmitting ? t('footer.submitting') : t('footer.submit')}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>{t('footer.rights')}</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-primary transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/" className="hover:text-primary transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;