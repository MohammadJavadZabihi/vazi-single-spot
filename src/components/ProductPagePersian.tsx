import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  Heart, 
  Share2, 
  Minus, 
  Plus, 
  ShoppingCart, 
  Truck,
  Shield,
  RotateCcw,
  CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import disinfectantMain from "@/assets/disinfectant-main.jpg";
import disinfectantSide from "@/assets/disinfectant-side.jpg";
import disinfectantBack from "@/assets/disinfectant-back.jpg";
import floorCleaner from "@/assets/floor-cleaner.jpg";
import glassCleaner from "@/assets/glass-cleaner.jpg";
import bathroomKit from "@/assets/bathroom-kit.jpg";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  category: string;
  inStock: boolean;
  features: string[];
  specifications: { [key: string]: string };
}

const sampleProduct: Product = {
  id: "1",
  name: "اسپری ضدعفونی کننده همه کاره اولترا کلین",
  price: 520000,
  originalPrice: 680000,
  rating: 4.8,
  reviewCount: 247,
  description: "اسپری ضدعفونی کننده درجه بیمارستانی که ۹۹.۹٪ از میکروب ها و باکتری ها را از بین می برد. مناسب برای آشپزخانه، حمام و تمام سطوح. با رایحه نعنای تازه که خانه شما را معطر و تمیز نگه می دارد.",
  images: [
    disinfectantMain,
    disinfectantSide,
    disinfectantBack
  ],
  category: "ضدعفونی کننده ها",
  inStock: true,
  features: [
    "از بین بردن ۹۹.۹٪ میکروب ها و باکتری ها",
    "ایمن برای تمام سطوح",
    "رایحه نعنای تازه",
    "بدون مواد شیمیایی مضر",
    "فرمول سریع خشک شونده",
    "تایید شده توسط سازمان حفاظت محیط زیست"
  ],
  specifications: {
    "حجم": "۹۴۶ میلی لیتر",
    "رایحه": "نعنای تازه",
    "نوع سطح": "تمام سطوح",
    "قدرت از بین بردن میکروب": "۹۹.۹٪",
    "زمان خشک شدن": "۳۰ ثانیه",
    "ترکیبات": "فرمول گیاهی"
  }
};

const relatedProducts = [
  {
    id: "2",
    name: "تمیزکننده کف دوستدار محیط زیست",
    price: 400000,
    rating: 4.6,
    image: floorCleaner
  },
  {
    id: "3", 
    name: "تمیزکننده شیشه و آینه",
    price: 320000,
    rating: 4.7,
    image: glassCleaner
  },
  {
    id: "4",
    name: "کیت تمیزکاری عمیق حمام",
    price: 1000000,
    rating: 4.9,
    image: bathroomKit
  }
];

export function ProductPagePersian() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const product = sampleProduct;

  const handleAddToCart = () => {
    toast.success(`${quantity} عدد ${product.name} به سبد خرید اضافه شد!`, {
      description: `مجموع: ${(product.price * quantity).toLocaleString('fa-IR')} تومان`,
    });
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR');
  };

  return (
    <div className="min-h-screen bg-background font-vazir" dir="rtl">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                وازی کلین شاپ
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <a href="#" className="text-foreground hover:text-primary transition-colors">خانه</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">محصولات</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">درباره ما</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">تماس</a>
            </nav>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="outline" size="sm">
                <ShoppingCart className="w-4 h-4 ml-2" />
                سبد خرید
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center space-x-2 space-x-reverse text-sm text-muted-foreground">
          <span>خانه</span>
          <span>/</span>
          <span>محصولات تمیزکننده</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </nav>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden product-shadow bg-card">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex space-x-4 space-x-reverse">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-primary shadow-lg' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} نمای ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center space-x-4 space-x-reverse mb-4">
                <div className="flex items-center space-x-1 space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm font-medium mr-2">{product.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount.toLocaleString('fa-IR')} نظر)
                </span>
              </div>

              <div className="flex items-center space-x-4 space-x-reverse mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)} تومان
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)} تومان
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="destructive">
                    {formatPrice(product.originalPrice - product.price)} تومان تخفیف
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">ویژگی های کلیدی:</h3>
                <div className="grid grid-cols-1 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 space-x-reverse">
                      <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="font-medium">تعداد:</span>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity.toLocaleString('fa-IR')}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-4 space-x-reverse">
                <Button
                  className="flex-1 btn-clean"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="w-5 h-5 ml-2" />
                  افزودن به سبد خرید
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </Button>
                
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              {!product.inStock && (
                <p className="text-destructive font-medium">
                  در حال حاضر موجود نیست
                </p>
              )}
            </div>

            <Separator />

            {/* Shipping & Returns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Truck className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">ارسال رایگان</p>
                  <p className="text-xs text-muted-foreground">خرید بالای ۱ میلیون تومان</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <Shield className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">پرداخت امن</p>
                  <p className="text-xs text-muted-foreground">رمزگذاری SSL</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <RotateCcw className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">بازگشت ۳۰ روزه</p>
                  <p className="text-xs text-muted-foreground">بازگشت آسان کالا</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">توضیحات</TabsTrigger>
              <TabsTrigger value="specifications">مشخصات</TabsTrigger>
              <TabsTrigger value="reviews">نظرات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">توضیحات محصول</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">ویژگی ها و مزایا:</h4>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 space-x-reverse">
                          <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">مشخصات محصول</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">نظرات مشتریان</h3>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="font-medium">علی محمدی</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">۲ روز پیش</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        محصول عالی و کیفیت فوق العاده. واقعا میکروب ها رو از بین می بره و رایحه خوبی داره.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <span className="font-medium">سارا احمدی</span>
                          <div className="flex items-center">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <Star className="w-4 h-4 text-gray-300" />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">۱ هفته پیش</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        برای تمیز کردن آشپزخانه استفاده کردم. خیلی مؤثر بود ولی بوی نعنا کمی تند بود.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">محصولات مشابه</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="product-card">
                <CardContent className="p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">
                      {formatPrice(relatedProduct.price)} تومان
                    </span>
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{relatedProduct.rating}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-card border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">وازی کلین شاپ</h3>
              <p className="text-muted-foreground text-sm">
                بهترین محصولات تمیزکننده برای خانه شما
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">دسته بندی ها</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">ضدعفونی کننده ها</a></li>
                <li><a href="#" className="hover:text-primary">تمیزکننده کف</a></li>
                <li><a href="#" className="hover:text-primary">تمیزکننده شیشه</a></li>
                <li><a href="#" className="hover:text-primary">کیت های تمیزکاری</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">خدمات مشتریان</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">تماس با ما</a></li>
                <li><a href="#" className="hover:text-primary">سوالات متداول</a></li>
                <li><a href="#" className="hover:text-primary">راهنمای خرید</a></li>
                <li><a href="#" className="hover:text-primary">ضمانت بازگشت</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">تماس با ما</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</p>
                <p>ایمیل: info@vaziclean.ir</p>
                <p>آدرس: تهران، میدان ولیعصر</p>
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="text-center text-sm text-muted-foreground">
            © ۱۴۰۳ وازی کلین شاپ. تمامی حقوق محفوظ است.
          </div>
        </div>
      </footer>
    </div>
  );
}