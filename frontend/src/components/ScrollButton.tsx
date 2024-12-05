import React, { useState, useEffect } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import "../style/ScrollButton.css";

const ScrollButton: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false); // Specify state type

    const toggleVisible = (): void => {
        const scrolled = document.documentElement.scrollTop;
        setVisible(scrolled > 300);
    };

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
        return () => {
            window.removeEventListener("scroll", toggleVisible);
        };
    }, []); // Empty dependency array ensures this runs only once when the component mounts.

    return (
        <button className="scroll-btn" onClick={scrollToTop}>
            <ArrowUpwardIcon
                style={{ display: visible ? "inline" : "none" }}
            />
        </button>
    );
};

export default ScrollButton;
