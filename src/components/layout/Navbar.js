import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../../actions/auth";
import { connect } from "react-redux";
import { colorHoverChange, arrowColorchange } from "../utils/colorHoverChange";
import { openDiscover, closeDiscover } from "../../actions/layout";
import { useHistory } from "react-router";
import NavDropdown from "./NavDropdown";

const Navbar = ({
  logout,
  openLogin,
  openRegister,
  openDiscover,
  closeDiscover,
  layout: { discover },
  auth: { user, isAuthenticated },
  swatch
}) => {
  const [buttonClass, setButtonClass] = useState("btn-primary");
  const [arrowClass, setArrowClass] = useState("#06d6a0");
  const [logoClass, setLogoClass] = useState("nav-logo");
  const [dropDown, setDropDown] = useState(false);

  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") closeDiscover();
  };

  const handleLogout = e => {
    e.preventDefault();
    logout();
  };

  const handleLoginHover = () => {
    const classColor = colorHoverChange(buttonClass, "loginButton");
    setButtonClass(classColor);
  };

  const handleArrowHover = () => {
    const arrowColor = arrowColorchange(arrowClass, "#06d6a0");
    setArrowClass(arrowColor);
  };

  const handleLogoHover = () => {
    const classColor = colorHoverChange(logoClass, "logo");
    setLogoClass(classColor);
  };

  const history = useHistory();

  const guestLinks = (
    <ul>
      {!discover && (
        <li>
          <a className='explore-link' onClick={() => openDiscover()}>
            Discover
          </a>
        </li>
      )}
      <li>
        <a className='register-link' onClick={() => openRegister(true)}>
          Register
        </a>
      </li>
      <li>
        <button
          onMouseLeave={(handleLoginHover, () => setArrowClass("#06d6a0"))}
          onMouseEnter={handleArrowHover}
          className={buttonClass}
          onClick={() => openLogin(true)}
        >
          Login
        </button>
      </li>
    </ul>
  );

  const userLinks = (
    <ul>
      {!discover && (
        <li>
          <a className='explore-link' onClick={() => openDiscover()}>
            Discover
          </a>
        </li>
      )}
      <li>
        <button
          style={{ position: "relative" }}
          onClick={() => setDropDown(!dropDown)}
          onMouseLeave={(handleLoginHover, () => setArrowClass("#06d6a0"))}
          onMouseEnter={handleArrowHover}
          className={buttonClass}
        >
          {user}
          <div className='down-arrow'>
            <i
              style={{ color: arrowClass, fontSize: "25px" }}
              class='fas fa-sort-down'
            ></i>
          </div>
        </button>
      </li>
    </ul>
  );

  return (
    <nav
      style={{
        // overflow: "hidden",
        position: swatch.projectPage ? "fixed" : null
      }}
    >
      <Link
        to='/'
        onMouseLeave={handleLogoHover}
        className={logoClass}
        onClick={handleLogoClick}
      >
        Swatched
      </Link>
      <div className='nav-link-area'>
        <div className='nav-buttons-area'>
          {!isAuthenticated ? guestLinks : userLinks}
        </div>
        {dropDown && <NavDropdown setDropDown={setDropDown} />}
      </div>
    </nav>
  );
};

Navbar.prototype = {
  logout: PropTypes.func.isRequired,
  openLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  openRegister: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  layout: state.layout,
  swatch: state.swatchReducer
});

export default connect(mapStateToProps, {
  logout,
  openDiscover,
  closeDiscover
})(Navbar);