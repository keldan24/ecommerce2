// pages/index.js
// import { getSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Carousel } from "react-responsive-carousel";
import ProductSimpleCard from "../components/product/product-simple-card";

export async function getStaticProps() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
    const products = await response.json();
    return {
      props: { products },
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      props: { products: [] },
    };
  }
}

export default function Home({ products }) {
  // const list = [1, 2, 3, 4, 5, 6, 7, 8];
  // console.log('Session on the page:', session);


  return (
    <div>
      <div className="container py-3">
        <div className="row mb-4">
          <div className="col-12">
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              transitionTime={500}
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                if (isSelected) {
                  return (
                    <li className="d-inline-block m-2 text-light">
                      <FontAwesomeIcon icon={["fas", "circle"]} size="xs" />
                    </li>
                  );
                }
                return (
                  <li
                    className="d-inline-block m-2 text-light text-opacity-50"
                    onClick={onClickHandler}
                    key={index}
                    role="button"
                    tabIndex={0}
                  >
                    <FontAwesomeIcon icon={["fas", "circle"]} size="xs" />
                  </li>
                );
              }}
            >
              <div className="ratio ratio-21x9">
                <img
                  src="/images/online-shopping.jpg"
                  alt="Cover image"
                  className="rounded"
                />
              </div>
              <div className="ratio ratio-21x9">
                <img
                  src="/images/online-shopping.jpg"
                  alt="Cover image"
                  className="rounded"
                />
              </div>
              <div className="ratio ratio-21x9">
                <img
                  src="/images/online-shopping.jpg"
                  alt="Cover image"
                  className="rounded"
                />
              </div>
              <div className="ratio ratio-21x9">
                <img
                  src="/images/online-shopping.jpg"
                  alt="Cover image"
                  className="rounded"
                />
              </div>
              <div className="ratio ratio-21x9">
                <img
                  src="/images/online-shopping.jpg"
                  alt="Cover image"
                  className="rounded"
                />
              </div>
            </Carousel>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 g-3 mb-4">
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "money-bill-alt"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Reasonable Price</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "headset"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Customer Support 24/7</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </figcaption>
              </figure>
            </div>
          </div>
          <div className="col">
            <div className="card h-100 border-0 shadow-sm">
              <figure className="figure card-body mb-0">
                <div
                  className="bg-secondary rounded-circle d-flex mb-2"
                  style={{ width: 50, height: 50 }}
                >
                  <FontAwesomeIcon
                    icon={["fas", "truck"]}
                    size="lg"
                    className="text-primary m-auto"
                  />
                </div>
                <h5 className="mb-1 fw-bold">Fast Delivery</h5>
                <figcaption className="figure-caption text-dark">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
        <h4 className="mb-3 fw-semibold text-center">Our Products</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-5">
          {products.map((product) => (
            <div className="col" key={product._id}>
              <ProductSimpleCard
                id={product._id}
                title={product.name}
                price={product.price}
                image={product.images[0]}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


