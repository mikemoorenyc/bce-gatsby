import React from "react";
import NavItems from "../NavItems";

import { HeaderProps } from "..";
interface MobileNavProps extends HeaderProps {
 mobileNavOpened: boolean 
}
const MobileNav = ({mobileNavOpened,siteDesc,siteTitle,menuItems}:HeaderProps) => <div>test</div>;


export default MobileNav
