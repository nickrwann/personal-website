import { useEffect, useRef, useState } from 'react';

const useStickyNavbar = (profilePicRef, navbarRef) => {
    const [offset, setOffset] = useState(0); // State to manage additional offset

    useEffect(() => {
        const handleScroll = () => {
            if (!navbarRef.current || !profilePicRef.current) {
                return; // Ensure elements are mounted
            }

            const profilePicTop = profilePicRef.current.getBoundingClientRect().top;
            const navbarHeight = navbarRef.current.offsetHeight;

            if (profilePicTop <= navbarHeight) {
                if (navbarRef.current.style.position !== 'absolute') {
                    setOffset(navbarHeight); // Set offset to maintain space when navbar becomes absolute
                    navbarRef.current.style.position = 'absolute';
                    navbarRef.current.style.top = `${profilePicRef.current.offsetTop - navbarHeight}px`;
                }
            } else {
                if (navbarRef.current.style.position !== 'sticky') {
                    setOffset(0); // Remove offset when navbar is sticky
                    navbarRef.current.style.position = 'sticky';
                    navbarRef.current.style.top = '0px';
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { navbarRef, offset };
}

export default useStickyNavbar;