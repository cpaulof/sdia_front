import { Link, Outlet } from "react-router-dom";



function Layout({children,}){
    return (
        <html>
            <body className="min-h-screen bg-background font-sans antialiased">
                <div className="relative flex flex-col h-screen">
                    <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                        <Outlet />
                    </main>
                    <footer className="w-full flex items-center justify-center py-3">
                        <Link
                            isExternal
                            className="flex items-center gap-1 text-current"
                            href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                            title="nextui.org homepages"
                        >
                            <span className="text-default-600">Powered by</span>
                            <p className="text-primary">NextUI</p>
                        </Link>
                    </footer>
                </div>

            </body>
            
        </html>
	);
}

export default Layout