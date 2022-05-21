import { Navbar, Footer, MintProfile } from "../components";

const about = () => (
  <div className="w-full gradient-bg-welcome">
    <Navbar />
    <div className="text-4xl text-center text-white font-bold  mb-10">
      <h1> create Profile</h1>
    </div>
    <MintProfile />
    <Footer />
  </div>
);

export default about;
