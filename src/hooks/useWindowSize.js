import { useState, useEffect } from "react";


const getWindowSize = () => {
    return {
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0
    };
};

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState(getWindowSize());

    const handleWindowResize = () => {
        setWindowSize(getWindowSize());
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleWindowResize);

            return () => {
                window.removeEventListener("resize", handleWindowResize);
            };
        }
    }, []);

    return windowSize;
};

export default useWindowSize;
