export interface AppSettings {
    sidenavOpened: boolean;
    sidenavCollapsed: boolean;
}

export interface NavItem {
    displayName?: string;
    iconName?: string;
    navCap?: string;
    route?: string;
    children?: NavItem[];
    chip?: boolean;
    chipContent?: string;
    chipClass?: string;
    external?: boolean;
}