'use client'

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/logo2.png';


type TopNavProps = {
    menuItems: string[];
};

type MenuItemListProps = {
    menuItems: string[];
};

type MobileMenuItemListProps = {
    menuItems: string[];
};

function MenuItemList(props: MobileMenuItemListProps) {
    const linkDivClasses: string = "py-2 opacity-100 rounded-lg p-5 text-white " +
        "hover:bg-white/20 sm:mr-5";

    return (
        <div className="w-full bg-midnightblue grid grid-cols-1 pb-5 pl-5 pr-5 sm:grid-cols-2 lg:hidden">
            {
                props.menuItems.map(
                    function (menuItem, itemIndex) {
                        let link: string = '/' + menuItem.replaceAll(' ', '').toLowerCase();

                        return (
                            <Link
                                href={link} key={itemIndex}
                            >
                                <div className={linkDivClasses}>
                                    <p>{menuItem}</p>
                                </div>
                            </Link>
                        );
                    }
                )
            }
        </div >
    );
}

function DesktopMenuItemList(props: MenuItemListProps) {
    const linkDivClasses: string = "duration-100 px-5 py-2 opacity-100 rounded-lg text-white ml-5 " +
        "hover:bg-white/20";

    return (
        <div className="flex-row hidden bg0-midnightblue lg:flex">
            {
                props.menuItems.map(
                    function (menuItem, itemIndex) {
                        let link: string = '/' + menuItem.replaceAll(' ', '').toLowerCase();

                        return (
                            <Link href={link} key={itemIndex}>
                                <div className={linkDivClasses}>
                                    <p>{menuItem}</p>
                                </div>
                            </Link>
                        );
                    }
                )
            }
        </div >
    );
}

export default function TopNav(props: TopNavProps) {
    function getBurgerClasses(isOpen: boolean): string[] {
        const classNames: string[] = new Array(3);

        if (!isOpen) {
            for (let i: number = 0; i < 3; i++) {
                classNames[i] = 'duration-100 w-5 h-1 my-1 rounded-md bg-white';
            }
        } else {
            classNames[0] = 'duration-100 w-5 h-1 my-1 rounded-md bg-white rotate-45 translate-y-2';
            classNames[1] = 'duration-100 w-5 h-1 my-1 rounded-md bg-midnightblue';
            classNames[2] = 'duration-100 w-5 h-1 my-1 rounded-md bg-white -rotate-45 -translate-y-2';
        }

        return classNames;
    }

    const [isOpen, setIsOpen] = useState(false);

    const menuDivClassName: string = (
        isOpen ? 'duration-200 w-full -z-10 fixed' :
            'duration-200 w-full -z-10 fixed -translate-y-full'
    );

    const burgerClasses: string[] = getBurgerClasses(isOpen);

    return (
        <div className="w-full sticky top-0 z-50">
            <div className="w-full bg-midnightblue flex flex-row pl-6 md:pl-8 lg:pl-10 pr-5 py-5 justify-between">
                <Link href="/" className="flex flex-col justify-center">
                    <div className='mr-6'>
                        <Image
                            src={logo}
                            alt="Logo"
                            height={"25"}
                        />
                    </div>
                </Link>

                <DesktopMenuItemList menuItems={props.menuItems}></DesktopMenuItemList>
                <div
                    onClick={e => { setIsOpen(!isOpen); }} className="lg:hidden"
                >
                    <div className={burgerClasses[0]}></div>
                    <div className={burgerClasses[1]}></div>
                    <div className={burgerClasses[2]}></div>
                </div>
            </div>
            <div className={menuDivClassName}>
                <MenuItemList menuItems={props.menuItems}></MenuItemList>
            </div>
        </div>
    );
};