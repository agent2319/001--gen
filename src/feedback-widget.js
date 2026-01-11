(function() {
  try {
    var config = JSON.parse(decodeURIComponent(escape(atob("eyJpZCI6IncteWticGZkeWRwIiwibmFtZSI6IkRlZmF1bHQgV2lkZ2V0IiwidGl0bGUiOiJOZWVkIGhlbHA/IiwiZGVzY3JpcHRpb24iOiJDaG9vc2UgeW91ciBwcmVmZXJyZWQgY29udGFjdCBtZXRob2QgYW5kIHdlIHdpbGwgZ2V0IGJhY2sgdG8geW91LiIsImNoYW5uZWxzIjpbeyJ0eXBlIjoidGVsZWdyYW0iLCJsYWJlbCI6IlRlbGVncmFtIiwiZW5hYmxlZCI6dHJ1ZSwicGxhY2Vob2xkZXIiOiJ1c2VybmFtZSIsImljb25Nb2RlIjoiZGVmYXVsdCJ9LHsidHlwZSI6IndoYXRzYXBwIiwibGFiZWwiOiJXaGF0c0FwcCIsImVuYWJsZWQiOnRydWUsInBsYWNlaG9sZGVyIjoiNzkwMDEyMzQ1NjciLCJpY29uTW9kZSI6ImRlZmF1bHQifSx7InR5cGUiOiJnbWFpbCIsImxhYmVsIjoiR21haWwiLCJlbmFibGVkIjp0cnVlLCJwbGFjZWhvbGRlciI6InlvdXJuYW1lIiwiaWNvbk1vZGUiOiJkZWZhdWx0In0seyJ0eXBlIjoicHJvdG9uIiwibGFiZWwiOiJQcm90b24gTWFpbCIsImVuYWJsZWQiOnRydWUsInBsYWNlaG9sZGVyIjoieW91cm5hbWUiLCJpY29uTW9kZSI6ImRlZmF1bHQifV0sInRoZW1lQ29sb3IiOiIjMWUyOTNiIiwicG9zaXRpb24iOiJib3R0b20tcmlnaHQiLCJjcmVhdGVkQXQiOjE3NjgwODk3NTY2NjcsIndpZGdldEljb25Nb2RlIjoiZGVmYXVsdCIsIndpZGdldFNpemUiOjg2LCJ3aWRnZXRPdXRsaW5lV2lkdGgiOjAsIndpZGdldE91dGxpbmVDb2xvciI6IiMwMDAwMDAiLCJ3aWRnZXRCb3JkZXJSYWRpdXMiOjQwLCJiYWNrZ3JvdW5kVHlwZSI6InNvbGlkIiwidGhlbWVHcmFkaWVudCI6ImxpbmVhci1ncmFkaWVudCgxMzVkZWcsICM2MzY2ZjEgMCUsICNhODU1ZjcgMTAwJSkiLCJwYW5lbFN0eWxlIjoiZGFyayIsInBhbmVsV2lkdGgiOjQwMCwiZGVzY3JpcHRpb25Sb3dzIjoyLCJoZWFkZXJCZ092ZXJyaWRlIjoiIzAwMDAwMCIsImNhcmRUZXh0T3ZlcnJpZGUiOiIjMzY1YThjIiwiY2hhdElkIjoiNzcxMzg2MzM3IiwiYm90VG9rZW4iOiI4MDI3MDQ5NTE3OkFBSGZzSjQxOFRoN2tPSkN1RHJDTERZRXRIdnNPanpTUENvIn0="))));
    
    // --- Styles ---
    if (!document.querySelector('link[href*="font-awesome"]')) {
      var fa = document.createElement('link'); fa.rel = 'stylesheet';
      fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
      document.head.appendChild(fa);
    }
    if (!document.querySelector('script[src*="tailwindcss"]')) {
      var tw = document.createElement('script'); tw.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(tw);
    }

    var root = document.createElement('div');
    root.id = 'feedback-hub-root';
    document.body.appendChild(root);

    // --- Helpers ---
    var getIconClass = function(type) {
        if (type === 'gmail') return 'fa-brands fa-google';
        if (type === 'proton') return 'fa-solid fa-envelope';
        if (type === 'telegram') return 'fa-brands fa-telegram';
        if (type === 'whatsapp') return 'fa-brands fa-whatsapp';
        return 'fa-brands fa-' + type;
    };

    var getChannelColor = function(type) {
        if (type === 'telegram') return 'bg-sky-500';
        if (type === 'whatsapp') return 'bg-emerald-500';
        if (type === 'gmail') return 'bg-red-500';
        if (type === 'proton') return 'bg-purple-600';
        return 'bg-slate-500';
    };

    setTimeout(function() {
      try {
        var channelsHtml = config.channels.filter(function(c) { return c.enabled; }).map(function(c) {
            return `
              <button onclick="window.hubGoToStep2('${c.type}')" 
                 class="flex flex-col items-center justify-center p-5 rounded-2xl border transition-all group bg-white border-slate-100 hover:bg-indigo-50"
                 style="aspect-ratio: 1 / 1;">
                 <div class="w-12 h-12 rounded-2xl ${getChannelColor(c.type)} text-white flex items-center justify-center text-xl mb-3 shadow-md group-hover:scale-110 transition-transform overflow-hidden">
                    ${c.iconMode === 'custom' && c.customIconUrl 
                        ? `<img src="${c.customIconUrl}" class="w-full h-full object-cover">`
                        : `<i class="${getIconClass(c.type)}"></i>`
                    }
                 </div>
                 <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 w-full truncate px-1">${c.label}</span>
              </button>
            `;
        }).join('');

        root.innerHTML = `
          <div style="position:fixed; bottom:20px; right:20px; z-index:2147483647; font-family: sans-serif;">
            
            <button id="hub-trigger" class="shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-white cursor-pointer" 
                    style="width:${config.widgetSize}px; height:${config.widgetSize}px; border-radius:${config.widgetBorderRadius}px; background:${config.backgroundType === 'gradient' ? config.themeGradient : config.themeColor};">
              ${config.widgetIconMode === 'custom' && config.customWidgetIconUrl 
                ? `<img src="${config.customWidgetIconUrl}" style="width:50%; height:50%; object-fit:contain;">`
                : `<i class="fa-solid fa-comments" style="font-size:24px;"></i>`
              }
            </button>

            <div id="hub-panel" class="hidden absolute bottom-full right-0 mb-4 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col" style="width:${config.panelWidth || 340}px;">
              
              <div class="p-6 text-white relative" style="background:${config.headerBgOverride || (config.backgroundType === 'gradient' ? config.themeGradient : config.themeColor)}">
                 <h3 class="font-bold text-xl mb-1">${config.title}</h3>
                 <p class="text-sm opacity-90">${config.description}</p>
                 <button id="hub-close" class="absolute top-4 right-4 text-white/80 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
              </div>

              <div class="p-5" style="background:${config.bodyBgOverride || '#f8fafc'}; min-height: 200px;">
                
                <div id="hub-step-1" class="grid grid-cols-2 gap-4 animate-[fadeIn_0.3s_ease-out]">
                    ${channelsHtml}
                </div>

                <div id="hub-step-2" class="hidden flex-col animate-[slideIn_0.3s_ease-out]">
                    <div class="flex items-center gap-3 mb-6">
                        <button onclick="window.hubGoToStep1()" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                            <i class="fa-solid fa-chevron-left text-xs"></i>
                        </button>
                        <span id="hub-step-2-title" class="text-sm font-bold uppercase tracking-tight text-slate-800">CHANNEL</span>
                    </div>
                    
                    <div class="space-y-3">
                        <div id="hub-input-container"></div>
                        <textarea id="hub-message" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="How can we help?"></textarea>
                        <button id="hub-send-btn" class="w-full py-4 rounded-xl text-white font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                                style="background:${config.backgroundType === 'gradient' ? config.themeGradient : config.themeColor}; margin-top: 1rem;">
                            <span>Submit Now</span>
                            <i class="fa-solid fa-paper-plane text-xs"></i>
                        </button>
                    </div>
                </div>

                <div id="hub-step-3" class="hidden flex-col items-center justify-center text-center py-4 animate-[zoomIn_0.3s_ease-out]">
                    <div class="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-4xl mb-6 border border-emerald-100">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <h4 class="font-black text-xl text-slate-900 mb-2">Message Sent!</h4>
                    <p class="text-sm text-slate-500 max-w-[200px] leading-relaxed mx-auto">Our team has been notified. We'll be in touch very soon.</p>
                    <button onclick="window.hubGoToStep1()" class="mt-8 px-6 py-2.5 rounded-full border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">Send Another</button>
                </div>

              </div>
            </div>
          </div>`;
          
        // --- LOGIC ---
        var trigger = document.getElementById('hub-trigger');
        var panel = document.getElementById('hub-panel');
        var closeBtn = document.getElementById('hub-close');
        
        var step1 = document.getElementById('hub-step-1');
        var step2 = document.getElementById('hub-step-2');
        var step3 = document.getElementById('hub-step-3');
        var inputContainer = document.getElementById('hub-input-container');
        
        var titleLabel = document.getElementById('hub-step-2-title');
        var sendBtn = document.getElementById('hub-send-btn');
        var currentChannel = '';

        window.hubGoToStep1 = function() {
            step1.classList.remove('hidden'); step1.style.display = 'grid';
            step2.classList.add('hidden'); step2.style.display = 'none';
            step3.classList.add('hidden'); step3.style.display = 'none';
            document.getElementById('hub-message').value = '';
        };

        // ФУНКЦИЯ ОЧИСТКИ ВВОДА (Smart Input)
        window.hubHandleInput = function(el, type) {
            var val = el.value;
            if(type === 'gmail' || type === 'proton') {
                // Убираем @ и домен, если пользователь пытается их ввести
                el.value = val.split('@')[0].toLowerCase().replace(/[^a-z0-9._-]/g, '');
            } else if(type === 'whatsapp') {
                // Оставляем только цифры
                el.value = val.replace(/\D/g, '');
            } else if (type === 'telegram') {
                 // Убираем @ в начале, так как он уже есть в префиксе
                 el.value = val.replace(/@/g, '');
            }
        };

        window.hubGoToStep2 = function(channel) {
            currentChannel = channel;
            step1.classList.add('hidden'); step1.style.display = 'none';
            step2.classList.remove('hidden'); step2.style.display = 'flex';
            
            titleLabel.innerText = channel.toUpperCase();
            
            var prefix = '';
            var suffix = '';
            var placeholder = 'Contact info';
            
            if(channel === 'gmail') { suffix = '@gmail.com'; placeholder = 'username'; }
            else if(channel === 'proton') { suffix = '@proton.me'; placeholder = 'username'; }
            else if(channel === 'telegram') { prefix = '@'; placeholder = 'username'; }
            else if(channel === 'whatsapp') { prefix = '+'; placeholder = '7900...'; }

            // Вставляем HTML с привязкой oninput
            inputContainer.innerHTML = `
                <div class="flex items-center w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
                    ${prefix ? `<span class="text-slate-400 font-bold mr-1 select-none">${prefix}</span>` : ''}
                    <input type="text" id="hub-contact" oninput="window.hubHandleInput(this, '${channel}')" class="bg-transparent outline-none text-sm font-medium text-slate-700 flex-1 w-full" placeholder="${placeholder}">
                    ${suffix ? `<span id="hub-suffix" class="text-slate-400 font-semibold select-none ml-1">${suffix}</span>` : ''}
                </div>
            `;
            
            setTimeout(() => document.getElementById('hub-contact').focus(), 100);
        };

        var toggle = function() { 
            panel.classList.toggle('hidden'); 
            if(panel.classList.contains('hidden')) { setTimeout(window.hubGoToStep1, 300); }
        };
        if(trigger) trigger.onclick = toggle;
        if(closeBtn) closeBtn.onclick = toggle;

        if(sendBtn) {
            sendBtn.onclick = async function() {
                var contactInput = document.getElementById('hub-contact');
                var rawValue = contactInput.value;
                var suffixEl = document.getElementById('hub-suffix');
                
                var prefix = (currentChannel === 'telegram') ? '@' : (currentChannel === 'whatsapp' ? '+' : '');
                var suffix = suffixEl ? suffixEl.innerText : '';
                
                var fullContact = prefix + rawValue + suffix;
                var message = document.getElementById('hub-message').value;

                if(!rawValue || !message) {
                    alert('Please fill in all fields');
                    return;
                }

                var originalContent = sendBtn.innerHTML;
                sendBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                sendBtn.disabled = true;

                try {
                    var text = `🔥 <b>New Lead from Website</b>\n\n📣 <b>Channel:</b> ${currentChannel.toUpperCase()}\n👤 <b>Contact:</b> ${fullContact}\n💬 <b>Message:</b> ${message}`;
                    
                    var response = await fetch("https://api.telegram.org/bot" + config.botToken + "/sendMessage", {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            chat_id: config.chatId,
                            text: text,
                            parse_mode: 'HTML'
                        })
                    });

                    if(response.ok) {
                        step2.classList.add('hidden'); step2.style.display = 'none';
                        step3.classList.remove('hidden'); step3.style.display = 'flex';
                    } else {
                        throw new Error('Telegram API Error');
                    }
                } catch (e) {
                    alert('Error sending message: ' + e.message);
                } finally {
                    sendBtn.innerHTML = originalContent;
                    sendBtn.disabled = false;
                }
            };
        }
      } catch (err) {
        console.error('Widget Render Error:', err);
      }
    }, 500);

  } catch (err) {
    console.error('Widget Init Error:', err);
    alert('Widget Error: ' + err.message);
  }
})();