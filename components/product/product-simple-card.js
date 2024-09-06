import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from '@mui/material';
import { useCart } from '../shopping-cart/useCart';
import Link from 'next/link';

function ProductSimpleCard({ id, title, price, image, rating }) {
  // const [isInCart, setIsInCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const { cart, addToCart } = useCart();

  const isInCart = cart.some(item => item.id === id);

  const handleAddToCart = () => {
    addToCart({ id, title, price, image });
  };

  const handleAddtoWishlist = () => {
    // Here you would typically dispatch an action to add the item to the wishlist
    // For this example, we'll just toggle the state
    setInWishlist(!inWishlist);
  }

  return (
    <div className="card card-body h-100 border-0 shadow-sm">
      <Link href={`/product/${id}`}>
      <div className="ratio ratio-1x1">
        <img
          className="card-img-top"
          src={image}
          alt={title}
          style={{ objectFit: "cover" }}
        />
      </div>
      </Link>
      <div className="d-flex flex-column">
        <h5 style={{ width: '90%', textAlign: 'center', fontSize: '1rem' }} className="card-title">{title.length > 40 ? `${title.slice(0, 40)}...` : title}</h5>
        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={i < Math.floor(rating) ? ["fas", "star"] : ["far", "star"]}
              className="text-warning"
            />
          ))}
        </div>
        <h6 className="card-subtitle mb-2 text-muted">$ {price.toFixed(2)}</h6>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <Button
            variant={isInCart ? "contained" : "outlined"}
            color={isInCart ? "success" : "primary"}
            fullWidth
            onClick={handleAddToCart}
            startIcon={<FontAwesomeIcon icon={["fas", isInCart ? "check" : "cart-plus"]} />}
          >
            {isInCart ? 'Added to cart' : 'Add to cart'}
          </Button>
          <Button
            variant="outlined"
            onClick={handleAddtoWishlist}
            className={`ms-2`}
            style={{ minWidth: 'unset', padding: '5px 10px', background: '#eff0f8'}}>
            {!inWishlist ? (
              <FontAwesomeIcon icon={["far", "heart"]}
                style={{ fontSize: '1.4rem', fontWeight: '100' }}
              />
            ):(<>
              <FontAwesomeIcon icon={["fa", "heart"]}
                style={{ fontSize: '1.4rem', color: "red"}}
              />
            </>
            )
            }

          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductSimpleCard;