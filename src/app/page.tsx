import Navbar from "@/components/Navbar";
import HeroVideo from "@/components/HeroVideo";
import AboutIFC from "@/components/AboutIFC";
import ShareeahDept from "@/components/ShareeahDept";
import VideoShowcase from "@/components/VideoShowcase";
import GalleryShowcase from "@/components/GalleryShowcase";
import ResearchPapers from "@/components/ResearchPapers";
import RegistrationSection from "@/components/RegistrationSection";
import Footer from "@/components/Footer";
import InstagramFloatingButton from "@/components/InstagramFloatingButton";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#f5f5f7] text-[#1d1d1f] selection:bg-[#047857] selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Video Section (100dvh full view on mobile, lap, tv) */}
      <HeroVideo />

      {/* About IFC Section with highlighted animated typography */}
      <AboutIFC />

      {/* Sharee'ah Department Section (2-Year PG, Usrah, Muamalah, 4 Classes) */}
      <ShareeahDept />

      {/* Latest News & YouTube Video Showcase (5 Highlighted Season 1 Videos) */}
      <VideoShowcase />

      {/* Modern Grid Gallery Section (5 Highlighted Images) */}
      <GalleryShowcase />

      {/* PDF Research Papers Section (Read Now & Download) */}
      <ResearchPapers />

      {/* Delegate Registration Section */}
      <RegistrationSection />

      {/* Comprehensive Campus & Department Footer */}
      <Footer />

      {/* Floating Instagram Icon (Bottom-Right) */}
      <InstagramFloatingButton />
    </main>
  );
}
