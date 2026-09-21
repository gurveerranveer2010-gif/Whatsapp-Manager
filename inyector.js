// inyector.js

// 1. Evitar que el panel se abra dos veces si el usuario hace doble clic
if (document.getElementById('crm-whatsapp-bootstrapper')) {
    alert("El CRM ya está abierto.");
} else {
    // 2. Crear el contenedor (Panel Lateral)
    const panel = document.createElement('div');
    panel.id = 'crm-whatsapp-bootstrapper';
    
    // CSS inyectado (diseño tipo WhatsApp Web para que no desentone)
    panel.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 320px;
        height: 100vh;
        background-color: #f0f2f5; /* Color de fondo de WhatsApp */
        border-left: 1px solid #d1d7db;
        z-index: 999999;
        font-family: 'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: -4px 0 15px rgba(0,0,0,0.1);
        overflow-y: auto;
    `;

    // 3. Estructura HTML del CRM
    panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
            <h2 style="margin:0; font-size:18px; color:#111b21;">⚡ WhatsFlow CRM</h2>
            <button id="crm-btn-cerrar" style="background:none; border:none; font-size:20px; cursor:pointer;">✖</button>
        </div>

        <div style="background:#fff; padding:15px; border-radius:8px; margin-bottom:15px; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
            <p style="margin:0 0 5px 0; font-size:12px; color:#667781;">Chat actual:</p>
            <strong id="crm-nombre-chat" style="color:#111b21;">Haz clic en un chat...</strong>
            <button id="crm-btn-detectar" style="width:100%; margin-top:10px; background:#e9edef; border:none; padding:8px; border-radius:5px; cursor:pointer;">Detectar Contacto</button>
        </div>

        <label style="font-size:13px; color:#667781;">Estado de Venta:</label>
        <select id="crm-etiqueta" style="width:100%; padding:10px; margin-bottom:15px; border-radius:5px; border:1px solid #d1d7db;">
            <option value="lead">Nuevo Lead</option>
            <option value="presupuesto">Presupuesto Enviado</option>
            <option value="pagado">Pagado / Cliente</option>
        </select>

        <label style="font-size:13px; color:#667781;">Notas del cliente:</label>
        <textarea id="crm-notas" placeholder="Ej: Quiere la reforma para octubre..." style="width:100%; height:120px; padding:10px; border-radius:5px; border:1px solid #d1d7db; resize:none; margin-bottom:15px;"></textarea>

        <button id="crm-btn-guardar" style="width:100%; background:#00a884; color:white; border:none; padding:12px; border-radius:5px; font-weight:bold; cursor:pointer;">Guardar en Supabase</button>
    `;

    // 4. Inyectarlo en el Body de WhatsApp
    document.body.appendChild(panel);

    // 5. Lógica de los botones
    document.getElementById('crm-btn-cerrar').onclick = () => {
        panel.remove();
    };

    // (El gran truco: Leer el DOM de WhatsApp para saber con quién hablamos)
    document.getElementById('crm-btn-detectar').onclick = () => {
        // WhatsApp guarda el nombre del chat activo en la etiqueta <header>
        // Buscamos el texto del header. (Nota: las clases de WhatsApp cambian, buscar por etiqueta html es más seguro para un MVP).
        const header = document.querySelector('header');
        if (header) {
            const nombre = header.innerText.split('\\n')[0]; // Coge la primera línea (el nombre o número)
            document.getElementById('crm-nombre-chat').innerText = nombre;
            // Aquí en el futuro harás un fetch a tu Supabase buscando este 'nombre' o 'número'
        } else {
            alert("Abre un chat primero.");
        }
    };

    document.getElementById('crm-btn-guardar').onclick = () => {
        const etiqueta = document.getElementById('crm-etiqueta').value;
        const nota = document.getElementById('crm-notas').value;
        const contacto = document.getElementById('crm-nombre-chat').innerText;
        alert(`\Guardando en Supabase...\\nContacto: \${contacto}\\nEtiqueta: \${etiqueta}\\nNota: \${nota}\``);
        // Aquí meterás tu código de supabase.from('clientes').insert(...)
    };
}