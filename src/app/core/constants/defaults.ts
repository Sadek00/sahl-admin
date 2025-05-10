import { AppSettings } from '../models/app.model';

export const APP_DEFAULTS: AppSettings = {
  sidenavOpened: false,
  sidenavCollapsed: false
};

export const LAYOUT_DEFAULTS = {
  mobileBreakpoint: 768,
  tabletBreakpoint: 1024,
  headerHeight: 70,
  sidenavWidth: 260,
  sidenavCollapsedWidth: 70
};

export const UI_DEFAULTS = {
  dateFormat: 'MMM dd, yyyy',
  timeFormat: 'HH:mm',
  currency: 'USD',
  paginationSize: 10,
  theme: 'light'
};