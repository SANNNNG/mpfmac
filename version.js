const VersionComponent = {
    render: function() {
        return `
            <div class="card-panel page-animate">
                <div style="text-align:center; padding: 40px 0;">
                    <div style="font-size: 60px; margin-bottom: 20px;">🚀</div>
                    <h2 style="margin:0; color:#1e293b; font-size: 28px;">系統版本與更新</h2>
                    <p style="color:#64748b;">保持您的 MPF Pro Master 處於最新狀態</p>
                </div>

                <div style="background:#f8fafc; border-radius:20px; padding:30px; border:1px solid #e2e8f0;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                        <div>
                            <span style="font-weight:800; color:#1e293b; font-size:18px;">當前版本</span>
                            <div style="font-family:'JetBrains Mono'; color:#2563eb; font-weight:700;">v1.1.0 Stable</div>
                        </div>
                        <span style="background:#dcfce7; color:#166534; padding:5px 15px; border-radius:50px; font-size:12px; font-weight:700;">最新版本</span>
                    </div>

                    <div style="padding-top:20px; border-top:1px solid #e2e8f0;">
                        <h4 style="margin-bottom:10px;">🔄 自動更新設定</h4>
                        <p style="font-size:14px; color:#64748b; line-height:1.6;">
                            您可以透過下方的連結獲取最新的程式碼包。建議定期備份您的 JSON 數據後再進行更新。
                        </p>
                        <a href="#" id="update-link" style="display:inline-block; margin-top:10px; padding:12px 25px; background:#2563eb; color:white; text-decoration:none; border-radius:12px; font-weight:700; font-size:14px;">
                            檢查更新 (Link 待提供)
                        </a>
                    </div>
                </div>

                <div class="card-panel" style="margin-top:30px; border-left: 5px solid #2563eb;">
                    <h4 style="margin-top:0;">📋 版本摘要</h4>
                    <ul style="font-size:14px; color:#475569; line-height:2;">
                        <li><b>核心架構：</b> 純前端 Vanilla JS + LocalStorage</li>
                        <li><b>渲染引擎：</b> 動態 Component-based Rendering</li>
                        <li><b>數據安全：</b> 256-bit 瀏覽器端本地加密存儲預備</li>
                    </ul>
                </div>
            </div>
        `;
    }
};