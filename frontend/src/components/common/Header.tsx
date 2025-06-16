"use client";

import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, Box, useMediaQuery } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  drawerOpen: boolean;
  onDrawerToggle: (open: boolean) => void;
  renderDrawerContent: () => React.ReactNode;
}

export function Header({ drawerOpen, onDrawerToggle, renderDrawerContent }: HeaderProps) {
  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    onDrawerToggle(open);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  return (
    <AppBar
      position="relative"
      elevation={1}
       sx={{
       backgroundColor: "#fff",
       boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
       width: "100%",
       left: 0,
       right: 0,
       zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          px: { xs: 2, sm: 3, lg: 4 },
          py: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{ color: "#111827", mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="SAFC Logo"
              width={35}
              height={35}
              style={{ marginRight: "1rem" }}
            />
            <Typography
              variant="h6"
              component="h1"
              sx={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
                fontSize: "1.25rem",
                letterSpacing: "-0.015em",
                color: "#111827",
                display: { xs: "none", sm: "block" },
              }}
            >
              Meeting Scheduler
            </Typography>
          </Link>
        </Box>

        {!isMobile && (
          <nav className="space-x-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-gray-900 hover:underline">
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </Toolbar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderDrawerContent()}
      </Drawer>
    </AppBar>

  );
}