import { Camera, Scan, Sparkles, MessageCircle, Share2, ShoppingBag } from "lucide-react";
import { Card } from "./ui/card";

const features = [
  {
    icon: Sparkles,
    title: "Virtual Try-On",
    description: "See how clothes look on you instantly with AR technology",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    icon: Scan,
    title: "Skin Analysis",
    description: "Get personalized color recommendations based on your skin tone",
    gradient: "from-pink-500 to-orange-500"
  },
  {
    icon: Camera,
    title: "Body Shape Analysis",
    description: "Find the perfect fit with AI-powered body measurements",
    gradient: "from-purple-600 to-blue-500"
  },
  {
    icon: MessageCircle,
    title: "Fashion Chatbot",
    description: "Get style advice from our AI fashion consultant 24/7",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    icon: Share2,
    title: "Share Your Look",
    description: "Share your virtual try-on with friends for feedback",
    gradient: "from-cyan-500 to-teal-500"
  },
  {
    icon: ShoppingBag,
    title: "Smart Shopping",
    description: "Personalized recommendations based on your preferences",
    gradient: "from-teal-500 to-green-500"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Revolutionary Shopping
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powered by cutting-edge AI technology to give you the best online shopping experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-glow transition-all duration-300 border-2 hover:border-primary/50 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
