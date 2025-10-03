import { MODULE_URL_FREG } from "./modules-enums";

export enum ADMIN_MODULES_URLS {
  ADD_USER = `${MODULE_URL_FREG.ADMIN}/saveSystemUser`,
  VIEW_USERS = `${MODULE_URL_FREG.ADMIN}/viewSystemUsers`,
  SAVE_USER = `${MODULE_URL_FREG.ADMIN}/saveSystemUser`,
}

export enum ADMIN_Roles {
  ADMIN = "Admin",
  ESS = "ESS",
}
export enum ADMIN_STATUS {
  ENABLED = "Enabled",
  DISABLED = "Disabled",
}

export enum ADMIN_BUTTONS {
  ADD = "Add",
  DELETE = "Delete",
  SAVE = "Save",
  CANCEL = "Cancel",
  SEARCH = "Search",
}

export enum ADMIN_TABS {
  USER_MANAGEMENT_TAB = "User Management",
  JOB_TAB = "Job",
  ORGANIZATION_TAB = "Organization",
  QUALIFICATIONS_TAB = "Qualifications",
  NATIONALITIES_TAB = "Nationalities",
  CORPORATE_TAB = "Corporate Branding",
  CONFIGURATION_TAB = "Configuration",
}
export enum USER_MANAGEMENT_TAB_SUBTABS {
  USERS = "Users",
}
export enum JOB_TAB_SUBTABS {
  JOB_TITLES = "Job Titles",
  PAY_GRADES = "Pay Grades",
  EMPLOYMENT_STATUS = "Employment Status",
  JOB_CATEGORIES = "Job Categories",
  WORK_SHIFTS = "Work Shifts",
}
export enum ORGANIZATION_TAB_SUBTABS {
  GENERAL_INFORMATION = "General Information",
  LOCATIONS = "Locations",
  STRUCTURE = "Structure",
}
export enum QUALIFICATIONS_TAB_SUBTABS {
  SKILLS = "Skills",
  EDUCATION = "Education",
  LICENSES = "Licenses",
  LANGUAGES = "Languages",
}
export enum CONFIGURATION_TAB_SUBTABS {
  EMAIL_CONFIGURATION = "Email Configuration",
  EMAIL_SUBSCRIPTION = "Email Subscription",
  LOCALIZATION = "Localization",
  LANGUAGE_PACKAGES = "Language Packages",
  MODULES = "Modules",
  SOCIAL_MEDIA_AUTHENTICATION = "Social Media Authentication",
  REGISTRATION_OATH_CLIENTS = "Registration OAuth Clients",
  LDAP_CONFIGURATION = "LDAP Configuration",
}
