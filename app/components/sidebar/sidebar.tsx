"use client";
import Image from "next/image";
import logo from "@/app/logo.png";
import { Flex } from "@radix-ui/themes";
import { SidebarLink } from "./sidebarLink";
import React from "react";
import {
  FilePlusIcon,
  HomeIcon,
  ListBulletIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

const sidebarStyle: React.CSSProperties = {
  width: "250px",
  height: "100%",
  position: "fixed",
  color: "white",
  paddingTop: "25px",
  paddingLeft: "10px",
  paddingRight: "10px",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  background: "white",
  top: 0,
  left: 0,
  zIndex: 50,
};

export default function Sidebar() {
  return (
    <div style={sidebarStyle} id="sidebar">
      <nav>
        <Flex justify={"center"} className="mt-5 mb-[50px] p-2">
          <Image src={logo} alt="Logo do sistema" loading="eager" />
        </Flex>
        <ul>
          <SidebarLink href="/">
            <HomeIcon style={{ width: "17px", height: "17px" }} />
            <span className="ml-5">Início</span>
          </SidebarLink>

          <SidebarLink href="/novo-agendamento">
            <FilePlusIcon style={{ width: "17px", height: "17px" }} />
            <span className="ml-5">Novo agendamento</span>
          </SidebarLink>

          <SidebarLink href="/agendamentos">
            <ListBulletIcon style={{ width: "17px", height: "17px" }} />
            <span className="ml-5">Agendamentos</span>
          </SidebarLink>

          <SidebarLink href="/especialidades">
            <PersonIcon style={{ width: "17px", height: "17px" }} />
            <span className="ml-5">Especialidades</span>
          </SidebarLink>
        </ul>
      </nav>
    </div>
  );
}
