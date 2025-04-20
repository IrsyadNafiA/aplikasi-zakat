export const generateKeluargaCode = (nama, id, count) => {
  const namaSplit = nama.split(" ");
  let inisial = "";

  for (let i = 0; i < namaSplit.length; i++) {
    inisial += namaSplit[i][0];
  }

  inisial += String(id) + String(count);

  return inisial;
};
