export const bioQuery = `*[_type == "bio"][0]{
  normalBio,
  scriptBio
}`

export const currentlyQuery = `*[_type == "currently"] | order(order asc){
  category,
  value,
  url
}`

export const siteConfigQuery = `*[_type == "siteConfig"][0]{
  name,
  email,
  linkedin,
  github
}`

export const workQuery = `*[_type == "work"] | order(order asc){
  _id,
  title,
  role,
  jobType,
  companyDescription,
  dateRange,
  description,
  "descriptionText": pt::text(description),
  posterDescription,
  "posterImageUrl": posterImage.asset->url
}`

export const orgsQuery = `*[_type == "organization"] | order(order asc){
  _id,
  title,
  role,
  companyDescription,
  category,
  dateRange,
  description,
  "descriptionText": pt::text(description),
  posterDescription,
  "posterImageUrl": posterImage.asset->url
}`
