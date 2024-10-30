import React from 'react';
import Link from 'next/link';
import styles from './SidebarItem.module.css';

interface SidebarItemProps {
    icon?: React.ReactNode;
    text: string;
    href: string;
    isCollapsed: boolean; // Nueva propiedad
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, href, isCollapsed }) => {
    return (
        <li className={styles.sidebarItem}>
            <Link href={href} className={styles.link}>
                {icon}
                {!isCollapsed && <span>{text}</span>} {/* Mostrar texto solo si no está colapsado */}
            </Link>
        </li>
    );
};

export default SidebarItem;