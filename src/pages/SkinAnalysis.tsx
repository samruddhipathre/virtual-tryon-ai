import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scan, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const SkinAnalysis = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisComplete(true);
          toast({
            title: "Analysis complete! ✨",
            description: "Your personalized recommendations are ready"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const recommendations = {
    skinTone: "Warm Olive",
    bestColors: ["Emerald Green", "Burgundy", "Navy Blue", "Coral", "Gold"],
    bodyShape: "Hourglass",
    recommendedStyles: ["Fitted dresses", "High-waist pants", "Wrap tops", "A-line skirts"],
    avoidColors: ["Neon colors", "Very light pastels"]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Skin & Body
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Analysis
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Get personalized color and style recommendations
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto flex items-center justify-center">
                <Scan className="h-12 w-12 text-primary-foreground" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-2 text-card-foreground">AI-Powered Analysis</h2>
                <p className="text-muted-foreground">
                  Our advanced AI will analyze your skin tone and body shape to provide personalized recommendations
                </p>
              </div>

              {isAnalyzing && (
                <div className="space-y-4">
                  <Progress value={progress} className="w-full" />
                  <p className="text-sm text-muted-foreground">Analyzing... {progress}%</p>
                </div>
              )}

              {!analysisComplete && !isAnalyzing && (
                <Button 
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground border-0"
                  onClick={startAnalysis}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Start Analysis
                </Button>
              )}
            </div>
          </Card>

          {analysisComplete && (
            <div className="space-y-6 animate-fade-in">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-card-foreground">Your Skin Tone</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-900" />
                  <div>
                    <p className="text-2xl font-bold text-primary">{recommendations.skinTone}</p>
                    <p className="text-sm text-muted-foreground">Perfect for warm color palettes</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-card-foreground">Best Colors for You</h3>
                <div className="flex flex-wrap gap-3">
                  {recommendations.bestColors.map((color, i) => (
                    <div key={i} className="px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground font-medium">
                      {color}
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-card-foreground">Your Body Shape</h3>
                <p className="text-2xl font-bold text-primary mb-4">{recommendations.bodyShape}</p>
                <div className="space-y-2">
                  <p className="font-semibold text-card-foreground">Recommended Styles:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {recommendations.recommendedStyles.map((style, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-muted-foreground">{style}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-destructive/50">
                <h3 className="text-xl font-bold mb-4 text-card-foreground">Colors to Avoid</h3>
                <div className="flex flex-wrap gap-3">
                  {recommendations.avoidColors.map((color, i) => (
                    <div key={i} className="px-4 py-2 bg-destructive/10 border border-destructive/30 rounded-full text-destructive font-medium">
                      {color}
                    </div>
                  ))}
                </div>
              </Card>

              <Button 
                className="w-full bg-gradient-primary text-primary-foreground border-0"
                size="lg"
                onClick={() => window.location.href = "/catalog"}
              >
                Browse Recommended Items
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkinAnalysis;
