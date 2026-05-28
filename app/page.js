import Hero from "./_components/Hero";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Header />
        <Hero />
      </div>
      <Footer />
    </div>
  );
}
