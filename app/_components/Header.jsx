import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function Header() {
    return (
        <div className="p-5 flex items-center justify-between item-center border shadow-2xs">
            <Image src={'/logo.png'} alt="Logo" width={50} height={30} style={{ height: 'auto' }} />
            <Button>Get Started</Button>
        </div>
    )
}

export default Header;