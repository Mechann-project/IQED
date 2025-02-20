import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { DynamicBackground } from "../../Common";
import { YellowBackgroundSVG, BlueBackgroundSVG } from "../../assets/SVG";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "../../Socket/SocketContext";

const DEFAULT_BACKGROUND_URL =
  "https://firebasestorage.googleapis.com/v0/b/eshikhay-database.appspot.com/o/background%2FWhiteLineBG.svg?alt=media&token=0492f27f-f5d6-4e53-8bd0-92d080d3c131";

const RootLayout = () => {
  const location = useLocation();

  const backgroundImage = useMemo(() => {
    const backgroundMap = {
      "/": YellowBackgroundSVG,
      "/auth": BlueBackgroundSVG,
      "/match": YellowBackgroundSVG,
      "/iqquiz/result": YellowBackgroundSVG,

    };

    const path = location.pathname.toLowerCase();

    if (path.startsWith("/iqquiz") || path.startsWith("/quiz") || path.startsWith("/match") || path.startsWith("/forget")) {
      return YellowBackgroundSVG;
    }

    return backgroundMap[path] || DEFAULT_BACKGROUND_URL;
  }, [location.pathname]);

  return (
    <DynamicBackground
      sx={{ backgroundImage: `url(${backgroundImage})` }}
      className="Root-BackGround"
    >
      <SocketProvider>
        <Outlet />
      </SocketProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </DynamicBackground>
  );
};

export default RootLayout;
