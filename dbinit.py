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
        "image": "https://images.unsplash.com/photo-1593784991624-ec07fefb6c18",
        "description": "Chunky sneakers with a retro vibe.",
        "likes": 0,
        "price": 65.00
    },
    {
        "name": "Nike Air Max 270",
        "image": "https://images.unsplash.com/photo-1605810031315-2a5b1d7a99b3",
        "description": "Maximum comfort with visible Air unit.",
        "likes": 0,
        "price": 150.00
    },
    {
        "name": "Adidas NMD_R1",
        "image": "https://images.unsplash.com/photo-1585584602121-256eff6db1ee",
        "description": "Street-ready sneakers with responsive Boost.",
        "likes": 0,
        "price": 140.00
    },
    {
        "name": "Under Armour HOVR",
        "image": "https://images.unsplash.com/photo-1595950657878-90af7e95b099",
        "description": "Connected shoes for tracking performance.",
        "likes": 0,
        "price": 120.00
    },
    {
        "name": "Mizuno Wave Rider",
        "image": "https://images.unsplash.com/photo-1600815751966-9f74b11edb3b",
        "description": "Smooth ride and dynamic cushioning.",
        "likes": 0,
        "price": 130.00
    },
    {
        "name": "Hoka One One Clifton",
        "image": "https://images.unsplash.com/photo-1585584602121-256eff6db1ee",
        "description": "Lightweight cushioning for long runs.",
        "likes": 0,
        "price": 130.00
    },
    {
        "name": "Brooks Ghost 13",
        "image": "https://images.unsplash.com/photo-1605810031315-2a5b1d7a99b3",
        "description": "Soft, smooth ride with balanced cushioning.",
        "likes": 0,
        "price": 130.00
    },
    {
        "name": "Nike ZoomX Vaporfly",
        "image": "https://images.unsplash.com/photo-1593784991624-ec07fefb6c18",
        "description": "Record-breaking racing shoes.",
        "likes": 0,
        "price": 250.00
    },
    {
        "name": "Adidas Yeezy Boost 350",
        "image": "https://images.unsplash.com/photo-1606813907984-3b18b0efb50e",
        "description": "Fashion-forward with supreme comfort.",
        "likes": 0,
        "price": 220.00
    },
    {
        "name": "Balenciaga Triple S",
        "image": "https://images.unsplash.com/photo-1585386959984-a4155229d6d7",
        "description": "Luxury sneakers with bold design.",
        "likes": 0,
        "price": 950.00
    },
    {
        "name": "Common Projects Achilles",
        "image": "https://images.unsplash.com/photo-1617056442047-b0e689c5e5d6",
        "description": "Minimalist leather sneakers.",
        "likes": 0,
        "price": 415.00
    }
]

# Εισαγωγή στη βάση
products_collection.insert_many(products)
print("✅ Inserted 20 products successfully!")
