let currentInputs = [{ n: "滙豐 HSBC", a: "", b: "", c: 0, locked: true }];
let editingDate = null;
let recordLocks = {};

const DataManagerComponent = {
    render: function() {
        return `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500&display=swap');
                
                .input-card { background: white; padding: 25px; border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); margin-bottom: 30px; border: 1px solid #f1f5f9; }
                .row-header { display: flex; gap: 8px; margin-bottom: 12px; color: #94a3b8; font-size: 12px; font-weight: 700; text-align: center; text-transform: uppercase; letter-spacing: 0.5px; }
                .input-group { display: flex; gap: 8px; margin-bottom: 10px; align-items: center; background: #f8fafc; padding: 10px; border-radius: 14px; transition: 0.2s; }
                .input-group:focus-within { background: #f0f7ff; ring: 2px solid #bfdbfe; }
                
                .in-n { flex: 1.6; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 14px; background: #fff; }
                .in-n:disabled { background: #f1f5f9; color: #64748b; border: 1px dashed #cbd5e0; }
                .in-val { flex: 1; padding: 12px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 14px; text-align: center; font-family: 'JetBrains Mono', monospace; }
                .in-c-auto { flex: 1; padding: 12px; border-radius: 10px; border: none; font-size: 14px; font-weight: 700; text-align: center; background: #e0f2fe; color: #0369a1; font-family: 'JetBrains Mono', monospace; }
                
                .btn-icon { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border: none; background: white; cursor: pointer; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
                .hist-btn-view { background: #f1f5f9; color: #475569; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; transition: 0.2s; }
                .hist-btn-view:hover { background: #e2e8f0; color: #1e293b; }

                /* 查看彈窗內的專業樣式 */
                .modal-detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #f1f5f9; font-family: 'JetBrains Mono', monospace; }
                .action-bar-modal { display: flex; gap: 10px; margin-top: 25px; }
                .btn-modal-edit { flex: 2; background: #2563eb; color: white; padding: 12px; border-radius: 12px; border: none; font-weight: 600; cursor: pointer; }
                .btn-modal-del { flex: 1; background: #fff1f2; color: #e11d48; padding: 12px; border-radius: 12px; border: 1px solid #fecdd3; font-weight: 600; cursor: pointer; }
                
                .danger-zone { margin-top: 50px; padding: 25px; border-radius: 24px; background: #fff1f2; border: 1px solid #fecdd3; text-align: center; }
            </style>

            <div class="input-card">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:25px;">
                    <h3 style="margin:0; font-size:20px; color:#1e293b;">✍️ ${editingDate ? '編輯紀錄' : '新增結餘'}</h3>
                    <div style="display:flex; align-items:center; gap:10px;">
                        <label style="font-size:14px; color:#64748b; font-weight:600;">結算日期:</label>
                        <input type="date" id="r-date" value="${editingDate || new Date().toISOString().split('T')[0]}" ${editingDate ? 'disabled' : ''} 
                               style="padding:10px; border-radius:10px; border:1px solid #e2e8f0; font-family:'JetBrains Mono';">
                    </div>
                </div>
                <div class="row-header">
                    <div style="flex: 1.6; text-align:left;">受託人</div>
                    <div style="flex: 1;">(A) 總額</div>
                    <div style="flex: 1;">(B) 盈虧</div>
                    <div style="flex: 1;">(C) 本金</div>
                    <div style="width: 80px;">操作</div>
                </div>
                <div id="input-rows"></div>
                <div style="display:flex; gap:15px; margin-top:25px;">
                    <button onclick="DataManagerComponent.addRow()" style="flex:1; padding:14px; border:2px dashed #cbd5e0; border-radius:14px; background:none; cursor:pointer; color:#64748b; font-weight:600;">+ 新增受託人</button>
                    <button onclick="DataManagerComponent.saveRecord()" style="flex:1.5; padding:14px; background:#2563eb; color:white; border:none; border-radius:14px; font-weight:700; cursor:pointer; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);">💾 儲存結餘</button>
                </div>
            </div>

            <div class="card-panel">
                <h3 style="margin-top:0; margin-bottom:20px; color:#1e293b;">📜 歷史紀錄清單</h3>
                <div style="overflow-x: auto;">
                    <table style="width:100%; border-collapse:collapse; min-width:600px;">
                        <thead>
                            <tr style="text-align:left; color:#94a3b8; font-size:12px; background:#f8fafc; border-radius:10px;">
                                <th style="padding:18px;">日期</th>
                                <th style="padding:18px;">總資產 (A)</th>
                                <th style="padding:18px;">累計盈虧 (B)</th>
                                <th style="padding:18px;">投入本金 (C)</th>
                                <th style="padding:18px; text-align:right;">操作</th>
                            </tr>
                        </thead>
                        <tbody id="history-rows"></tbody>
                    </table>
                </div>
            </div>

            <div class="danger-zone">
                <p style="margin:0 0 15px 0; color:#991b1b; font-size:14px; font-weight:600;">⚠️ 數據清理區 (不可恢復)</p>
                <button onclick="DataManagerComponent.hardReset()" style="background:#e11d48; color:white; border:none; padding:12px 25px; border-radius:12px; cursor:pointer; font-weight:700;">🔥 徹底清除系統所有數據</button>
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
        container.innerHTML = currentInputs.map((item, idx) => `
            <div class="input-group">
                <select class="in-n" ${item.locked ? 'disabled' : ''}>
                    <option ${item.n==='滙豐 HSBC'?'selected':''}>滙豐 HSBC</option>
                    <option ${item.n==='宏利 Manulife'?'selected':''}>宏利 Manulife</option>
                    <option ${item.n==='友邦 AIA'?'selected':''}>友邦 AIA</option>
                    <option ${item.n==='永明 Sun Life'?'selected':''}>永明 Sun Life</option>
                    <option ${item.n==='中銀保誠 BOC-P'?'selected':''}>中銀保誠 BOC-P</option>
                </select>
                <input type="number" class="in-val in-a" value="${item.a}" oninput="DataManagerComponent.calculateC(${idx})" placeholder="0">
                <input type="number" class="in-val in-b" value="${item.b}" oninput="DataManagerComponent.calculateC(${idx})" placeholder="0">
                <input type="number" class="in-c-auto" value="${item.a - item.b || 0}" readonly>
                <div style="display:flex; gap:6px; width:80px; justify-content:center;">
                    <button onclick="DataManagerComponent.toggleInputLock(${idx})" class="btn-icon">${item.locked ? '🔒' : '🔓'}</button>
                    <button onclick="DataManagerComponent.removeRow(${idx})" class="btn-icon" style="color:#ef4444;">✕</button>
                </div>
            </div>
        `).join('');
    },

    toggleInputLock: function(idx) { currentInputs[idx].locked = !currentInputs[idx].locked; this.renderInputs(); },
    addRow: function() { currentInputs.push({ n: "滙豐 HSBC", a: "", b: "", c: 0, locked: true }); this.renderInputs(); },
    removeRow: function(idx) { if(currentInputs.length > 1) { currentInputs.splice(idx, 1); this.renderInputs(); } },

    saveRecord: function() {
        const date = document.getElementById('r-date').value;
        const rows = document.querySelectorAll('.input-group');
        let details = [], sumA = 0, sumB = 0, sumC = 0;

        rows.forEach(row => {
            const n = row.querySelector('.in-n').value;
            const a = parseFloat(row.querySelector('.in-a').value) || 0;
            const b = parseFloat(row.querySelector('.in-b').value) || 0;
            const c = a - b;
            details.push({ n, a, b, c });
            sumA += a; sumB += b; sumC += c;
        });

        const entry = { date, totalA: sumA, totalB: sumB, totalC: sumC, totalAll: sumA, details };
        
        if(editingDate) {
            const idx = window.records.findIndex(r => r.date === editingDate);
            if(idx !== -1) window.records[idx] = entry;
            editingDate = null;
        } else {
            const existIdx = window.records.findIndex(r => r.date === date);
            if(existIdx !== -1) window.records[existIdx] = entry;
            else window.records.unshift(entry);
        }

        localStorage.setItem('MPF_PRO_DATA_V1', JSON.stringify(window.records));
        alert("儲存成功！");
        window.location.reload(); 
    },

    renderHistory: function() {
        const body = document.getElementById('history-rows');
        if (!body) return;
        body.innerHTML = window.records.map((r, i) => `
            <tr style="border-bottom:1px solid #f1f5f9; transition:0.2s;" onmouseover="this.style.background='#fcfdfe'" onmouseout="this.style.background='transparent'">
                <td style="padding:18px; font-family:'JetBrains Mono'; font-weight:600; color:#1e293b;">${r.date}</td>
                <td style="padding:18px; color:#2563eb; font-weight:700;">$${Number(r.totalA).toLocaleString()}</td>
                <td style="padding:18px; color:${r.totalB>=0?'#10b981':'#ef4444'}; font-weight:700;">${r.totalB>=0?'+':''}$${Number(r.totalB).toLocaleString()}</td>
                <td style="padding:18px; color:#64748b; font-family:'JetBrains Mono';">$${Number(r.totalC).toLocaleString()}</td>
                <td style="padding:18px; text-align:right;">
                    <button onclick="DataManagerComponent.viewDetail(${i})" class="hist-btn-view">🔍 查看詳情</button>
                </td>
            </tr>
        `).join('');
    },

viewDetail: function(idx) {
        const r = window.records[idx];
        const modal = document.getElementById('viewModal');
        const body = document.getElementById('modal-body');
        
        // 定義受託人 ICON 映射 (你可以根據需要更換 emoji 或圖片連結)
        const iconMap = {
            '滙豐 HSBC': '🔴',
            '宏利 Manulife': '🟢',
            '友邦 AIA': '🔴',
            '永明 Sun Life': '🟡',
            '中銀保誠 BOC-P': '🔵',
            '預設': '🏢'
        };

        body.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px;">
                <div>
                    <h2 style="margin:0; color:#1e293b;">${r.date}</h2>
                    <p style="margin:5px 0 0 0; color:#64748b;">資產明細報告</p>
                </div>
                <button onclick="closeModal()" style="background:none; border:none; font-size:24px; cursor:pointer; color:#cbd5e0;">✕</button>
            </div>
            
            <div style="background:#f8fafc; border-radius:16px; padding:20px; margin-bottom:20px;">
                <div style="display: flex; color: #94a3b8; font-size: 11px; font-weight: 700; margin-bottom: 10px; text-transform: uppercase;">
                    <div style="flex: 2;">受託人</div>
                    <div style="flex: 1; text-align: right;">(A) 總額</div>
                    <div style="flex: 1; text-align: right;">(B) 盈虧</div>
                    <div style="flex: 1; text-align: right;">(C) 本金</div>
                </div>

                ${r.details.map(d => {
                    const icon = iconMap[d.n] || iconMap['預設'];
                    return `
                    <div class="modal-detail-row" style="font-size: 13px; align-items: center;">
                        <div style="flex: 2; display: flex; align-items: center; gap: 8px;">
                            <span>${icon}</span>
                            <span style="color:#475569; font-weight:600;">${d.n}</span>
                        </div>
                        <div style="flex: 1; text-align: right; color:#1e293b;">$${Number(d.a).toLocaleString()}</div>
                        <div style="flex: 1; text-align: right; color:${d.b >= 0 ? '#10b981' : '#ef4444'};">
                            ${d.b >= 0 ? '+' : ''}$${Number(d.b).toLocaleString()}
                        </div>
                        <div style="flex: 1; text-align: right; color:#64748b;">$${Number(d.c).toLocaleString()}</div>
                    </div>
                `}).join('')}

                <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #fff;">
                    <div style="display:flex; justify-content:space-between; font-weight:800; font-size:18px; margin-bottom: 5px;">
                        <span style="color:#1e293b;">總計資產 (A)</span>
                        <span style="color:#2563eb;">$${Number(r.totalA).toLocaleString()}</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:14px; font-weight:600;">
                        <span style="color:#64748b;">累計盈虧 (B)</span>
                        <span style="color:${r.totalB >= 0 ? '#10b981' : '#ef4444'};">
                            ${r.totalB >= 0 ? '+' : ''}$${Number(r.totalB).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div class="action-bar-modal">
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
            alert("紀錄已刪除");
        }
    },

    hardReset: function() {
        if(confirm("⚠️ 警告：這將永久刪除所有 MPF 紀錄。確定要徹底銷毀？")) {
            localStorage.clear();
            alert("數據已完全清除");
            location.reload();
        }
    }
};