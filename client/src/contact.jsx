import { Navbar, Welcome, Footer, Services, Transactions } from "./components";

const contact = () => (
  <div className="min-h-screen">
    <div className="bg-gradient-to-r from-blue-800 to-red">
      <Navbar />
      <Welcome />
    </div>
    <Services />
    <Transactions />
    <Footer />
  </div>
);

export default contact;
