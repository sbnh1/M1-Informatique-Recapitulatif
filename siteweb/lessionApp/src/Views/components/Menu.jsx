import React from 'react';
import '../../styles/menu.css';

const Menu = ({ items = [], update }) => {
    return (
        <nav className="fixed-right-menu" aria-label="Menu principal">
            <ul className="fixed-right-menu__list">
                {items.map(item => (
                    <li key={item.id} className="fixed-right-menu__item">
                        <label className="fixed-right-menu__link">
                            <input
                                type="checkbox"
                                name="files"
                                value={item.file}
                                onChange={(e) => update(item.id)}
                                checked={item.checked}
                            />
                            {item.file}
                        </label>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Menu;
