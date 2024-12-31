import useAuth from "@/store/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SideMenu from "./components/SideMenu";

const FullTemplate = () => {
  const isLogin = useAuth((state) => state.auth.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/auth/login");
  }, [isLogin]);

  return (
    <div className="w-full flex flex-row">
      <SideMenu />
      <div className="w-full h-max">
        <Navbar />
        <div className="w-full h-[88vh] px-4 py-2 overflow-auto no-scrollbar">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default FullTemplate;
