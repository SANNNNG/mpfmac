// 初始化變數
let currentInputs = [{ n: "請選擇受託人", a: "", b: "", locked: false }];
let editingDate = null;

const DataManagerComponent = {
    render: function() {
        return `
            <style>
                /* 統一字體體系 */
                .dm-container { font-family: 'Inter', sans-serif; color: var(--text-main); }
                .dm-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 20px; margin-bottom: 20px; color: var(--text-main); }
                .dm-mono { font-family: 'JetBrains Mono', monospace; font-weight: 500; }
                
                .input-row { display: flex; gap: 10px; margin-bottom: 12px; align-items: center; background: var(--bg); padding: 12px; border-radius: 16px; border: 1px solid var(--border); }
                
                /* 統一 Input 樣式 */
                .in-field { 
                    flex: 1; padding: 12px; border-radius: 12px; border: 1px solid var(--border); 
                    font-size: 14px; background: var(--card-bg); color: var(--text-main); 
                    outline: none; transition: 0.2s; font-family: 'Inter', sans-serif;
                }
                .in-field:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
                .in-field.num { font-family: 'JetBrains Mono', monospace; }
                
                .btn-lock { background: #f1f5f9; border: none; padding: 10px; border-radius: 10px; cursor: pointer; transition: 0.2s; font-size: 16px; }
                .btn-lock.active { background: #dbeafe; color: #2563eb; }
                
                .history-card { 
                    background: var(--card-bg); padding: 20px; border-radius: 20px; border: 1px solid var(--border); 
                    margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; 
                    cursor: pointer; transition: 0.2s; font-family: 'Inter', sans-serif;
                }
                .history-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
                .tag-diff { font-size: 11px; font-weight: 800; font-family: 'JetBrains Mono', monospace; margin-top: 4px; }
            </style>
            
            <div class="page-animate dm-container">
                <div style="background:var(--card-bg); border-radius:30px; padding:30px; border:1px solid var(--border); margin-bottom:25px;">
                    <div class="dm-title">
                        ${editingDate ? '📝 修改紀錄' : '✍️ 登記結餘'}
                    </div>
                    
                    <input type="date" id="r-date" 
                        value="${editingDate || new Date().toISOString().split('T')[0]}" 
                        ${editingDate ? 'disabled' : ''} 
                        class="in-field num" 
                        style="width:100%; margin-bottom:20px; padding:14px; font-size: 16px;">
                    
                    <div id="input-rows"></div>
                    
                    <div style="margin-top:20px; display:flex; gap:10px;">
                        <button onclick="DataManagerComponent.addRow()" style="flex:1; padding:15px; border:2px dashed var(--border); background:none; border-radius:15px; cursor:pointer; color:var(--text-sub); font-family:'Inter'; font-weight:600;">+ 新增受託人</button>
                        <button onclick="DataManagerComponent.save()" style="flex:1.5; padding:15px; background:var(--accent); color:white; border:none; border-radius:15px; font-weight:800; cursor:pointer; font-family:'Inter'; letter-spacing:1px;">儲存數據</button>
                    </div>
                </div>
                <div id="history-list"></div>
            </div>
        `;
    },

    init: function() { this.renderInputs(); this.renderHistory(); },

    getMpfList: function() {
        return [
            "滙豐 HSBC", "恒生 Hang Seng", "宏利 Manulife", "友邦 AIA", 
            "永明 Sun Life", "中銀保誠 BOC-P", "BCT 銀聯", "信安 Principal", 
            "富達 Fidelity", "交通銀行 Bocom", "東亞 BEA", "大華繼顯 UOB", 
            "安聯 Allianz", "保誠 Prudential", "我的其他資產"
        ];
    },

    getIcon: function(n) {
        if(n.includes("滙豐")) return "🔴"; if(n.includes("恒生")) return "🟠";
        if(n.includes("宏利")) return "🟢"; if(n.includes("友邦")) return "⚪";
        if(n.includes("永明")) return "🟡"; if(n.includes("中銀")) return "🧧";
        if(n.includes("BCT")) return "🔵"; if(n.includes("信安")) return "💙";
        return "💰";
    },

    renderInputs: function() {
        const container = document.getElementById('input-rows');
        const mpfs = this.getMpfList();
        container.innerHTML = currentInputs.map((item, idx) => `
            <div class="input-row">
                <select class="in-field" style="flex:1.6; font-weight:600;" onchange="currentInputs[${idx}].n = this.value" ${item.locked ? 'disabled' : ''}>
                    <option>請選擇受託人</option>
                    ${mpfs.map(m => `<option ${item.n===m?'selected':''}>${m}</option>`).join('')}
                </select>
                <input type="number" class="in-field num" placeholder="總額A" value="${item.a}" oninput="currentInputs[${idx}].a=this.value">
                <input type="number" class="in-field num" placeholder="盈虧B" value="${item.b}" oninput="currentInputs[${idx}].b=this.value">
                <button onclick="DataManagerComponent.toggleLock(${idx})" class="btn-lock ${item.locked ? 'active' : ''}">${item.locked ? '🔒' : '🔓'}</button>
            </div>
        `).join('');
    },

    toggleLock: function(idx) { currentInputs[idx].locked = !currentInputs[idx].locked; this.renderInputs(); },
    addRow: function() { currentInputs.push({ n: "請選擇受託人", a: "", b: "", locked: false }); this.renderInputs(); },

    save: function() {
        const date = document.getElementById('r-date').value;
        let sumA = 0, sumB = 0, sumC = 0, details = [];
        for(let i of currentInputs) {
            if(i.n === "請選擇受託人") continue;
            const a = parseFloat(i.a) || 0, b = parseFloat(i.b) || 0;
            sumA += a; sumB += b; sumC += (a - b);
            details.push({ n: i.n, a, b, c: a-b });
        }
        if(details.length === 0) return alert("請選擇受託人");
        window.records = window.records.filter(r => r.date !== date);
        window.records.unshift({ date, totalA: sumA, totalB: sumB, totalC: sumC, details });
        window.records.sort((a,b) => new Date(b.date) - new Date(a.date));
        localStorage.setItem('MPF_PRO_DATA_V1', JSON.stringify(window.records));
        location.reload(); 
    },

    renderHistory: function() {
        const list = document.getElementById('history-list');
        list.innerHTML = window.records.map((r, i) => {
            let diffHtml = '';
            if (i < window.records.length - 1) {
                const diff = r.totalA - window.records[i+1].totalA;
                diffHtml = `<div class="tag-diff" style="color:${diff >= 0 ? '#10b981' : '#ef4444'}">${diff >= 0 ? '▲' : '▼'} $${Math.abs(diff).toLocaleString()}</div>`;
            }
            return `
                <div class="history-card" onclick="DataManagerComponent.showDetail(${i})">
                    <div>
                        <div style="font-weight:800;" class="dm-mono">${r.date}</div>
                        ${diffHtml}
                    </div>
                    <div style="text-align:right;">
                        <div class="dm-mono" style="color:var(--accent); font-size:18px; font-weight:800;">$${r.totalA.toLocaleString()}</div>
                        <div style="font-size:11px; color:var(--text-sub); font-weight:600;">詳情 View</div>
                    </div>
                </div>
            `;
        }).join('');
    },

    showDetail: function(idx) {
        const r = window.records[idx];
        const modal = document.getElementById('viewModal');
        document.getElementById('modal-body').innerHTML = `
            <div class="dm-container">
                <h3 class="dm-title" style="margin-top:0;">📊 數據詳情</h3>
                <div style="background:var(--bg); padding:20px; border-radius:24px; margin-bottom:20px; border:1px solid var(--border);">
                    ${r.details.map(d => `
                        <div style="padding:10px 0; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center;">
                            <span style="font-weight:600;">${this.getIcon(d.n)} ${d.n}</span>
                            <span class="dm-mono" style="font-weight:700;">$${Number(d.a).toLocaleString()}</span>
                        </div>
                    `).join('')}
                    <div style="margin-top:15px; padding-top:15px; border-top:2px solid var(--accent); display:flex; justify-content:space-between; font-weight:800; color:var(--accent);">
                        <span style="font-family:'Poppins';">TOTAL (A)</span><span class="dm-mono" style="font-size:18px;">$${r.totalA.toLocaleString()}</span>
                    </div>
                </div>
                <div style="display:flex; gap:10px;">
                    <button onclick="DataManagerComponent.editRecord(${idx})" style="flex:1; padding:14px; background:var(--accent); color:white; border:none; border-radius:12px; font-weight:700; font-family:'Inter'; cursor:pointer;">📝 修改</button>
                    <button onclick="DataManagerComponent.del(${idx})" style="flex:1; padding:14px; background:#fee2e2; color:#ef4444; border:none; border-radius:12px; font-weight:700; font-family:'Inter'; cursor:pointer;">🗑️ 刪除</button>
                </div>
            </div>
        `;
        modal.style.display = 'flex';
    },

    editRecord: function(idx) {
        const r = window.records[idx];
        editingDate = r.date;
        currentInputs = r.details.map(d => ({ n: d.n, a: d.a, b: d.b, locked: true }));
        closeModal();
        this.renderInputs();
        window.scrollTo(0,0);
    },

    del: function(idx) {
        if(confirm("確定刪除？")) {
            window.records.splice(idx, 1);
            localStorage.setItem('MPF_PRO_DATA_V1', JSON.stringify(window.records));
            closeModal();
            this.renderHistory();
        }
    }
};