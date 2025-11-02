import "./globals.css";

export const metadata = {
  title: "AI Fitness Coach",
  description: "Personalized AI-powered workout & diet plans"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="min-h-screen p-6">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
      </body>
    </html>
  );
}
