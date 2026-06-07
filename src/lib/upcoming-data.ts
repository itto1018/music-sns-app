export type UpcomingConcert = {
  id: string
  date: string
  venue: string
  prefecture: string
  concertName: string
  artist: string
  ticketUrl?: string
}

export const upcomingConcerts: UpcomingConcert[] = [
  {
    id: "u1",
    date: "2026-06-28",
    venue: "日本武道館",
    prefecture: "東京都",
    concertName: "yoasobi ARENA TOUR 2026",
    artist: "yoasobi",
  },
  {
    id: "u2",
    date: "2026-07-04",
    venue: "大阪城ホール",
    prefecture: "大阪府",
    concertName: "King Gnu SUMMER LIVE 2026",
    artist: "King Gnu",
  },
  {
    id: "u3",
    date: "2026-07-12",
    venue: "さいたまスーパーアリーナ",
    prefecture: "埼玉県",
    concertName: "BUMP OF CHICKEN 25th Anniversary",
    artist: "BUMP OF CHICKEN",
  },
  {
    id: "u4",
    date: "2026-07-19",
    venue: "Zepp Shinjuku",
    prefecture: "東京都",
    concertName: "ヨルシカ ONEMAN 2026",
    artist: "ヨルシカ",
  },
  {
    id: "u5",
    date: "2026-08-01",
    venue: "幕張メッセ",
    prefecture: "千葉県",
    concertName: "SUMMER SONIC 2026",
    artist: "yoasobi",
  },
  {
    id: "u6",
    date: "2026-08-09",
    venue: "国立競技場",
    prefecture: "東京都",
    concertName: "Mrs. GREEN APPLE STADIUM 2026",
    artist: "Mrs. GREEN APPLE",
  },
  {
    id: "u7",
    date: "2026-08-23",
    venue: "幕張メッセ",
    prefecture: "千葉県",
    concertName: "SUMMER SONIC 2026",
    artist: "緑黄色社会",
  },
  {
    id: "u8",
    date: "2026-09-05",
    venue: "横浜アリーナ",
    prefecture: "神奈川県",
    concertName: "Aimer CONCERT TOUR 2026",
    artist: "Aimer",
  },
  {
    id: "u9",
    date: "2026-09-19",
    venue: "Zepp Osaka Bayside",
    prefecture: "大阪府",
    concertName: "indigo la End AUTUMN TOUR",
    artist: "indigo la End",
  },
  {
    id: "u10",
    date: "2026-10-03",
    venue: "日本武道館",
    prefecture: "東京都",
    concertName: "RADWIMPS TOUR 2026",
    artist: "RADWIMPS",
  },
  {
    id: "u11",
    date: "2026-10-17",
    venue: "Zepp Nagoya",
    prefecture: "愛知県",
    concertName: "緑黄色社会 TOUR 2026",
    artist: "緑黄色社会",
  },
  {
    id: "u12",
    date: "2026-11-07",
    venue: "さいたまスーパーアリーナ",
    prefecture: "埼玉県",
    concertName: "King Gnu HALL TOUR 2026",
    artist: "King Gnu",
  },
]
