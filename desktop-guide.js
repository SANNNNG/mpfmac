const DesktopGuideComponent = {
    render: function() {
        return `
            <div class="card-panel page-animate" style="text-align: center; padding: 60px 20px;">
                <div style="margin-bottom: 40px;">
                    <div style="font-size: 64px; margin-bottom: 20px;">🚀</div>
                    <h2 style="margin:0; color:#1e293b; font-size: 28px;">原生桌面應用程式即將登場</h2>
                    <p style="color:#64748b; font-size: 16px; margin-top: 10px;">
                        我們正致力於開發更強大、更流暢的獨立安裝版本。
                    </p>
                </div>

                <div style="max-width: 600px; margin: 0 auto; background:#f8fafc; border:1px dashed #cbd5e1; padding:30px; border-radius:24px;">
                    <h4 style="margin:0 0 15px 0; color:#475569;">🌟 期待功能</h4>
                    <div style="display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; color: #64748b; font-size: 14px;">
                        <span>🔹 獨立視窗運作</span>
                        <span>🔹 離線數據存取</span>
                        <span>🔹 更快啟動速度</span>
                        <span>🔹 系統層級整合</span>
                    </div>
                </div>

                <div style="margin-top: 40px;">
                    <div style="display: inline-block; padding: 12px 24px; background: #f1f5f9; border-radius: 50px; color: #475569; font-weight: 600; font-size: 14px;">
                        📢 請留意版本更新資訊，獲取最新下載連結
                    </div>
                </div>

                <div style="margin-top: 60px; border-top: 1px solid #f1f5f9; padding-top: 30px; color: #94a3b8; font-size: 12px;">
                    目前建議：繼續使用現有網頁版進行管理，所有數據將與未來桌面版完美兼容。
                </div>
            </div>
        `;
    }
};