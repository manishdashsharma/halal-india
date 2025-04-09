import { z } from "zod";

const stringUrl = (field) =>
  z.string({
    required_error: `${field} is required`,
    invalid_type_error: `${field} must be a string`,
  }).url({ message: `Invalid ${field} URL` });

const stringEmail = (field) =>
  z.string({
    required_error: `${field} is required`,
    invalid_type_error: `${field} must be a string`,
  }).email({ message: `Invalid ${field}` });

const nonEmptyString = (field) =>
  z.string({
    required_error: `${field} is required`,
    invalid_type_error: `${field} must be a string`,
  }).min(1, { message: `${field} is required` });


export const clientSchema = z.object({
  username: nonEmptyString("Username"),
  ndaSign: z.boolean().optional(),
  logoAgreement: z.boolean().optional(),
});

export const clientCompanyDetailsSchema = z.object({
  name: nonEmptyString("Name"),
  position: nonEmptyString("Position"),
  companyName: nonEmptyString("Company name"),
  companyOfficialNumber: nonEmptyString("Official number"),
  companyEmail: stringEmail("Company email"),
  companyWebsiteUrl: stringUrl("Company website"),
  companyAddress: nonEmptyString("Company address"),
  companyPan: nonEmptyString("Company PAN"),

  companyLogoUrl: stringUrl("Company logo"),
  incorporationCertificateUrl: stringUrl("Incorporation certificate"),
  moaDocumentUrl: stringUrl("MOA document"),
  authorizedSignatorySealUrl: stringUrl("Authorized signatory seal"),
  companyRoundSealUrl: stringUrl("Company round seal"),
  fssaiCertificateUrl: stringUrl("FSSAI certificate"),
});



export const clientCompanyDirectorSchema = z.object({
  name: nonEmptyString("Director name"),
  phoneNumber: nonEmptyString("Phone number"),
  pan: nonEmptyString("PAN number"),
  email: stringEmail("Email"),

  panCardUrl: stringUrl("PAN card"),
  idProofUrl: stringUrl("ID proof"),
  signatureUrl: stringUrl("Signature"),
});



export const clientHalalCertificationApplicationSchema = z.object({
  applicationDate: z.coerce.date(),
  businessName: nonEmptyString,
  businessType: nonEmptyString,
  address: nonEmptyString,
  country: nonEmptyString,
  state: nonEmptyString,
  city: nonEmptyString,
  zipCode: nonEmptyString,
  contactNumber: nonEmptyString,
  email: z.string().email(),
})

export const clientManufacturingPlantSchema = z.object({
  plantName: nonEmptyString,
  ownershipType: nonEmptyString,
  address: nonEmptyString,
  country: nonEmptyString,
  state: nonEmptyString,
  city: nonEmptyString,
  zipCode: nonEmptyString,
  typesOfProduct: z.array(nonEmptyString),
  contractorType: z.string().optional(),
  contractManufacturerType: z.string().optional(),
  otherDetails: z.string().optional(),
})

export const clientCorrespondencePersonSchema = z.object({
  name: nonEmptyString,
  designation: nonEmptyString,
  contactNumber: nonEmptyString,
  email: z.string().email(),
})

export const clientProductInformationSchema = z.object({
  isHalalCertified: z.boolean(),
  modeOfProduction: nonEmptyString,
  productGroup: nonEmptyString,
  brandName: nonEmptyString,
  productName: nonEmptyString,
  description: z.string().optional(),
})
