const PredictionComponent = {
    render: function() {
        let historyRate = 0, showBadge = false;
        if (window.records.length >= 2) {
            const latest = window.records[0], oldest = window.records[window.records.length - 1];
            const years = (new Date(latest.date) - new Date(oldest.date)) / (1000*60*60*24*365.25);
            if (years > 0.08 && oldest.totalA > 100) {
                historyRate = (Math.pow(latest.totalA / oldest.totalA, 1 / years) - 1) * 100;
                if (historyRate > -20 && historyRate < 100) showBadge = true;
            }
        }

        return `
            <style>
                .p-card { background: var(--card-bg); padding: 25px; border-radius: 28px; border: 1px solid var(--border); }
                .p-val { width: 100%; background: transparent; border: none; font-family: 'JetBrains Mono'; font-size: 28px; font-weight: 800; color: var(--text-main); outline: none; }
                .rate-badge { background: rgba(16, 185, 129, 0.1); color: #059669; padding: 6px 12px; border-radius: 10px; font-size: 12px; font-weight: 800; cursor: pointer; margin-top: 10px; border: 1px solid rgba(16, 185, 129, 0.2); display: inline-block; }
            </style>
            
            <div class="page-animate">
                <h2 style="margin-bottom:25px;">📈 退休財富預測</h2>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:20px; margin-bottom:30px;">
                    <div class="p-card">
                        <label style="font-size:11px; font-weight:800; color:var(--text-sub); display:block; margin-bottom:10px;">目前年齡</label>
                        <input type="number" id="p-age" class="p-val" value="30" oninput="PredictionComponent.update()">
                    </div>
                    <div class="p-card">
                        <label style="font-size:11px; font-weight:800; color:var(--text-sub); display:block; margin-bottom:10px;">每月供款 ($)</label>
                        <input type="number" id="p-monthly" class="p-val" value="3000" oninput="PredictionComponent.update()">
                    </div>
                    <div class="p-card">
                        <label style="font-size:11px; font-weight:800; color:var(--text-sub); display:block; margin-bottom:10px;">年回報率 (%)</label>
                        <input type="number" id="p-rate" class="p-val" value="5.0" step="0.1" oninput="PredictionComponent.update()">
                        ${showBadge ? `<div class="rate-badge" onclick="document.getElementById('p-rate').value=${historyRate.toFixed(2)}; PredictionComponent.update();">📊 實測回報: ${historyRate.toFixed(2)}% (點擊套用)</div>` : ''}
                    </div>
                </div>

                <div class="card-panel">
                    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:25px;">
                        <div>
                            <div style="font-size:12px; color:var(--text-sub); font-weight:800;">預計 65 歲資產總額</div>
                            <div id="res-total" style="font-size:36px; font-weight:800; color:var(--accent); font-family:'JetBrains Mono';">$0</div>
                        </div>
                    </div>
                    <div style="height:380px;"><canvas id="predictChart"></canvas></div>
                </div>
            </div>
        `;
    },

    init: function() { setTimeout(() => this.update(), 100); },

    update: function() {
        const age = parseInt(document.getElementById('p-age').value) || 30;
        const monthly = parseInt(document.getElementById('p-monthly').value) || 0;
        const rate = (parseFloat(document.getElementById('p-rate').value) || 0) / 100 / 12;
        let total = window.records.length ? window.records[0].totalA : 0;
        
        let labels = [], data = [];
        for (let i = 0; i <= (65 - age); i++) {
            labels.push(`${age + i}歲`);
            data.push(Math.round(total));
            for (let m = 0; m < 12; m++) total = (total + monthly) * (1 + rate);
        }

        document.getElementById('res-total').innerText = '$' + Math.round(total).toLocaleString();
        const ctx = document.getElementById('predictChart').getContext('2d');
        if (window.pChart) window.pChart.destroy();
        window.pChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{ label: '財富成長', data: data, borderColor: '#3b82f6', tension: 0.4, fill: true, backgroundColor: 'rgba(59,130,246,0.05)', pointRadius: 0 }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false,
                scales: { y: { ticks: { font: { family: 'JetBrains Mono' } } } }
            }
        });
    }
};