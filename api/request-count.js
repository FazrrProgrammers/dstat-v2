let requestCount = 0; // Menyimpan jumlah request dalam memori

export default function handler(req, res) {
    requestCount++; // Tambah hitungan setiap request

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ requestCount });
}

// Reset request count setiap 1 menit (60.000 ms)
setInterval(() => {
    console.log("🔄 Reset request count...");
    requestCount = 0;
}, 60000);
