import AdmZip from "adm-zip";

export async function extractZip(filePath, to) {
  const zip = new AdmZip(filePath);
  return zip.extractAllToAsync(to);
}
