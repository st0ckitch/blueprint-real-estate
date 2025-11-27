import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Calendar, CheckCircle } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

interface ProjectData {
  id: string;
  name: string;
  location: string;
  description: string;
  status: string;
  completionDate: string;
  totalUnits: number;
  availableUnits: number;
  priceRange: string;
  amenities: string[];
  properties: Array<{
    image: string;
    price: string;
    beds: number;
    baths: number;
    sqm: number;
    address: string;
  }>;
}

const projectsData: Record<string, ProjectData> = {
  saburtalo: {
    id: "saburtalo",
    name: "საბურთალოს რეზიდენსი",
    location: "საბურთალო, თბილისი",
    description: "თანამედროვე საცხოვრებელი კომპლექსი საბურთალოს პრესტიჟულ უბანში. პროექტი მოიცავს მაღალი ხარისხის ბინებს, განვითარებულ ინფრასტრუქტურასა და მწვანე ზონებს.",
    status: "მიმდინარე მშენებლობა",
    completionDate: "2025 წლის დეკემბერი",
    totalUnits: 120,
    availableUnits: 45,
    priceRange: "55,000₾ - 150,000₾",
    amenities: [
      "24/7 უსაფრთხოება",
      "ავტოსადგომი",
      "საბავშვო მოედანი",
      "ფიტნეს ცენტრი",
      "მწვანე ზონა",
      "კონსიერჟი სერვისი"
    ],
    properties: [
      {
        image: render1,
        price: "65,000₾",
        beds: 2,
        baths: 1,
        sqm: 55,
        address: "ვაჟა-ფშაველას გამზირი 45, საბურთალო"
      },
      {
        image: render2,
        price: "95,000₾",
        beds: 3,
        baths: 2,
        sqm: 85,
        address: "ვაჟა-ფშაველას გამზირი 45, საბურთალო"
      },
      {
        image: render3,
        price: "120,000₾",
        beds: 4,
        baths: 2,
        sqm: 110,
        address: "ვაჟა-ფშაველას გამზირი 45, საბურთალო"
      }
    ]
  },
  gldani: {
    id: "gldani",
    name: "გლდანის ახალი სკვერი",
    location: "გლდანი, თბილისი",
    description: "კომფორტული საცხოვრებელი კომპლექსი გლდანის განვითარებად რაიონში. ოპტიმალური ფასები და თანამედროვე დიზაინი.",
    status: "დაგეგმილი",
    completionDate: "2026 წლის ივნისი",
    totalUnits: 200,
    availableUnits: 200,
    priceRange: "45,000₾ - 110,000₾",
    amenities: [
      "24/7 უსაფრთხოება",
      "ავტოსადგომი",
      "საბავშვო მოედანი",
      "სპორტული მოედანი",
      "სუპერმარკეტი",
      "ფარმაცია"
    ],
    properties: [
      {
        image: render1,
        price: "48,000₾",
        beds: 2,
        baths: 1,
        sqm: 52,
        address: "გლდანის მასივი 7, გლდანი"
      },
      {
        image: render2,
        price: "75,000₾",
        beds: 3,
        baths: 2,
        sqm: 78,
        address: "გლდანის მასივი 7, გლდანი"
      },
      {
        image: render3,
        price: "98,000₾",
        beds: 4,
        baths: 2,
        sqm: 105,
        address: "გლდანის მასივი 7, გლდანი"
      }
    ]
  },
  varketili: {
    id: "varketili",
    name: "ვარკეთილის პარკი",
    location: "ვარკეთილი, თბილისი",
    description: "ეკოლოგიურად სუფთა გარემოში განთავსებული საცხოვრებელი კომპლექსი. პარკებისა და მწვანე ზონების სიახლოვეს.",
    status: "მიმდინარე მშენებლობა",
    completionDate: "2026 წლის მარტი",
    totalUnits: 150,
    availableUnits: 80,
    priceRange: "50,000₾ - 125,000₾",
    amenities: [
      "24/7 უსაფრთხოება",
      "ავტოსადგომი",
      "საბავშვო ბაღი",
      "საბავშვო მოედანი",
      "პარკი",
      "სპორტული მოედანი"
    ],
    properties: [
      {
        image: render1,
        price: "52,000₾",
        beds: 2,
        baths: 1,
        sqm: 58,
        address: "ვარკეთილის მასივი 3, ვარკეთილი"
      },
      {
        image: render2,
        price: "82,000₾",
        beds: 3,
        baths: 2,
        sqm: 82,
        address: "ვარკეთილის მასივი 3, ვარკეთილი"
      },
      {
        image: render3,
        price: "108,000₾",
        beds: 4,
        baths: 2,
        sqm: 112,
        address: "ვარკეთილის მასივი 3, ვარკეთილი"
      }
    ]
  },
  mtskheta: {
    id: "mtskheta",
    name: "მცხეთის ველი",
    location: "მცხეთა",
    description: "უნიკალური საცხოვრებელი კომპლექსი ისტორიულ მცხეთაში. საუკეთესო ხედები და სუფთა ჰაერი.",
    status: "დაგეგმილი",
    completionDate: "2026 წლის სექტემბერი",
    totalUnits: 80,
    availableUnits: 80,
    priceRange: "60,000₾ - 180,000₾",
    amenities: [
      "24/7 უსაფრთხოება",
      "ავტოსადგომი",
      "საბავშვო მოედანი",
      "რესტორანი",
      "ბაზრობა",
      "მწვანე ზონა"
    ],
    properties: [
      {
        image: render1,
        price: "68,000₾",
        beds: 2,
        baths: 1,
        sqm: 60,
        address: "ძველი თბილისის ქუჩა 12, მცხეთა"
      },
      {
        image: render2,
        price: "115,000₾",
        beds: 3,
        baths: 2,
        sqm: 95,
        address: "ძველი თბილისის ქუჩა 12, მცხეთა"
      },
      {
        image: render3,
        price: "155,000₾",
        beds: 4,
        baths: 3,
        sqm: 125,
        address: "ძველი თბილისის ქუჩა 12, მცხეთა"
      }
    ]
  }
};

const Projects = () => {
  const { location = "saburtalo" } = useParams();
  const navigate = useNavigate();
  
  const currentProject = projectsData[location] || projectsData.saburtalo;

  const handleLocationChange = (newLocation: string) => {
    navigate(`/projects/${newLocation}`);
  };

  return (
    <>
      <Helmet>
        <title>{currentProject.name} - პროექტები | ModeX</title>
        <meta name="description" content={currentProject.description} />
        <meta name="keywords" content="უძრავი ქონება, ბინები თბილისში, ახალი პროექტები, მშენებლობა, საბურთალო, გლდანი, ვარკეთილი, მცხეთა" />
        <link rel="canonical" href={`https://modex.ge/projects/${location}`} />
        
        <meta property="og:title" content={`${currentProject.name} - პროექტები | ModeX`} />
        <meta property="og:description" content={currentProject.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://modex.ge/projects/${location}`} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${currentProject.name} - პროექტები | ModeX`} />
        <meta name="twitter:description" content={currentProject.description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">ჩვენი პროექტები</h1>
              <p className="text-lg text-muted-foreground mb-8">
                აირჩიეთ თქვენი იდეალური საცხოვრებელი სხვადასხვა ლოკაციებში
              </p>
              
              {/* Location Selector */}
              <div className="max-w-xs mx-auto">
                <Select value={location} onValueChange={handleLocationChange}>
                  <SelectTrigger className="w-full h-12 text-base">
                    <SelectValue placeholder="აირჩიეთ ლოკაცია" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saburtalo">საბურთალო</SelectItem>
                    <SelectItem value="gldani">გლდანი</SelectItem>
                    <SelectItem value="varketili">ვარკეთილი</SelectItem>
                    <SelectItem value="mtskheta">მცხეთა</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Project Header */}
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">{currentProject.name}</h2>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{currentProject.location}</span>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentProject.description}
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
                    <p className="text-muted-foreground">{currentProject.status}</p>
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
                    <p className="text-muted-foreground">{currentProject.completionDate}</p>
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
                      ხელმისაწვდომი: {currentProject.availableUnits} / {currentProject.totalUnits}
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
                  <p className="text-2xl font-bold text-primary">{currentProject.priceRange}</p>
                </CardContent>
              </Card>

              {/* Amenities */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">პროექტის მახასიათებლები</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {currentProject.amenities.map((amenity, index) => (
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
                  {currentProject.properties.map((property, index) => (
                    <PropertyCard key={index} {...property} />
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="mt-12 text-center">
                <Button size="lg" className="px-8">
                  დაგვიკავშირდით დამატებითი ინფორმაციისთვის
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Projects;