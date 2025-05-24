import React from 'react';
import './globals.css';
import Script from 'next/script';
import Link from 'next/link';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-4FB8LY0VJ5"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-4FB8LY0VJ5');
                    `}
                </Script>
            </head>
            <body className="flex flex-col min-h-screen">
                <main className="flex-grow">
                    {children}
                </main>
                <footer className="py-4 text-center text-sm text-gray-600">
                    <Link 
                        href="https://www.linkedin.com/in/asif-akbar-41337239/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-gray-800 transition-colors"
                    >
                        Made with ❤️ by Asif Akbar
                    </Link>
                </footer>
            </body>
        </html>
    );
};

export default Layout;