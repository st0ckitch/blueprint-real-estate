import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Maximize, ArrowLeft, MapPin } from "lucide-react";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

const RenderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Render data with full details
  const renderData: Record<string, any> = {
    "1": {
      id: "1",
      title: "თანამედროვე ბინა ვაჟა-ფშაველას გამზირზე",
      description: "ეს არის ულამაზესი თანამედროვე ბინა ვაჟა-ფშაველას გამზირზე, რომელიც გთავაზობთ კომფორტულ საცხოვრებელ სივრცეს და შესანიშნავ ხედებს. ბინა აღჭურვილია უახლესი ტექნოლოგიებით და მაღალხარისხიანი მასალებით. დიზაინი მოიცავს ღია სივრცეს, რომელიც აერთიანებს სასტუმროს და სამზარეულოს, სამ კომფორტულ საძინებელს და ორ თანამედროვე სააბაზანოს. დიდი ფანჯრები უზრუნველყოფს ბუნებრივი განათების მაქსიმალურ შემოსვლას.",
      price: "75,000₾",
      beds: 3,
      baths: 2,
      sqm: 85,
      address: "ვაჟა-ფშაველას გამზირი, თბილისი",
      images: [render1, render2, render3, render1],
      features: [
        "პანორამული ფანჯრები",
        "ცენტრალური გათბობა",
        "კონდიციონერი",
        "ავეჯით",
        "ახალი რემონტი",
        "პარკინგი"
      ]
    },
    "2": {
      id: "2",
      title: "მყუდრო ბინა აღმაშენებლის გამზირზე",
      description: "კომფორტული ორსაძინებლიანი ბინა აღმაშენებლის გამზირზე, იდეალური ახალგაზრდა ოჯახებისთვის ან წყვილებისთვის. ბინა მდებარეობს მოწესრიგებულ უბანში, ახლოს საზოგადოებრივი ტრანსპორტის გაჩერებასთან და ყველა საჭირო ინფრასტრუქტურასთან. თანამედროვე დიზაინი და ფუნქციონალური განლაგება უზრუნველყოფს მაქსიმალურ კომფორტს.",
      price: "65,000₾",
      beds: 2,
      baths: 1,
      sqm: 60,
      address: "აღმაშენებლის გამზირი, თბილისი",
      images: [render2, render3, render1, render2],
      features: [
        "ცენტრალური გათბობა",
        "კონდიციონერი",
        "ბუნებრივი განათება",
        "ახალი სანტექნიკა",
        "უსაფრთხოების სისტემა"
      ]
    },
    "3": {
      id: "3",
      title: "პრემიუმ ბინა ჭავჭავაძის გამზირზე",
      description: "განსაკუთრებული პრემიუმ კლასის ოთხსაძინებლიანი ბინა ჭავჭავაძის გამზირზე. იდეალური არჩევანი დიდი ოჯახებისთვის, რომლებიც აფასებენ სივრცეს, კომფორტს და ხარისხს. ბინა აღჭურვილია მაღალკლასიანი ტექნიკით, დიზაინერული ავეჯით და მოიცავს სამ თანამედროვე სააბაზანოს. დიდი ბალკონი იძლევა შესანიშნავ ხედებს ქალაქზე.",
      price: "95,000₾",
      beds: 4,
      baths: 2,
      sqm: 120,
      address: "ჭავჭავაძის გამზირი, თბილისი",
      images: [render3, render1, render2, render3],
      features: [
        "პრემიუმ მასალები",
        "პანორამული ხედები",
        "დიზაინერული ავეჯი",
        "VRV სისტემა",
        "სმარტ სახლის სისტემა",
        "დაცული ეზო",
        "ორი პარკინგი"
      ]
    },
    "4": {
      id: "4",
      title: "თანამედროვე ბინა დიღომში",
      description: "ეკოლოგიურად სუფთა რაიონში, დიღომში მდებარე კომფორტული ბინა. იდეალური ვარიანტი მათთვის, ვინც ეძებს სიმშვიდეს ქალაქის ხმაურისგან, მაგრამ ახლოს ცენტრთან. ორი საძინებელი და თანამედროვე დიზაინი ქმნის მყუდრო საცხოვრებელ სივრცეს. განვითარებული ინფრასტრუქტურა და ახლოს ბუნება.",
      price: "58,000₾",
      beds: 2,
      baths: 1,
      sqm: 55,
      address: "დიღომი, თბილისი",
      images: [render1, render3, render2, render1],
      features: [
        "მწვანე გარემო",
        "ახალი აშენება",
        "ევრორემონტი",
        "კეთილმოწყობილი ეზო",
        "საბავშვო მოედანი"
      ]
    },
    "5": {
      id: "5",
      title: "ოჯახური ბინა საბურთალოზე",
      description: "საბურთალოს ცენტრალურ ნაწილში მდებარე სამსაძინებლიანი ბინა. იდეალურია ოჯახებისთვის, ახლოს სკოლებთან, საბაღნო ბაღებთან და ყველა საჭირო ინფრასტრუქტურასთან. ბინა აღჭურვილია ყველა საჭირო კომუნიკაციებით და გადიოდა კაპიტალური რემონტი.",
      price: "82,000₾",
      beds: 3,
      baths: 2,
      sqm: 90,
      address: "საბურთალო, თბილისი",
      images: [render2, render1, render3, render2],
      features: [
        "განვითარებული ინფრასტრუქტურა",
        "ცენტრალური მდებარეობა",
        "ახალი სანტექნიკა",
        "ავეჯით",
        "პარკინგი"
      ]
    },
    "6": {
      id: "6",
      title: "ლუქს ბინა ვაკეში",
      description: "ექსკლუზიური ოთხსაძინებლიანი ბინა თბილისის პრესტიჟულ რაიონში - ვაკეში. ბინა განლაგებულია ახალ კორპუსში და აღჭურვილია ყველა თანამედროვე კომფორტით. სამი ფართო სააბაზანო, ვრცელი ბალკონი პანორამული ხედებით და პრემიუმ მასალები ქმნის ცხოვრების ახალ სტანდარტს.",
      price: "110,000₾",
      beds: 4,
      baths: 3,
      sqm: 135,
      address: "ვაკე, თბილისი",
      images: [render3, render2, render1, render3],
      features: [
        "პრესტიჟული რაიონი",
        "პრემიუმ მასალები",
        "VIP შესასვლელი",
        "კონსიერჟი",
        "ფიტნეს დარბაზი",
        "შიდა ეზო",
        "ორი პარკინგი"
      ]
    }
  };

  const render = renderData[id || "1"];
  const [selectedImage, setSelectedImage] = useState(0);

  if (!render) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">რენდერი ვერ მოიძებნა</h1>
            <Button onClick={() => navigate("/renders")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              უკან რენდერებზე
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{render.title} | ModeX - 3D რენდერი</title>
        <meta name="description" content={render.description} />
        <meta name="keywords" content={`რენდერი, 3D ვიზუალიზაცია, ${render.address}, ${render.beds} საძინებელი, ${render.sqm} მ²`} />
        <link rel="canonical" href={`https://modex.ge/renders/${id}`} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <div className="max-w-[1200px] mx-auto px-8 py-12">
          {/* Back button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/renders")}
            className="mb-6 -ml-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            უკან რენდერებზე
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Gallery Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                <img
                  src={render.images[selectedImage]}
                  alt={render.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-4">
                {render.images.map((image: string, index: number) => (
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
                      alt={`${render.title} - ხედი ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">{render.title}</h1>
                <div className="flex items-center text-muted-foreground mb-6">
                  <MapPin className="h-5 w-5 mr-2" />
                  {render.address}
                </div>
                <div className="text-3xl font-bold text-primary mb-6">
                  {render.price}
                </div>
              </div>

              {/* Property Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Bed className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">საძინებელი</span>
                  </div>
                  <div className="text-2xl font-bold">{render.beds}</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Bath className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">სააბაზანო</span>
                  </div>
                  <div className="text-2xl font-bold">{render.baths}</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Maximize className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">ფართობი</span>
                  </div>
                  <div className="text-2xl font-bold">{render.sqm} მ²</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">აღწერა</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {render.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold mb-3">მახასიათებლები</h2>
                <div className="grid grid-cols-2 gap-3">
                  {render.features.map((feature: string, index: number) => (
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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="flex-1">
                  დაგვიკავშირდით
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  შეკითხვა
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RenderDetail;
