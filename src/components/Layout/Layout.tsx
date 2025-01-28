import { useEffect, useState } from 'react';
import Header from './Header';
// import Sidebar from './Sidebar';
import dynamic from 'next/dynamic';
import { useOnboarding } from '@/context/OnboardingContext';

const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });


const Layout = ({ children }: { children: React.ReactNode }) => {
    const { user } = useOnboarding();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        // Ensure this runs only on the client side
        setIsClient(true);
    }, []);
    return (
        <>
            {isClient && (

                <div className="flex h-screen">
                    {/* Sidebar */}
                    <Sidebar />
                    <div className="flex-1 flex flex-col md:ml-[16rem]">
                        {/* Header */}
                        {user?.roles[0]?.roleType === "cp_focal" && (
                            <Header />
                        )}
                        {/* Main Content */}
                        <main className={`flex-1 overflow-y-auto py-6 px-9 bg-[#f2f2f2] ${user?.roles[0]?.roleType === "cp_focal" ? 'mt-16' : ''}`}>
                            {children}
                        </main>
                    </div>
                </div>
            )}
        </>
    );
};

export default Layout;
