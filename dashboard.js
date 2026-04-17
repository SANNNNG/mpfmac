const DashboardComponent = {
    timer: null,

    render: function() {
        const data = window.records || [];
        const latest = data.length > 0 ? data[0] : { totalA: 0, totalB: 0, totalC: 0 };
        const recordCount = data.length;

        return `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');

                /* 專業頂部橫幅：深邃漸變與毛玻璃質感 */
                .pro-banner {
                    background: linear-gradient(135deg, #0f172a 0%, #1e40af 100%);
                    color: white;
                    padding: 45px 30px;
                    border-radius: 28px;
                    margin-bottom: 35px;
                    text-align: center;
                    box-shadow: 0 20px 40px rgba(15, 23, 42, 0.15);
                    position: relative;
                    overflow: hidden;
                }
                .banner-title { 
                    font-size: 32px; 
                    font-weight: 800; 
                    margin-bottom: 20px; 
                    letter-spacing: 2px;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.2);
                }
                .banner-info { 
                    display: inline-flex; 
                    align-items: center; 
                    gap: 15px; 
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    padding: 12px 30px; 
                    border-radius: 50px; 
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    font-family: 'JetBrains Mono', 'Segoe UI', monospace;
                    font-size: 15px;
                }
                .info-sep { opacity: 0.3; font-weight: 100; }
                .time-accent { color: #60a5fa; font-weight: 700; }

                /* 數據方格設計 */
                .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 35px; }
                .stat-card { 
                    background: white; 
                    padding: 30px 20px; 
                    border-radius: 24px; 
                    text-align: center; 
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03); 
                    border: 1px solid #f1f5f9;
                    transition: transform 0.3s ease;
                }
                .stat-card:hover { transform: translateY(-5px); }
                .stat-label { color: #64748b; font-size: 14px; margin-bottom: 12px; font-weight: 600; letter-spacing: 0.5px; }
                .stat-value { font-size: 34px; font-weight: 800; font-family: 'JetBrains Mono', sans-serif; }

                /* 圖表區域：修復空間不足問題 */
                .chart-panel { 
                    background: white; 
                    padding: 35px; 
                    border-radius: 28px; 
                    box-shadow: 0 10px 40px rgba(0,0,0,0.04);
                }
                .chart-wrapper { height: 400px; width: 100%; position: relative; margin-top: 20px; }
            </style>

            <div class="pro-banner">
                <div class="banner-title">🛡️ 強積金資產智慧管理系統</div>
                <div class="banner-info" id="live-info">
                    <span id="live-date">----/--/--</span>
                    <span class="info-sep">|</span>
                    <span id="live-time" class="time-accent">00:00:00</span>
                    <span class="info-sep">|</span>
                    <span id="live-weather">🌡️ HK: 26.5°C</span>
                </div>
            </div>

            <div class="stat-grid">
                <div class="stat-card">
                    <div class="stat-label">總資產估值 (A)</div>
                    <div class="stat-value" style="color: #2563eb;">$${Number(latest.totalA).toLocaleString()}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">累計盈虧 (B)</div>
                    <div class="stat-value" style="color: ${latest.totalB >= 0 ? '#10b981' : '#ef4444'};">
                        ${latest.totalB >= 0 ? '+' : ''}$${Number(latest.totalB).toLocaleString()}
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-label">已記錄次數</div>
                    <div class="stat-value" style="color: #1e293b;">${recordCount}</div>
                </div>
            </div>

            <div class="chart-panel">
                <h3 style="margin: 0; color: #1e293b; display: flex; align-items: center; gap: 10px;">
                    <span style="font-size:24px;">📈</span> 資產增長走勢
                </h3>
                <div class="chart-wrapper">
                    <canvas id="mainChart"></canvas>
                </div>
            </div>
        `;
    },

    init: function() {
        this.updateClock();
        if (this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => this.updateClock(), 1000);

        const ctx = document.getElementById('mainChart');
        if (!ctx || !window.records || window.records.length === 0) return;

        // 數據處理：反轉並確保至少有兩個點以防止縮在一起
        const sortedData = [...window.records].reverse();
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedData.map(r => r.date),
                datasets: [{
                    label: '總資產 (HKD)',
                    data: sortedData.map(r => r.totalA),
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.08)',
                    borderWidth: 4,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 6,
                    pointHoverRadius: 8,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#2563eb',
                    pointBorderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { left: 10, right: 25, top: 10, bottom: 10 } },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        padding: 12,
                        titleFont: { size: 14 },
                        bodyFont: { size: 14 },
                        callbacks: { label: (ctx) => ` 總額: $${ctx.raw.toLocaleString()}` }
                    }
                },
                scales: {
                    y: { 
                        beginAtZero: false,
                        grid: { color: '#f1f5f9' },
                        ticks: { 
                            font: { family: 'JetBrains Mono' },
                            callback: v => '$' + v.toLocaleString() 
                        }
                    },
                    x: { 
                        // 修復日期靠左問題：確保對齊方式與分佈
                        grid: { display: false },
                        ticks: { 
                            font: { family: 'JetBrains Mono', size: 11 },
                            maxRotation: 0,
                            autoSkip: true,
                            maxTicksLimit: 10
                        }
                    }
                }
            }
        });
    },

    updateClock: function() {
        const now = new Date();
        const dateEl = document.getElementById('live-date');
        const timeEl = document.getElementById('live-time');
        
        if (dateEl) {
            const y = now.getFullYear();
            const m = (now.getMonth() + 1).toString().padStart(2, '0');
            const d = now.getDate().toString().padStart(2, '0');
            const dayNames = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
            dateEl.innerText = `${y}/${m}/${d} ${dayNames[now.getDay()]}`;
        }
        if (timeEl) {
            // 強制 24 小時制
            timeEl.innerText = now.toLocaleTimeString('en-GB', { hour12: false });
        }
    }
};