import React from 'react';
import Link from 'next/link';
import styles from './SidebarItem.module.css';

interface SidebarItemProps {
    icon?: React.ReactNode;
    text: string;
    href: string;
    isCollapsed: boolean;
    onClick: () => void; // Nueva propiedad
    isActive: boolean; // Nueva propiedad para saber si está activo
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, href, isCollapsed, onClick, isActive }) => {
    return (
        <li className={`${styles.sidebarItem} ${isActive ? styles.active : ''}`}> {/* Aplicar clase activa */}
            <Link href={href} className={styles.link} onClick={onClick}>
                {icon}
                {!isCollapsed && <span>{text}</span>} {/* Mostrar texto solo si no está colapsado */}
            </Link>
        </li>
    );
};

export default SidebarItem;