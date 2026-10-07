import json
import os
from database import SessionLocal, ProductInventory, AdCampaign, User, HistoricalAttribution, init_db, Base, engine
from models import Product

Base.metadata.drop_all(bind=engine)
init_db()
db = SessionLocal()

# Clear existing tables for a clean, consistent seed
db.query(HistoricalAttribution).delete()
db.query(AdCampaign).delete()
db.query(ProductInventory).delete()
db.query(Product).delete()

# Pre-seed team users
users_to_seed = [
    {
        "google_id": "sandru_vit_auth",
        "email": "sandru.s2026@vitstudent.ac.in",
        "name": "Sandru S 26BMV1087",
        "assigned_category": "apparel"
    },
    {
        "google_id": "shailja_vit_auth",
        "email": "shailja.singh2026@vitstudent.ac.in",
        "name": "Shailja Singh",
        "assigned_category": "footwear"
    }
]

for u_data in users_to_seed:
    user = db.query(User).filter(User.email == u_data["email"]).first()
    if not user:
        user = User(
            google_id=u_data["google_id"],
            email=u_data["email"],
            name=u_data["name"],
            assigned_category=u_data["assigned_category"]
        )
        db.add(user)
    else:
        user.assigned_category = u_data["assigned_category"]
        user.name = u_data["name"]

db.commit()

# Load raw product data
data_file = os.path.join(os.path.dirname(__file__), "data.json")
with open(data_file, "r") as f:
    raw_products = json.load(f)

products = []
products_table = []
campaigns = []

platforms = ["Meta Ads", "Google Ads", "Amazon Ads", "TikTok Ads"]

for idx, p in enumerate(raw_products):
    sku = p["id"]
    name = p["name"]
    category = "FOOTWEAR" if sku.startswith("FW") else "APPAREL"
    stock = int(p["unit_stock"])
    cost = float(p["cost"])
    price = float(p["selling_price"])
    offer = float(p.get("offer", 0))
    ad_spend = float(p.get("ad_expenditure", 3000))

    # Anomaly tweaks for clear executive demonstration:
    # 1. FW-1015 (Hiking Boots - Brown): 0 stock (CRITICAL OUT OF STOCK / WASTED SPEND)
    # 2. FW-1005 (Hiking Boots - Olive): 18 stock (ABOUT TO SOLD OUT / THROTTLE WARNING)
    # 3. AP-2007 (Floral Midi Dress): 22 stock (ABOUT TO SOLD OUT)
    if sku == "FW-1015":
        stock = 0
    elif sku == "FW-1005":
        stock = 18
    elif sku == "AP-2007":
        stock = 22

    product = ProductInventory(
        id=sku,
        name=name,
        category=category,
        unit_stock=stock,
        cost=cost,
        selling_price=price,
        offer=offer,
        ad_expenditure=ad_spend
    )
    products.append(product)

    product_row = Product(
        id=sku,
        name=name,
        unit_stock=stock,
        cost=cost,
        selling_price=price,
        offer=offer,
        ad_expenditure=ad_spend
    )
    products_table.append(product_row)

    # Impression & Funnel Performance Modeling
    platform = platforms[idx % len(platforms)]
    camp_name = f"{name.split(' - ')[0].replace(' ', '_')}_{platform.split()[0]}_Conversions"

    # Multi-tier impression calculations based on spend
    cpm_base = 190.0 + ((idx * 17) % 50)
    served_imp = int((ad_spend / cpm_base) * 1000)
    if served_imp < 5000: served_imp = 8500 + idx * 450
    
    # MRC Viewable Impressions (68% - 84% viewability rate)
    viewable_rate = 0.68 + ((idx * 3) % 15) * 0.01
    viewable_imp = int(served_imp * viewable_rate)

    # Unique Reach (Gross vs Unique Impressions: Frequency ~ 1.2x to 1.8x)
    freq = 1.25 + ((idx * 5) % 11) * 0.05
    unique_reach = int(served_imp / freq)

    # Clicks (CTR: 1.8% to 4.2%)
    ctr = 0.022 + ((idx * 4) % 18) * 0.001
    clicks = int(served_imp * ctr)

    # Conversion & Revenue
    if sku == "FW-1015":
        revenue = 0.0
        conversions = 0
    elif sku == "FW-1002":
        revenue = round(ad_spend * 4.8, 2)
        conversions = int(clicks * 0.088)
    elif sku == "AP-2001":
        revenue = round(ad_spend * 6.2, 2)
        conversions = int(clicks * 0.112)
    elif sku in ["FW-1005", "AP-2007"]:
        revenue = round(ad_spend * 3.4, 2)
        conversions = int(clicks * 0.065)
    else:
        roas_mult = 2.2 + ((idx * 7) % 13) * 0.1
        revenue = round(ad_spend * roas_mult, 2)
        conversions = int(clicks * 0.052)

    campaign = AdCampaign(
        sku=sku,
        platform=platform,
        campaign_name=camp_name,
        daily_spend=ad_spend,
        revenue_generated=revenue,
        status="ACTIVE",
        served_impressions=served_imp,
        viewable_impressions=viewable_imp,
        unique_reach=unique_reach,
        clicks=clicks,
        conversions=conversions
    )
    campaigns.append(campaign)

db.add_all(products)
db.add_all(products_table)
db.commit()

db.add_all(campaigns)
db.commit()

# Seed 6-Month Historical Attribution Data (May 2026 - Oct 2026)
months_data_fw = [
    {"name": "May 2026", "idx": 1, "spend": 45000, "rev": 105000, "imp": 210000, "view": 155000, "reach": 140000, "clk": 6200, "cart": 1850, "conv": 420, "plat": "Meta Ads"},
    {"name": "Jun 2026", "idx": 2, "spend": 52000, "rev": 128000, "imp": 245000, "view": 182000, "reach": 165000, "clk": 7400, "cart": 2200, "conv": 510, "plat": "Google Ads"},
    {"name": "Jul 2026", "idx": 3, "spend": 58000, "rev": 149000, "imp": 278000, "view": 211000, "reach": 188000, "clk": 8600, "cart": 2650, "conv": 630, "plat": "Meta Ads"},
    {"name": "Aug 2026", "idx": 4, "spend": 62000, "rev": 164000, "imp": 298000, "view": 228000, "reach": 202000, "clk": 9400, "cart": 2980, "conv": 710, "plat": "Amazon Ads"},
    {"name": "Sep 2026", "idx": 5, "spend": 66000, "rev": 172000, "imp": 320000, "view": 248000, "reach": 218000, "clk": 10200, "cart": 3250, "conv": 780, "plat": "Meta Ads"},
    {"name": "Oct 2026", "idx": 6, "spend": 69800, "rev": 186500, "imp": 345000, "view": 269000, "reach": 235000, "clk": 11400, "cart": 3680, "conv": 890, "plat": "Google Ads"},
]

months_data_ap = [
    {"name": "May 2026", "idx": 1, "spend": 51000, "rev": 125000, "imp": 240000, "view": 178000, "reach": 160000, "clk": 7200, "cart": 2150, "conv": 520, "plat": "Meta Ads"},
    {"name": "Jun 2026", "idx": 2, "spend": 58000, "rev": 146000, "imp": 275000, "view": 206000, "reach": 185000, "clk": 8500, "cart": 2580, "conv": 630, "plat": "TikTok Ads"},
    {"name": "Jul 2026", "idx": 3, "spend": 64000, "rev": 168000, "imp": 305000, "view": 232000, "reach": 205000, "clk": 9600, "cart": 2980, "conv": 740, "plat": "Meta Ads"},
    {"name": "Aug 2026", "idx": 4, "spend": 70000, "rev": 189000, "imp": 338000, "view": 258000, "reach": 228000, "clk": 10800, "cart": 3400, "conv": 850, "plat": "Google Ads"},
    {"name": "Sep 2026", "idx": 5, "spend": 74000, "rev": 198000, "imp": 360000, "view": 278000, "reach": 245000, "clk": 11600, "cart": 3720, "conv": 910, "plat": "Meta Ads"},
    {"name": "Oct 2026", "idx": 6, "spend": 78100, "rev": 214500, "imp": 385000, "view": 302000, "reach": 264000, "clk": 12800, "cart": 4150, "conv": 1040, "plat": "Meta Ads"},
]

for row in months_data_fw:
    hist_fw = HistoricalAttribution(
        category="footwear",
        month_name=row["name"],
        month_index=row["idx"],
        served_impressions=row["imp"],
        viewable_impressions=row["view"],
        unique_reach=row["reach"],
        clicks=row["clk"],
        add_to_carts=row["cart"],
        conversions=row["conv"],
        spend=row["spend"],
        revenue=row["rev"],
        top_platform=row["plat"]
    )
    db.add(hist_fw)

for row in months_data_ap:
    hist_ap = HistoricalAttribution(
        category="apparel",
        month_name=row["name"],
        month_index=row["idx"],
        served_impressions=row["imp"],
        viewable_impressions=row["view"],
        unique_reach=row["reach"],
        clicks=row["clk"],
        add_to_carts=row["cart"],
        conversions=row["conv"],
        spend=row["spend"],
        revenue=row["rev"],
        top_platform=row["plat"]
    )
    db.add(hist_ap)

db.commit()
db.close()
print("Successfully seeded products, multi-platform campaigns, and 6-month historical attribution!")