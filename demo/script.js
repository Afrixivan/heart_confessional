document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initChat();
  initEmotionCalendar();
  initTest();
  initDiary();
  initBreathing();
});

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath.includes('index.html') && link.getAttribute('href') === './') ||
        (currentPath.includes('index.html') && link.getAttribute('href') === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initChat() {
  const chatContainer = document.querySelector('.chat-container');
  if (!chatContainer) return;

  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('send-btn');
  const messagesContainer = document.getElementById('chat-messages');
  const conversationItems = document.querySelectorAll('.conversation-item');

  const mockResponses = [
    '我很抱歉听到你这么说，你愿意和我分享更多吗？🌱',
    '听起来你最近遇到了一些挑战，我在这里陪伴你💝',
    '谢谢你愿意信任我，说出这些感受。你并不孤单✨',
    '我能感受到你现在的心情，让我们一起慢慢梳理🌿',
    '你的感受是真实且重要的，不要害怕表达它们💪',
    '有时候倾诉本身就是一种力量，你已经做得很棒了🌈',
    '我理解这种感觉，很多人都会有类似的经历🌻',
    '让我们一起看看有没有什么办法可以帮助你🌼'
  ];

  function addMessage(content, role) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.innerHTML = `
      <div class="message-content">${content}</div>
      <div class="message-time">${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}</div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingDiv;
  }

  function simulateTyping(responseText) {
    const typingIndicator = showTypingIndicator();
    let index = 0;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.innerHTML = '<div class="message-content"></div><div class="message-time"></div>';
    
    const interval = setInterval(() => {
      if (index < responseText.length) {
        messageDiv.querySelector('.message-content').textContent += responseText[index];
        index++;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      } else {
        clearInterval(interval);
        typingIndicator.remove();
        messageDiv.querySelector('.message-time').textContent = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 50);
  }

  function handleSend() {
    const content = chatInput.value.trim();
    if (!content) return;

    addMessage(content, 'user');
    chatInput.value = '';
    sendBtn.disabled = true;

    setTimeout(() => {
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      simulateTyping(response);
      sendBtn.disabled = false;
    }, 1000);
  }

  sendBtn.addEventListener('click', handleSend);
  
  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  conversationItems.forEach(item => {
    item.addEventListener('click', function() {
      conversationItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

function initEmotionCalendar() {
  const calendarGrid = document.querySelector('.calendar-grid');
  if (!calendarGrid) return;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const moodTypes = ['happy', 'sad', 'anxious', 'angry', 'neutral'];
  
  function createCalendar() {
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    
    days.forEach(day => {
      const header = document.createElement('div');
      header.className = 'calendar-day-header';
      header.textContent = day;
      calendarGrid.appendChild(header);
    });

    for (let i = 0; i < startDay; i++) {
      const emptyCell = document.createElement('div');
      calendarGrid.appendChild(emptyCell);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayCell = document.createElement('div');
      dayCell.className = 'calendar-day';
      dayCell.textContent = day;

      if (day === today.getDate()) {
        dayCell.classList.add('today');
      }

      if (Math.random() > 0.3) {
        const mood = moodTypes[Math.floor(Math.random() * moodTypes.length)];
        dayCell.classList.add('has-mood', `mood-${mood}`);
      }

      dayCell.addEventListener('click', function() {
        showMoodDetail(day);
      });

      calendarGrid.appendChild(dayCell);
    }
  }

  createCalendar();
}

function showMoodDetail(day) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">${new Date().getMonth() + 1}月${day}日 心情记录</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
      </div>
      <div class="form-group">
        <label>今日心情</label>
        <div style="display: flex; gap: 15px;">
          <button style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #FFE4E9; background: #C1FFC1; font-size: 24px;" class="mood-btn" onclick="selectMood(this)">😊</button>
          <button style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #FFE4E9; background: #E0F4FF; font-size: 24px;" class="mood-btn" onclick="selectMood(this)">😔</button>
          <button style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #FFE4E9; background: #FFD4DE; font-size: 24px;" class="mood-btn" onclick="selectMood(this)">😰</button>
          <button style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #FFE4E9; background: #FFE0E0; font-size: 24px;" class="mood-btn" onclick="selectMood(this)">😠</button>
          <button style="width: 50px; height: 50px; border-radius: 50%; border: 2px solid #FFE4E9; background: #F0F0F0; font-size: 24px;" class="mood-btn" onclick="selectMood(this)">😐</button>
        </div>
      </div>
      <div class="form-group">
        <label>心情记录</label>
        <textarea placeholder="记录一下今天的心情..."></textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">取消</button>
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">保存</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

window.selectMood = function(btn) {
  document.querySelectorAll('.mood-btn').forEach(b => b.style.borderColor = '#FFE4E9');
  btn.style.borderColor = '#FFB7C5';
};

function initTest() {
  const testCards = document.querySelectorAll('.test-card');
  const questionContainer = document.getElementById('question-container');
  const resultContainer = document.getElementById('result-container');
  
  if (testCards.length > 0) {
    testCards.forEach(card => {
      card.addEventListener('click', function() {
        startTest(this.dataset.testId);
      });
    });
  }
}

function startTest(testId) {
  const questions = [
    { id: 1, text: '最近一周，你是否经常感到紧张或焦虑？', options: ['没有或很少', '偶尔', '经常', '总是'] },
    { id: 2, text: '你是否觉得难以放松或休息？', options: ['没有或很少', '偶尔', '经常', '总是'] },
    { id: 3, text: '你是否容易感到疲劳或精力不足？', options: ['没有或很少', '偶尔', '经常', '总是'] },
    { id: 4, text: '你是否经常担心未来的事情？', options: ['没有或很少', '偶尔', '经常', '总是'] },
    { id: 5, text: '你是否觉得自己比平时更容易生气或烦躁？', options: ['没有或很少', '偶尔', '经常', '总是'] }
  ];

  let currentQuestion = 0;
  const answers = {};

  function renderQuestion() {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    
    questionContainer.innerHTML = `
      <div class="test-progress">
        <div class="progress-bar" style="width: ${progress}%"></div>
      </div>
      <div class="question-card">
        <div class="question-number">第 ${currentQuestion + 1} / ${questions.length} 题</div>
        <div class="question-text">${question.text}</div>
        <div class="options-list">
          ${question.options.map((option, idx) => `
            <div class="option-item" onclick="selectOption(${idx})" id="option-${idx}">
              ${option}
            </div>
          `).join('')}
        </div>
      </div>
      <div class="test-nav">
        <button class="test-btn test-btn-secondary" onclick="prevQuestion()" ${currentQuestion === 0 ? 'disabled' : ''}>上一题</button>
        <button class="test-btn test-btn-primary" onclick="nextQuestion()">
          ${currentQuestion === questions.length - 1 ? '提交测试' : '下一题'}
        </button>
      </div>
    `;

    if (answers[question.id] !== undefined) {
      document.getElementById(`option-${answers[question.id]}`).classList.add('selected');
    }
  }

  window.selectOption = function(idx) {
    document.querySelectorAll('.option-item').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`option-${idx}`).classList.add('selected');
    answers[questions[currentQuestion].id] = idx;
  };

  window.prevQuestion = function() {
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  };

  window.nextQuestion = function() {
    if (answers[questions[currentQuestion].id] === undefined) {
      alert('请先选择一个答案');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showTestResult();
    }
  };

  renderQuestion();
}

function showTestResult() {
  const questionContainer = document.getElementById('question-container');
  const resultContainer = document.getElementById('result-container');
  
  questionContainer.innerHTML = '';
  
  const totalScore = Object.values(answers || {}).reduce((sum, val) => sum + val, 0);
  let level, description, suggestions;
  
  if (totalScore <= 5) {
    level = '正常';
    description = '你的情绪状态良好，继续保持积极的生活态度！';
    suggestions = ['保持规律作息', '继续坚持运动', '保持社交活动'];
  } else if (totalScore <= 10) {
    level = '轻度焦虑';
    description = '你可能有一些轻微的焦虑情绪，可以尝试一些放松技巧来缓解。';
    suggestions = ['尝试深呼吸练习', '进行正念冥想', '培养兴趣爱好'];
  } else if (totalScore <= 15) {
    level = '中度焦虑';
    description = '你的焦虑情绪较为明显，建议采取积极的应对措施。';
    suggestions = ['寻求朋友家人的支持', '尝试写情绪日记', '考虑咨询专业人士'];
  } else {
    level = '重度焦虑';
    description = '你的焦虑情绪比较严重，建议尽快寻求专业帮助。';
    suggestions = ['联系心理咨询师', '拨打心理援助热线', '与学校心理中心联系'];
  }

  resultContainer.innerHTML = `
    <div class="result-card">
      <div class="result-icon">📊</div>
      <div class="result-score">${totalScore}分</div>
      <div class="result-level">${level}</div>
      <div class="result-description">${description}</div>
      <div class="result-suggestions">
        <h4>💡 建议：</h4>
        <ul>
          ${suggestions.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <button class="btn btn-primary" onclick="location.reload()">再测一次</button>
    </div>
  `;
}

let answers = {};

function initDiary() {
  const diaryCards = document.querySelectorAll('.diary-card');
  const addDiaryBtn = document.getElementById('add-diary-btn');

  if (addDiaryBtn) {
    addDiaryBtn.addEventListener('click', function() {
      showAddDiaryModal();
    });
  }

  diaryCards.forEach(card => {
    card.addEventListener('click', function() {
      showDiaryDetail(this);
    });
  });
}

function showAddDiaryModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3 class="modal-title">写日记</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
      </div>
      <div class="form-group">
        <label>标题</label>
        <input type="text" placeholder="给日记起个标题...">
      </div>
      <div class="form-group">
        <label>心情标签</label>
        <select>
          <option value="happy">😊 开心</option>
          <option value="sad">😔 难过</option>
          <option value="anxious">😰 焦虑</option>
          <option value="angry">😠 生气</option>
          <option value="neutral">😐 平静</option>
        </select>
      </div>
      <div class="form-group">
        <label>分类</label>
        <select>
          <option value="daily">日常生活</option>
          <option value="study">学业压力</option>
          <option value="relationship">人际关系</option>
          <option value="emotion">情绪记录</option>
          <option value="other">其他</option>
        </select>
      </div>
      <div class="form-group">
        <label>内容</label>
        <textarea placeholder="记录今天的心情..."></textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">取消</button>
        <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">保存日记</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function showDiaryDetail(card) {
  const title = card.querySelector('.diary-title').textContent;
  const content = card.querySelector('.diary-content').textContent;
  const date = card.querySelector('.diary-date').textContent;
  const emotionTag = card.querySelector('.diary-emotion-tag').textContent;
  
  const modal = document.createElement('div');
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal" style="max-width: 600px;">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">&times;</button>
      </div>
      <div style="display: flex; gap: 15px; margin-bottom: 20px;">
        <span class="diary-emotion-tag ${card.querySelector('.diary-emotion-tag').className.split(' ')[1]}">${emotionTag}</span>
        <span style="font-size: 13px; color: #999;">${date}</span>
      </div>
      <div style="color: #666; line-height: 1.8; white-space: pre-wrap;">${content}</div>
      <div class="form-actions" style="margin-top: 30px;">
        <button class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">关闭</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

function initBreathing() {
  const breathingBtn = document.getElementById('start-breathing');
  const stopBtn = document.getElementById('stop-breathing');
  const circle = document.getElementById('breathing-circle');
  const instruction = document.getElementById('breathing-instruction');

  let isBreathing = false;
  let phase = 'inhale';
  
  function runBreathingCycle() {
    if (!isBreathing) return;

    switch(phase) {
      case 'inhale':
        circle.className = 'breathing-circle inhale';
        instruction.textContent = '吸气...';
        phase = 'hold';
        setTimeout(runBreathingCycle, 4000);
        break;
      case 'hold':
        circle.className = 'breathing-circle hold';
        instruction.textContent = '保持...';
        phase = 'exhale';
        setTimeout(runBreathingCycle, 4000);
        break;
      case 'exhale':
        circle.className = 'breathing-circle exhale';
        instruction.textContent = '呼气...';
        phase = 'inhale';
        setTimeout(runBreathingCycle, 4000);
        break;
    }
  }

  if (breathingBtn) {
    breathingBtn.addEventListener('click', function() {
      isBreathing = true;
      phase = 'inhale';
      runBreathingCycle();
      breathingBtn.style.display = 'none';
      stopBtn.style.display = 'inline-block';
    });
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', function() {
      isBreathing = false;
      circle.className = 'breathing-circle';
      instruction.textContent = '准备开始';
      stopBtn.style.display = 'none';
      breathingBtn.style.display = 'inline-block';
    });
  }
}

function initCharts() {
  const chartContainers = document.querySelectorAll('.chart-container');
  
  chartContainers.forEach(container => {
    if (container.id === 'trend-chart') {
      renderTrendChart(container);
    } else if (container.id === 'radar-chart') {
      renderRadarChart(container);
    }
  });
}

function renderTrendChart(container) {
  const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const data = [6, 5, 7, 4, 6, 8, 5];
  
  const maxValue = Math.max(...data);
  const barWidth = 60;
  const chartHeight = 250;
  const padding = 40;
  
  let html = '<svg width="100%" height="100%" viewBox="0 0 500 300">';
  
  for (let i = 0; i <= 10; i++) {
    const y = padding + (chartHeight / 10) * i;
    html += `<line x1="${padding}" y1="${y}" x2="${500 - padding}" y2="${y}" stroke="#FFE4E9" stroke-width="1"/>`;
    html += `<text x="${padding - 10}" y="${y + 4}" font-size="12" fill="#999" text-anchor="end">${10 - i}</text>`;
  }
  
  days.forEach((day, idx) => {
    const x = padding + idx * ((500 - 2 * padding) / days.length) + barWidth / 2;
    html += `<text x="${x}" y="${300 - 10}" font-size="12" fill="#666" text-anchor="middle">${day}</text>`;
  });
  
  data.forEach((value, idx) => {
    const x = padding + idx * ((500 - 2 * padding) / days.length);
    const height = (value / maxValue) * chartHeight;
    const y = 300 - padding - height;
    
    html += `<rect x="${x}" y="${y}" width="${barWidth}" height="${height}" rx="8" ry="8" fill="url(#gradient1)"/>`;
  });
  
  html += '<defs><linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#FFB7C5"/><stop offset="100%" stop-color="#FF8BA3"/></linearGradient></defs>';
  html += '</svg>';
  
  container.innerHTML = html;
}

function renderRadarChart(container) {
  const categories = ['焦虑', '抑郁', '压力', '快乐', '平静', '活力'];
  const data = [6, 4, 7, 5, 5, 4];
  
  const centerX = 250;
  const centerY = 150;
  const radius = 100;
  
  let html = '<svg width="100%" height="100%" viewBox="0 0 500 300">';
  
  for (let level = 1; level <= 5; level++) {
    const r = (radius / 5) * level;
    html += `<circle cx="${centerX}" cy="${centerY}" r="${r}" fill="none" stroke="#FFE4E9" stroke-width="1"/>`;
  }
  
  categories.forEach((cat, idx) => {
    const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    html += `<line x1="${centerX}" y1="${centerY}" x2="${x}" y2="${y}" stroke="#FFE4E9" stroke-width="1"/>`;
    html += `<text x="${x}" y="${y + 5}" font-size="12" fill="#666" text-anchor="middle">${cat}</text>`;
  });
  
  let points = '';
  data.forEach((value, idx) => {
    const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2;
    const r = (radius / 10) * value;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    points += `${x},${y} `;
  });
  
  html += `<polygon points="${points.trim()}" fill="rgba(255, 183, 197, 0.3)" stroke="#FFB7C5" stroke-width="2"/>`;
  
  data.forEach((value, idx) => {
    const angle = (Math.PI * 2 * idx) / categories.length - Math.PI / 2;
    const r = (radius / 10) * value;
    const x = centerX + r * Math.cos(angle);
    const y = centerY + r * Math.sin(angle);
    html += `<circle cx="${x}" cy="${y}" r="4" fill="#FF8BA3"/>`;
  });
  
  html += '</svg>';
  
  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', function() {
  initCharts();
});