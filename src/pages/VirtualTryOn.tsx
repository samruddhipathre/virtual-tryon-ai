import { useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, Share2, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const VirtualTryOn = () => {
  const { toast } = useToast();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use this feature",
        variant: "destructive"
      });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        setCapturedImage(canvas.toDataURL('image/jpeg'));
        stopCamera();
        toast({
          title: "Photo captured! 📸",
          description: "Now you can try on clothes virtually"
        });
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsStreaming(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
        toast({
          title: "Photo uploaded! 📤",
          description: "Ready for virtual try-on"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Virtual
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Try-On
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            See how clothes look on you with AI-powered AR technology
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 space-y-6">
            <div className="aspect-[3/4] bg-muted rounded-lg overflow-hidden relative">
              {!capturedImage && !isStreaming && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Camera className="h-20 w-20 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Start camera or upload a photo</p>
                  </div>
                </div>
              )}
              
              {isStreaming && (
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  className="w-full h-full object-cover"
                />
              )}

              {capturedImage && (
                <img 
                  src={capturedImage} 
                  alt="Captured" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="flex gap-3">
              {!isStreaming && !capturedImage && (
                <>
                  <Button 
                    className="flex-1 bg-gradient-primary text-primary-foreground border-0"
                    onClick={startCamera}
                  >
                    <Camera className="mr-2 h-5 w-5" />
                    Start Camera
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Photo
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </>
              )}

              {isStreaming && (
                <Button 
                  className="flex-1 bg-gradient-primary text-primary-foreground border-0"
                  onClick={capturePhoto}
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Capture Photo
                </Button>
              )}

              {capturedImage && (
                <>
                  <Button 
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setCapturedImage(null);
                      toast({ title: "Ready for new photo! 📷" });
                    }}
                  >
                    Retake
                  </Button>
                  <Button 
                    className="flex-1 bg-gradient-primary text-primary-foreground border-0"
                    onClick={() => toast({ title: "Shared with friends! 🎉" })}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Look
                  </Button>
                </>
              )}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Try On Clothes</h3>
              <p className="text-muted-foreground mb-6">
                Select a clothing item from our catalog to see how it looks on you
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i}
                    className="aspect-square bg-muted rounded-lg cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                    onClick={() => toast({ title: "Item selected! ✨", description: "Virtual try-on applied" })}
                  >
                    <img 
                      src={`https://images.unsplash.com/photo-${1595777457583 + i}?w=200&h=200&fit=crop`}
                      alt={`Clothing ${i}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </Card>

            {capturedImage && (
              <Card className="p-6 bg-gradient-primary text-primary-foreground">
                <h3 className="text-xl font-bold mb-4">Ready to Purchase?</h3>
                <div className="flex gap-3">
                  <Button 
                    variant="secondary"
                    className="flex-1"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="secondary"
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualTryOn;
