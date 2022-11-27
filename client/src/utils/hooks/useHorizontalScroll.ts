import React, {useEffect, useRef} from "react";

export function useHorizontalScroll() {
    const elRef = useRef<HTMLUListElement>(null);
    useEffect(() => {
        const el = elRef.current;

        if (el) {
            const onWheel = (e: WheelEvent) => {

                if (e.deltaY == 0) return;
                el.dispatchEvent(new KeyboardEvent('keydown', {shiftKey: true}))
                e.preventDefault();

                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: "smooth"
                });
            };

            el.addEventListener("wheel", onWheel);
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);
    return elRef;
}