import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  author: string;
}

const blogPosts: Record<string, BlogPostData> = {
  "rogor-avirciot-bina-tbilisshi": {
    slug: "rogor-avirciot-bina-tbilisshi",
    title: "როგორ ავირჩიოთ ბინა თბილისში - სრული გზამკვლევი",
    excerpt: "თბილისში ბინის შეძენა დიდი გადაწყვეტილებაა. ამ სტატიაში განვიხილავთ ყველა მნიშვნელოვან ასპექტს.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <h2>ლოკაციის მნიშვნელობა</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      
      <h2>ბიუჯეტის დაგეგმვა</h2>
      <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
      
      <h2>ინფრასტრუქტურა და გარემო</h2>
      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
      
      <p>Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>
    `,
    date: "2024-03-15",
    readTime: "5 წუთი",
    category: "რჩევები",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop",
    author: "Modex Team"
  },
  "saburthalos-raioni-mimoxilva": {
    slug: "saburthalos-raioni-mimoxilva",
    title: "საბურთალოს რაიონი - სრული მიმოხილვა და ფასები",
    excerpt: "საბურთალო თბილისის ერთ-ერთი ყველაზე პოპულარული რაიონია.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel magna vel augue tempus euismod vitae id sapien. Donec eu ex nec turpis molestie efficitur eget sit amet ligula.</p>
      
      <h2>რაიონის მახასიათებლები</h2>
      <p>Vivamus sit amet sapien id ex hendrerit sagittis. Praesent venenatis, nisi quis consectetur mollis, orci magna porttitor lectus, a blandit eros turpis vitae nisi. Suspendisse potenti. Mauris in vehicula erat.</p>
      
      <h2>ტრანსპორტი და ხელმისაწვდომობა</h2>
      <p>Integer et felis eu massa tristique bibendum. Nulla facilisi. Cras ornare malesuada felis, vel semper enim consequat vel. Ut accumsan felis ac mi pulvinar, sed varius mauris facilisis.</p>
      
      <h2>ფასების ანალიზი</h2>
      <p>Fusce luctus tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum nulla sed consectetur. Cum sociis natoque penatibus et magnis dis parturient montes.</p>
    `,
    date: "2024-03-10",
    readTime: "7 წუთი",
    category: "რაიონები",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=600&fit=crop",
    author: "Modex Team"
  },
  "investicia-udzravi-qonebashi": {
    slug: "investicia-udzravi-qonebashi",
    title: "ინვესტიცია უძრავ ქონებაში 2024 წელს",
    excerpt: "უძრავი ქონება რჩება ერთ-ერთ საუკეთესო ინვესტიციად.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi accumsan ipsum velit. Mauris in eros justo. Proin tincidunt magna sed nulla hendrerit, eu condimentum dui molestie.</p>
      
      <h2>რატომ უძრავი ქონება?</h2>
      <p>Nullam vel sem vel turpis elementum posuere. Sed viverra, erat at malesuada consequat, augue augue faucibus lacus, non iaculis odio libero sed quam. Sed sed elit nec ipsum pharetra varius.</p>
      
      <h2>ინვესტიციის სტრატეგიები</h2>
      <p>Curabitur blandit tempus porttitor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec ullamcorper nulla non metus auctor fringilla.</p>
      
      <h2>რისკების მართვა</h2>
      <p>Vestibulum id ligula porta felis euismod semper. Maecenas faucibus mollis interdum. Sed posuere consectetur est at lobortis. Cras mattis consectetur purus sit amet fermentum.</p>
    `,
    date: "2024-03-05",
    readTime: "6 წუთი",
    category: "ინვესტიცია",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1200&h=600&fit=crop",
    author: "Modex Team"
  },
  "axali-proektebi-tbilisshi": {
    slug: "axali-proektebi-tbilisshi",
    title: "ახალი სამშენებლო პროექტები თბილისში",
    excerpt: "თბილისში მიმდინარე და დაგეგმილი სამშენებლო პროექტების მიმოხილვა.",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vel libero id eros porttitor varius. Aliquam erat volutpat. Suspendisse potenti. In hac habitasse platea dictumst.</p>
      
      <h2>წამყვანი პროექტები 2024</h2>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam quis risus eget urna mollis ornare vel eu leo. Donec sed odio dui. Aenean eu leo quam.</p>
      
      <h2>მომავლის ტენდენციები</h2>
      <p>Pellentesque ornare sem lacinia quam venenatis vestibulum. Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
      
      <h2>ინვესტიციის შესაძლებლობები</h2>
      <p>Etiam porta sem malesuada magna mollis euismod. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
      
      <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui.</p>
    `,
    date: "2024-03-01",
    readTime: "8 წუთი",
    category: "პროექტები",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop",
    author: "Modex Team"
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPosts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">სტატია ვერ მოიძებნა</h1>
          <Link to="/blog">
            <Button>დაბრუნება ბლოგზე</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("ლინკი დაკოპირდა");
    }
  };

  return (
    <>
      <Helmet>
        <title>{post.title} - Modex ბლოგი</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={`${post.category}, უძრავი ქონება, თბილისი, Modex`} />
        <link rel="canonical" href={`https://yourdomain.com/blog/${post.slug}`} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content={post.author} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <article className="py-8 px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span>უკან ბლოგზე</span>
            </Link>

            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('ka-GE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>

              <div className="flex items-center justify-between">
                <p className="text-lg text-muted-foreground">
                  ავტორი: {post.author}
                </p>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  გაზიარება
                </Button>
              </div>
            </header>

            {/* Featured Image */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none
                prose-headings:font-semibold prose-headings:text-foreground
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back to Blog */}
            <div className="mt-16 pt-8 border-t border-border">
              <Link to="/blog">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  დაბრუნება ბლოგზე
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default BlogPost;
