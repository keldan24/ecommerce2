import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Button } from "@mui/material";
// import ProductImg from '/images/product1'

function ProductGridCard({ id, title, off }) {
  let price = 10000;
  let percentOff;
  let offPrice = `$${price}`;

  if (off && off > 0) {
    percentOff = (
      <div
        className="badge bg-dark opacity-75 py-2 text-white position-absolute"
        style={{ top: "0.5rem", right: "0.5rem" }}
      >
        {off}% OFF
      </div>
    );

    offPrice = (
      <>
        ${price - (off * price) / 100}&nbsp;
        <del className="text-muted small fw-normal">${price}</del>
      </>
    );
  }
  return (
    <div className="card h-100 border-0 shadow-sm card-body">
      <Link href="/product/1">
        <a>
          <div className="ratio ratio-1x1">
            <img
              className="card-img"
              src={'/images/product1.jpeg'}
              alt="Product image."
              style={{ objectFit: "cover" }}
            />
          </div>
          {percentOff}
        </a>
      </Link>
      <div className="mt-3">
        <div className="vstack gap-2">
          <Link href="/product/1">
            <a className="text-dark text-decoration-none">Product name here</a>
          </Link>

          <h6 className="fw-semibold">{offPrice}</h6>

          <div className="hstack gap-2">
            {/* <button className="btn btn-secondary text-primary flex-grow-1 d-md-block d-lg-none">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} />
              &nbsp;Add to car
            </button>
            <button className="btn btn-outline-secondary text-primary border d-md-block d-lg-none">
              <FontAwesomeIcon icon={["far", "heart"]} />
            </button> */}

            <button className="btn btn-sm btn-secondary text-primary flex-grow-1 d-none d-lg-block">
              <FontAwesomeIcon icon={["fas", "cart-plus"]} />
              &nbsp;Add to cart
            </button>
            <button className="btn btn-sm btn-outline-secondary text-primary border d-none d-lg-block">
              <FontAwesomeIcon icon={["far", "heart"]} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductGridCard;
