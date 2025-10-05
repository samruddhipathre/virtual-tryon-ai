import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  {
    id: 1,
    name: "Elegant Summer Dress",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL"],
    category: "Dresses"
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop",
    sizes: ["S", "M", "L", "XL"],
    category: "Jackets"
  },
  {
    id: 3,
    name: "Floral Maxi Dress",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop",
    sizes: ["XS", "S", "M", "L"],
    category: "Dresses"
  },
  {
    id: 4,
    name: "Casual Cotton T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    category: "Tops"
  },
  {
    id: 5,
    name: "High-Waist Jeans",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop",
    sizes: ["24", "26", "28", "30", "32"],
    category: "Bottoms"
  },
  {
    id: 6,
    name: "Silk Blouse",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1564257577315-87675c79c838?w=400&h=600&fit=crop",
    sizes: ["XS", "S", "M", "L"],
    category: "Tops"
  }
];

const Catalog = () => {
  const { toast } = useToast();
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});

  const handleAddToCart = (product: typeof products[0]) => {
    const size = selectedSizes[product.id];
    if (!size) {
      toast({
        title: "Please select a size",
        description: "Choose your size before adding to cart",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart! 🛍️",
      description: `${product.name} (Size: ${size}) - $${product.price}`,
    });
  };

  const handleBuyNow = (product: typeof products[0]) => {
    const size = selectedSizes[product.id];
    if (!size) {
      toast({
        title: "Please select a size",
        description: "Choose your size before purchasing",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Proceeding to checkout... 💳",
      description: `${product.name} (Size: ${size})`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Fashion
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Catalog
            </span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Discover our latest collection
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-glow transition-all duration-300">
              <div className="relative overflow-hidden aspect-[2/3]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-lg"
                    onClick={() => toast({ title: "Added to favorites! ❤️" })}
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-lg"
                    onClick={() => toast({ title: "Share link copied! 📋" })}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{product.category}</p>
                  <h3 className="text-xl font-bold text-card-foreground">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mt-2">${product.price}</p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Select Size</label>
                  <Select
                    value={selectedSizes[product.id] || ""}
                    onValueChange={(value) => setSelectedSizes(prev => ({ ...prev, [product.id]: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-gradient-primary text-primary-foreground border-0"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy Now
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
