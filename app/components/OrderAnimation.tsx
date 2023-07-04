import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import order from "@/public/order.json";
import { useThemeStore } from "@/store";

export default function OrderAnimation() {
  const themeStore = useThemeStore();

  const playerStyle = {
    filter: themeStore.mode === "synthwave" ? "invert(89%)" : "none",
  };

  return (
    <div className="flex items-center justify-center flex-col mt-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Preping your order ✨
      </motion.h1>
      <Player autoplay loop src={order} style={playerStyle}></Player>
    </div>
  );
}
