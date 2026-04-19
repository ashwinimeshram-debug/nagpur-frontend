import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">

        {/* Main Layout */}
        <LayoutWrapper>
          <main className="flex-grow">
            {children}
          </main>
        </LayoutWrapper>

        {/* Footer always at bottom */}
        <Footer />

      </body>
    </html>
  );
}