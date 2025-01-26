export const PROPERTY_FIELDS = {
    DEFAULT: "id, street, zipCode, city, municipality, county, countyCode, createdAt",
    WITH_LANDLORD: "id, street, zipCode, city, municipality, county, countyCode, createdAt, landlord:landlords!inner(*)",
    WITH_TENANT_COUNT: `
        id, 
        street, 
        zipCode, 
        city, 
        municipality, 
        county, 
        countyCode, 
        createdAt,
        tenant_registry_records!inner(count)
    `,
} as const;
