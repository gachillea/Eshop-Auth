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
        "image": "img\20230316091638_nike_react_infinity_run_flyknit_3_dz3014_401_andrika_athlitika_papoutsia_running_college_navy_midnight_navy_black_metallic_silver.jpeg",
        "description": "Chunky sneakers with a retro vibe.",
        "likes": 11,
        "price": 65.00
    },
    {
        "name": "Nike Air Max 270",
        "image": "img\papoytsia-nike-air-max-2090-se-2-gs-da2417-100-white-bright-mango.jpg",
        "description": "Maximum comfort with visible Air unit.",
        "likes": 9,
        "price": 150.00
    },
    {
        "name": "Adidas NMD_R1",
        "image": "img\CK6357-001_00336_1.jpg",
        "description": "Street-ready sneakers with responsive Boost.",
        "likes": 21,
        "price": 140.00
    },
    {
        "name": "Under Armour HOVR",
        "image": "img\16849169_33513087_1000.webp",
        "description": "Connected shoes for tracking performance.",
        "likes": 54,
        "price": 120.00
    },
    {
        "name": "Mizuno Wave Rider",
        "image": "img\papoytsia-nike-air-max-up-dc9206-700-chutney-black-white.jpg",
        "description": "Smooth ride and dynamic cushioning.",
        "likes": 5,
        "price": 130.00
    },
    {
        "name": "Hoka One One Clifton",
        "image": "img\papoytsia-nike-air-max-2090-eoi-da9357-100-summit-white-racer-blue-black.jpg",
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
        "image": "img\fixedratio_20231215093303_nike_athlitika_paidika_papoutsia_running_dunk_low_fv7021_400_mple.jpeg",
        "description": "Record-breaking racing shoes.",
        "likes": 1,
        "price": 250.00
    },
    {
        "name": "Adidas Yeezy Boost 350",
        "image": "img\papoytsia-nike-w-air-max-270-react-ct1287-600-barely-rose-white-black.jpg",
        "description": "Fashion-forward with supreme comfort.",
        "likes": 24,
        "price": 220.00
    },
    {
        "name": "Balenciaga Triple S",
        "image": "img\papoytsia-nike-w-air-max-270-react-ct1287-600-barely-rose-white-black.jpg",
        "description": "Luxury sneakers with bold design.",
        "likes": 22,
        "price": 950.00
    },
    {
        "name": "Common Projects Achilles",
        "image": "img\papoytsia-nike-w-air-max-270-react-ct1287-600-barely-rose-white-black.jpg",
        "description": "Minimalist leather sneakers.",
        "likes": 7,
        "price": 415.00
    }
]

# Εισαγωγή στη βάση
products_collection.insert_many(products)
print("✅ Inserted 20 products successfully!")
