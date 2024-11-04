'use client'
import { useState } from 'react';
import styles from './SidebarMenu.module.css';
import { Button } from '@mui/material';
import SidebarItem from '../SidebarItem/SidebarItem';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { usePathname } from 'next/navigation';

interface SidebarMenuProps {
    onToggle: (isOpen: boolean) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);
    const pathname = usePathname()
    const toggleSidebarMenu = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen);
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
                        isCollapsed={!isOpen} // Manejar clic en el ítem
                        isActive={pathname === '/main'}                    />
                    {/* Agrega más enlaces según sea necesario */}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarMenu;