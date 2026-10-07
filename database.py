import os
import requests
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, Text, DateTime, ForeignKey, Numeric
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:techiemechiealpha@db.lvhogkynqmddoxljcues.supabase.co:5432/postgres"
)
SQLITE_FALLBACK_URL = os.getenv("SQLITE_FALLBACK_URL", "sqlite:///./d2c_engine.db")

# Supabase REST configuration
SUPABASE_URL = os.getenv("SUPABASE_URL", "https://lvhogkynqmddoxljcues.supabase.co")
SUPABASE_PROJECT_ID = os.getenv("SUPABASE_PROJECT_ID", "lvhogkynqmddoxljcues")
SUPABASE_KEY = os.getenv("SUPABASE_SECRET_KEY") or os.getenv("SUPABASE_ANON_KEY", "sb_publishable_3RI0ExPBYiVNKQDcHBlfxg_Xq1KubFH")

try:
    temp_engine = create_engine(DATABASE_URL, pool_pre_ping=True, connect_args={"connect_timeout": 3})
    with temp_engine.connect() as conn:
        pass
    engine = temp_engine
    print("Connected to Supabase PostgreSQL database.")
except Exception as e:
    engine = create_engine(SQLITE_FALLBACK_URL, connect_args={"check_same_thread": False})
    print("Running with local SQLite caching engine and direct Supabase HTTPS live sync.")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    google_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    assigned_category = Column(String)  # 'footwear' or 'apparel'

class ProductInventory(Base):
    __tablename__ = "inventory"
    id = Column(String, primary_key=True, index=True)  # e.g., "FW-1002"
    name = Column(String)
    category = Column(String)
    unit_stock = Column(Integer)
    cost = Column(Float)
    selling_price = Column(Float)
    offer = Column(Float, default=0.0)
    ad_expenditure = Column(Float, default=0.0)

    def __init__(self, **kwargs):
        if "sku" in kwargs and "id" not in kwargs:
            kwargs["id"] = kwargs.pop("sku")
        if "stock_count" in kwargs and "unit_stock" not in kwargs:
            kwargs["unit_stock"] = kwargs.pop("stock_count")
        if "unit_cost" in kwargs and "cost" not in kwargs:
            kwargs["cost"] = kwargs.pop("unit_cost")
        if "retail_price" in kwargs and "selling_price" not in kwargs:
            kwargs["selling_price"] = kwargs.pop("retail_price")
        kwargs.pop("margin_percent", None)
        super().__init__(**kwargs)

    @property
    def sku(self):
        return self.id

    @property
    def stock_count(self):
        return self.unit_stock

    @property
    def unit_cost(self):
        return self.cost

    @property
    def retail_price(self):
        return self.selling_price

    @property
    def margin_percent(self):
        if self.selling_price and self.selling_price > 0:
            return round(((self.selling_price - self.cost) / self.selling_price) * 100, 1)
        return 0.0

    @property
    def stock_status(self):
        stock = self.unit_stock if self.unit_stock is not None else 0
        if stock <= 0:
            return "OUT_OF_STOCK"
        elif stock <= 30:
            return "ABOUT_TO_SOLD_OUT"
        return "HEALTHY"

    def to_dict(self):
        return {
            "id": self.id,
            "sku": self.id,
            "name": self.name,
            "category": self.category,
            "unit_stock": self.unit_stock,
            "stock_count": self.unit_stock,
            "cost": self.cost,
            "unit_cost": self.cost,
            "selling_price": self.selling_price,
            "retail_price": self.selling_price,
            "offer": self.offer if self.offer is not None else 0.0,
            "ad_expenditure": self.ad_expenditure if self.ad_expenditure is not None else 0.0,
            "margin_percent": self.margin_percent,
            "stock_status": self.stock_status,
        }

class AdCampaign(Base):
    __tablename__ = "ad_campaigns"
    id = Column(Integer, primary_key=True, index=True)
    sku = Column(String, ForeignKey("inventory.id"))
    platform = Column(String)  # Meta Ads, Google Ads, Amazon Ads, TikTok Ads
    campaign_name = Column(String)
    daily_spend = Column(Float, default=0.0)
    revenue_generated = Column(Float, default=0.0)
    status = Column(String, default="ACTIVE")  # ACTIVE or PAUSED
    served_impressions = Column(Integer, default=12500)
    viewable_impressions = Column(Integer, default=8900)
    unique_reach = Column(Integer, default=7800)
    clicks = Column(Integer, default=520)
    conversions = Column(Integer, default=38)

    @property
    def cpm(self):
        if self.served_impressions and self.served_impressions > 0:
            return round((self.daily_spend / self.served_impressions) * 1000, 2)
        return 0.0

    @property
    def ctr(self):
        if self.served_impressions and self.served_impressions > 0:
            return round((self.clicks / self.served_impressions) * 100, 2)
        return 0.0

    @property
    def cpc(self):
        if self.clicks and self.clicks > 0:
            return round(self.daily_spend / self.clicks, 2)
        return 0.0

    @property
    def cvr(self):
        if self.clicks and self.clicks > 0:
            return round((self.conversions / self.clicks) * 100, 2)
        return 0.0

    @property
    def frequency(self):
        if self.unique_reach and self.unique_reach > 0:
            return round(self.served_impressions / self.unique_reach, 2)
        return 1.0

    @property
    def viewability_rate(self):
        if self.served_impressions and self.served_impressions > 0:
            return round((self.viewable_impressions / self.served_impressions) * 100, 1)
        return 0.0

    @property
    def roas(self):
        if self.daily_spend and self.daily_spend > 0:
            return round(self.revenue_generated / self.daily_spend, 2)
        return 0.0

    @property
    def net_profit(self):
        return round(self.revenue_generated - self.daily_spend, 2)

    def to_dict(self):
        return {
            "id": self.id,
            "sku": self.sku,
            "platform": self.platform,
            "campaign_name": self.campaign_name,
            "daily_spend": self.daily_spend,
            "revenue_generated": self.revenue_generated,
            "status": self.status,
            "served_impressions": self.served_impressions or 0,
            "viewable_impressions": self.viewable_impressions or 0,
            "unique_reach": self.unique_reach or 0,
            "clicks": self.clicks or 0,
            "conversions": self.conversions or 0,
            "cpm": self.cpm,
            "ctr": self.ctr,
            "cpc": self.cpc,
            "cvr": self.cvr,
            "frequency": self.frequency,
            "viewability_rate": self.viewability_rate,
            "roas": self.roas,
            "net_profit": self.net_profit
        }

class SavedBriefing(Base):
    __tablename__ = "saved_briefings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category = Column(String)
    summary_text = Column(Text)
    total_spend = Column(Float)
    total_profit = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

class HistoricalAttribution(Base):
    __tablename__ = "historical_attribution"
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String, index=True)  # footwear or apparel
    month_name = Column(String)  # May 2026, Jun 2026, etc.
    month_index = Column(Integer)  # 1 to 6
    served_impressions = Column(Integer)
    viewable_impressions = Column(Integer)
    unique_reach = Column(Integer)
    clicks = Column(Integer)
    add_to_carts = Column(Integer)
    conversions = Column(Integer)
    spend = Column(Float)
    revenue = Column(Float)
    top_platform = Column(String)

    def to_dict(self):
        roas = round(self.revenue / self.spend, 2) if self.spend > 0 else 0
        cvr = round((self.conversions / self.clicks) * 100, 2) if self.clicks > 0 else 0
        ctr = round((self.clicks / self.served_impressions) * 100, 2) if self.served_impressions > 0 else 0
        cpm = round((self.spend / self.served_impressions) * 1000, 2) if self.served_impressions > 0 else 0
        viewability = round((self.viewable_impressions / self.served_impressions) * 100, 1) if self.served_impressions > 0 else 0
        return {
            "month_name": self.month_name,
            "month_index": self.month_index,
            "category": self.category,
            "served_impressions": self.served_impressions,
            "viewable_impressions": self.viewable_impressions,
            "unique_reach": self.unique_reach,
            "clicks": self.clicks,
            "add_to_carts": self.add_to_carts,
            "conversions": self.conversions,
            "spend": self.spend,
            "revenue": self.revenue,
            "net_profit": round(self.revenue - self.spend, 2),
            "roas": roas,
            "cvr": cvr,
            "ctr": ctr,
            "cpm": cpm,
            "viewability_rate": viewability,
            "top_platform": self.top_platform
        }

class ProductPerformance(Base):
    __tablename__ = "product_performance"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(String, index=True)
    month = Column(String)  # May 2026, Jun 2026, etc.
    month_index = Column(Integer)  # 1 to 6
    orders = Column(Integer, default=0)
    cvr_percent = Column(Float, default=0.0)
    cart_touches = Column(Integer, default=0)
    clicks = Column(Integer, default=0)
    spend = Column(Float, default=0.0)
    revenue = Column(Float, default=0.0)
    net_profit = Column(Float, default=0.0)
    roas = Column(Float, default=0.0)
    channel_wise_data = Column(Text)

    def to_dict(self):
        ch_data = self.channel_wise_data
        if isinstance(ch_data, str):
            try:
                import json
                ch_data = json.loads(ch_data)
            except Exception:
                ch_data = {}
        return {
            "id": self.id,
            "product_id": self.product_id,
            "month": self.month,
            "month_index": self.month_index,
            "orders": self.orders,
            "cvr_percent": self.cvr_percent,
            "cart_touches": self.cart_touches,
            "clicks": self.clicks,
            "spend": self.spend,
            "revenue": self.revenue,
            "net_profit": self.net_profit,
            "roas": self.roas,
            "channel_wise_data": ch_data
        }

def init_db():
    Base.metadata.create_all(bind=engine)

# -------------------------------------------------------------
# Direct Supabase Live Cloud Bridge (HTTPS REST)
# -------------------------------------------------------------
def get_supabase_headers():
    return {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation"
    }

def fetch_supabase_products(category_prefix: str = None):
    """Fetch live data directly from the Supabase 'products' table."""
    try:
        url = f"{SUPABASE_URL}/rest/v1/products?select=*"
        if category_prefix:
            prefix = category_prefix.upper()
            if prefix == "FOOTWEAR": prefix = "FW"
            elif prefix == "APPAREL": prefix = "AP"
            url += f"&id=like.{prefix}%25"
        
        resp = requests.get(url, headers=get_supabase_headers(), timeout=5)
        if resp.status_code == 200:
            items = resp.json()
            for p in items:
                p["sku"] = p["id"]
                p["stock_count"] = p.get("unit_stock", 0)
                p["unit_cost"] = p.get("cost", 0)
                p["retail_price"] = p.get("selling_price", 0)
                cost = float(p.get("cost") or 0)
                price = float(p.get("selling_price") or 0)
                p["margin_percent"] = round(((price - cost) / price) * 100, 1) if price > 0 else 0.0
                p["category"] = "FOOTWEAR" if str(p["id"]).startswith("FW") else "APPAREL"
                stock = int(p.get("unit_stock") or 0)
                if stock <= 0:
                    p["stock_status"] = "OUT_OF_STOCK"
                elif stock <= 30:
                    p["stock_status"] = "ABOUT_TO_SOLD_OUT"
                else:
                    p["stock_status"] = "HEALTHY"
            return items
    except Exception as e:
        print("Supabase live fetch error:", e)
    return None

def update_supabase_product(product_id: str, updated_data: dict):
    """Updates product data directly in Supabase cloud database."""
    try:
        url = f"{SUPABASE_URL}/rest/v1/products?id=eq.{product_id}"
        payload = {}
        if "name" in updated_data and updated_data["name"] is not None:
            payload["name"] = str(updated_data["name"]).strip()
        if "unit_stock" in updated_data and updated_data["unit_stock"] is not None:
            payload["unit_stock"] = int(updated_data["unit_stock"])
        elif "stock_count" in updated_data and updated_data["stock_count"] is not None:
            payload["unit_stock"] = int(updated_data["stock_count"])
        if "cost" in updated_data and updated_data["cost"] is not None:
            payload["cost"] = float(updated_data["cost"])
        elif "unit_cost" in updated_data and updated_data["unit_cost"] is not None:
            payload["cost"] = float(updated_data["unit_cost"])
        if "selling_price" in updated_data and updated_data["selling_price"] is not None:
            payload["selling_price"] = float(updated_data["selling_price"])
        elif "retail_price" in updated_data and updated_data["retail_price"] is not None:
            payload["selling_price"] = float(updated_data["retail_price"])
        if "offer" in updated_data and updated_data["offer"] is not None:
            payload["offer"] = float(updated_data["offer"])
        if "ad_expenditure" in updated_data and updated_data["ad_expenditure"] is not None:
            payload["ad_expenditure"] = float(updated_data["ad_expenditure"])

        if payload:
            resp = requests.patch(url, json=payload, headers=get_supabase_headers(), timeout=5)
            if resp.status_code in [200, 204]:
                return True, resp.json() if resp.status_code == 200 else payload
    except Exception as e:
        print("Supabase live update error:", e)
    return False, None

def fetch_supabase_product_performance(product_id: str = None):
    """Fetch live records from the Supabase 'product_performance' table with 6-month historical data and channel breakdowns."""
    try:
        url = f"{SUPABASE_URL}/rest/v1/product_performance?select=*"
        if product_id:
            clean_id = product_id.strip().upper()
            url += f"&product_id=eq.{clean_id}&order=month_index.asc"
        else:
            url += "&order=product_id.asc,month_index.asc"
        
        resp = requests.get(url, headers=get_supabase_headers(), timeout=5)
        if resp.status_code == 200:
            return resp.json()
    except Exception as e:
        print("Supabase live product_performance fetch error:", e)
    return None

