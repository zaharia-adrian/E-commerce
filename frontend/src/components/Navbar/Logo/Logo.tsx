import React from 'react'
import { NavLink as Link } from 'react-router-dom';

import './Logo.scss';

const Logo = () => {
    return (
      <h1>
        <Link to="/" className="logo">E-com</Link>
      </h1>
    );
}

export default Logo