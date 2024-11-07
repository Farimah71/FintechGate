import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { setMenuItem } from "../helper/UI/render-sidebar-items";
import { MenuProps } from "antd";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { GrInternetExplorer } from "react-icons/gr";
import { GrTransaction } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { GiPayMoney } from "react-icons/gi";
import { FaUserTie } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import { t } from "i18next";

type MenuItem = Required<MenuProps>["items"][number];

const userType = localStorage.getItem("fintech__userType");

const renderItemTitle = (title: string, href: string): ReactNode => {
  return <NavLink to={href}>{title}</NavLink>;
};

const PSPItems = [
  setMenuItem(
    renderItemTitle(t("sidebar.dashboard"), "dashboard"),
    "dashboard",
    <FaChartLine />
  ),
  setMenuItem(renderItemTitle(t("sidebar.psp"), "psp"), "psp", <GrMoney />),
  setMenuItem(
    renderItemTitle(t("sidebar.website"), "website"),
    "website",
    <GrInternetExplorer />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.transaction"), "transaction"),
    "transaction",
    <GrTransaction />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.invoice"), "invoice"),
    "invoice",
    <LiaFileInvoiceDollarSolid />
  ),
];
const integratorItems = [
  setMenuItem(
    renderItemTitle(t("sidebar.dashboard"), ""),
    "dashboard",
    <FaChartLine />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.integrator"), "integrator"),
    "integrator",
    <FaUserTie />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.transaction"), "transaction"),
    "transaction",
    <GrTransaction />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.payment"), "payment"),
    "payment",
    <GiPayMoney />
  ),
];
const adminItems = [
  setMenuItem(
    renderItemTitle(t("sidebar.dashboard"), ""),
    "dashboard",
    <FaChartLine />
  ),
  setMenuItem(renderItemTitle(t("sidebar.psp"), "psp"), "psp", <GrMoney />),
  setMenuItem(
    renderItemTitle(t("sidebar.integrator"), "integrator"),
    "integrator",
    <FaUserTie />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.website"), "website"),
    "website",
    <GrInternetExplorer />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.transaction"), "transaction"),
    "transaction",
    <GrTransaction />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.invoice"), "invoice"),
    "invoice",
    <LiaFileInvoiceDollarSolid />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.payment"), "payment"),
    "payment",
    <GiPayMoney />
  ),
  setMenuItem(
    renderItemTitle(t("sidebar.security"), "security"),
    "security",
    <MdOutlineSecurity />
  ),
];

const selectMenuType: Record<string, MenuItem[]> = {
  1: adminItems,
  2: PSPItems,
  3: integratorItems,
};

export const items: MenuItem[] = selectMenuType[userType!];
