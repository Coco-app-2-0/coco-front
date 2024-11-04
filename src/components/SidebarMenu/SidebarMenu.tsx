'use client'
import { useState } from 'react';
import styles from './SidebarMenu.module.css';
import { Button, IconButton } from '@mui/material';
import SidebarItem from '../SidebarItem/SidebarItem';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

interface SidebarMenuProps {
    onToggle: (isOpen: boolean) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isActive, setIsActive] = useState(false); 
    const toggleSidebarMenu = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen);
    };
    const handleItemClick = () => {
        setIsActive(true); // Cambia el estado a activo al hacer clic
    };

    return (
        <div className={`${styles.sidebarMenu} ${isOpen ? styles.open : styles.closed}`}>
            <Button
                className={styles.iconSideMenu}
                onClick={toggleSidebarMenu}
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={isOpen ? <CloseIcon style={{ fontSize: '2rem' }} /> : <MenuOpenIcon style={{ fontSize: '2rem' }} />}
            />
            <nav>
                <ul>
                    <SidebarItem 
                        text="Home"
                        href={'/main'}
                        icon={<HomeIcon style={{ fontSize: '2rem' }} />} // Aumentar tamaño del ícono
                        isCollapsed={!isOpen}
                        onClick={handleItemClick} // Manejar clic en el ítem
                        isActive={true}                    />
                    {/* Agrega más enlaces según sea necesario */}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarMenu;