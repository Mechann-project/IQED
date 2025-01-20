import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DynamicBackground } from "../../Common";
import {
  WhiteBackgroundSVG,
  YellowBackgroundSVG,
  BlueBackgroundSVG,
} from "../../assets/SVG";
import { Toaster } from "react-hot-toast";
// import { SocketProvider } from "../../Socket/SocketContext";

const RootLayout = () => {
  const location = useLocation();

  const backgroundImage = useMemo(() => {
    const backgroundMap = {
      "/": BlueBackgroundSVG,
      "/match": YellowBackgroundSVG,
      "/iqquiz/result": YellowBackgroundSVG,
    };

    const path = location.pathname.toLowerCase();

    if (
      path.startsWith("/iqquiz") ||
      path.startsWith("/quiz") ||
      path.startsWith("/match")
    ) {
      return YellowBackgroundSVG;
    }
    if (path.endsWith("/result")) {
      return YellowBackgroundSVG;
    }

    return backgroundMap[path] ;
  }, [location.pathname]);

  return (
    <DynamicBackground
    sx={{ backgroundImage: `url(${backgroundImage || WhiteBackgroundSVG})` }}
      className="Root-BackGround"
    >
      <Outlet />
      {/* Future use of SocketProvider */}
      {/* <SocketProvider> */}
      {/* </SocketProvider> */}
      <Toaster position="top-center" reverseOrder={false} />
    </DynamicBackground>
  );
};

export default RootLayout;
