import AudioVisualizer from '@/components/AudioVisualizer';
import CustomizationSidebar from '@/components/CustomizationSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function Home() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen bg-background">
        <CustomizationSidebar />
        <main className="flex-1 flex items-center justify-center">
          <AudioVisualizer />
        </main>
      </div>
    </SidebarProvider>
  );
}
