"use client"
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

function Header() {

    const { user, isSignedIn } = useUser();
    return (
        <div className="p-5 flex items-center justify-between item-center border shadow-2xs">
            <Image src={'/logo.png'} alt="Logo" width={50} height={30} style={{ height: 'auto' }} />

            {isSignedIn ? 
            <UserButton /> : <Link href="/sign-in"><Button>Get Started</Button></Link>}
        </div>
    )
}

export default Header;