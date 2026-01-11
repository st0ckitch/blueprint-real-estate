import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import * as z from "zod";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Bed, Bath, Maximize, ArrowLeft, MapPin, Send, Grid3X3, Building, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

const defaultImages = [render1, render2, render3];

const inquiryFormSchema = z.object({
  name: z.string().trim().min(2, "სახელი უნდა შეიცავდეს მინიმუმ 2 სიმბოლოს").max(100, "სახელი ძალიან გრძელია"),
  email: z.string().trim().email("გთხოვთ შეიყვანოთ ვალიდური ელ.ფოსტა").max(255, "ელ.ფოსტა ძალიან გრძელია"),
  phone: z.string().trim().min(9, "ტელეფონის ნომერი არავალიდურია").max(20, "ტელეფონის ნომერი ძალიან გრძელია"),
  message: z.string().trim().min(10, "შეტყობინება უნდა შეიცავდეს მინიმუმ 10 სიმბოლოს").max(1000, "შეტყობინება ძალიან გრძელია"),
});

type InquiryFormData = z.infer<typeof inquiryFormSchema>;

const RenderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  
  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquiryFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Fetch apartment from database
  const { data: apartment, isLoading } = useQuery({
    queryKey: ['apartment', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('apartments')
        .select('*, projects(name_ka, name_en, address_ka, address_en)')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Build apartment data from DB or use defaults
  const apartmentData = apartment ? {
    id: apartment.id,
    title: currentLang === 'ka' ? apartment.title_ka : apartment.title_en,
    description: `${currentLang === 'ka' ? apartment.title_ka : apartment.title_en} - ${apartment.rooms} ოთახიანი ბინა, ${apartment.area} მ², ${apartment.floor} სართული`,
    price: apartment.price ? `${apartment.price.toLocaleString()}₾` : '-',
    beds: apartment.rooms || 0,
    baths: apartment.bathrooms || 1,
    sqm: apartment.area || 0,
    floor: apartment.floor || 1,
    bedrooms: apartment.bedrooms || 0,
    living_area: apartment.living_area || 0,
    balcony_area: apartment.balcony_area || 0,
    bathroom_areas: (apartment.bathroom_areas as number[] | null) || [],
    bedroom_areas: (apartment.bedroom_areas as number[] | null) || [],
    address: apartment.projects ? (currentLang === 'ka' ? apartment.projects.address_ka : apartment.projects.address_en) : 'თბილისი',
    images: apartment.image_url ? [apartment.image_url, ...defaultImages] : defaultImages,
    views: apartment.floor_plan_url ? [apartment.floor_plan_url, ...defaultImages] : defaultImages,
    features: [
      "ცენტრალური გათბობა",
      "კონდიციონერი", 
      "ახალი რემონტი",
      "პარკინგი",
      "უსაფრთხოების სისტემა"
    ]
  } : null;

  const onSubmit = async (data: InquiryFormData) => {
    if (!apartmentData) return;
    setIsSubmitting(true);
    
    try {
      const validatedData = inquiryFormSchema.parse(data);
      
      const propertyInfo = `უძრავი ქონება: ${apartmentData.title}\nმისამართი: ${apartmentData.address}\nფასი: ${apartmentData.price}`;
      const whatsappMessage = encodeURIComponent(
        `გამარჯობა! მაინტერესებს შემდეგი ქონება:\n\n${propertyInfo}\n\n` +
        `სახელი: ${validatedData.name}\n` +
        `ელ.ფოსტა: ${validatedData.email}\n` +
        `ტელეფონი: ${validatedData.phone}\n` +
        `შეტყობინება: ${validatedData.message}`
      );
      
      window.open(`https://wa.me/995599123456?text=${whatsappMessage}`, '_blank');
      
      toast({
        title: "შეტყობინება გაგზავნილია!",
        description: "ჩვენ მალე დაგიკავშირდებით.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ შეავსოთ ყველა ველი სწორად.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (!apartmentData) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">ბინა ვერ მოიძებნა</h1>
            <Button onClick={() => navigate("/projects/themka")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              უკან პროექტებზე
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{apartmentData.title} | ModX - ბინები</title>
        <meta name="description" content={apartmentData.description} />
        <meta name="keywords" content={`ბინა, ${apartmentData.address}, ${apartmentData.beds} ოთახი, ${apartmentData.sqm} მ²`} />
        <link rel="canonical" href={`https://modx.ge/apartments/${id}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/projects/themka")}
            className="mb-6 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            უკან პროექტზე
          </Button>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="about">ბინის შესახებ</TabsTrigger>
              <TabsTrigger value="views">გეგმა</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Gallery Section */}
                <div className="space-y-4">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                    <img
                      src={apartmentData.images[selectedImage]}
                      alt={apartmentData.title || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    {apartmentData.images.slice(0, 4).map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square overflow-hidden rounded-lg transition-all ${
                          selectedImage === index
                            ? "ring-2 ring-primary ring-offset-2"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${apartmentData.title} - ხედი ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold mb-4">{apartmentData.title}</h1>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="h-5 w-5 mr-2" />
                      {apartmentData.address}
                    </div>
                    <div className="text-4xl font-bold text-primary mb-6">
                      {apartmentData.price}
                    </div>
                  </div>

                  {/* Property Stats - First Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl border-2 border-border bg-background">
                      <div className="flex items-center gap-2 mb-1">
                        <Grid3X3 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">ოთახი</span>
                      </div>
                      <div className="text-2xl font-bold">{apartmentData.beds}</div>
                    </div>
                    
                    {/* Bathroom with split areas */}
                    <div className="p-4 rounded-2xl border-2 border-border bg-background">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Bath className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">სველი წერტ...</span>
                        </div>
                        {apartmentData.bathroom_areas.length > 0 && (
                          <span className="text-[10px] text-muted-foreground border border-border rounded-full px-1.5">
                            {apartmentData.bathroom_areas.length}
                          </span>
                        )}
                      </div>
                      <div className="text-2xl font-bold">{apartmentData.baths}</div>
                      {apartmentData.bathroom_areas.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <div className="flex flex-col gap-0.5">
                            {apartmentData.bathroom_areas.map((area, index) => (
                              <span key={index} className="text-xs text-muted-foreground">
                                {area} მ²
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl border-2 border-border bg-background">
                      <div className="flex items-center gap-2 mb-1">
                        <Maximize className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">ფართობი</span>
                      </div>
                      <div className="text-2xl font-bold">{apartmentData.sqm} <span className="text-sm font-normal">მ²</span></div>
                    </div>
                    <div className="p-4 rounded-2xl border-2 border-border bg-background">
                      <div className="flex items-center gap-2 mb-1">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">სართული</span>
                      </div>
                      <div className="text-2xl font-bold">{apartmentData.floor}</div>
                    </div>
                  </div>

                  {/* Property Stats - Second Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {apartmentData.balcony_area > 0 && (
                      <div className="p-4 rounded-2xl border-2 border-border bg-background">
                        <span className="text-xs text-muted-foreground">საზაფხულო ფართი</span>
                        <div className="text-2xl font-bold mt-1">{apartmentData.balcony_area} <span className="text-sm font-normal">მ²</span></div>
                      </div>
                    )}
                    {apartmentData.living_area > 0 && (
                      <div className="p-4 rounded-2xl border-2 border-border bg-background">
                        <span className="text-xs text-muted-foreground">მისალები</span>
                        <div className="text-2xl font-bold mt-1">{apartmentData.living_area} <span className="text-sm font-normal">მ²</span></div>
                      </div>
                    )}
                    {apartmentData.bedrooms > 0 && (
                      <div className="p-4 rounded-2xl border-2 border-border bg-background">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">საძინებელი</span>
                          {apartmentData.bedroom_areas.length > 0 && (
                            <span className="text-[10px] text-muted-foreground border border-border rounded-full px-1.5">
                              {apartmentData.bedroom_areas.length}
                            </span>
                          )}
                        </div>
                        <div className="text-2xl font-bold mt-1">{apartmentData.bedrooms}</div>
                        {apartmentData.bedroom_areas.length > 0 && (
                          <div className="mt-2 pt-2 border-t border-border">
                            <div className="flex flex-col gap-0.5">
                              {apartmentData.bedroom_areas.map((area, index) => (
                                <span key={index} className="text-xs text-muted-foreground">
                                  {area} მ²
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div>
                    <h2 className="text-xl font-semibold mb-3">მახასიათებლები</h2>
                    <div className="grid grid-cols-2 gap-3">
                      {apartmentData.features.map((feature: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 p-3 rounded-lg bg-muted/30"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="bg-card border border-border/50 rounded-2xl p-8">
                <h2 className="text-2xl font-semibold mb-2">დაინტერესდით?</h2>
                <p className="text-muted-foreground mb-6">
                  მოგვწერეთ და ჩვენი გუნდი დაგიკავშირდებათ
                </p>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">სახელი</Label>
                      <Input
                        id="name"
                        {...form.register("name")}
                        className={form.formState.errors.name ? "border-destructive" : ""}
                      />
                      {form.formState.errors.name && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">ტელეფონი</Label>
                      <Input
                        id="phone"
                        {...form.register("phone")}
                        className={form.formState.errors.phone ? "border-destructive" : ""}
                      />
                      {form.formState.errors.phone && (
                        <p className="text-sm text-destructive mt-1">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">ელ.ფოსტა</Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className={form.formState.errors.email ? "border-destructive" : ""}
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="message">შეტყობინება</Label>
                    <Textarea
                      id="message"
                      rows={4}
                      {...form.register("message")}
                      className={form.formState.errors.message ? "border-destructive" : ""}
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive mt-1">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "იგზავნება..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        შეტყობინების გაგზავნა
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="views" className="space-y-8">
              <div className="grid gap-8">
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={apartmentData.views[0]}
                    alt="გეგმა"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {apartmentData.views.slice(0, 3).map((image: string, index: number) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-xl">
                      <img
                        src={image}
                        alt={`ხედი ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default RenderDetail;