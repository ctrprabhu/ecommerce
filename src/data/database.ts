// This file simulates a database structure for products
// In a real application, this would be stored in MySQL

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  inStock: boolean;
  brand: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

// Categories table
export const categories: Category[] = [
  { id: "all", name: "All Products", slug: "all" },
  { id: "phones", name: "Mobile Phones", slug: "mobile-phones" },
  { id: "laptops", name: "Laptops", slug: "laptops" },
  { id: "tablets", name: "Tablets", slug: "tablets" },
  { id: "accessories", name: "Accessories", slug: "accessories" },
];

// Products table
export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 13 Pro",
    price: 999.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=400&q=80",
    category: "phones",
    description:
      "The latest iPhone with pro camera system, A15 Bionic chip, and Super Retina XDR display with ProMotion.",
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Processor: "A15 Bionic chip",
      Camera: "Pro 12MP camera system",
      Battery: "Up to 22 hours video playback",
      Storage: "128GB, 256GB, 512GB, 1TB",
    },
    images: [
      "https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=600&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
      "https://images.unsplash.com/photo-1565536421961-1f165e0c981e?w=600&q=80",
    ],
    brand: "Apple",
    inStock: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: 'MacBook Pro 14"',
    price: 1999.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    category: "laptops",
    description:
      "The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros.",
    specifications: {
      Display: "14.2-inch Liquid Retina XDR",
      Processor: "Apple M1 Pro or M1 Max chip",
      Memory: "16GB to 64GB unified memory",
      Battery: "Up to 17 hours video playback",
      Storage: "512GB to 8TB SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80",
    ],
    brand: "Apple",
    inStock: true,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-02-10"),
  },
  {
    id: "3",
    name: "iPad Air",
    price: 599.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    category: "tablets",
    description:
      "The iPad Air features a stunning 10.9-inch Liquid Retina display, powerful A14 Bionic chip, and support for Apple Pencil and Magic Keyboard.",
    specifications: {
      Display: "10.9-inch Liquid Retina",
      Processor: "A14 Bionic chip",
      Camera: "12MP Wide camera",
      Battery: "Up to 10 hours",
      Storage: "64GB or 256GB",
    },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
      "https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=600&q=80",
      "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=600&q=80",
    ],
    brand: "Apple",
    inStock: true,
    createdAt: new Date("2023-03-05"),
    updatedAt: new Date("2023-03-05"),
  },
  {
    id: "4",
    name: "AirPods Pro",
    price: 249.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80",
    category: "accessories",
    description:
      "AirPods Pro feature Active Noise Cancellation, Transparency mode, and a customizable fit for all-day comfort.",
    specifications: {
      Audio: "Active Noise Cancellation",
      Battery: "Up to 4.5 hours of listening time",
      Charging: "Wireless charging case",
      Connectivity: "Bluetooth 5.0",
      Features: "Sweat and water resistant",
    },
    images: [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80",
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&q=80",
      "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=600&q=80",
    ],
    brand: "Apple",
    inStock: true,
    createdAt: new Date("2023-04-20"),
    updatedAt: new Date("2023-04-20"),
  },
  {
    id: "5",
    name: "Samsung Galaxy S22",
    price: 899.99,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80",
    category: "phones",
    description:
      "The Samsung Galaxy S22 features a Dynamic AMOLED 2X display, pro-grade camera, and all-day battery life.",
    specifications: {
      Display: "6.1-inch Dynamic AMOLED 2X",
      Processor: "Snapdragon 8 Gen 1",
      Camera: "50MP Wide, 12MP Ultra Wide, 10MP Telephoto",
      Battery: "3,700mAh",
      Storage: "128GB, 256GB",
    },
    images: [
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=80",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    ],
    brand: "Samsung",
    inStock: true,
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-12"),
  },
  {
    id: "6",
    name: "Dell XPS 13",
    price: 1299.99,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&q=80",
    category: "laptops",
    description:
      "The Dell XPS 13 features a stunning InfinityEdge display, 11th Gen Intel processors, and long battery life in a compact design.",
    specifications: {
      Display: "13.4-inch InfinityEdge",
      Processor: "11th Gen Intel Core i5/i7",
      Memory: "8GB to 32GB LPDDR4x",
      Battery: "Up to 14 hours",
      Storage: "256GB to 2TB SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80",
    ],
    brand: "Dell",
    inStock: true,
    createdAt: new Date("2023-06-08"),
    updatedAt: new Date("2023-06-08"),
  },
  {
    id: "7",
    name: "Samsung Galaxy Tab S8",
    price: 699.99,
    rating: 4.2,
    image:
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=400&q=80",
    category: "tablets",
    description:
      "The Samsung Galaxy Tab S8 features a stunning display, powerful performance, and S Pen support for productivity and creativity.",
    specifications: {
      Display: "11-inch LTPS TFT",
      Processor: "Snapdragon 8 Gen 1",
      Camera: "13MP Wide, 6MP Ultra Wide",
      Battery: "8,000mAh",
      Storage: "128GB, 256GB",
    },
    images: [
      "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&q=80",
      "https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=600&q=80",
      "https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?w=600&q=80",
    ],
    brand: "Samsung",
    inStock: true,
    createdAt: new Date("2023-07-15"),
    updatedAt: new Date("2023-07-15"),
  },
  {
    id: "8",
    name: "Wireless Charging Pad",
    price: 49.99,
    rating: 4.0,
    image:
      "https://images.unsplash.com/photo-1618577608401-46f4a95e0e4d?w=400&q=80",
    category: "accessories",
    description:
      "This wireless charging pad provides fast, efficient charging for all Qi-compatible devices with a sleek, minimalist design.",
    specifications: {
      Input: "5V/2A, 9V/2A",
      Output: "10W max",
      Compatibility: "Qi-enabled devices",
      Features: "LED indicator, Foreign object detection",
      Dimensions: "100mm x 100mm x 10mm",
    },
    images: [
      "https://images.unsplash.com/photo-1618577608401-46f4a95e0e4d?w=600&q=80",
      "https://images.unsplash.com/photo-1628815113969-0487917fc6a1?w=600&q=80",
      "https://images.unsplash.com/photo-1628815113969-0487917fc6a1?w=600&q=80",
    ],
    brand: "Anker",
    inStock: true,
    createdAt: new Date("2023-08-20"),
    updatedAt: new Date("2023-08-20"),
  },
  {
    id: "9",
    name: "Google Pixel 6 Pro",
    price: 899.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1635870723802-e88d76ae3bf9?w=400&q=80",
    category: "phones",
    description:
      "The Google Pixel 6 Pro features Google's custom Tensor chip, an advanced camera system, and a smooth 120Hz display.",
    specifications: {
      Display: "6.7-inch LTPO OLED, 120Hz",
      Processor: "Google Tensor",
      Camera: "50MP Wide, 12MP Ultra Wide, 48MP Telephoto",
      Battery: "5,003mAh",
      Storage: "128GB, 256GB, 512GB",
    },
    images: [
      "https://images.unsplash.com/photo-1635870723802-e88d76ae3bf9?w=600&q=80",
      "https://images.unsplash.com/photo-1598965402089-897e8f3362c0?w=600&q=80",
      "https://images.unsplash.com/photo-1598965402089-897e8f3362c0?w=600&q=80",
    ],
    brand: "Google",
    inStock: true,
    createdAt: new Date("2023-09-05"),
    updatedAt: new Date("2023-09-05"),
  },
  {
    id: "10",
    name: "HP Spectre x360",
    price: 1399.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400&q=80",
    category: "laptops",
    description:
      "The HP Spectre x360 is a premium 2-in-1 laptop with a stunning OLED display, powerful performance, and versatile design.",
    specifications: {
      Display: "13.5-inch OLED touchscreen",
      Processor: "Intel Core i7-1165G7",
      Memory: "16GB LPDDR4x",
      Battery: "Up to 16 hours",
      Storage: "512GB to 2TB SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&q=80",
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&q=80",
      "https://images.unsplash.com/photo-1593642634524-b40b5baae6bb?w=600&q=80",
    ],
    brand: "HP",
    inStock: true,
    createdAt: new Date("2023-10-10"),
    updatedAt: new Date("2023-10-10"),
  },
  {
    id: "11",
    name: 'iPad Pro 12.9"',
    price: 1099.99,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80",
    category: "tablets",
    description:
      "The iPad Pro features the powerful M1 chip, a stunning Liquid Retina XDR display, and Thunderbolt connectivity for pro-level performance.",
    specifications: {
      Display: "12.9-inch Liquid Retina XDR",
      Processor: "Apple M1 chip",
      Camera: "12MP Wide, 10MP Ultra Wide",
      Battery: "Up to 10 hours",
      Storage: "128GB to 2TB",
    },
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80",
      "https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=600&q=80",
      "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=600&q=80",
    ],
    brand: "Apple",
    inStock: true,
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-11-15"),
  },
  {
    id: "12",
    name: "Bose QuietComfort Earbuds",
    price: 279.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=400&q=80",
    category: "accessories",
    description:
      "Bose QuietComfort Earbuds deliver world-class noise cancellation and premium sound quality in a comfortable, secure fit.",
    specifications: {
      Audio: "Active Noise Cancellation",
      Battery: "Up to 6 hours, 18 hours with case",
      Charging: "USB-C and wireless charging",
      Connectivity: "Bluetooth 5.1",
      Features: "IPX4 water resistance, touch controls",
    },
    images: [
      "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=600&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    ],
    brand: "Bose",
    inStock: true,
    createdAt: new Date("2023-12-01"),
    updatedAt: new Date("2023-12-01"),
  },
  {
    id: "13",
    name: "OnePlus 10 Pro",
    price: 899.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1646824371410-0b8eb1e32dd1?w=400&q=80",
    category: "phones",
    description:
      "The OnePlus 10 Pro features a Hasselblad camera system, Snapdragon 8 Gen 1, and a stunning 120Hz Fluid AMOLED display.",
    specifications: {
      Display: "6.7-inch QHD+ Fluid AMOLED, 120Hz",
      Processor: "Snapdragon 8 Gen 1",
      Camera: "48MP Wide, 50MP Ultra Wide, 8MP Telephoto",
      Battery: "5,000mAh",
      Storage: "128GB, 256GB, 512GB",
    },
    images: [
      "https://images.unsplash.com/photo-1646824371410-0b8eb1e32dd1?w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=80",
    ],
    brand: "OnePlus",
    inStock: false,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-05"),
  },
  {
    id: "14",
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1499.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=400&q=80",
    category: "laptops",
    description:
      "The ThinkPad X1 Carbon is a premium business laptop with a lightweight design, powerful performance, and enterprise-grade security features.",
    specifications: {
      Display: "14-inch WUXGA IPS",
      Processor: "Intel Core i7-1165G7",
      Memory: "16GB LPDDR4x",
      Battery: "Up to 16 hours",
      Storage: "512GB to 1TB SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=600&q=80",
      "https://images.unsplash.com/photo-1593642532400-2682810df593?w=600&q=80",
      "https://images.unsplash.com/photo-1593642532400-2682810df593?w=600&q=80",
    ],
    brand: "Lenovo",
    inStock: true,
    createdAt: new Date("2024-02-10"),
    updatedAt: new Date("2024-02-10"),
  },
  {
    id: "15",
    name: "Microsoft Surface Pro 8",
    price: 999.99,
    rating: 4.4,
    image:
      "https://images.unsplash.com/photo-1622533950960-2ed47209d4a2?w=400&q=80",
    category: "tablets",
    description:
      "The Surface Pro 8 is a versatile 2-in-1 device with a stunning 120Hz display, powerful Intel processors, and Thunderbolt 4 connectivity.",
    specifications: {
      Display: "13-inch PixelSense Flow, 120Hz",
      Processor: "Intel Core i5/i7",
      Camera: "10MP rear, 5MP front",
      Battery: "Up to 16 hours",
      Storage: "128GB to 1TB SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1622533950960-2ed47209d4a2?w=600&q=80",
      "https://images.unsplash.com/photo-1628815113969-0487917fc6a1?w=600&q=80",
      "https://images.unsplash.com/photo-1628815113969-0487917fc6a1?w=600&q=80",
    ],
    brand: "Microsoft",
    inStock: true,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
  },
  {
    id: "16",
    name: "Sony WH-1000XM4",
    price: 349.99,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1618066296858-0c472a186eb9?w=400&q=80",
    category: "accessories",
    description:
      "The Sony WH-1000XM4 headphones deliver industry-leading noise cancellation, exceptional sound quality, and long battery life.",
    specifications: {
      Audio: "Industry-leading noise cancellation",
      Battery: "Up to 30 hours",
      Charging: "USB-C, quick charge",
      Connectivity: "Bluetooth 5.0, NFC",
      Features: "Touch controls, speak-to-chat, multipoint connection",
    },
    images: [
      "https://images.unsplash.com/photo-1618066296858-0c472a186eb9?w=600&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80",
    ],
    brand: "Sony",
    inStock: true,
    createdAt: new Date("2024-04-01"),
    updatedAt: new Date("2024-04-01"),
  },
  {
    id: "17",
    name: "ASUS ROG Zephyrus G14",
    price: 1499.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400&q=80",
    category: "laptops",
    description:
      "The ASUS ROG Zephyrus G14 is a powerful gaming laptop with AMD Ryzen 9 processor, NVIDIA RTX graphics, and a compact design.",
    specifications: {
      Display: "14-inch QHD 120Hz",
      Processor: "AMD Ryzen 9 5900HS",
      Graphics: "NVIDIA GeForce RTX 3060",
      Memory: "16GB DDR4",
      Storage: "1TB NVMe SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&q=80",
      "https://images.unsplash.com/photo-1593642702749-b7d2a804fbcf?w=600&q=80",
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&q=80",
    ],
    brand: "ASUS",
    inStock: true,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "18",
    name: "Razer Blade 15",
    price: 1999.99,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400&q=80",
    category: "laptops",
    description:
      "The Razer Blade 15 is a premium gaming laptop with a sleek aluminum chassis, powerful components, and a vibrant display.",
    specifications: {
      Display: "15.6-inch FHD 360Hz",
      Processor: "Intel Core i7-11800H",
      Graphics: "NVIDIA GeForce RTX 3080",
      Memory: "32GB DDR4",
      Storage: "1TB NVMe SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=600&q=80",
      "https://images.unsplash.com/photo-1525971977907-b3321e8d032d?w=600&q=80",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80",
    ],
    brand: "Razer",
    inStock: true,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
  {
    id: "19",
    name: "Acer Predator Helios 300",
    price: 1299.99,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80",
    category: "laptops",
    description:
      "The Acer Predator Helios 300 is a powerful gaming laptop with a high refresh rate display, advanced cooling, and customizable RGB lighting.",
    specifications: {
      Display: "15.6-inch FHD 144Hz",
      Processor: "Intel Core i7-11800H",
      Graphics: "NVIDIA GeForce RTX 3060",
      Memory: "16GB DDR4",
      Storage: "512GB NVMe SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
      "https://images.unsplash.com/photo-1593642634443-44adaa06623a?w=600&q=80",
      "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?w=600&q=80",
    ],
    brand: "Acer",
    inStock: true,
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
  {
    id: "20",
    name: "MSI GS66 Stealth",
    price: 1799.99,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
    category: "laptops",
    description:
      "The MSI GS66 Stealth is a sleek gaming laptop with a thin profile, powerful performance, and a stunning display for immersive gaming.",
    specifications: {
      Display: "15.6-inch QHD 240Hz",
      Processor: "Intel Core i9-11900H",
      Graphics: "NVIDIA GeForce RTX 3070",
      Memory: "32GB DDR4",
      Storage: "1TB NVMe SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80",
      "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=600&q=80",
      "https://images.unsplash.com/photo-1629429407756-28d34d2e30b8?w=600&q=80",
    ],
    brand: "MSI",
    inStock: true,
    createdAt: new Date("2024-03-20"),
    updatedAt: new Date("2024-03-20"),
  },
  {
    id: "21",
    name: "Alienware m15 R6",
    price: 2199.99,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
    category: "laptops",
    description:
      "The Alienware m15 R6 is a high-performance gaming laptop with advanced cooling technology, premium build quality, and customizable lighting.",
    specifications: {
      Display: "15.6-inch QHD 240Hz",
      Processor: "Intel Core i9-11900H",
      Graphics: "NVIDIA GeForce RTX 3080",
      Memory: "32GB DDR4",
      Storage: "2TB NVMe SSD",
    },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&q=80",
      "https://images.unsplash.com/photo-1629429407756-28d34d2e30b8?w=600&q=80",
      "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=600&q=80",
    ],
    brand: "Dell",
    inStock: true,
    createdAt: new Date("2024-04-05"),
    updatedAt: new Date("2024-04-05"),
  },
];

// Cart items table (would normally be associated with a user)
export const cartItems: CartItem[] = [
  {
    id: "1",
    productId: "1",
    quantity: 1,
    price: 999.99,
  },
  {
    id: "2",
    productId: "2",
    quantity: 1,
    price: 1299.99,
  },
  {
    id: "3",
    productId: "4",
    quantity: 2,
    price: 249.99,
  },
];

// Database service to simulate database operations
export const db = {
  // Product operations
  getProducts: () => products,
  getProductById: (id: string) => products.find((product) => product.id === id),
  getProductsByCategory: (categoryId: string) =>
    categoryId === "all"
      ? products
      : products.filter((product) => product.category === categoryId),
  getProductsByBrand: (brand: string) =>
    products.filter((product) => product.brand === brand),
  getBrands: () => {
    const brands = new Set(products.map((product) => product.brand));
    return Array.from(brands).map((brand) => ({
      id: brand.toLowerCase(),
      name: brand,
    }));
  },
  searchProducts: (query: string) =>
    products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()),
    ),
  sortProducts: (products: Product[], sortOption: string) => {
    const sortedProducts = [...products];
    switch (sortOption) {
      case "price-low":
        return sortedProducts.sort((a, b) => a.price - b.price);
      case "price-high":
        return sortedProducts.sort((a, b) => b.price - a.price);
      case "popularity":
        return sortedProducts.sort((a, b) => b.rating - a.rating);
      case "newest":
        return sortedProducts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      case "brand":
        return sortedProducts.sort((a, b) => a.brand.localeCompare(b.brand));
      default:
        return sortedProducts;
    }
  },

  // Category operations
  getCategories: () => categories,
  getCategoryById: (id: string) =>
    categories.find((category) => category.id === id),

  // Cart operations
  getCartItems: () => cartItems,
  addToCart: (productId: string, quantity: number = 1) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    const existingItem = cartItems.find((item) => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
      return existingItem;
    } else {
      const newItem = {
        id: (cartItems.length + 1).toString(),
        productId,
        quantity,
        price: product.price,
      };
      cartItems.push(newItem);
      return newItem;
    }
  },
  updateCartItem: (id: string, quantity: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.quantity = quantity;
      return item;
    }
    return null;
  },
  removeFromCart: (id: string) => {
    const index = cartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      const removed = cartItems.splice(index, 1)[0];
      return removed;
    }
    return null;
  },
  clearCart: () => {
    cartItems.length = 0;
    return true;
  },
  getCartTotal: () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  },
};
