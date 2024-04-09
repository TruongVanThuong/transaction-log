import React from "react";

const Menu = () => {
  return (
    <>
      <div className="nav-container primary-menu">
        <div className="mobile-topbar-header">
            <div>
                <img src="/assets_admin_rocker/images/logo-icon.png" className="logo-icon" alt="logo icon" />
            </div>
            <div>
                <h4 className="logo-text">Rukada</h4>
            </div>
            <div className="toggle-icon ms-auto"><i className="bx bx-arrow-to-left"></i></div>
        </div>
        <nav className="navbar navbar-expand-xl w-100">
            <ul className="navbar-nav justify-content-start flex-grow-1 gap-1">
                <li className="nav-item">
                    <a className="nav-link" href="{{asset('admin/socket')}}">
                        <div className="parent-icon"><i className="bx bx-cookie"></i></div>
                        <div className="menu-title">Socket</div>
                    </a>
                </li>
            </ul>
        </nav>
      </div>

    </>
  )
}

export default Menu;
