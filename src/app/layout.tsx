'use client'

import "@/app/globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { Box } from "@mui/material";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ProgressBar
          height="4px"
          color="#fffd00"
          options={{ showSpinner: true }}
          shallowRouting
        />
        <Box display="flex" height="100vh">
          <Sidebar show={true} />
          <Box flex={1} display="flex" flexDirection="column" sx={{
            marginLeft: {
              xs: 0,
              sm: 0,
              lg: "300px",
            }
          }}>
            <Header />
            <Box padding={{ xs: 4, sm: 6 }} paddingY={8} paddingX={16}>
              {children}
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
