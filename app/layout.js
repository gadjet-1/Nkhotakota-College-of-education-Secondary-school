import "./globals.css";

export const metadata = {
  title: "Nkhotakota college of education Secondary school",
  description: "Official website of Nkhotakota college of education. located in Nkhotakota district town opposite ministry of Agriculture along M5 road",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
