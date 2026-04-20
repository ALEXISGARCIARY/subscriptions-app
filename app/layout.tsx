import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100 text-black">{children}</body>
    </html>
  );
}
