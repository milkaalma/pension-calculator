function toggleForm() {
  const type = document.getElementById("tipePensiun").value;

  document.getElementById("formPribadi").style.display = (type === "pribadi") ? "block" : "none";
  document.getElementById("formPasangan").style.display = (type === "pasangan") ? "block" : "none";
}

function calculateBenefit() {
  const type = document.getElementById("tipePensiun").value;

  if (!type) {
      document.getElementById("result").innerHTML = "Silakan pilih jenis pensiun.";
      return;
  }

  let usiaMasuk, usiaPensiun, gajiAwal, rasioGaji, faktor;

  if (type === "pribadi") {
      usiaMasuk = parseFloat(document.getElementById("p_ageStart").value);
      usiaPensiun = parseFloat(document.getElementById("p_ageRetire").value);
      gajiAwal = parseFloat(document.getElementById("p_salary").value);
      rasioGaji = parseFloat(document.getElementById("p_raise").value);
  }

  if (type === "pasangan") {
      usiaMasuk = parseFloat(document.getElementById("sp_ageStart").value);
      usiaPensiun = parseFloat(document.getElementById("sp_ageRetire").value);
      gajiAwal = parseFloat(document.getElementById("sp_salary").value);
      rasioGaji = parseFloat(document.getElementById("sp_raise").value);
  }

  const masaKerja = usiaPensiun - usiaMasuk;

  // Faktor manfaat max 0.75, min 0.25
  let faktorManfaat = 0.025 * masaKerja;
  if (faktorManfaat > 0.75) faktorManfaat = 0.75;
  if (faktorManfaat < 0.25) faktorManfaat = 0.25;

  // gaji akhir = gaji_awal * (1 + rasio)^(masaKerja)
  const gajiAkhir = gajiAwal*1000000 * Math.pow(1 + rasioGaji, masaKerja);

  // Benefit dasar
  let benefit = faktorManfaat * gajiAkhir;

  // Jika pensiun pasangan → tambah 10% gajiAkhir
  if (type === "pasangan") {
      benefit += 0.10 * gajiAkhir;
  }

  document.getElementById("result").innerHTML = 
    "Manfaat pensiun: Rp " + benefit.toLocaleString("id-ID");
}
