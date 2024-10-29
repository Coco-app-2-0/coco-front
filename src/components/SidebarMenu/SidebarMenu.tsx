'use client'
import { useState } from 'react';
import styles from './SidebarMenu.module.css';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SidebarItem from '../SidebarItem/SidebarItem';
import HomeIcon from '@mui/icons-material/Home';
import CloseIcon from '@mui/icons-material/Close';

interface SidebarMenuProps {
    onToggle: (isOpen: boolean) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebarMenu = () => {
        setIsOpen(!isOpen);
        onToggle(!isOpen);
    };

    return (
        <div className={`${styles.sidebarMenu} ${isOpen ? styles.open : styles.closed}`}>
            <Button
                onClick={toggleSidebarMenu}
                component="label"
                role={undefined}
                tabIndex={-1}
                startIcon={isOpen ? <CloseIcon /> : <ArrowForwardIcon />}
            />
            <nav>
                <ul>
                    <SidebarItem text="Home" href={'/home'} icon={<HomeIcon />} isCollapsed={!isOpen} />
                    {/* Agrega más enlaces según sea necesario */}
                </ul>
            </nav>
        </div>
    );
};

export default SidebarMenu;