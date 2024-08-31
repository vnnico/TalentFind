import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

// md:h-[650px]

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar></NavBar>
      <div className=" bg-slate-100 pt-8 pb-10">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default Layout;
