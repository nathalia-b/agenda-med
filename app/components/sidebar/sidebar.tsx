"use client";
import Image from "next/image";
import Logo from "@/app/logo.png";
import { Flex } from "@radix-ui/themes";
import { SidebarLink } from "./sidebarLink";
import React from "react";
import {
  ClockIcon,
  FilePlusIcon,
  HomeIcon,
  ListBulletIcon,
  PersonIcon,
} from "@radix-ui/react-icons";

const sidebarStyle: React.CSSProperties = {
  width: "250px",
  height: "100vh",
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
        <Flex justify={"center"} className="mt-5 mb-[50px]">
          <Image width="250" height="100" src={Logo} alt="bla"></Image>
        </Flex>
        <ul>
          <SidebarLink href="/">
            <HomeIcon style={{ width: "17px", height: "17px" }} />
            <span className="ml-5">Início</span>
          </SidebarLink>

          <SidebarLink href="/novo-agendamento">
            <FilePlusIcon />
            <span className="ml-5">Novo agendamento</span>
          </SidebarLink>

          <SidebarLink href="/horarios">
            <ClockIcon />
            <span className="ml-5">Horários</span>
          </SidebarLink>

          <SidebarLink href="/agendamentos">
            <ListBulletIcon />
            <span className="ml-5">Agendamentos</span>
          </SidebarLink>

          <SidebarLink href="/especialidades">
            <PersonIcon />
            <span className="ml-5">Especialidades</span>
          </SidebarLink>
        </ul>
      </nav>
    </div>
  );
}
