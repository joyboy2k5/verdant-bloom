import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ChatBot } from "@/components/ChatBot";
import paperTexture from "@/assets/paper-texture.jpg";

const Dashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen relative">
          {/* Watercolor background */}
          <div className="fixed inset-0 -z-10 opacity-[0.07] pointer-events-none">
            <img src={paperTexture} alt="" className="w-full h-full object-cover" />
          </div>
          <div className="fixed inset-0 -z-10 watercolor-bg pointer-events-none" />

          <header className="h-14 flex items-center border-b border-botanical px-4 bg-parchment/60 backdrop-blur-sm">
            <SidebarTrigger className="text-ink-light hover:text-ink" />
            <span className="ml-3 font-display text-lg text-ink font-semibold tracking-wide">
              BioSync
            </span>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
        <ChatBot />
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
