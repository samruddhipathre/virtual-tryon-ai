import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { toast } = useToast();

  const cartItems = [
    {
      id: 1,
      name: "Elegant Summer Dress",
      price: 89.99,
      size: "M",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 129.99,
      size: "L",
      quantity: 1,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=200&h=300&fit=crop"
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Shopping
            <span className="block bg-gradient-primary bg-clip-text text-transparent">
              Cart
            </span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-6">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-24 h-32 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-card-foreground mb-2">{item.name}</h3>
                    <p className="text-muted-foreground mb-2">Size: {item.size}</p>
                    <p className="text-2xl font-bold text-primary">${item.price}</p>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => toast({ title: "Item removed", variant: "destructive" })}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-32 space-y-6">
              <h2 className="text-2xl font-bold text-card-foreground">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold text-card-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold text-card-foreground">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-card-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-primary text-primary-foreground border-0"
                size="lg"
                onClick={() => toast({ title: "Proceeding to checkout... 💳" })}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Checkout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
