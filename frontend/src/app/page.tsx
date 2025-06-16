"use client";

import { useState } from 'react';
import { Dialog } from '@/components/ui/Dialog';
import MeetingForm from '@/components/meeting/MeetingForm';
import CalendarView from '@/components/calendar/CalendarView';
import ErrorDisplay from '@/components/common/ErrorDisplay';
import useMeetings from '@/components/meeting/useMeeting';
import { Header } from '@/components/common/Header';
import { Box, Typography, IconButton, List, ListItem, ListItemText } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";

export default function Home() {
  const { meetings, error, fetchMeetings } = useMeetings();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  const handleMeetingCreated = () => {
    setIsDialogOpen(false);
    fetchMeetings();
  };

  const toggleDrawer = (open: boolean) => {
    setDrawerOpen(open);
  };

  const renderDrawerContent = () => (
    <Box sx={{ width: 250, p: 2 }} role="presentation" onClick={() => toggleDrawer(false)} onKeyDown={() => toggleDrawer(false)}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" className="font-poppins font-semibold tracking-tight">
          SAFC Scheduler
        </Typography>
        <IconButton aria-label="close drawer">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.href} component={Link} href={link.href}>
            <ListItemText primary={link.label} className="font-poppins text-sm font-medium" />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Header navLinks={navLinks} drawerOpen={drawerOpen} onDrawerToggle={toggleDrawer} renderDrawerContent={renderDrawerContent} />
      <div>
        <h1 className="font-poppins text-4xl font-bold text-center mb-6 text-primary">Meeting Room Scheduler</h1>
        <ErrorDisplay error={error} />
        <div className="flex justify-between mb-4">
          <h2 className="font-poppins text-2xl font-semibold text-secondary">Room Calendar</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <MeetingForm onSubmit={handleMeetingCreated} />
          </Dialog>
        </div>
        <CalendarView meetings={meetings} />
      </div>
    </>
  );
}