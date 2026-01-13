import pandas as pd
from sqlalchemy.orm import Session
from models import Product, Category, Sale
from datetime import datetime, date

DATA_PATH = "data"


def load_categories_csv(db: Session):
    df = pd.read_csv(f"{DATA_PATH}/categories.csv")
    for _, row in df.iterrows():
        if not db.query(Category).filter_by(id=row["id"]).first():
            db.add(Category(
                id=row["id"],
                name=row["name"]
            ))
    db.commit()


def load_products_csv(db: Session):
    df = pd.read_csv(f"{DATA_PATH}/products.csv")
    for _, row in df.iterrows():
        if not db.query(Product).filter_by(id=row["id"]).first():
            db.add(Product(
                id=row["id"],
                name=row["name"],
                description=row["description"],
                price=row["price"],
                category_id=row["category_id"],
                brand=row["brand"]
            ))
    db.commit()


def load_sales_csv(db: Session):
    df = pd.read_csv(f"{DATA_PATH}/sales.csv")
    for _, row in df.iterrows():
        if not db.query(Sale).filter_by(id=row["id"]).first():
            date_obj = datetime.strptime(row["date"], "%Y-%m-%d").date()
            db.add(Sale(
                id=row["id"],
                product_id=row["product_id"],
                quantity=row["quantity"],
                total_price=row["total_price"],
                date=date_obj,
                month=date_obj.month
            ))
    db.commit()



def get_products(db: Session):
    return db.query(Product).all()


def get_categories(db: Session):
    return db.query(Category).all()


def get_sales(db: Session):
    return db.query(Sale).all()


def create_product(db: Session, product_data: dict):
    product = Product(
        name=product_data["name"],
        description=product_data.get("description", ""),
        price=product_data["price"],
        category_id=product_data["category_id"],
        brand=product_data.get("brand", "")
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


def get_product_by_id(db: Session, product_id: int):
    return db.query(Product).filter(Product.id == product_id).first()


def update_product(db: Session, product_id: int, data: dict):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        return None

    for key, value in data.items():
        if hasattr(product, key):
            setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product



def create_category(db: Session, category_data: dict):
    category = Category(
        name=category_data["name"]
    )
    db.add(category)
    db.commit()
    db.refresh(category)
    return category



def delete_category(db: Session, category_id: int):
    category = db.query(Category).filter(Category.id == category_id).first()
    if not category:
        return {"error": "Categoria não encontrada"}
    db.delete(category)
    db.commit()
    return {"message": "Categoria deletada com sucesso"}



def create_sale(db: Session, sale_data: dict):
    if isinstance(sale_data["date"], str):
        date_obj = datetime.strptime(sale_data["date"], "%Y-%m-%d").date()
    elif isinstance(sale_data["date"], date):
        date_obj = sale_data["date"]
    else:
        raise ValueError("Formato de data inválido")

    sale = Sale(
        product_id=sale_data["product_id"],
        quantity=sale_data["quantity"],
        total_price=sale_data["total_price"],
        date=date_obj,
        month=date_obj.month
    )

    db.add(sale)
    db.commit()
    db.refresh(sale)
    return sale
