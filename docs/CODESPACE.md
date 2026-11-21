# Kerja di GitHub Codespaces

Repo ini sudah punya dev container: **Node 22 + ffmpeg + opencode + Remotion**.
Tidak perlu install apa pun di laptop. Semua jalan di cloud.

## 1. Buka Codespace

1. Buka https://github.com/zerokopi5/odoo19
2. Tombol hijau **Code** → tab **Codespaces** → **Create codespace on main**
3. Tunggu build pertama ~3-5 menit (build berikutnya pakai cache, lebih cepat).

Saat selesai, container otomatis menjalankan:

```
npm ci
npx remotion browser ensure      # unduh Chrome Headless Shell (~100 MB)
bash scripts/install-opencode.sh # unduh + pasang opencode (~1 menit)
```

Ketiganya best-effort: kalau satu gagal (mis. jaringan lambat), container tetap
connect dan kamu bisa jalankan ulang perintahnya manual di terminal.

## 2. Login opencode (sekali saja)

Pilih salah satu:

**A. API key lewat Codespaces secret (paling rapi)**

1. GitHub → Settings → Codespaces → **Secrets** → New secret
2. Nama: `OPENROUTER_API_KEY` (atau `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`)
3. Value: key dari provider masing-masing
4. Repo → Settings → Codespaces → Secrets → pilih repo `odoo19`, simpan
5. Rebuild codespace (Command Palette → *Codespaces: Rebuild Container*)

opencode otomatis membaca env var tersebut, tidak perlu login manual.

**B. Login interaktif**

```bash
opencode auth login
```

Pilih provider, tempel key. Tersimpan di `~/.local/share/opencode/auth.json`
di dalam codespace (tidak ikut repo). Port OAuth di-forward otomatis ke browser.

Cek model yang aktif:

```bash
opencode
# di dalam TUI: /models
```

## 3. Mulai bikin video

```bash
npm run dev          # Remotion Studio di port 3000 (auto-forward ke browser)
```

Edit `src/compositions/*.tsx` atau minta opencode yang menulis:

```bash
opencode
> buat komposisi baru 1080x1080 durasi 8 detik, teks "Odoo 19" muncul spring
```

## 4. Render

```bash
npm run render:promo     # out/promo.mp4  (1080x1920)
npm run render:wide      # out/wide.mp4   (1920x1080)
```

Download hasilnya: klik kanan `out/promo.mp4` di file explorer →
**Download**. Atau:

```bash
# dari terminal lokal, ganti <codespace-name>:
gh codespace cp -e "remote:out/promo.mp4" ./promo.mp4
```

## 5. Render tanpa buka codespace (GitHub Actions)

Tab **Actions** → workflow **render** → **Run workflow** → isi composition
(`Promo` / `Wide`). Hasilnya muncul sebagai artifact, bisa diunduh dari tab run.
Gratis untuk repo publik (2.000 menit/bulan untuk repo privat di akun free).

## Catatan mesin

| Tipe mesin | Cocok untuk |
| --- | --- |
| 2-core / 8 GB (default, hemat kuota) | video pendek < 15 detik, 1080p |
| 4-core / 16 GB | render panjang, `--concurrency=4` |

Kuota free plan: 120 core-hours/bulan. Codespace berhenti otomatis setelah
30 menit idle; tutup tab untuk menghentikan billing.

Render lebih cepat di codespace:

```bash
npx remotion render src/index.ts Promo out/promo.mp4 --concurrency=4
```

## Kalau container gagal build

Perintah untuk cek di terminal codespace:

```bash
node -v && ffmpeg -version | head -1 && opencode --version
```

Ketiganya harus keluar. Kalau `opencode` tidak ada: Command Palette →
*Codespaces: Rebuild Container* (image perlu di-build ulang, bukan cuma restart).
