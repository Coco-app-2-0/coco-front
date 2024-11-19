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
import { Inter } from 'next/font/google'
import { ToastProvider } from '@/context/ToastContext';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname()

  const handleToggleSidebar = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  return (
    <ToastProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <Metadata title={'Coco App'} description={'Coco Ventas'} />
          <AppRouterCacheProvider>
            <AuthProvider>
              <body className={inter.className}>
                {pathname !== '/login' && <SidebarMenu onToggle={handleToggleSidebar} isOpen={isSidebarOpen} />}
                <main style={{ marginLeft: isSidebarOpen && pathname !== '/login' ? '250px' : '0', transition: 'margin-left 0.3s' }}>
                    {children}
                </main>
              </body>
            </AuthProvider>
          </AppRouterCacheProvider>
        </html>
      </ThemeProvider>
    </ToastProvider>
  );
}