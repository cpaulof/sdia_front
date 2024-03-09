import { Link, Outlet } from "react-router-dom";

import React, { useEffect } from "react";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Grid} from "@nextui-org/react";
//import {AcmeLogo} from "./AcmeLogo.jsx";
import drone from "../assets/drone.png"

function AcmeLogo(){
    return (
        <img src={drone} width="32" />
    )
}

 function MyNavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState(0);

  const menuItems = [
    "Monitoramento de Perímetro",
    "Detecção de Face",
    "Log de Voos",
    "Missões",
    "Gerenciamento",
  ];
  const menuLinks= [
    "pid",
    "face-detection",
    "flight-record",
    "missions",
    "managment"
  ]
  const navbarItems = menuItems.map((item, index)=> (
        <NavbarItem onClick={()=>{setActiveItem(index)}} isActive={index==activeItem}>
        <Link to={menuLinks[index]} color="foreground" >
        {item}
        </Link>
    </NavbarItem>
    ))

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p>SD</p><p className="font-bold text-inherit">IA</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p>SD</p><p className="font-bold text-inherit">IA</p>
        </NavbarBrand>
        {navbarItems.map((item, index)=> (
            item
        ))}
      </NavbarContent>

      

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link to={menuLinks[index]}
              className="w-full"
              color={
                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}



function Layout({children,}){
  useEffect(()=>{document.title = "SDIA"}, [])
    return (
        <html>
            <body className="font-sans bg-background">
                
                <div className="flex flex-col">
                <MyNavBar />
                    <main className="container mx-auto pt-10  px-2 flex-grow  shadow-small dddd">
                        
                        <Outlet />
                    </main>
                    <footer className="w-full flex items-center justify-center py-3">
                        
                            <span className="text-default-600 px-3">Feito por:</span>
                            
                        <a isExternal
                            target="blank"
                            className="flex items-center gap-1 text-current"
                            href="https://github.com/cpaulof"
                            title="Profile" >
                            <p className="text-primary">Paulo </p>
                        </a>
                    </footer>
                </div>

            </body>
            
        </html>
	);
}

export default Layout