# KK電鉄ステータスパネル（kk-status）

*(English documentation follows Japanese.)*

*(Microsoft Copilotで翻訳しました。)*

これは、KK電鉄が運行する多くの列車に見られる表示灯パネルを再現したテーマです。

## インストール

1. Tanuden Console を使用してテーマのインストールフォルダを開きます。（Monitor Launcher → Open themes folder）
2. ZIPファイルをダウンロードして解凍します。
3. @hpgbproductions~kk-status フォルダが生成されていることを確認してください。このフォルダを開くと、直下に index.html ファイルが表示される必要があります。
4. 手順1で開いたテーマフォルダに、@hpgbproductions~kk-status フォルダ（ZIPファイルではなく）をコピーします。

## 設定

Tanuden Console の Monitor Launcher 下部にある Settings メニューから、2つのスタイルバリエーションを選択できます。オプションは以下の通りです：
  
|名称|説明|
|:---:|:---|
|表示灯 `shape`|テキストの横にある円形または長方形のランプが点灯します。 ![](preview/image0.png)|
|文字 `text`|テキストラベルが点灯します。 ![](preview/image1.png)|

## インジケーター

パネル上の8つのインジケーターに対応しています。
  
|JA|説明|
|:---:|:---|
|マスコン N|マスコン（ワンハンドル列車）または力行レバー（ツーハンドル列車）が中立位置にある状態
|空転|車輪の空転\*
|回生|回生ブレーキ
|前照灯上向|ヘッドライト上向き（ハイビーム）
|B 不緩解|力行中にブレーキが緩解されていない状態
|耐雪ブレーキ|耐雪ブレーキ（ブレーキオフ時のみ）\*
|E B|非常ブレーキ
|戸閉|すべてのドアが閉まっている状態

> [!NOTE]
> (\*) これらのイベントは開発当時、TrainCrew APIでサポートされていなかったため推測に基づいて実装されています。誤検出が発生する可能性があります。ご不便をおかけして申し訳ありません。

> [!WARNING]
> 各インジケーターの動作は実際の鉄道会社とは異なる場合があります。本ソフトウェアに関する問い合わせを鉄道会社やメーカーへ行わないようお願いいたします。

## 開発者

[ナタニア (hpgbproductions)](https://x.com/hpgbproductions) - インジケーターのロジックおよびレイアウト設計

[狸治ハルユキ](https://go.tanu.ch/twitter) - レイアウト開発およびReact統合

# KK Dentetsu Status Panel (kk-status)

This is a theme that replicates the indicator light panels found on many trains run by KK Corporation.

## Installation

1. Find the theme installation folder using Tanuden Console. (Monitor Launcher > Open themes folder)
2. Download the ZIP file and extract it.
3. Ensure that the folder `@hpgbproductions~kk-status` is produced. When this folder is opened, the file `index.html` should be immediately visible.
4. Copy the `@hpgbproductions~kk-status` folder (not ZIP file) to the theme folder in Step 1.

## Settings

Two style variations are available in the Settings menu at the bottom of the Monitor Launcher in the Tanuden Console. The options are:

| Name | Description |
|:---:|:---|
|表示灯 `shape`|The circular or rectangular lamps next to the text will light up. ![](preview/image0.png)
|文字 `text`|The text labels light up. ![](preview/image1.png)

## Indicators

Eight indicators on the panel are supported.

| JA | Description |
|:---:|:---|
|マスコン &ndash; N|Mascon (for one-handle trains) or power lever (for two-handle trains) in neutral position|
|空転|Wheel slip\*|
|回生|Regenerative brake|
|前照灯上向|Headlight high beams|
|B &ndash; 不緩解|Brakes are not released when power is applied|
|耐雪ブレーキ|Snowproof brake (only when brakes are off)\*|
|E B|Emergency brake|
|戸閉|All doors closed|

> [!NOTE]
> (\*) This event had to be guessed as it was not supported by the TrainCrew API at the time of development. False positives may be indicated. We apologize for the inconvenience.

> [!WARNING]
> Usage of each indicator differs from that of real-world companies. Please do not send enquiries about this software to any railway companies or manufacturers.

## Developers

[nataniachan (hpgbproductions)](https://x.com/hpgbproductions) - indicator logic and layout planning

[Haruyuki Tanukiji](https://go.tanu.ch/twitter) - layout development and React integration