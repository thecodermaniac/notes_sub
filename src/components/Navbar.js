import React from 'react'
import {
  Link
} from "react-router-dom";
import '../styles/Navbar.css'
function Navbar() {
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light fixed-top mask-custom shadow-0 ">
        <div className="container">
          <span className="navbar-brand">
            <span style={{ color: "#fff" }}>Note-</span>
            <span style={{ color: "#fff" }}>Maniac</span>
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item  font-monospace">
                <Link className='nav-link text-white' to='/home'>Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </>
  )
}

export default Navbar