import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Sidebar from "@/components/shared/Sidebar";

const IBMPlex = IBM_Plex_Sans({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "Photo AI",
  description: "Generated & share Photos with AI in community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"} appearance={{
      variables: {
        colorPrimary: "#624cf5",
      }
    }}>
      <html lang="en">
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            {/* <UserButton /> */}
            <Sidebar />
          </SignedIn>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
