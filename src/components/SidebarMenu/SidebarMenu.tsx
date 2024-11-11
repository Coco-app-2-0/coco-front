import styles from './SidebarMenu.module.css';
import { Button } from '@mui/material';
import SidebarItem from '../SidebarItem/SidebarItem';
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { usePathname } from 'next/navigation';
import HomeIcon from '../../assets/images/home-icon.svg'
import LogOutIcon from '../../assets/images/logout-icon.svg'
import Image from 'next/image';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

interface SidebarMenuProps {
    onToggle: (isOpen: boolean) => void;
    isOpen: boolean
}
const SidebarMenu: React.FC<SidebarMenuProps> = ({ onToggle, isOpen = false }) => {
    const pathname = usePathname();
    const { logout } = useContext(AuthContext) || {};
    const toggleSidebarMenu = () => {
        onToggle(!isOpen);
    };
    const handleLogOut = () => {
        logout?.();
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
            <nav className={styles.linksList}>
                <ul>
                    <SidebarItem 
                        text="Home"
                        href={'/main'}
                        icon={
                            <Image src={HomeIcon} alt={'home icon'} />
                        } // Aumentar tamaño del ícono
                        isCollapsed={!isOpen} // Manejar clic en el ítem
                        isActive={pathname === '/main'}                    />
                    {/* Agrega más enlaces según sea necesario */}
                </ul>
                <SidebarItem 
                    text="Cerrar Sesión"
                    href={'/login'}
                    isCollapsed={!isOpen} 
                    isActive={false}
                    onClick={() => handleLogOut()}
                    icon={
                        <Image src={LogOutIcon} alt={'cerrar sesión'} />
                    } 
                />
            </nav>
        </div>
    );
};

export default SidebarMenu;