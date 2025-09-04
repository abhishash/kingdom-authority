import "../globals.css";

export const metadata = {
  title: "Image Gallery",
  description: "We are family in jesus, you can che",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-[1960px] p-4">{children}</main>

        <footer className="p-6 text-center text-white/80 sm:p-12">
          Thank you to{" "}
          <a
            href="#"
            target="_blank"
            className="font-semibold hover:text-white"
            rel="noreferrer"
          >
            Visit
          </a>{" "}
          <a
            href="#"
            target="_blank"
            className="font-semibold hover:text-white"
            rel="noreferrer"
          >
            Aliana Store
          </a>
          , and{" "}
          <a
            href="#"
            target="_blank"
            className="font-semibold hover:text-white"
            rel="noreferrer"
          >
            Continue to Shopping
          </a>{" "}
        </footer>
      </body>
    </html>
  );
}
