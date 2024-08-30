import Link from "next/link";
import ProductRating from "../product-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductSimpleCard({ id, title }) {
  return (
    <div className="card h-100 border-0 shadow-sm card-body">
      <div className="ratio ratio-1x1">
        <img
          className="card-img"
          src={`/images/product1.jpeg`}
          alt="Product image."
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="my-3">
        <Link href="/product/1">
          <a className="mb-1 text-dark text-decoration-none stretched-link">
            Product name here
          </a>
        </Link>

        <ProductRating />

        <h6 className="mb-0 fw-semibold mt-2">$ 15000</h6>
      </div>
      <div className="hstack gap-2">
        <button className="btn btn-sm btn-secondary text-primary flex-grow-1 d-none d-lg-block">
          <FontAwesomeIcon icon={["fas", "cart-plus"]} />
          &nbsp;Add to cart
        </button>
        <button className="btn btn-sm btn-outline-secondary text-primary border d-none d-lg-block">
          <FontAwesomeIcon icon={["far", "heart"]} />
        </button>
      </div>
    </div>
  );
}

export default ProductSimpleCard;
