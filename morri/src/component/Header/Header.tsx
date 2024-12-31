import LocationOnIcon from '@mui/icons-material/LocationOn';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
    AppBar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import React from 'react';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <img src="/images/morri-logo.png" alt="Morri" className="logo" />
        
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ marginLeft: 'auto' }}
            >
              <MenuIcon sx={{ color: '#3E5C63' }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <LocationOnIcon /> Cửa hàng
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <PhoneIcon /> Hotline: 0939800899
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ShoppingCartIcon /> Đơn hàng
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ShoppingCartIcon /> Giỏ hàng
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <PersonIcon /> Peter
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Box className="header-links">
            <Box className="header-link">
              <LocationOnIcon />
              <Typography>Cửa hàng</Typography>
            </Box>
            <Box className="header-link">
              <PhoneIcon />
              <Typography>Hotline: 0939800899</Typography>
            </Box>
            <Box className="header-link">
              <ShoppingCartIcon />
              <Typography>Đơn hàng</Typography>
            </Box>
            <Box className="header-link">
              <ShoppingCartIcon />
              <Typography>Giỏ hàng</Typography>
            </Box>
            <Box className="header-link">
              <PersonIcon />
              <Typography>Peter</Typography>
            </Box>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;