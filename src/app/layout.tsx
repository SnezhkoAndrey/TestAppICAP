import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.scss";
import ProviderRedux from "@/redux/provider";
import ErrorLayout from "./table/components/ErrorLayout";

const inter = VT323({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Test App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=VT323&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={inter.className}
        style={{
          backgroundImage: `url("https://cdna.artstation.com/p/assets/images/images/036/271/508/original/bizarre-beasties-day.gif?1617197308")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <ProviderRedux>
          <ErrorLayout>{children}</ErrorLayout>
        </ProviderRedux>
      </body>
    </html>
  );
}
