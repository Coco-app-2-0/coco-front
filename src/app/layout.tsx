'use client'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import SidebarMenu from "@/components/SidebarMenu/SidebarMenu";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/context/AuthContext';
import { Metadata } from '@/components/Metadata/Metadata';
import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname()

  const handleToggleSidebar = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <Metadata title={'Coco App'} description={'Coco Ventas'} />
        <AppRouterCacheProvider>
          <AuthProvider>
            <body>
              {pathname !== '/' && <SidebarMenu onToggle={handleToggleSidebar} />}
              <main style={{ marginLeft: isSidebarOpen && pathname !== '/login' ? '250px' : '0', transition: 'margin-left 0.3s' }}>
                  {children}
              </main>
            </body>
          </AuthProvider>
        </AppRouterCacheProvider>
      </html>
    </ThemeProvider>
  );
}