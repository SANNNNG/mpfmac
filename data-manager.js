let currentInputs = [{ n: "請選擇受託人", a: "", b: "", c: 0, locked: false }];
let editingDate = null;

const DataManagerComponent = {
    render: function() {
        return `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');
                
                .row-header { display: flex; gap: 8px; margin-bottom: 12px; color: #94a3b8; font-size: 11px; font-weight: 800; text-align: center; text-transform: uppercase; letter-spacing: 1px; }
                .input-group { display: flex; gap: 8px; margin-bottom: 10px; align-items: center; background: #f8fafc; padding: 12px; border-radius: 16px; border: 1px solid transparent; transition: 0.2s; }
                .input-group:focus-within { border-color: #bfdbfe; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
                
                .in-n { flex: 1.6; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 14px; background: white; }
                .in-n:disabled { background: #f1f5f9; cursor: not-allowed; border-style: dashed; }
                .in-val { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 14px; text-align: center; font-family: 'JetBrains Mono'; }
                .in-c-auto { flex: 1; padding: 12px; border-radius: 10px; border: none; font-size: 14px; font-weight: 700; text-align: center; background: #e0f2fe; color: #0369a1; font-family: 'JetBrains Mono'; }
                
                .btn-icon { width: 38px; height: 38px; display: flex; align-items: center; justify-content: center; border: none; background: white; cursor: pointer; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: 0.2s; }
                .btn-icon:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
                
                .modal-detail-row { display: flex; align-items: center; padding: 15px 5px; border-bottom: 1px solid #f1f5f9; }
                .btn-modal-edit { flex: 2; background: #2563eb; color: white; padding: 14px; border-radius: 15px; border: none; font-weight: 700; cursor: pointer; }
                .btn-modal-del { flex: 1; background: #fff1f2; color: #e11d48; padding: 14px; border-radius: 15px; border: 1px solid #fecdd3; font-weight: 700; cursor: pointer; }
            </style>

            <div class="card-panel">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
                    <h3 style="margin:0; font-size:22px;">✍️ ${editingDate ? '編輯數據' : '新增資產結餘'}</h3>
                    <input type="date" id="r-date" value="${editingDate || new Date().toISOString().split('T')[0]}" ${editingDate ? 'disabled' : ''} 
                           style="padding:10px 15px; border-radius:12px; border:1px solid #e2e8f0; font-family:'JetBrains Mono'; font-weight:600;">
                </div>
                
                <div class="row-header">
                    <div style="flex: 1.6; text-align:left; padding-left:10px;">受託人名稱</div>
                    <div style="flex: 1;">(A) 總額</div>
                    <div style="flex: 1;">(B) 盈虧</div>
                    <div style="flex: 1;">(C) 本金</div>
                    <div style="width: 85px;">操作</div>
                </div>

                <div id="input-rows"></div>

                <div style="display:flex; gap:15px; margin-top:25px;">
                    <button onclick="DataManagerComponent.addRow()" style="flex:1; padding:15px; border:2px dashed #cbd5e0; border-radius:16px; background:none; cursor:pointer; color:#64748b; font-weight:700;">+ 新增受託人</button>
                    <button onclick="DataManagerComponent.saveRecord()" style="flex:1.5; padding:15px; background:#2563eb; color:white; border:none; border-radius:16px; font-weight:700; cursor:pointer; box-shadow: 0 8px 16px rgba(37,99,235,0.2);">💾 儲存結算紀錄</button>
                </div>
            </div>

            <div class="card-panel">
                <h3 style="margin-top:0; margin-bottom:20px;">📜 歷史紀錄</h3>
                <table style="width:100%; border-collapse:collapse;">
                    <thead>
                        <tr style="text-align:left; color:#94a3b8; font-size:12px; background:#f8fafc;">
                            <th style="padding:15px; border-radius:10px 0 0 10px;">結算日期</th>
                            <th style="padding:15px;">總資產 (A)</th>
                            <th style="padding:15px;">淨盈虧 (B)</th>
                            <th style="padding:15px; text-align:right; border-radius:0 10px 10px 0;">操作</th>
                        </tr>
                    </thead>
                    <tbody id="history-rows"></tbody>
                </table>
            </div>
        `;
    },

    init: function() { this.renderInputs(); this.renderHistory(); },

    calculateC: function(idx) {
        const row = document.querySelectorAll('.input-group')[idx];
        const a = parseFloat(row.querySelector('.in-a').value) || 0;
        const b = parseFloat(row.querySelector('.in-b').value) || 0;
        row.querySelector('.in-c-auto').value = (a - b).toFixed(0);
    },

    renderInputs: function() {
        const container = document.getElementById('input-rows');
        if(!container) return;
        
        const mpfList = [
            "請選擇受託人", "滙豐 HSBC", "恒生 Hang Seng", "宏利 Manulife", 
            "友邦 AIA", "永明 Sun Life", "中銀保誠 BOC-P", "富達 Fidelity", 
            "信安 Principal", "交通銀行 BCOM", "其士 Chevalier", "東亞 BEA", "新地/銀聯 BCT"
        ];

        container.innerHTML = currentInputs.map((item, idx) => `
            <div class="input-group">
                <select class="in-n" ${item.locked ? 'disabled' : ''}>
                    ${mpfList.map(name => `<option value="${name}" ${item.n === name ? 'selected' : ''}>${name}</option>`).join('')}
                </select>
                <input type="number" class="in-val in-a" value="${item.a}" oninput="DataManagerComponent.calculateC(${idx})" placeholder="0">
                <input type="number" class="in-val in-b" value="${item.b}" oninput="DataManagerComponent.calculateC(${idx})" placeholder="0">
                <input type="number" class="in-c-auto" value="${item.a - item.b || 0}" readonly>
                <div style="display:flex; gap:8px; width:85px; justify-content:center;">
                    <button onclick="DataManagerComponent.toggleLock(${idx})" class="btn-icon">${item.locked ? '🔒' : '🔓'}</button>
                    <button onclick="DataManagerComponent.removeRow(${idx})" class="btn-icon" style="color:#ef4444;">✕</button>
                </div>
            </div>
        `).join('');
    },

    toggleLock: function(idx) { currentInputs[idx].locked = !currentInputs[idx].locked; this.renderInputs(); },

    addRow: function() {
        // 重要：新增前先同步當前輸入的值，防止清空
        const rows = document.querySelectorAll('.input-group');
        rows.forEach((row, idx) => {
            if (currentInputs[idx]) {
                currentInputs[idx].n = row.querySelector('.in-n').value;
                currentInputs[idx].a = row.querySelector('.in-a').value;
                currentInputs[idx].b = row.querySelector('.in-b').value;
            }
        });
        currentInputs.push({ n: "請選擇受託人", a: "", b: "", locked: false }); 
        this.renderInputs(); 
    },

    removeRow: function(idx) { if(currentInputs.length > 1) { currentInputs.splice(idx, 1); this.renderInputs(); } },

    saveRecord: function() {
        const date = document.getElementById('r-date').value;
        const rows = document.querySelectorAll('.input-group');
        let details = [], sumA = 0, sumB = 0, sumC = 0;
        let hasError = false;

        rows.forEach(row => {
            const n = row.querySelector('.in-n').value;
            if (n === "請選擇受託人") hasError = true;
            const a = parseFloat(row.querySelector('.in-a').value) || 0;
            const b = parseFloat(row.querySelector('.in-b').value) || 0;
            const c = a - b;
            details.push({ n, a, b, c });
            sumA += a; sumB += b; sumC += c;
        });

        if (hasError) { alert("請確保所有行都已選擇受託人！"); return; }

        const entry = { date, totalA: sumA, totalB: sumB, totalC: sumC, details };
        
        const existIdx = window.records.findIndex(r => r.date === (editingDate || date));
        if(existIdx !== -1) window.records[existIdx] = entry;
        else window.records.unshift(entry);

        localStorage.setItem('MPF_PRO_DATA_V1', JSON.stringify(window.records));
        editingDate = null;
        alert("儲存成功！");
        location.reload(); 
    },

    renderHistory: function() {
        const body = document.getElementById('history-rows');
        if (!body) return;
        body.innerHTML = window.records.map((r, i) => `
            <tr style="border-bottom:1px solid #f1f5f9; transition:0.2s;" onmouseover="this.style.background='#fbfcfe'" onmouseout="this.style.background='transparent'">
                <td style="padding:18px; font-family:'JetBrains Mono'; font-weight:700; color:#475569;">${r.date}</td>
                <td style="padding:18px; color:#2563eb; font-weight:800; font-size:15px;">$${Number(r.totalA).toLocaleString()}</td>
                <td style="padding:18px; color:${r.totalB>=0?'#10b981':'#ef4444'}; font-weight:700;">${r.totalB>=0?'+':''}$${Number(r.totalB).toLocaleString()}</td>
                <td style="padding:18px; text-align:right;">
                    <button onclick="DataManagerComponent.viewDetail(${i})" style="padding:8px 16px; border-radius:10px; border:none; background:#f1f5f9; color:#475569; font-weight:600; cursor:pointer;">🔍 查看明細</button>
                </td>
            </tr>
        `).join('');
    },

    viewDetail: function(idx) {
        const r = window.records[idx];
        const modal = document.getElementById('viewModal');
        const body = document.getElementById('modal-body');

        const getIcon = (name) => {
            const icons = {
                '滙豐 HSBC': `<div style="width:18px;height:18px;background:#db0011;clip-path:polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);"></div>`,
                '恒生 Hang Seng': `<div style="width:18px;height:18px;background:#006d31;border-radius:3px;"></div>`,
                '宏利 Manulife': `<div style="width:18px;height:18px;background:#00a758;clip-path:polygon(0 0, 100% 0, 80% 100%, 0% 100%);"></div>`,
                '友邦 AIA': `<div style="width:18px;height:18px;background:#d31145;border-radius:50%;"></div>`,
                '永明 Sun Life': `<div style="width:18px;height:18px;background:#ffc425;border-radius:50%;border:2px solid #002d56;"></div>`,
                '中銀保誠 BOC-P': `<div style="width:18px;height:18px;background:#b31f24;border-radius:3px;display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:900;">中</div>`,
                '預設': `<div style="width:18px;height:18px;background:#cbd5e0;border-radius:4px;"></div>`
            };
            return icons[name] || icons['預設'];
        };

        body.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:25px;">
                <div>
                    <h2 style="margin:0; font-size:24px; letter-spacing:-0.5px;">${r.date}</h2>
                    <p style="margin:5px 0 0 0; color:#64748b; font-weight:500;">資產結算詳細報告</p>
                </div>
                <button onclick="closeModal()" style="background:#f1f5f9; border:none; width:36px; height:36px; border-radius:50%; cursor:pointer; font-size:18px; color:#94a3b8;">✕</button>
            </div>
            
            <div style="background:#f8fafc; border-radius:24px; padding:20px; margin-bottom:25px; border:1px solid #f1f5f9;">
                <div style="display: flex; color: #94a3b8; font-size: 11px; font-weight: 800; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px; padding:0 5px;">
                    <div style="flex: 2;">受託人</div>
                    <div style="flex: 1; text-align: right;">(A) 總額</div>
                    <div style="flex: 1; text-align: right;">(B) 盈虧</div>
                    <div style="flex: 1; text-align: right;">(C) 本金</div>
                </div>

                ${r.details.map(d => `
                    <div class="modal-detail-row">
                        <div style="flex: 2; display: flex; align-items: center; gap: 10px;">
                            ${getIcon(d.n)}
                            <span style="color:#1e293b; font-weight:700; font-size:14px;">${d.n}</span>
                        </div>
                        <div style="flex: 1; text-align: right; font-weight:600; font-family:'JetBrains Mono';">$${Number(d.a).toLocaleString()}</div>
                        <div style="flex: 1; text-align: right; color:${d.b >= 0 ? '#10b981' : '#ef4444'}; font-weight:700; font-family:'JetBrains Mono';">
                            ${d.b >= 0 ? '+' : ''}$${Number(d.b).toLocaleString()}
                        </div>
                        <div style="flex: 1; text-align: right; color:#64748b; font-size:13px; font-family:'JetBrains Mono';">$${Number(d.c).toLocaleString()}</div>
                    </div>
                `).join('')}

                <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #fff;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                        <span style="color:#64748b; font-weight:600;">資產總值 (A)</span>
                        <span style="color:#2563eb; font-weight:900; font-size:24px; font-family:'JetBrains Mono';">$${Number(r.totalA).toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="color:#64748b; font-weight:600;">累計淨收益 (B)</span>
                        <span style="color:${r.totalB >= 0 ? '#10b981' : '#ef4444'}; font-weight:800; font-size:18px; font-family:'JetBrains Mono';">
                            ${r.totalB >= 0 ? '+' : ''}$${Number(r.totalB).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div style="display:flex; gap:12px;">
                <button onclick="DataManagerComponent.editRecord(${idx})" class="btn-modal-edit">📝 修改數據</button>
                <button onclick="DataManagerComponent.deleteRecord(${idx})" class="btn-modal-del">🗑️ 刪除</button>
            </div>
        `;
        modal.style.display = 'flex';
    },

    editRecord: function(idx) {
        const r = window.records[idx];
        editingDate = r.date;
        currentInputs = r.details.map(d => ({ n: d.n, a: d.a, b: d.b, c: d.c, locked: true }));
        closeModal();
        this.init();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    deleteRecord: function(idx) {
        if(confirm("確定要刪除這條歷史紀錄嗎？")) {
            window.records.splice(idx, 1);
            localStorage.setItem('MPF_PRO_DATA_V1', JSON.stringify(window.records));
            closeModal();
            this.init();
        }
    }
};