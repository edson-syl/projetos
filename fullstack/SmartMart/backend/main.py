from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, crud
from contextlib import asynccontextmanager
import csv
import io

models.Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    db = SessionLocal()
    try:
        crud.load_categories_csv(db)
        crud.load_products_csv(db)
        crud.load_sales_csv(db)
        yield
    finally:
        db.close()

app = FastAPI(title="SmartMart API", version="0.1.0", lifespan=lifespan)

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/products")
def list_products(db: Session = Depends(get_db)):
    return crud.get_products(db)

@app.post("/products")
def create_product(product: dict, db: Session = Depends(get_db)):
    return crud.create_product(db, product)

@app.put("/products/{product_id}")
def update_product(product_id: int, data: dict, db: Session = Depends(get_db)):
    product = crud.update_product(db, product_id, data)
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return product

@app.get("/products/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return product

@app.post("/products/upload-csv")
async def upload_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Invalid file")

    contents = (await file.read()).decode("utf-8")
    reader = csv.DictReader(io.StringIO(contents))

    for row in reader:
        product = models.Product(
            name=row["name"],
            brand=row["brand"],
            price=float(row["price"]),
            category_id=int(row["category_id"]),
        )
        db.add(product)

    db.commit()
    return {"message": "CSV imported successfully"}


@app.delete("/products/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    db.delete(product)
    db.commit()
    return {"message": "Produto deletado com sucesso"}


@app.get("/categories")
def list_categories(db: Session = Depends(get_db)):
    return crud.get_categories(db)

@app.post("/categories")
def create_category(category: dict, db: Session = Depends(get_db)):
    return crud.create_category(db, category)

@app.delete("/categories/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    return crud.delete_category(db, category_id)


@app.get("/sales")
def list_sales(db: Session = Depends(get_db)):
    return crud.get_sales(db)

@app.post("/sales")
def create_sale(sale: dict, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(
        models.Product.id == sale.get("product_id")
    ).first()

    if not product:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    quantity = sale.get("quantity", 1)

    sale_data = {
        "product_id": product.id,
        "quantity": quantity,
        "total_price": product.price * quantity,
        "date": sale["date"]  # string OU date → CRUD resolve
    }

    return crud.create_sale(db, sale_data)
