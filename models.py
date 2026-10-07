from sqlalchemy import Column, String, Integer, Numeric
from database import Base, User, ProductInventory, AdCampaign, SavedBriefing, init_db

class Product(Base):
    __tablename__ = 'products'

    id = Column(String, primary_key=True, index=True)
    name = Column(String, nullable=False)
    unit_stock = Column(Integer, nullable=False)
    cost = Column(Numeric, nullable=False)
    selling_price = Column(Numeric, nullable=False)
    offer = Column(Numeric, nullable=False, default=0.0)
    ad_expenditure = Column(Numeric, nullable=False, default=0.0)

    @property
    def sku(self):
        return self.id

    @property
    def stock_count(self):
        return self.unit_stock

    @property
    def unit_cost(self):
        return float(self.cost) if self.cost is not None else 0.0

    @property
    def retail_price(self):
        return float(self.selling_price) if self.selling_price is not None else 0.0

    @property
    def margin_percent(self):
        if self.selling_price and float(self.selling_price) > 0:
            return round(((float(self.selling_price) - float(self.cost)) / float(self.selling_price)) * 100, 1)
        return 0.0

    def to_dict(self):
        return {
            "id": self.id,
            "sku": self.id,
            "name": self.name,
            "unit_stock": self.unit_stock,
            "stock_count": self.unit_stock,
            "cost": float(self.cost) if self.cost is not None else 0.0,
            "unit_cost": float(self.cost) if self.cost is not None else 0.0,
            "selling_price": float(self.selling_price) if self.selling_price is not None else 0.0,
            "retail_price": float(self.selling_price) if self.selling_price is not None else 0.0,
            "offer": float(self.offer) if self.offer is not None else 0.0,
            "ad_expenditure": float(self.ad_expenditure) if self.ad_expenditure is not None else 0.0,
            "margin_percent": self.margin_percent,
        }
