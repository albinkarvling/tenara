import { TENANT_FIELDS } from "./tenant.fields";

export const PROPERTY_FIELDS = {
    DEFAULT: "id, street, zipCode, city, municipality, county, countyCode, createdAt",
    WITH_LANDLORD: "id, street, zipCode, city, municipality, county, countyCode, createdAt, landlord:landlords!inner(*)",
    WITH_TENANT_COUNT: `
        *,
        tenantCount:tenant_registry_records(count)
    `,
} as const;
