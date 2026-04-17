const MarketComponent = {
    render: function() {
        const marketData = [
            { n: "滙豐 HSBC", f: "0.75% - 1.15%", t: "低費率推薦", d: "平台成熟，指數型基金收費全港最具競爭力。", bg: "#e6f4ea", tc: "#1e8e3e" },
            { n: "友邦 AIA", f: "1.10% - 1.65%", t: "主流選擇", d: "App 介面直觀，主動型管理基金選擇多樣化。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "宏利 Manulife", f: "1.30% - 1.85%", t: "市場領先", d: "基金種類全港最齊，涵蓋多個海外主題市場。", bg: "#fff7e6", tc: "#d48806" },
            { n: "永明 Sun Life", f: "1.25% - 1.75%", t: "強項：主動成長", d: "港股及大中華基金在長期表現中具有明顯優勢。", bg: "#e6f7ff", tc: "#1890ff" },
            { n: "中銀保誠 BOC-P", f: "0.80% - 1.25%", t: "穩健之選", d: "受香港市民信賴，固定收益類基金表現穩健。", bg: "#f5f5f5", tc: "#595959" },
            { n: "富達 Fidelity", f: "1.15% - 1.60%", t: "環球專家", d: "全球資產配置專家，強積金退休方案成熟。", bg: "#f9f0ff", tc: "#722ed1" },
            { n: "信安 Principal", f: "1.20% - 1.70%", t: "主流選擇", d: "多樣化的混合資產選擇，靈活度高。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "恒生 Hang Seng", f: "0.75% - 1.15%", t: "低費率推薦", d: "與滙豐共享技術平台，收費同樣親民。", bg: "#e6f4ea", tc: "#1e8e3e" },
            { n: "交通銀行 BCOM", f: "0.95% - 1.35%", t: "穩健之選", d: "中資背景，適合偏好穩定增長的投資者。", bg: "#f5f5f5", tc: "#595959" },
            { n: "其士 Chevalier", f: "1.00% - 1.45%", t: "主流選擇", d: "本地老牌服務，費用結構簡單透明。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "東亞 BEA", f: "1.10% - 1.60%", t: "主流選擇", d: "服務全面，結合銀行網點提供便捷查詢。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "新地/銀聯 BCT", f: "1.10% - 1.55%", t: "靈活方案", d: "獨立受託人，主動型基金管理靈活。", bg: "#fff0f6", tc: "#eb2f96" }
        ];

        return `
            <div class="card-panel">
                <h3>📊 市場分析與費率參考</h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap:20px;">
                    ${marketData.map(m => `
                        <div style="border:1px solid #e2e8f0; padding:20px; border-radius:18px; position:relative; background:#fff;">
                            <span style="position:absolute; top:15px; right:15px; font-size:10px; padding:3px 10px; border-radius:50px; font-weight:700; background:${m.bg}; color:${m.tc}">${m.t}</span>
                            <h4 style="margin:0 0 10px 0;">${m.n}</h4>
                            <div style="font-size:0.85em; color:#64748b; margin-bottom:10px;">FER: ${m.f}</div>
                            <div style="background:#f8fbff; padding:12px; border-radius:12px; font-size:0.9em; border-left:4px solid #1a73e8;">
                                🌟 <b>核心優勢：</b><br>${m.d}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
};