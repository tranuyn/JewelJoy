export const ROLES = {
  ADMIN: "ADMIN",
  SALE_STAFF: "SALE_STAFF",
  INVENTORY_STAFF: "INVENTORY_STAFF",
  CUSTOMER: "CUSTOMER",
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
