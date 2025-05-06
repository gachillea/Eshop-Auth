from pymongo import MongoClient

client = MongoClient("mongodb+srv://poirotyourdad:6KuWTADXrqLHwoEg@cluster0.tjww1fn.mongodb.net/eshop?retryWrites=true&w=majority")
db = client["eshop"]
products_collection = db["products"]

# Καθαρίζουμε παλιά δεδομένα
products_collection.delete_many({})

# Λίστα με προϊόντα
products = [
    {
        "name": "Nike Air Force 1",
        "image": "img\slider1.png",
        "description": "Classic all-white sneakers for everyday wear.",
        "likes": 5,
        "price": 99.99
    },
    {
        "name": "Adidas Ultraboost",
        "image": "img\slider2.png",
        "description": "Responsive running shoes with Primeknit upper.",
        "likes": 6,
        "price": 180.00
    },
    {
        "name": "New Balance 574",
        "image": "img\slider3.png",
        "description": "Retro-inspired design with modern comfort.",
        "likes": 6,
        "price": 79.99
    },
    {
        "name": "Vans Old Skool",
        "image": "img\20210705143432_nike_air_max_ap_cu4870_102.jpeg",
        "description": "Timeless skate shoes with signature side stripe.",
        "likes": 2,
        "price": 65.00
    },
    {
        "name": "Converse Chuck Taylor",
        "image": "img\AIR+JORDAN+XXXIX.avif",
        "description": "Iconic canvas high-tops loved worldwide.",
        "likes": 1,
        "price": 55.00
    },
    {
        "name": "Puma RS-X",
        "image": "img\BQ6472-079.jpg",
        "description": "Bold sneakers with exaggerated design.",
        "likes": 9,
        "price": 110.00
    },
    {
        "name": "Reebok Classic",
        "image": "img\DQ5319-182-ZOOM-VAPOR-15-ACADEMY-CR7-TF--1-.webp",
        "description": "Vintage style with modern performance.",
        "likes": 4,
        "price": 75.00
    },
    {
        "name": "Asics Gel-Kayano",
        "image": "img\M+AIR+MAX+ALPHA+TRAINER+6.png",
        "description": "Stability running shoes for long distances.",
        "likes": 56,
        "price": 160.00
    },
    {
        "name": "Saucony Jazz Original",
        "image": "img/Nike-AIR-MAX-270-DR8616-002-7-141448.jpg",
        "description": "Classic silhouette with suede overlays.",
        "likes": 6,
        "price": 70.00
    },
    {
        "name": "Fila Disruptor II",
        "image": "img\1556130360-vaporfly-4-flyknit-running-shoe-v7G3FB.avif",
        "description": "Chunky sneakers with a retro vibe.",
        "likes": 11,
        "price": 65.00
    },
    {
        "name": "Nike Air Max 270",
        "image": "img\68c4510c-d8f5-46d8-91cb-7b3cdc9dce69_1.129c3d1419b9235fad8a39cfdb47a1e2.webp",
        "description": "Maximum comfort with visible Air unit.",
        "likes": 9,
        "price": 150.00
    },
    {
        "name": "Adidas NMD_R1",
        "image": "img\nike-blackvarsity-redwhite-sweet-classic-leather-high-top-sneakers-product-1-10346662-141973395.webp",
        "description": "Street-ready sneakers with responsive Boost.",
        "likes": 21,
        "price": 140.00
    },
    {
        "name": "Under Armour HOVR",
        "image": "img\14d11ee258558984aae7c5e2f9b04320.jpg",
        "description": "Connected shoes for tracking performance.",
        "likes": 54,
        "price": 120.00
    },
    {
        "name": "Mizuno Wave Rider",
        "image": "img\3695ddaf-7394-4a0b-bd31-3d9e3936fcad_1.27c350e70a4a6a579ca7f9c74e3241d6.webp",
        "description": "Smooth ride and dynamic cushioning.",
        "likes": 5,
        "price": 130.00
    },
    {
        "name": "Hoka One One Clifton",
        "image": "img\th.jpe",
        "description": "Lightweight cushioning for long runs.",
        "likes": 44,
        "price": 130.00
    },
    {
        "name": "Brooks Ghost 13",
        "image": "img\pexels-aman-jakhar-1124466.jpg.crdownload",
        "description": "Soft, smooth ride with balanced cushioning.",
        "likes": 90,
        "price": 130.00
    },
    {
        "name": "Nike ZoomX Vaporfly",
        "image": "img\14d11ee258558984aae7c5e2f9b04320.jpg",
        "description": "Record-breaking racing shoes.",
        "likes": 1,
        "price": 250.00
    },
    {
        "name": "Adidas Yeezy Boost 350",
        "image": "img\ClOquVt.jpg.crdownload",
        "description": "Fashion-forward with supreme comfort.",
        "likes": 24,
        "price": 220.00
    },
    {
        "name": "Balenciaga Triple S",
        "image": "img\nike-shoe-png-nike-running-shoes-png-image-1276.png.crdownload",
        "description": "Luxury sneakers with bold design.",
        "likes": 22,
        "price": 950.00
    },
    {
        "name": "Common Projects Achilles",
        "image": "img\nike-shoe-png-nike-running-shoes-png-image-1276.png.crdownload",
        "description": "Minimalist leather sneakers.",
        "likes": 7,
        "price": 415.00
    }
]

# Εισαγωγή στη βάση
products_collection.insert_many(products)
print("✅ Inserted 20 products successfully!")
