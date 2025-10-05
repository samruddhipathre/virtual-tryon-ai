import { Button } from "./ui/button";
import { Sparkles, Camera, Scan } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-shimmer" 
        style={{ backgroundSize: '200% 100%' }}
      />
      
      <div className="container mx-auto px-4 py-20 pt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-block">
              <span className="px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary">
                ✨ AI-Powered Fashion Experience
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Try Before
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                You Buy
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              Experience the future of online shopping with AI-powered virtual try-on, 
              skin analysis, and personalized fashion recommendations.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-primary-foreground border-0"
                onClick={() => navigate("/virtual-tryon")}
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Start Virtual Try-On
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2"
                onClick={() => navigate("/skin-analysis")}
              >
                <Scan className="mr-2 h-5 w-5" />
                Skin Analysis
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-foreground">10K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-foreground">500+</p>
                <p className="text-sm text-muted-foreground">Fashion Items</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-foreground">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full animate-float" />
            <img 
              src={heroImage}
              alt="Virtual Try-On Experience" 
              className="relative rounded-2xl shadow-glow w-full h-auto animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
