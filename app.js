function toggleForm() {
    const type = document.getElementById("tipePensiun").value;

    document.getElementById("formPribadi").style.display =
        (type === "pribadi") ? "block" : "none";

    document.getElementById("formPasangan").style.display =
        (type === "pasangan") ? "block" : "none";
}

function calculateBenefit() {
    const type = document.getElementById("tipePensiun").value;

    if (!type) {
        document.getElementById("result").innerHTML = "Silakan pilih jenis pensiun.";
        return;
    }

    let usiaMasuk, usiaPensiun, gajiAwal, rasioGaji;

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

    // gaji akhir = gaji_awal * (1 + rasio)^masaKerja
    const gajiAkhir = gajiAwal * 1000000 * Math.pow(1 + rasioGaji, masaKerja);

    // Benefit dasar
    let benefit = faktorManfaat * gajiAkhir;

    // Tambahan 10% bila pensiun pasangan
    if (type === "pasangan") {
        benefit += 0.10 * gajiAkhir;
    }

    document.getElementById("result").innerHTML =
        "Manfaat pensiun: Rp " + benefit.toLocaleString("id-ID");
      
      // === Grafik Pertumbuhan Gaji ===
      const labels = [];
      const dataGaji = [];
      
      for (let i = 0; i <= masaKerja; i++) {
          labels.push("Tahun " + i);
          dataGaji.push(gajiAwal * 1000000 * Math.pow(1 + rasioGaji, i));
      }
      
      // Hapus grafik lama jika ada
      if (window.salaryChart instanceof Chart) {
          window.salaryChart.destroy();
      }
      
      // Gambar grafik baru
      const ctx = document.getElementById("salaryChart").getContext("2d");
      window.salaryChart = new Chart(ctx, {
          type: "line",
          data: {
              labels: labels,
              datasets: [{
                  label: "Pertumbuhan Gaji",
                  data: dataGaji,
                  borderWidth: 2,
                  fill: false
              }]
          },
          options: {
              responsive: true,
              plugins: {
                  legend: { display: true }
              },
              scales: {
                  y: {
                      ticks: {
                          callback: function(value) {
                              return "Rp " + value.toLocaleString("id-ID");
                          }
                      }
                  }
              }
          }
      });
      
}

// ================= LOGIKA HALAMAN AWAL =================
function showRules() {
    const box = document.getElementById("rulesBox");
    box.style.display = (box.style.display === "none") ? "block" : "none";
}

function startCalculator() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.querySelector(".container").style.display = "block";
}

// ================= TOMBOL KEMBALI =================
function goBack() {
    document.querySelector(".container").style.display = "none";
    document.getElementById("welcomeScreen").style.display = "block";

    // Reset form & hasil agar rapi saat kembali
    document.getElementById("calcForm").reset();
    document.getElementById("result").innerHTML = "";

    // Hapus grafik bila ada
    if (window.salaryChart instanceof Chart) {
        window.salaryChart.destroy();
    }
}

