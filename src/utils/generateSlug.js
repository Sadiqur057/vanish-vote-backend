const generateSlug = (text) => {
  if (!text || typeof text !== "string") return "";

  const timestamp = Date.now().toString(); 
  const maxSlugLength = 64 - (timestamp.length + 1); 

  let slug = text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") 
    .trim()
    .replace(/\s+/g, "-");

  slug = slug.substring(0, maxSlugLength).replace(/-$/, "");

  return `${slug}-${timestamp}`;
};

module.exports = generateSlug;
