import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { TopBar } from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { Sun, Moon, Music2 } from "lucide-react";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
  } = useMusicStore();
  const { initializeQueue } = usePlayerStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);

  useEffect(() => {
    if (
      madeForYouSongs.length > 0 &&
      featuredSongs.length > 0 &&
      trendingSongs.length > 0
    ) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent pointer-events-none" />
      
      <TopBar className="bg-zinc-900/50 backdrop-blur-xl border-b border-zinc-800" />
      
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {getGreeting()}
              </h1>
              <p className="text-zinc-400">Discover your perfect soundtrack</p>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              {new Date().getHours() >= 18 ? (
                <Moon className="w-5 h-5 text-zinc-400" />
              ) : (
                <Sun className="w-5 h-5 text-zinc-400" />
              )}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-20 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
            <div className="absolute top-40 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
            <FeaturedSection className="relative backdrop-blur-sm bg-zinc-900/30 rounded-xl border border-zinc-800/50 shadow-xl" />
          </div>

          <div className="space-y-10 mt-12">
            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <Music2 className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold">Made For You</h2>
              </div>
              <SectionGrid
                title="Made For You"
                songs={madeForYouSongs}
                isLoading={isLoading}
                className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              />
            </div>

            <div className="relative">
              <div className="flex items-center gap-2 mb-6">
                <Music2 className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold">Trending Now</h2>
              </div>
              <SectionGrid
                title="Trending"
                songs={trendingSongs}
                isLoading={isLoading}
                className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;