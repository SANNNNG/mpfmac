const AboutLogComponent = {
  render: function () {
    const features = [
      { icon: "🔒", title: "數據完全私有化", desc: "所有財富數據僅儲存於您的瀏覽器快取 (LocalStorage) 中。我們沒有資料庫，無法讀取您的資料，保障 100% 隱私。" },
      { icon: "🏦", title: "多受託人整合", desc: "支援同時管理滙豐、友邦、宏利等不同受託人帳戶，系統會自動加總並分析整體的投資回報率。" },
      { icon: "📈", title: "視覺化趨勢分析", desc: "透過 Chart.js 強大引擎，將您的數據轉化為清晰的成長曲線。您可以查看資產隨時間的動態變化。" },
      { icon: "☁️", title: "離線備份與導入", desc: "您可以隨時將所有數據匯出為 JSON 檔案進行冷儲存，並在任何其他裝置或瀏覽器上重新導入恢復。" },
      { icon: "🔄", title: "按日整合邏輯", desc: "系統會自動覆蓋同日期的紀錄，保持歷史清單簡潔，僅保留每日最新的資產快照。" },
      { icon: "🧮", title: "自動本金計算", desc: "只需輸入總額與盈利，系統將自動回推您的投入本金 (C = A - B)，讓資產結構一目了然。" },
      { icon: "✨", title: "流暢轉場交互", desc: "內建現代化的頁面切換動畫與果凍感彈窗效果，提供媲美原生桌面應用的流暢操作體驗。" },
      { icon: "🏷️", title: "品牌專屬識別", desc: "各受託人均配有專屬色彩標籤與圖標，在查看明細報告時能更直觀地區分不同帳戶。" },
      { icon: "🛠️", title: "數據防呆機制", desc: "新增行時自動鎖定受託人名稱，並實時計算各項數值，防止輸入錯誤導致數據偏差。" },
      { icon: "📅", title: "歷史紀錄回溯", desc: "詳盡的歷史清單支援隨時查看、修改或刪除過往紀錄，讓資產管理具備高度靈活性。" },
      { icon: "📊", title: "市場費率參考", desc: "內置主流受託人的費率 (FER) 與核心優勢分析，助您在調整投資組合時做出明智決策。" },
      { icon: "⚡", title: "極致響應速度", desc: "純前端架構，無須等待伺服器響應，所有操作與圖表更新均在毫秒間完成。" }
    ];

    return `
      <style>
        .info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 20px;
        }
        .info-card {
          background: white;
          padding: 30px;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          border: 1px solid #f1f5f9;
          transition: transform 0.3s ease;
        }
        .info-card:hover {
          transform: translateY(-5px);
        }
        .info-icon {
          font-size: 32px;
          margin-bottom: 20px;
          display: block;
        }
        .info-title {
          font-size: 18px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 12px;
        }
        .info-desc {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
        }
        @media (max-width: 992px) { .info-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
      </style>

      <div style="margin-bottom: 40px; text-align: center;">
        <h2 style="font-size: 28px; color: #1e293b;">💡 系統核心特色</h2>
        <p style="color: #64748b;">打造專業、私密且高效的強積金資產管理平台</p>
      </div>

      <div class="info-grid">
        ${features.map(f => `
          <div class="info-card">
            <span class="info-icon">${f.icon}</span>
            <div class="info-title">${f.title}</div>
            <div class="info-desc">${f.desc}</div>
          </div>
        `).join('')}
      </div>

      <div class="card-panel" style="margin-top: 40px;">
        <h3 style="margin-top:0;">📜 更新日誌</h3>
        <p style="font-family:'JetBrains Mono'; font-weight:700; color:#2563eb;">v1.1.0 (Current Version)</p>
        <ul style="font-size:14px; color:#475569; line-height:1.8;">
          <li>✨ 實作頁面切換與彈窗動畫 (Bezier Curve)</li>
          <li>📊 優化 Chart.js 走勢圖對齊與視覺效果</li>
          <li>🏦 擴展受託人名單與品牌圖標識別</li>
          <li>🛠️ 修復數據錄入防清空邏輯</li>
        </ul>
      </div>
    `;
  }
};