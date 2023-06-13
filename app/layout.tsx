import { Toaster } from "@/components/Toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import PocketbaseProvider from "@/providers/pocketbase-provider";
import "./globals.css";

export const metadata = {
  title: "Infi Networks",
  description: "Infi Networks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PocketbaseProvider>{children}</PocketbaseProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
