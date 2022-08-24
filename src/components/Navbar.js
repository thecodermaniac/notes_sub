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
            <span style={{ color: "#5e9693" }}>Psycho</span>
            <span style={{ color: "#fff" }}>logist</span>
          </span>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link className='nav-link active' to='/home'>Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </>
  )
}

export default Navbar