import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import PropertyCard from "@/components/PropertyCard";
import render1 from "@/assets/render-1.png";
import render2 from "@/assets/render-2.png";
import render3 from "@/assets/render-3.png";

const Renders = () => {
  const renders = [
    {
      image: render1,
      price: "75,000₾",
      beds: 3,
      baths: 2,
      sqm: 85,
      address: "ვაჟა-ფშაველას გამზირი, თბილისი"
    },
    {
      image: render2,
      price: "65,000₾",
      beds: 2,
      baths: 1,
      sqm: 60,
      address: "აღმაშენებლის გამზირი, თბილისი"
    },
    {
      image: render3,
      price: "95,000₾",
      beds: 4,
      baths: 2,
      sqm: 120,
      address: "ჭავჭავაძის გამზირი, თბილისი"
    },
    {
      image: render1,
      price: "58,000₾",
      beds: 2,
      baths: 1,
      sqm: 55,
      address: "დიღომი, თბილისი"
    },
    {
      image: render2,
      price: "82,000₾",
      beds: 3,
      baths: 2,
      sqm: 90,
      address: "საბურთალო, თბილისი"
    },
    {
      image: render3,
      price: "110,000₾",
      beds: 4,
      baths: 3,
      sqm: 135,
      address: "ვაკე, თბილისი"
    }
  ];

  return (
    <>
      <Helmet>
        <title>რენდერები | ModeX - უძრავი ქონების 3D ვიზუალიზაცია</title>
        <meta name="description" content="იხილეთ ModeX-ის უძრავი ქონების უმაღლესი ხარისხის 3D რენდერები და ვიზუალიზაციები. ფოტორეალისტური ბინების და სახლების გამოსახულებები." />
        <meta name="keywords" content="რენდერები, 3D ვიზუალიზაცია, უძრავი ქონება, ბინები თბილისში, არქიტექტურული რენდერები" />
        <link rel="canonical" href="https://modex.ge/renders" />
        
        <meta property="og:title" content="რენდერები | ModeX" />
        <meta property="og:description" content="იხილეთ ModeX-ის უძრავი ქონების უმაღლესი ხარისხის 3D რენდერები და ვიზუალიზაციები." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://modex.ge/renders" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                პროფესიონალური 3D რენდერები
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                იხილეთ ჩვენი უძრავი ქონების ფოტორეალისტური ვიზუალიზაციები. 
                თითოეული რენდერი შექმნილია უმაღლესი ხარისხის სტანდარტებით.
              </p>
            </div>
          </div>
        </section>

        {/* Renders Grid */}
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {renders.map((render, index) => (
                <PropertyCard key={index} {...render} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Renders;
