export const metadata = {
  title: "Test Case Management",
  description: "Manage your test cases easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
