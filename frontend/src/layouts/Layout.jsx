import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className="flex-1 bg-violet-100">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
