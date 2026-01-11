import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Calendar, CheckCircle, Loader2 } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";
import { useTranslation } from "react-i18next";

const defaultImages = [render1, render2, render3];

const Projects = () => {
  const { location = "themka" } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Fetch project data
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', location],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', location)
        .eq('is_active', true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  // Fetch apartments for project
  const { data: apartments, isLoading: apartmentsLoading } = useQuery({
    queryKey: ['apartments', project?.id],
    queryFn: async () => {
      if (!project?.id) return [];
      const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .eq('project_id', project.id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!project?.id,
  });

  const handleLocationChange = (newLocation: string) => {
    navigate(`/projects/${newLocation}`);
  };

  // Static project data fallback
  const staticProjectData = {
    themka: {
      name: "თემქას რეზიდენსი",
      location: "თემქა, თბილისი",
      description: "თანამედროვე საცხოვრებელი კომპლექსი თემქას პრესტიჟულ უბანში. პროექტი მოიცავს მაღალი ხარისხის ბინებს, განვითარებულ ინფრასტრუქტურასა და მწვანე ზონებს.",
      status: "მიმდინარე მშენებლობა",
      completionDate: "2025 წლის დეკემბერი",
      totalUnits: 120,
      availableUnits: 45,
      priceRange: "45,000₾ - 180,000₾",
      amenities: [
        "24/7 უსაფრთხოება",
        "ავტოსადგომი",
        "საბავშვო მოედანი",
        "ფიტნეს ცენტრი",
        "მწვანე ზონა",
        "კონსიერჟი სერვისი"
      ],
    },
  };

  const currentStaticProject = staticProjectData[location as keyof typeof staticProjectData] || staticProjectData.themka;
  
  const projectName = project ? (currentLang === 'ka' ? project.name_ka : project.name_en) : currentStaticProject.name;
  const projectLocation = project ? (currentLang === 'ka' ? project.address_ka : project.address_en) : currentStaticProject.location;
  const projectDescription = project ? (currentLang === 'ka' ? project.description_ka : project.description_en) : currentStaticProject.description;

  const isLoading = projectLoading || apartmentsLoading;

  return (
    <>
      <Helmet>
        <title>{projectName} - პროექტები | ModX</title>
        <meta name="description" content={projectDescription || ''} />
        <meta name="keywords" content="უძრავი ქონება, ბინები თბილისში, ახალი პროექტები, მშენებლობა, თემქა" />
        <link rel="canonical" href={`https://modx.ge/projects/${location}`} />
        
        <meta property="og:title" content={`${projectName} - პროექტები | ModX`} />
        <meta property="og:description" content={projectDescription || ''} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://modx.ge/projects/${location}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.15),transparent_50%)]" />
          
          <div className="max-w-[1200px] mx-auto px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8 animate-fade-in">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  ჩვენი პროექტები
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                  აირჩიეთ თქვენი იდეალური საცხოვრებელი სხვადასხვა ლოკაციებში
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6 animate-scale-in">
                <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary animate-pulse" />
                  <span>აირჩიეთ ლოკაცია</span>
                </div>
                <div className="w-full max-w-md">
                  <Select value={location} onValueChange={handleLocationChange}>
                    <SelectTrigger className="w-full h-14 text-lg font-medium border-2 hover:border-primary/50 transition-colors bg-background/80 backdrop-blur-sm">
                      <SelectValue placeholder="აირჩიეთ ლოკაცია" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="themka" className="text-base">თემქა</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto animate-fade-in">
                <div className="p-4 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover-scale">
                  <div className="text-3xl font-bold text-primary">1</div>
                  <div className="text-sm text-muted-foreground">ლოკაცია</div>
                </div>
                <div className="p-4 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover-scale">
                  <div className="text-3xl font-bold text-primary">{apartments?.length || 0}+</div>
                  <div className="text-sm text-muted-foreground">ბინა</div>
                </div>
                <div className="p-4 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover-scale">
                  <div className="text-3xl font-bold text-primary">45K₾+</div>
                  <div className="text-sm text-muted-foreground">დან იწყება</div>
                </div>
                <div className="p-4 rounded-lg bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all hover-scale">
                  <div className="text-3xl font-bold text-primary">2025</div>
                  <div className="text-sm text-muted-foreground">ახალი</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-12 md:py-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  {/* Project Header */}
                  <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-3">{projectName}</h2>
                    <div className="flex items-center gap-2 text-muted-foreground mb-6">
                      <MapPin className="h-5 w-5" />
                      <span className="text-lg">{projectLocation}</span>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {projectDescription}
                    </p>
                  </div>

                  {/* Project Info Cards */}
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          სტატუსი
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          {project?.status === 'ongoing' ? 'მიმდინარე მშენებლობა' : 
                           project?.status === 'completed' ? 'დასრულებული' : 
                           project?.status === 'upcoming' ? 'დაგეგმილი' : currentStaticProject.status}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Calendar className="h-5 w-5 text-primary" />
                          დასრულება
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{project?.completion_date || currentStaticProject.completionDate}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Home className="h-5 w-5 text-primary" />
                          ბინები
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">
                          ხელმისაწვდომი: {project?.available_units || currentStaticProject.availableUnits} / {project?.total_units || currentStaticProject.totalUnits}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Price Range */}
                  <Card className="mb-12 bg-accent/5">
                    <CardHeader>
                      <CardTitle>ფასების დიაპაზონი</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold text-primary">
                        {project?.price_from ? `${project.price_from.toLocaleString()}₾ - დან` : currentStaticProject.priceRange}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Amenities */}
                  <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6">პროექტის მახასიათებლები</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {currentStaticProject.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-accent/5">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Properties */}
                  <div>
                    <h3 className="text-2xl font-bold mb-6">ხელმისაწვდომი ბინები</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {apartments && apartments.length > 0 ? (
                        apartments.map((apartment, index) => (
                          <Link key={apartment.id} to={`/apartments/${apartment.id}`}>
                            <PropertyCard 
                              image={apartment.image_url || defaultImages[index % defaultImages.length]}
                              price={apartment.price ? `${apartment.price.toLocaleString()}₾` : '-'}
                              beds={apartment.rooms || 0}
                              baths={apartment.bathrooms || 1}
                              sqm={apartment.area || 0}
                              address={currentLang === 'ka' ? apartment.title_ka || '' : apartment.title_en || ''}
                            />
                          </Link>
                        ))
                      ) : (
                        <p className="col-span-3 text-center text-muted-foreground py-8">
                          ბინები არ მოიძებნა
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-12 text-center">
                    <a href="tel:+995557123456">
                      <Button size="lg" className="px-8">
                        დაგვიკავშირდით დამატებითი ინფორმაციისთვის
                      </Button>
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;