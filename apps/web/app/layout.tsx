import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "./components/layout/MainLayout";
import { ThemeProvider } from "next-themes";


export const metadata: Metadata = {
  title: "DevDocs_Terminal",
  description: "Technical Tutorials for Developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark">

          <MainLayout>

            {children}
          </MainLayout>

        </ThemeProvider>
      </body>
    </html>
  );
}
