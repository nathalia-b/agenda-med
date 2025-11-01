"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const activeLink: React.CSSProperties = {
  display: "flex",
  width: "100%",
  background: "var(--primary)",
  color: "white",
  marginTop: "10px",
  textDecoration: "none",
  padding: "13px",
  alignItems: "center",
  borderRadius: ".5rem",
  transition: "background-color 0.2s, color 0.2s",
};

const inactiveLink: React.CSSProperties = {
  ...activeLink,
  background: "transparent",
  color: "#666",
};

type SidebarLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function SidebarLink({ href, children }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <li style={{ listStyle: "none" }}>
      <Link
        href={href}
        className={!isActive(href) ? "inactive" : ""}
        style={isActive(href) ? activeLink : inactiveLink}
      >
        {children}
      </Link>
    </li>
  );
}
