import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./useCart";

function CartItemRow({ id, title, price, image, quantity }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <tr>
      <td scope="row">
        <div className="hstack">
          <img
            className="rounded"
            src={image}
            width={80}
            height={80}
            alt={title}
            style={{ objectFit: "cover" }}
          />
          <div className="ms-3">
            <span className="h5">
              <Link href={`/product/${id}`}>
                <a className="link-dark text-decoration-none">
                  {title}
                </a>
              </Link>
            </span>
          </div>
        </div>
      </td>
      <td>
        <h6 className="mb-0">${price.toFixed(2)}</h6>
      </td>
      <td>
        <div className="d-flex">
          <div className="input-group input-group-sm" style={{ width: 100 }}>
            <button className="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(quantity - 1)}>
              <FontAwesomeIcon icon={["fas", "minus"]} />
            </button>
            <input
              type="text"
              className="form-control text-center border-primary"
              value={quantity}
              readOnly
            />
            <button className="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(quantity + 1)}>
              <FontAwesomeIcon icon={["fas", "plus"]} />
            </button>
          </div>
        </div>
      </td>
      <td>
        <Button
          style={{ background: 'red', color: 'white', padding: '8px 5px', maxWidth: '40px'}} 
          className="" 
          type="button"
          onClick={handleRemove}
        >
          <FontAwesomeIcon icon={["fas", "trash-alt"]} />
        </Button>
      </td>
    </tr>
  );
}

export default CartItemRow;