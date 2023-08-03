export function generateRandomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 16; i++) {
    if (i % 4 === 0 && i !== 0) code += "-";

    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return code;
}
