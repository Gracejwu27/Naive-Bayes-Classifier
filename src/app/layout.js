import "./globals.css";
import {Oxygen} from "next/font/google"
import Header from "./ui/Header";
import About from "./ui/About";

const oxygen = Oxygen({
  weight: ['400','700'],
  subsets: ['latin'],
});

export const metadata = {
  title: "Text Classifier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={oxygen.className}>{children}</body>
    </html>
  );
}
