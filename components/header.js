import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaUser } from "react-icons/fa";
import { Button } from "@mui/material";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";

function Header({ simple, hideAuth }) {
  const { data: session, status } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  }

  const dropdownButtonStyle = {
    borderRadius: '0px',
    textTransform: 'capitalize',
    fontSize: '17px',
    width: '100%',
    justifyContent: 'flex-start',
    color: '#000',
    // padding: '10px 15px',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: '#7ebee4',
      color: '#fffff',
    }
  };
  const logout = {
    borderRadius: '0px',
    textTransform: 'capitalize',
    fontSize: '17px',
    width: '100%',
    justifyContent: 'flex-start',
    color: '#000',
    // padding: '10px 15px',
    transition: 'background-color 0.3s, color 0.3s',
    '&:hover': {
      backgroundColor: '#e7263e',
      color: '#fffff',
    }
  }

  return (
    <header>
      {/* <div style={{ background: 'yellow', padding: '10px' }}>
        Debug: session={JSON.stringify(!session)},
        status={status},
        hideAuth={JSON.stringify(hideAuth)}
      </div> */}
      <nav className="d-flex align-items-center navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
        <div className="container">
          <Link href="/">
            <a className="navbar-brand">
              {/* <FontAwesomeIcon
                icon={["fas", "shopping-basket"]}
                className="d-inline-block"
              /> */}
              <span className="ms-2 mb-0 h3 text-primary fw-bold">
                Keldan Mart
              </span>
            </a>
          </Link>
          <div className="collapse navbar-collapse">
            <form className="d-flex">
              <div className="input-group">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  aria-label="Search"
                  size="32"
                />
                <button type="button" className="btn btn-primary">
                  <FontAwesomeIcon icon={["fas", "search"]} />
                </button>
              </div>
            </form>
          </div>
          <div className="d-flex">

            {!session ? (
              <>
                <Link href="/auth/login">
                  <a className="btn btn-outline-primary d-none d-md-block">
                    Login
                  </a>
                </Link>
                <Link href="/auth/sign-up">
                  <a className="btn btn-primary d-none d-md-block ms-2">
                    Sign up
                  </a>
                </Link>
              </>
            ) : (
              <>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                  <Button
                    onClick={toggleDropdown}
                    style={{
                      padding: '0',
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      marginRight: '10px',
                      color: '#000',
                      border: '1px solid rgba(0,0,0,0.3)',
                      borderRadius: '50%',
                      minHeight: '42px',
                      minWidth: '45px',
                      // display: 'flex',
                      // alignItems: 'center',
                      // justifyContent: 'center'
                    }}
                    className="d-flex align-items-center"
                  >
                    <FaUser style={{ display: 'flex', alignItems: 'center' }} />
                  </Button>
                  {showDropdown && (
                    <div className=""
                      style={{
                        marginTop: '17px', width: '200px',
                        position: 'absolute', height: 'auto',
                        top: '100%',
                        left: '50%',
                        padding: '2px 10px',
                        transform: 'translateX(-50%)',
                        background: '#fff',
                        border: '1px solid rgba(0,0,0,0.2)',
                        borderRadius: '6px',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.15)',
                        zIndex: 1000
                      }}
                    >
                      <ul className="d-flex flex-column justify-content-start w-100" 
                      style={{ listStyle: 'none', width: '100%', paddingInlineStart: '0px', marginBottom: '0px' }}>
                        <li>
                          <Link href="/account/profile" style={{ display: 'flex', textDecoration: 'none' }}>
                            <Button onClick={toggleDropdown} sx={dropdownButtonStyle} className="w-100 border-bottom">
                              <FontAwesomeIcon
                                icon={["fas", "user-alt"]}
                                className="me-2"
                                fixedWidth />
                              my Profile
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Link href="/account/current-orders" style={{ display: 'flex', textDecoration: 'none' }}>
                            <Button onClick={toggleDropdown} sx={dropdownButtonStyle} className="w-100 border-bottom">
                              <FontAwesomeIcon
                                icon={["fas", "shopping-bag"]}
                                className="me-2"
                                fixedWidth />
                              Current orders
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Link href="/account/order-history" style={{ display: 'flex', textDecoration: 'none' }}>
                            <Button onClick={toggleDropdown} sx={dropdownButtonStyle} className="w-100 border-bottom text-dark">
                              <FontAwesomeIcon
                                icon={["fas", "truck"]}
                                className="me-2"
                                fixedWidth />
                              Orders History
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Link href="//account/favorite-list" style={{ display: 'flex', textDecoration: 'none' }}>
                            <Button onClick={toggleDropdown} sx={dropdownButtonStyle} className="w-100 border-bottom text-dark">
                              <FontAwesomeIcon
                                icon={["fas", "heart"]}
                                className="me-2"
                                fixedWidth />
                              My Favorites
                            </Button>
                          </Link>
                        </li>
                        <li>
                          <Button className="d-flex align-items-center w-100 text-dark" onClick={() => signOut({ callbackUrl: "/" })}
                            sx={logout}>
                            <IoIosLogOut
                              className="me-2 fs-4"
                              fixedWidth />
                            Logout
                          </Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* </> */}
            {/* )} */}
            <Link href="/shopping-cart">
              <Button 
              variant="outlined"
              className="d-flex align-items-center text-dark border position-relative ms-2 fw-normal">
                <FontAwesomeIcon icon={["fas", "shopping-cart"]} />
                &nbsp;Cart
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger my-auto">
                  3
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
        <div className="container">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link href="/explore">
                  <a className="nav-link">All Categories</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/#">
                  <a className="nav-link">Electronics</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/#">
                  <a className="nav-link">Clothing</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/#">
                  <a className="nav-link">Furnitures</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/#">
                  <a className="nav-link">Medicines</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/#">
                  <a className="nav-link">Cosmetics</a>
                </Link>
              </li>
            </ul>
            <ul className="ms-auto navbar-nav">
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  id="languageMenuLink"
                >
                  English
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-macos dropdown-menu-end"
                  aria-labelledby="languageMenuLink"
                >
                  <li>
                    <a href="#" className="dropdown-item">
                      English
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item mt-1">
                      French
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
