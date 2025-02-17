'use client'

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Drawer, List, ListItemText, useMediaQuery, ListItemButton, IconButton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarProps {
  show: boolean;
}

const menuItems = [
  { path: '/invoices/add', label: 'Add Invoice', icon: '/add-menu.svg' },
  { path: '/invoices/list', label: 'My Invoices', icon: '/list-menu.svg' },
];

const Sidebar: React.FC<SidebarProps> = ({ show }) => {
  const theme = useTheme();
  const pathname = usePathname();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <List sx={{ mb: { xs: 2, sm: 4 } }}>
        <Link href="/invoices">
          {/* <Image 
            src="/invoice-hub.svg" 
            alt="logo" 
            width={166} 
            height={44}
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              width: '120px' // Smaller logo for mobile
            }}
          /> */}
        </Link>
      </List>
      <List sx={{ flexGrow: 1 }}>
        <Box component="span" sx={{ 
          color: '#d1d5db', 
          fontSize: '14px',
          display: 'block',
          mb: { xs: 0.5, sm: 1 },
          px: { xs: 1, sm: 2 }
        }}>
          Menu
        </Box>
        {menuItems.map(({ path, label, icon }) => (
          <Link href={path} key={path} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton 
              sx={{ 
                display: 'flex', 
                gap: { xs: 1, sm: 2 },
                mb: { xs: 0.5, sm: 1 },
                py: { xs: 1, sm: 1.5 },
                px: { xs: 1, sm: 2 },
                backgroundColor: pathname === path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)'
                }
              }}
              onClick={isMobile ? handleDrawerToggle : undefined}
            >
              <Image src={icon} alt={label} width={12} height={12} />
              <ListItemText 
                primary={label} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    fontSize: { xs: '13px', sm: '14px' },
                    color: pathname === path ? '#fff' : '#d1d5db'
                  } 
                }} 
              />
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            position: 'fixed',
            top: 8,
            left: 8,
            zIndex: 1200,
            padding: '8px',
            backgroundColor: '#1C2434',
            '&:hover': {
              backgroundColor: '#2d3748'
            }
          }}
        >
          <MenuIcon sx={{ fontSize: '20px', color: 'white' }} />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : show}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#1C2434',
            color: '#fff',
            width: { xs: '200px', sm: 240 },
            padding: { xs: '16px', sm: '32px' },
            position: 'relative',
            zIndex: 1,
            height: '100%',
            borderRight: 'none'
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
