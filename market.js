const MarketComponent = {
    render: function() {
        const marketData = [
            { n: "滙豐 HSBC", f: "0.75% - 1.15%", t: "低費率推薦", d: "平台成熟，指數型基金收費全港最具競爭力。", bg: "#e6f4ea", tc: "#1e8e3e" },
            { n: "恒生 Hang Seng", f: "0.75% - 1.15%", t: "低費率推薦", d: "與滙豐共用平台，適合已有恒生戶口之用戶。", bg: "#e6f4ea", tc: "#1e8e3e" },
            { n: "宏利 Manulife", f: "1.30% - 1.85%", t: "市場領先", d: "基金種類全港最齊，涵蓋多個海外主題與康健市場。", bg: "#fff7e6", tc: "#d48806" },
            { n: "友邦 AIA", f: "1.10% - 1.65%", t: "主流選擇", d: "App 介面直觀，主動型管理基金選擇多樣且靈活。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "永明 Sun Life", f: "1.25% - 1.75%", t: "強項：主動成長", d: "港股及大中華基金在長期表現中具有明顯優勢。", bg: "#e6f7ff", tc: "#1890ff" },
            { n: "中銀保誠 BOC-P", f: "0.80% - 1.25%", t: "穩健之選", d: "受香港市民信賴，固定收益類基金表現非常穩健。", bg: "#f5f5f5", tc: "#595959" },
            { n: "富達 Fidelity", f: "1.05% - 1.50%", t: "全球視野", d: "國際級資產管理公司，專長於全球股票與混合基金。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "信安 Principal", f: "1.15% - 1.60%", t: "彈性方案", d: "提供多樣化的目標日期基金，適合退休規劃。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "交通銀行 BCOM", f: "0.95% - 1.40%", t: "親民選擇", d: "費用中規中矩，提供穩定的行政服務支援。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "其士 Chevalier", f: "1.00% - 1.45%", t: "特定方案", d: "本地老牌服務，提供專屬的企業強積金方案。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "東亞 BEA", f: "1.10% - 1.60%", t: "銀行網絡", d: "分行網絡廣闊，適合習慣親臨銀行處理的人士。", bg: "#f1f3f4", tc: "#5f6368" },
            { n: "新地/銀聯 BCT", f: "1.10% - 1.55%", t: "靈活獨立", d: "獨立受託人，主動型基金管理靈活，口碑良好。", bg: "#fff0f6", tc: "#eb2f96" }
        ];

        return `
            <style>
                .market-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px; margin-bottom: 40px; }
                .market-card { border: 1px solid #e2e8f0; padding: 20px; border-radius: 20px; position: relative; background: #fff; transition: 0.3s; }
                .market-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
                .market-tag { position: absolute; top: 15px; right: 15px; font-size: 10px; padding: 3px 10px; border-radius: 50px; font-weight: 700; }
                
                .expert-section { background: #f8fafc; border-radius: 28px; padding: 35px; border: 1px solid #e2e8f0; }
                .expert-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; margin-top: 25px; }
                .expert-card { background: white; padding: 20px; border-radius: 18px; border: 1px solid #cbd5e0; }
                .expert-title { display: flex; align-items: center; gap: 8px; font-weight: 800; color: #1e293b; margin-bottom: 12px; font-size: 16px; }
                .expert-desc { font-size: 13.5px; color: #64748b; line-height: 1.6; }
                
                .warning-box { margin-top: 30px; padding: 20px; border-radius: 15px; background: #fffbeb; border: 1px solid #fef3c7; color: #92400e; font-size: 13px; line-height: 1.6; }
                
                @media (max-width: 768px) { .expert-grid { grid-template-columns: 1fr; } }
            </style>

            <div class="card-panel">
                <div style="margin-bottom:25px;">
                    <h2 style="margin:0; color:#1e293b;">📊 市場分析與費率參考</h2>
                    <p style="color:#64748b; margin:5px 0 0 0;">數據僅供參考，費率以各受託人最新公佈為準 (FER 基金開支比率)</p>
                </div>

                <div class="market-grid">
                    ${marketData.map(m => `
                        <div class="market-card">
                            <span class="market-tag" style="background:${m.bg}; color:${m.tc};">${m.t}</span>
                            <h4 style="margin:0 0 8px 0; font-size:18px;">${m.n}</h4>
                            <div style="font-family:'JetBrains Mono'; color:#2563eb; font-weight:700; margin-bottom:12px;">費率: ${m.f}</div>
                            <p style="font-size:13px; color:#64748b; margin:0; line-height:1.5;">${m.d}</p>
                        </div>
                    `).join('')}
                </div>

                <div class="expert-section">
                    <div style="text-align:center; margin-bottom:10px;">
                        <span style="background:#2563eb; color:white; padding:4px 15px; border-radius:50px; font-size:12px; font-weight:700;">MPF 專家分析</span>
                        <h3 style="margin:15px 0 0 0; font-size:22px; color:#1e293b;">如何挑選最適合您的受託人？</h3>
                    </div>

                    <div class="expert-grid">
                        <div class="expert-card">
                            <div class="expert-title">📉 低費率策略 (Passive)</div>
                            <p class="expert-desc">
                                若您傾向投資<b>指數基金</b>或<b>中轉基金</b>，應首選滙豐或恒生。低費率 (FER < 1%) 能在數十年的複利效應下，為您省下數萬甚至數十萬的行政開支。
                            </p>
                        </div>
                        <div class="expert-card">
                            <div class="expert-title">🚀 主動管理策略 (Active)</div>
                            <p class="expert-desc">
                                若您希望透過基金經理跑贏大市，宏利與永明在<b>港股、大中華及美股區域</b>擁有較強的選股能力。雖然費率稍高，但其長期回報潛力可能高於行政成本。
                            </p>
                        </div>
                        <div class="expert-card">
                            <div class="expert-title">📱 數位化體驗建議</div>
                            <p class="expert-desc">
                                友邦 (AIA) 與宏利 (Manulife) 的移動端 App 體驗最佳。如果您是頻繁轉換基金的投資者，優秀的介面能顯著減少操作失誤，並提供即時的資產快照。
                            </p>
                        </div>
                        <div class="expert-card">
                            <div class="expert-title">🛡️ 穩健防守配置</div>
                            <p class="expert-desc">
                                對於接近退休年齡或風險承受力低的用戶，中銀保誠或信安的<b>保守基金/保證基金</b>表現相對穩健，適合存放「保命錢」以抵禦市場波動。
                            </p>
                        </div>
                    </div>

                    <div class="warning-box">
                        <strong>⚠️ 專業提醒：</strong> 費率並非唯一考量因素。一個年度回報 8% 且費率 1.5% 的基金，表現遠優於一個年度回報 3% 但費率僅 0.7% 的基金。請結合「過往表現」、「投資策略」與「費率」三方數據進行綜合決策。
                    </div>

                    <div style="margin-top:25px; text-align:center; color:#94a3b8; font-size:12px;">
                        * 建議每半年檢視一次強積金組合，並利用「個人帳戶」整合功能集中管理，以減少行政費支出。
                    </div>
                </div>
            </div>
        `;
    }
};