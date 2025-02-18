"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        boxShadow: "none",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "flex-end" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <IconButton>
              <Image
                src="/toggle-menu.svg"
                width={60}
                height={40}
                alt="messages icon"
              />
            </IconButton>
            <Box sx={{ display: "flex", gap: 2, mr: 4 }}>
              <IconButton
                sx={{
                  backgroundColor: "#E2E8F0",
                  "&:hover": { backgroundColor: "#E2E8F0" },
                }}
              >
                <Image
                  src="/alarm-icon.svg"
                  width={18}
                  height={18}
                  alt="messages icon"
                />
              </IconButton>
              <IconButton
                sx={{
                  backgroundColor: "#E2E8F0",
                  "&:hover": { backgroundColor: "#E2E8F0" },
                }}
              >
                <Image
                  src="/messages-icon.svg"
                  width={18}
                  height={18}
                  alt="messages icon"
                />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0, display: "flex", alignItems: "center", gap: 2 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    fontSize: "0.75rem",
                  }}
                >
                  <Typography sx={{ color: "#1f2937", fontWeight: "500" }}>
                    John Doe
                  </Typography>
                  <Typography sx={{ color: "#6b7280" }}>
                    Verified Member
                  </Typography>
                </Box>
                <Avatar
                  alt="User"
                  src="/static/images/avatar/2.jpg"
                  sx={{ width: 32, height: 32 }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
