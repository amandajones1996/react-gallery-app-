/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";

const Nav = ({ updateUrlWithQuery }) => {
    return(
        <nav className="main-nav">
            <ul>
                {/* on clicks needed to pass query and re render new query */}
                <li onClick={() => updateUrlWithQuery('cats')}><NavLink to="/cats">Cats</NavLink></li>
                <li onClick={() => updateUrlWithQuery('dogs')}><NavLink to="/dogs">Dogs</NavLink></li>
                <li onClick={() => updateUrlWithQuery('computers')}><NavLink to="/computers">Computers</NavLink></li>
            </ul>
        </nav>
    )
}

export default Nav; 