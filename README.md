# music-sns-app

自分の音楽・好きな音楽・ライブ情報を発信できる音楽特化SNSアプリ。

## Tech Stack

| レイヤー | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router / TypeScript) |
| スタイリング | Tailwind CSS v4 + shadcn/ui |
| DB / Auth / Storage | Supabase |
| バリデーション | Zod |
| パッケージ管理 | pnpm |

## Getting Started

### 1. 環境変数を設定

`.env.local` を作成し、Supabaseの値を入力：

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 2. 依存パッケージをインストール

```bash
pnpm install
```

### 3. 開発サーバーを起動

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開く。

## Scripts

| コマンド | 内容 |
|---|---|
| `pnpm dev` | 開発サーバー起動 |
| `pnpm build` | プロダクションビルド |
| `pnpm start` | プロダクションサーバー起動 |
| `pnpm lint` | ESLint 実行 |
