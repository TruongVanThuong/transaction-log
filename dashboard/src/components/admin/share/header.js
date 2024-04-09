import React from "react";

const Header = () => {
  return (
    <>
      <div className="topbar d-flex align-items-center">
        <nav className="navbar navbar-expand">
          <div className="topbar-logo-header">
            <div className="">
              <img src={"/assets_admin_rocker/images/logo-icon.png"} className="logo-icon" alt="logo icon"/>
            </div>
            <div className="">
              <h4 className="logo-text">ADMIN</h4>
            </div>
          </div>
          <div className="mobile-toggle-menu"><i className="bx bx-menu"></i></div>
          <div className="search-bar flex-grow-1">
            <div className="position-relative search-bar-box">
              <input type="text" className="form-control search-control" placeholder="Type to search..."/> <span
                className="position-absolute top-50 search-show translate-middle-y"><i className="bx bx-search"></i></span>
              <span className="position-absolute top-50 search-close translate-middle-y"><i className="bx bx-x"></i></span>
            </div>
          </div>
          <div className="top-menu ms-auto">
            <ul className="navbar-nav align-items-center">
              <li className="nav-item mobile-search-icon">
                <a className="nav-link" href="#"> <i className="bx bx-search"></i>
                </a>
              </li>
              {/* Rest of your code */}
            </ul>
          </div>

          {/* User Box */}
          <div className="user-box dropdown" style={{ paddingLeft: '20px' }}>
            <a className="d-flex align-items-center nav-link dropdown-toggle dropdown-toggle-nocaret" href="#" role="button"
              data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bx bx-user user-img" style={{ fontSize: '25px', backgroundColor: '#333', textAlign: 'center', color: '#fff', alignItems: 'center' }}></i>
              <div className="user-info ps-3">
                <p className="user-name mb-0"></p>
                <p className="designattion mb-0"></p>
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a className="dropdown-item" href="/admin/ho-so"><i className="bx bx-user"></i><span>Hồ Sơ</span></a>
              </li>
              {/* Rest of your user box code */}
            </ul>
          </div>

        </nav>
      </div>
    </>
  )
}

export default Header;
