import { kv } from '@vercel/kv'; // Gunakan Vercel KV untuk penyimpanan data

export default async function handler(req, res) {
    // Ambil request count dari database (jika ada)
    let requestCount = await kv.get("request_count") || 0;

    requestCount++; // Tambah request setiap kali API dipanggil

    // Simpan kembali ke database
    await kv.set("request_count", requestCount);

    console.log("🚀 Request received at:", new Date().toISOString(), "| Count:", requestCount);

    // Response tanpa cache
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ requestCount });
}

// Reset setiap 1 menit (di luar handler agar tetap jalan)
setInterval(async () => {
    console.log("⏳ Reset request count at:", new Date().toISOString());
    await kv.set("request_count", 0);
}, 60000);
