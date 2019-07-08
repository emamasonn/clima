import React from 'react'
import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <div>
            <header>
                <nav className="nav-wrapper light-blue darken-2">
                    <h1 className="brand-logo">{props.titulo}</h1>
                </nav>
            </header>
        </div>
    );
};

Header.propTypes = {
    titulo: PropTypes.string.isRequired
}
export default Header;