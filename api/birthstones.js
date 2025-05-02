export default function handler(req, res) {
  // 🔒 CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 🛑 Preflight (OPTIONS) isteği ise hemen sonlandır
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ❌ Sadece POST izinli
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🔍 Doğum tarihi kontrolü
  const { birthDate } = req.body;
  if (!birthDate) {
    return res.status(400).json({ error: "Doğum tarihi eksik" });
  }

  const date = new Date(birthDate);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  const burc = getZodiacSign(day, month);
  const element = getElement(burc);
  const stones = getStones(burc);

  return res.status(200).json({ burc, element, stones });
}

function getZodiacSign(day, month) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 20)) return 'Koç';
  if ((month === 4 && day >= 21) || (month === 5 && day <= 21)) return 'Boğa';
  if ((month === 5 && day >= 22) || (month === 6 && day <= 21)) return 'İkizler';
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return 'Yengeç';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 23)) return 'Aslan';
  if ((month === 8 && day >= 24) || (month === 9 && day <= 23)) return 'Başak';
  if ((month === 9 && day >= 24) || (month === 10 && day <= 23)) return 'Terazi';
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return 'Akrep';
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return 'Yay';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 20)) return 'Oğlak';
  if ((month === 1 && day >= 21) || (month === 2 && day <= 19)) return 'Kova';
  if ((month === 2 && day >= 20) || (month === 3 && day <= 20)) return 'Balık';
  return 'Bilinmiyor';
}

function getElement(burc) {
  const fire = ['Koç', 'Aslan', 'Yay'];
  const earth = ['Boğa', 'Başak', 'Oğlak'];
  const air = ['İkizler', 'Terazi', 'Kova'];
  const water = ['Yengeç', 'Akrep', 'Balık'];

  if (fire.includes(burc)) return 'Ateş';
  if (earth.includes(burc)) return 'Toprak';
  if (air.includes(burc)) return 'Hava';
  if (water.includes(burc)) return 'Su';
  return 'Bilinmiyor';
}

function getStones(burc) {
  const stoneMap = {
    'Koç': ['akik', 'sitrin', 'obsidyen'],
    'Boğa': ['pembe kuvars', 'selenit', 'pirit'],
    'İkizler': ['amazonit', 'sitrin', 'kristal kuvars'],
    'Yengeç': ['ay taşı', 'pembe kuvars', 'selenit'],
    'Aslan': ['kristal kuvars', 'pirit', 'kaplan gözü'],
    'Başak': ['rodonit', 'yeşil aventurin', 'kristal kuvars'],
    'Terazi': ['pembe kuvars', 'ay taşı', 'selenit'],
    'Akrep': ['obsidyen', 'labradorit', 'rodonit'],
    'Yay': ['labradorit', 'apatit', 'akik'],
    'Oğlak': ['dumanlı kuvars', 'sitrin', 'yeşil aventurin'],
    'Kova': ['apatit', 'labradorit', 'kristal kuvars'],
    'Balık': ['ay taşı', 'apatit', 'kristal kuvars']
  };
  return stoneMap[burc] || [];
}
