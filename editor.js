/* ============================================================================
   editor.js  —  OPTIONAL live content editor (Option B)
   ----------------------------------------------------------------------------
   Adds a pencil button (bottom-left) that opens an in-browser editor to
   add / edit / delete Services, Projects and Testimonials. Changes render
   instantly and persist to this browser via localStorage.

   • Edits here override the defaults in site-config.js for THIS browser only.
   • Use the "Export" tab to copy the JSON back into site-config.js to make
     changes permanent for everyone.
   • To remove this editor entirely, delete the <script src="editor.js"> line
     in index.html. The rest of the site keeps working.
   ============================================================================ */
(function () {
  "use strict";

  function start() {
    if (!window.HNC) { return setTimeout(start, 60); }   // wait for app.js
    const HNC = window.HNC;
    const cfg = HNC.cfg;

    /* ---- field schemas per collection ---- */
    const SCHEMAS = {
      services: [
        { key: "icon",        label: "Icon (Bootstrap Icon name)", type: "icon",     placeholder: "bi-wifi" },
        { key: "title",       label: "Title",                      type: "text",     required: true },
        { key: "description", label: "Description",                type: "textarea" },
        { key: "link",        label: "Button link",                type: "text",     placeholder: "#contact", default: "#contact" }
      ],
      projects: [
        { key: "category",    label: "Category",                   type: "category" },
        { key: "icon",        label: "Icon (used when no image)",  type: "icon",     placeholder: "bi-camera-video-fill" },
        { key: "image",       label: "Image URL (optional)",       type: "text",     placeholder: "assets/project.jpg" },
        { key: "title",       label: "Title",                      type: "text",     required: true },
        { key: "location",    label: "Location",                   type: "text",     placeholder: "City / Site" },
        { key: "description", label: "Description",                type: "textarea" },
        { key: "tech",        label: "Technologies (comma-separated)", type: "tags",  placeholder: "Cat6, PoE CCTV, VLAN" }
      ],
      testimonials: [
        { key: "name",     label: "Name",                 type: "text",     required: true },
        { key: "role",     label: "Role / Company",       type: "text",     placeholder: "Facilities Manager, Chennai" },
        { key: "initials", label: "Initials (optional)",  type: "text",     placeholder: "AB" },
        { key: "photo",    label: "Photo URL (optional)", type: "text",     placeholder: "assets/person.jpg" },
        { key: "quote",    label: "Quote",                type: "textarea", required: true }
      ]
    };
    const SINGULAR = { services: "service", projects: "project", testimonials: "testimonial" };
    const titleOf = (type, it) => type === "testimonials" ? (it.name || "Untitled") : (it.title || "Untitled");

    /* ---- escaping helpers ---- */
    const escAttr = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
    const escHtml = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    /* ---- persistence ---- */
    function persist() {
      HNC.saveContent({
        services: cfg.services.items,
        projects: cfg.projects.items,
        testimonials: cfg.testimonials.items
      });
    }

    /* ---- build FAB + modal ---- */
    const host = document.createElement("div");
    host.innerHTML = `
      <button class="ce-toggle" id="ceToggle" aria-label="Edit content"><i class="bi bi-pencil-square"></i></button>
      <div class="modal fade" id="ceModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content ce-content">
            <div class="modal-header">
              <h5 class="modal-title"><i class="bi bi-pencil-square me-2"></i>Content Editor</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <ul class="nav nav-pills ce-tabs mb-3">
                <li class="nav-item"><button class="nav-link active" data-tab="services">Services</button></li>
                <li class="nav-item"><button class="nav-link" data-tab="projects">Projects</button></li>
                <li class="nav-item"><button class="nav-link" data-tab="testimonials">Testimonials</button></li>
                <li class="nav-item"><button class="nav-link" data-tab="export"><i class="bi bi-download me-1"></i>Export</button></li>
              </ul>
              <div id="ceBody"></div>
            </div>
            <div class="modal-footer ce-footer">
              <small class="text-muted me-auto"><i class="bi bi-hdd me-1"></i>Saved to this browser</small>
              <button class="btn btn-sm btn-outline-danger" id="ceReset">Reset to defaults</button>
            </div>
          </div>
        </div>
      </div>`;
    document.body.appendChild(host);

    const modalEl = document.getElementById("ceModal");
    const modal = new bootstrap.Modal(modalEl);
    const body = document.getElementById("ceBody");
    const state = { tab: "services", editing: null };   // editing: null=list, -1=new, >=0 edit index

    document.getElementById("ceToggle").addEventListener("click", () => { state.tab = "services"; state.editing = null; setTab("services"); modal.show(); });

    host.querySelectorAll(".ce-tabs .nav-link").forEach((b) => {
      b.addEventListener("click", () => setTab(b.dataset.tab));
    });

    document.getElementById("ceReset").addEventListener("click", () => {
      if (!confirm("Reset Services, Projects and Testimonials back to the defaults in site-config.js? This clears your browser edits.")) return;
      HNC.saveContent(null);
      location.reload();
    });

    function setTab(tab) {
      state.tab = tab; state.editing = null;
      host.querySelectorAll(".ce-tabs .nav-link").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
      renderBody();
    }

    /* ---- body renderers ---- */
    function renderBody() {
      if (state.tab === "export") return renderExport();
      if (state.editing === null) return renderList(state.tab);
      return renderForm(state.tab, state.editing);
    }

    function renderList(type) {
      const items = cfg[type].items;
      const rows = items.map((it, i) => `
        <div class="ce-item">
          <span class="ce-item-ic"><i class="bi ${it.icon || (type === "testimonials" ? "bi-chat-quote" : "bi-card-text")}"></i></span>
          <span class="ce-title">${escHtml(titleOf(type, it))}</span>
          <button class="btn btn-sm btn-outline-secondary" data-edit="${i}"><i class="bi bi-pencil"></i></button>
          <button class="btn btn-sm btn-outline-danger" data-del="${i}"><i class="bi bi-trash"></i></button>
        </div>`).join("");

      body.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted small">${items.length} ${items.length === 1 ? SINGULAR[type] : type}</span>
          <button class="btn btn-cyan btn-sm" id="ceAdd"><i class="bi bi-plus-lg me-1"></i>Add ${SINGULAR[type]}</button>
        </div>
        <div class="ce-list">${rows || `<div class="text-muted small py-3">No items yet — add one.</div>`}</div>`;

      document.getElementById("ceAdd").addEventListener("click", () => { state.editing = -1; renderBody(); });
      body.querySelectorAll("[data-edit]").forEach((b) => b.addEventListener("click", () => { state.editing = +b.dataset.edit; renderBody(); }));
      body.querySelectorAll("[data-del]").forEach((b) => b.addEventListener("click", () => {
        const i = +b.dataset.del;
        if (!confirm(`Delete "${titleOf(type, cfg[type].items[i])}"?`)) return;
        cfg[type].items.splice(i, 1);
        persist(); HNC.refreshSection(type); renderBody();
      }));
    }

    function fieldInput(f, val) {
      const v = val == null ? (f.default || "") : val;
      if (f.type === "textarea")
        return `<textarea class="form-control ce-input" data-key="${f.key}" rows="3" placeholder="${escAttr(f.placeholder)}">${escHtml(v)}</textarea>`;
      if (f.type === "tags") {
        const s = Array.isArray(v) ? v.join(", ") : v;
        return `<input class="form-control ce-input" data-key="${f.key}" value="${escAttr(s)}" placeholder="${escAttr(f.placeholder)}">`;
      }
      if (f.type === "category") {
        const opts = cfg.projects.filters.filter((x) => x.key !== "all")
          .map((x) => `<option value="${x.key}" ${x.key === v ? "selected" : ""}>${escHtml(x.label)}</option>`).join("");
        return `<select class="form-select ce-input" data-key="${f.key}">${opts}</select>`;
      }
      if (f.type === "icon") {
        return `<div class="ce-icon-row">
          <span class="ce-icon-prev"><i class="bi ${escAttr(v) || "bi-square"}"></i></span>
          <input class="form-control ce-input ce-icon-input" data-key="${f.key}" value="${escAttr(v)}" placeholder="${escAttr(f.placeholder)}">
        </div>`;
      }
      return `<input class="form-control ce-input" data-key="${f.key}" value="${escAttr(v)}" placeholder="${escAttr(f.placeholder)}">`;
    }

    function renderForm(type, index) {
      const isNew = index === -1;
      const item = isNew ? {} : cfg[type].items[index];
      const fields = SCHEMAS[type].map((f) => `
        <div class="ce-field">
          <label>${f.label}${f.required ? ' <span style="color:#c0392b">*</span>' : ""}</label>
          ${fieldInput(f, item[f.key])}
        </div>`).join("");

      const iconHint = SCHEMAS[type].some((f) => f.type === "icon")
        ? `<div class="ce-hint">Browse icon names at <a href="https://icons.getbootstrap.com" target="_blank" rel="noopener">icons.getbootstrap.com</a></div>` : "";

      body.innerHTML = `
        <div class="d-flex align-items-center mb-3">
          <button class="btn btn-sm btn-link text-decoration-none p-0 me-2" id="ceBack"><i class="bi bi-arrow-left"></i> Back</button>
          <strong>${isNew ? "Add" : "Edit"} ${SINGULAR[type]}</strong>
        </div>
        <div id="ceErr" class="alert alert-danger py-2 px-3 small" style="display:none;"></div>
        ${fields}
        ${iconHint}
        <div class="d-flex gap-2 mt-3">
          <button class="btn btn-light btn-sm flex-fill" id="ceCancel">Cancel</button>
          <button class="btn btn-royal btn-sm flex-fill" id="ceSave"><i class="bi bi-check-lg me-1"></i>Save</button>
        </div>`;

      // live icon preview
      body.querySelectorAll(".ce-icon-input").forEach((inp) => {
        inp.addEventListener("input", () => {
          const i = inp.closest(".ce-icon-row").querySelector("i");
          i.className = "bi " + (inp.value.trim() || "bi-square");
        });
      });

      document.getElementById("ceBack").addEventListener("click", () => { state.editing = null; renderBody(); });
      document.getElementById("ceCancel").addEventListener("click", () => { state.editing = null; renderBody(); });
      document.getElementById("ceSave").addEventListener("click", () => saveForm(type, index));
    }

    function readForm(type) {
      const obj = {};
      body.querySelectorAll(".ce-input").forEach((inp) => {
        const key = inp.dataset.key;
        const schema = SCHEMAS[type].find((f) => f.key === key);
        let val = inp.value;
        if (schema && schema.type === "tags") val = val.split(",").map((s) => s.trim()).filter(Boolean);
        else val = val.trim();
        obj[key] = val;
      });
      // derive the category label from the chosen filter
      if (type === "projects") {
        const fil = cfg.projects.filters.find((f) => f.key === obj.category);
        obj.categoryLabel = fil ? fil.label : (obj.category || "");
      }
      return obj;
    }

    function saveForm(type, index) {
      const obj = readForm(type);
      const missing = SCHEMAS[type].filter((f) => f.required && !String(obj[f.key] || "").length);
      if (missing.length) {
        const err = document.getElementById("ceErr");
        err.style.display = "block";
        err.textContent = "Please fill: " + missing.map((f) => f.label).join(", ");
        return;
      }
      if (index === -1) cfg[type].items.push(obj);
      else cfg[type].items[index] = obj;
      persist();
      HNC.refreshSection(type);
      state.editing = null;
      renderBody();
    }

    /* ---------- production export helpers ---------- */
    function exportThemeMerged() {
      let saved = {};
      try { saved = JSON.parse(localStorage.getItem("hnctech_theme_overrides")) || {}; } catch (e) {}
      return Object.assign({}, cfg.theme, saved);
    }
    function buildConfigText() {
      const merged = JSON.parse(JSON.stringify(cfg));
      merged.theme = exportThemeMerged();   // bake current colours/fonts in
      const json = JSON.stringify(merged, null, 2);
      return "/* site-config.js — exported production content. Edit values to update the site. */\n" +
        "const siteConfig = " + json + ";\n\n" +
        'if (typeof window !== "undefined") { window.siteConfig = siteConfig; }\n' +
        'if (typeof module !== "undefined") { module.exports = siteConfig; }\n';
    }
    function transformIndexHtml(html) {
      // remove the content-editor script and force production mode (no customizer)
      html = html.replace(/\n?[ \t]*<script[^>]*src=["']editor\.js["'][^>]*>\s*<\/script>/gi, "");
      if (!/HNC_PRODUCTION/.test(html)) {
        html = html.replace(/(<script[^>]*src=["']site-config\.js["'][^>]*><\/script>)/i,
          '<script>window.HNC_PRODUCTION = true;</script>\n  $1');
      }
      return html;
    }
    function loadJSZip() {
      return new Promise((resolve, reject) => {
        if (window.JSZip) return resolve(window.JSZip);
        const s = document.createElement("script");
        s.src = "https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js";
        s.onload = () => resolve(window.JSZip);
        s.onerror = () => reject(new Error("couldn't load the ZIP library (this step needs internet)"));
        document.head.appendChild(s);
      });
    }
    async function zipFromFolder(files, statusEl) {
      const top = files[0].webkitRelativePath.split("/")[0] + "/";
      const rels = files.map((f) => f.webkitRelativePath.slice(top.length));
      if (rels.indexOf("index.html") === -1 || rels.indexOf("app.js") === -1) {
        statusEl.textContent = "That folder is missing index.html / app.js — pick the folder that contains the site files.";
        return;
      }
      statusEl.textContent = "Loading ZIP library…";
      const JSZip = await loadJSZip();
      const zip = new JSZip();
      statusEl.textContent = "Packaging files…";
      for (const f of files) {
        const rel = f.webkitRelativePath.slice(top.length);
        if (!rel) continue;
        if (rel === "editor.js") continue;                          // drop the content editor
        if (rel.indexOf("node_modules/") !== -1) continue;
        if (rel.split("/").some((p) => p.startsWith("."))) continue; // skip dotfiles/dirs
        if (/\.zip$/i.test(rel)) continue;
        if (rel === "site-config.js") { zip.file(rel, buildConfigText()); continue; }
        if (rel === "index.html")     { zip.file(rel, transformIndexHtml(await f.text())); continue; }
        zip.file(rel, await f.arrayBuffer());                        // styles.css, app.js, assets/*
      }
      statusEl.textContent = "Compressing…";
      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "hnctech-site-production.zip";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
      statusEl.innerHTML = '<span style="color:#1e7e34"><i class="bi bi-check-lg"></i> Downloaded <strong>hnctech-site-production.zip</strong> — unzip, then upload the files to Cloudflare Pages.</span>';
    }
    function pickFolderAndZip(statusEl) {
      const input = document.createElement("input");
      input.type = "file";
      input.webkitdirectory = true;
      input.style.display = "none";
      document.body.appendChild(input);
      input.addEventListener("change", async () => {
        const files = Array.from(input.files || []);
        input.remove();
        if (!files.length) return;
        try { await zipFromFolder(files, statusEl); }
        catch (e) { statusEl.textContent = "Export failed: " + (e.message || e); }
      });
      input.click();
    }

    function renderExport() {
      const json = JSON.stringify({
        services: cfg.services.items, projects: cfg.projects.items, testimonials: cfg.testimonials.items
      }, null, 2);
      body.innerHTML = `
        <div class="ce-prod">
          <h6 class="mb-1">Download production site (.zip)</h6>
          <p class="small text-muted mb-2">Builds an upload-ready ZIP with your current content &amp; colours baked in, and the editor / customizer removed. When the file picker opens, select the folder that contains <code>index.html</code>.</p>
          <button class="btn btn-royal btn-sm" id="ceZip"><i class="bi bi-file-earmark-zip me-1"></i>Build &amp; download ZIP</button>
          <div id="ceZipStatus" class="small mt-2 text-muted"></div>
        </div>
        <hr class="my-3">
        <p class="small text-muted mb-2">Or copy just the content JSON into <code>site-config.js</code> manually:</p>
        <div class="ce-export">
          <textarea readonly id="ceJson">${escHtml(json)}</textarea>
          <button class="btn btn-cyan btn-sm mt-2" id="ceCopy"><i class="bi bi-clipboard me-1"></i>Copy JSON</button>
        </div>`;
      document.getElementById("ceZip").addEventListener("click", () => pickFolderAndZip(document.getElementById("ceZipStatus")));
      document.getElementById("ceCopy").addEventListener("click", () => {
        const ta = document.getElementById("ceJson");
        ta.select();
        const done = (ok) => { const b = document.getElementById("ceCopy"); b.innerHTML = ok ? '<i class="bi bi-check-lg me-1"></i>Copied' : "Press Ctrl/Cmd+C"; setTimeout(() => b.innerHTML = '<i class="bi bi-clipboard me-1"></i>Copy JSON', 1500); };
        if (navigator.clipboard) navigator.clipboard.writeText(ta.value).then(() => done(true)).catch(() => done(false));
        else { try { document.execCommand("copy"); done(true); } catch (e) { done(false); } }
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
