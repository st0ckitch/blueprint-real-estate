import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(2, { message: "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო" }).max(100),
  phone: z.string().trim().min(9, { message: "არასწორი ტელეფონის ნომერი" }).max(20),
  email: z.string().trim().email({ message: "არასწორი ელ.ფოსტა" }).max(255),
  message: z.string().trim().min(10, { message: "შეტყობინება უნდა იყოს მინიმუმ 10 სიმბოლო" }).max(1000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "წარმატებით გაიგზავნა",
        description: "ჩვენ მალე დაგიკავშირდებით",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ სცადოთ თავიდან",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>კონტაქტი - ModX | დაგვიკავშირდით</title>
        <meta 
          name="description" 
          content="დაგვიკავშირდით ModX-ს უძრავი ქონების შესახებ კონსულტაციისთვის. ტელეფონი: +995557123456, მისამართი: ვაჟა-ფშაველას გამზირი 45, თბილისი" 
        />
        <meta name="keywords" content="კონტაქტი, ModX, უძრავი ქონება, თბილისი, მისამართი" />
        <link rel="canonical" href="https://yourdomain.com/contact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 px-8 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="max-w-[1200px] mx-auto relative">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                  დაგვიკავშირდით
                </span>
                <h1 className="text-5xl md:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                    გვესაუბრეთ თქვენს
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    პროექტზე
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  ჩვენი გუნდი მზად არის დაგეხმაროთ იდეალური უძრავი ქონების პოვნაში
                </p>
              </div>
            </div>
          </section>

          {/* Contact Information Cards */}
          <section className="py-16 px-8 -mt-8 relative z-10">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">მისამართი</h3>
                  <p className="text-sm text-muted-foreground">
                    ვაჟა-ფშაველას გამზირი 45<br />
                    თბილისი, საქართველო
                  </p>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">ტელეფონი</h3>
                  <a href="tel:+995557123456" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    +995 557 123 456
                  </a>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">ელ.ფოსტა</h3>
                  <a href="mailto:info@modx.ge" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    info@modx.ge
                  </a>
                </div>

                <div className="bg-card border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">სამუშაო საათები</h3>
                  <p className="text-sm text-muted-foreground">
                    ორ-შაბ: 10:00 - 19:00<br />
                    კვირა: დახურულია
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Map and Form Section */}
          <section className="py-16 px-8">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Map */}
                <div className="order-2 lg:order-1">
                  <div className="sticky top-8">
                    <h2 className="text-2xl font-bold mb-4">ჩვენი ოფისი</h2>
                    <p className="text-muted-foreground mb-6">
                      ეწვიეთ ჩვენს ოფისს და გაეცანით ყველა პროექტს პირადად
                    </p>
                    <Map height="h-[600px]" showTokenInput={true} />
                  </div>
                </div>

                {/* Contact Form */}
                <div className="order-1 lg:order-2">
                  <div className="bg-card border border-border/50 rounded-2xl p-8 shadow-sm">
                    <h2 className="text-2xl font-bold mb-2">გაგზავნეთ შეტყობინება</h2>
                    <p className="text-muted-foreground mb-6">
                      შეავსეთ ფორმა და ჩვენ დაგიკავშირდებით 24 საათში
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          სახელი და გვარი *
                        </label>
                        <Input
                          id="name"
                          placeholder="გიორგი გიორგაძე"
                          {...register("name")}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          ტელეფონი *
                        </label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+995 5XX XXX XXX"
                          {...register("phone")}
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          ელ.ფოსტა *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@mail.com"
                          {...register("email")}
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-2">
                          შეტყობინება *
                        </label>
                        <Textarea
                          id="message"
                          placeholder="დაწერეთ თქვენი შეტყობინება..."
                          rows={6}
                          {...register("message")}
                          className={errors.message ? "border-destructive" : ""}
                        />
                        {errors.message && (
                          <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full" 
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "იგზავნება..." : "გაგზავნა"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Contact;
