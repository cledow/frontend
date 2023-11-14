import "./globals.css";
import SideLists from "./components/sideList/sideLists";
import { IBM_Plex_Sans_KR } from "next/font/google";

const IBM = IBM_Plex_Sans_KR({
  subsets: ["latin"],
  display: "swap",
  weight: ['100', '400', '700']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={IBM.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
