# 心灵树洞 - Web智能体技术开发指南

---

## 【文档信息】

- **文档版本**：v2.0
- **创建日期**：2026-07-17
- **适用项目**：心灵树洞Web智能体
- **目标读者**：前端开发工程师、后端开发工程师、产品经理

---

## 【项目概述】

### 项目定位
心灵树洞是一款面向**大学生群体**的心理健康智能陪伴与成长助手，专注于为18-25岁在校大学生提供7×24小时的情绪倾诉陪伴、CBT结构化引导、情绪追踪分析等服务。我们聚焦大学生常见的心理困扰，做深做精核心功能，打造专业、温暖、有效的心理健康支持平台。

### 核心价值
- **安全私密的情绪宣泄空间**：为大学生提供匿名、安全的倾诉环境
- **CBT结构化心理引导**：基于认知行为疗法的专业心理疏导
- **智能情绪追踪分析**：通过AI技术记录和分析用户情绪变化趋势
- **专业危机干预支持**：在用户遇到危机时提供及时的干预和支持
- **个性化成长方案**：根据用户情况提供针对性的心理成长建议

### 目标用户
- **年龄范围**：18-25岁在校大学生
- **用户特征**：面临学业压力、人际关系、情感问题、就业焦虑等心理困扰的大学生
- **核心需求**：情绪倾诉、压力管理、心理调节、成长支持

### 差异化亮点
- **情绪日记自动生成**：基于对话内容自动生成情绪日记，减轻用户记录负担
- **CBT自助训练营**：提供结构化的认知行为疗法训练课程，帮助用户自助调节
- **RAG知识库检索**：精准检索专业心理学知识，提供科学的心理科普

---

## 【功能需求分析】

### 一、核心功能模块（三大核心）

#### 1. 对话陪伴（核心）
- **功能描述**：提供安全私密的情绪宣泄空间，通过共情倾听和引导性回应帮助用户梳理情绪，是整个系统的核心交互入口
- **核心能力**：
  - 多轮对话上下文管理（基于对话状态机）
  - 共情式回应生成（LLM调用）
  - RAG知识库检索（精准匹配专业心理学知识）
  - 用户情绪状态感知（实时情绪分析）
  - 风险语义识别（危机关键词检测与分级响应）
  - 流式打字输出效果（模拟真人打字）
  - 对话状态机管理（跟踪对话阶段和用户状态）

#### 2. CBT结构化引导（核心）
- **功能描述**：基于认知行为疗法（CBT）提供结构化的心理引导，帮助用户识别和改变负面思维模式
- **核心能力**：
  - CBT认知重构引导（识别负面思维→替代理性思维→验证依据）
  - 标准化心理量表评估（焦虑自评量表SAS、抑郁自评量表SDS等）
  - 放松练习指导（4-7-8呼吸法、正念冥想等）
  - 压力场景分析与应对策略（考前焦虑、学业压力、人际关系等）
  - 正向Affirmations模板（每日正向语句）
  - 风险分级响应（低/中/高/危机四级响应）

#### 3. 情绪追踪分析（核心）
- **功能描述**：通过记录用户情绪状态，生成周期性分析报告，帮助用户了解自身情绪变化趋势
- **核心能力**：
  - 情绪趋势图表（折线图、柱状图）
  - 情绪雷达图（多维度情绪分布）
  - 心情日历（每日情绪记录可视化）
  - 周期性报告生成（周报告、月报告、自定义时间段）
  - 情绪自动记录（基于对话内容自动分析记录）
  - 个性化成长建议（基于分析结果提供针对性建议）

### 二、创新功能模块（差异化亮点）

#### 4. 情绪日记自动生成（创新点）
- **功能描述**：基于对话内容自动生成情绪日记，减轻用户记录负担，让用户专注于倾诉本身
- **核心能力**：
  - 对话内容摘要提取（自动提取关键信息）
  - 情绪标签自动生成（基于AI情绪分析）
  - 日记内容自动撰写（生成结构化日记）
  - 日记分类管理（按情绪类型、主题分类）
  - 日记搜索功能（关键词搜索）
  - 日记导出（支持PDF、Markdown格式）

#### 5. CBT自助训练营（创新点）
- **功能描述**：提供结构化的认知行为疗法训练课程，帮助用户进行自助心理调节
- **核心能力**：
  - 训练课程管理（模块化课程设计）
  - 进度追踪（记录学习进度）
  - 练习打卡（每日练习任务）
  - 效果评估（定期评估训练效果）
  - 社交互动（训练营社区交流）

### 三、辅助功能模块

#### 6. 心理知识科普
- **功能描述**：通过RAG知识库检索提供科学易懂的心理学知识
- **核心能力**：
  - 知识卡片展示（结构化知识输出）
  - 话题关键词检索（基于RAG精准检索）
  - 知识条目推荐（根据用户情绪和需求推荐）
  - 专业背书说明（引用权威心理学资料）

### 四、交互功能需求

#### 1. 多轮对话上下文
- 支持连续对话，保持对话上下文理解
- 自动识别对话主题切换
- 支持对话历史回顾
- 对话状态机管理（跟踪对话阶段）

#### 2. 对话历史保存
- 本地存储对话历史
- 支持按时间排序查看
- 支持对话历史搜索
- 支持删除单条或全部对话

#### 3. 流式打字输出
- 模拟真人打字效果
- 支持打字速度调节
- 支持暂停/继续打字

#### 4. 消息状态指示
- 正在输入状态提示
- 消息发送状态反馈
- 网络状态提示

### 五、用户认证需求

- **默认匿名访问**：无需注册即可使用核心功能
- **可选注册登录**：支持用户注册以保存数据到服务器
- **数据同步**：登录后可同步多设备数据
- **数据导出**：支持用户导出个人数据

---

## 【UI设计规范】

### 一、设计风格

#### 1. 整体风格
- **主题**：温暖治愈风
- **色调**：柔和的暖色调为主（浅粉色、淡紫色、薄荷绿等）
- **设计元素**：圆润的边角、渐变背景、温馨的图标和插画
- **字体**：柔和的无衬线字体，阅读舒适

#### 2. 视觉元素
- **主色调**：#FFB7C5（浅粉色）
- **辅助色**：#E6E6FA（淡紫色）、#98FB98（薄荷绿）
- **背景色**：#FFF5F5（浅粉背景）
- **文字色**：#333333（深灰色）、#666666（中灰色）

### 二、页面布局

#### 1. 首页布局
- **顶部导航**：品牌Logo、功能入口快捷按钮
- **主体区域**：欢迎语、功能模块入口卡片
- **底部区域**：版权信息、服务条款、隐私政策

#### 2. 对话页面布局
- **左侧边栏**：功能菜单、对话历史列表
- **中间区域**：对话消息列表（支持上下滑动）
- **底部区域**：输入框、快捷功能按钮、发送按钮

#### 3. 情绪分析页面布局
- **顶部区域**：时间范围选择器
- **主体区域**：情绪趋势图表、雷达图、心情日历
- **底部区域**：分析报告详情、成长建议

### 三、交互设计

#### 1. 动画效果
- 页面切换平滑过渡
- 卡片悬停微动效
- 消息气泡淡入效果
- 打字机光标闪烁

#### 2. 响应式设计
- 适配桌面端（1200px+）
- 适配平板端（768px-1199px）
- 适配移动端（<768px）

---

## 【系统架构设计】

### 一、整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                      用户浏览器                              │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────┐    │
│  │   React     │  │  Redux      │  │    Axios/WebSocket│    │
│  │   前端应用   │  │   状态管理   │  │    网络请求层      │    │
│  └──────┬──────┘  └──────┬──────┘  └────────┬──────────┘    │
└─────────┼────────────────┼──────────────────┼────────────────┘
          │                │                  │
          ▼                ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    网络层 (HTTPS/WSS)                        │
└─────────────────────────────────────────────────────────────┘
          │                │                  │
          ▼                ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                      后端服务 (Express)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────┐    │
│  │  API路由层   │  │  业务逻辑层  │  │    AI服务层       │    │
│  └──────┬──────┘  └──────┬──────┘  └────────┬──────────┘    │
└─────────┼────────────────┼──────────────────┼────────────────┘
          │                │                  │
          ▼                ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                    数据存储层                                 │
│  ┌───────────────────┐  ┌───────────────────┐              │
│  │   MongoDB         │  │   Redis           │              │
│  │   主数据库        │  │   缓存/会话存储    │              │
│  └───────────────────┘  └───────────────────┘              │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                  外部API服务                                  │
│  ┌───────────────────┐  ┌───────────────────┐              │
│  │   大模型API        │  │   其他第三方服务    │              │
│  └───────────────────┘  └───────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

### 二、技术栈选择

#### 前端技术栈
| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | React | 18+ | 前端应用框架 |
| 状态管理 | Redux Toolkit | 2.0+ | 全局状态管理 |
| 路由 | React Router | 6.0+ | 页面路由管理 |
| UI组件 | Ant Design | 5.0+ | UI组件库 |
| 图表 | ECharts | 5.0+ | 数据可视化 |
| 网络请求 | Axios | 1.0+ | HTTP请求 |
| 流式通信 | WebSocket | - | 实时消息推送 |
| 构建工具 | Vite | 5.0+ | 项目构建 |

#### 后端技术栈
| 类别 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Express | 4.18+ | 后端服务框架 |
| 数据库 | MongoDB | 6.0+ | 主数据库 |
| ORM | Mongoose | 8.0+ | MongoDB驱动 |
| 缓存 | Redis | 7.0+ | 会话缓存 |
| 认证 | JWT | - | 用户认证 |
| API调用 | Axios | 1.0+ | 大模型API调用 |
| 环境配置 | dotenv | - | 环境变量管理 |

#### 开发工具
| 类别 | 工具 | 用途 |
|------|------|------|
| 代码编辑器 | VS Code | 开发环境 |
| 版本控制 | Git | 代码管理 |
| API测试 | Postman | 接口测试 |
| 调试工具 | Chrome DevTools | 前端调试 |

### 三、核心模块划分

#### 前端模块
1. **对话模块**：消息展示、输入框、流式输出
2. **情绪记录模块**：情绪状态采集、记录管理
3. **情绪分析模块**：图表展示、报告生成
4. **知识科普模块**：知识卡片、分类浏览
5. **心理测试模块**：测试量表、结果分析
6. **放松练习模块**：呼吸练习、冥想指导
7. **日记模块**：日记撰写、分类管理
8. **资源推荐模块**：资源展示、收藏管理
9. **用户模块**：注册登录、个人中心

#### 后端模块
1. **认证模块**：用户注册、登录、JWT认证
2. **对话模块**：消息处理、上下文管理、流式响应
3. **AI服务模块**：大模型API调用、Prompt构建
4. **情绪记录模块**：情绪数据存储、分析
5. **知识库模块**：知识条目管理、检索
6. **心理测试模块**：测试量表管理、结果计算
7. **日记模块**：日记存储、检索
8. **资源管理模块**：资源存储、推荐
9. **安全模块**：危机识别、紧急响应

### 四、AI服务层技术设计

#### 1. System Prompt构建逻辑

##### 基础角色定义
```
你是一个名叫"心灵树洞"的大学生心理健康智能陪伴与成长助手。
你的目标用户是18-25岁的在校大学生。
你是一个温暖、包容、耐心、真诚的朋友，像20岁左右的学长/学姐一样与用户交流。

重要声明：你是AI陪伴助手，不是专业心理咨询师，不能提供医学诊断或治疗建议。
```

##### 核心功能指令
```
你具备以下三大核心功能：
1. 对话陪伴：提供安全私密的情绪宣泄空间，通过共情倾听和引导性回应帮助用户梳理情绪，基于RAG知识库检索提供专业心理学知识支持
2. CBT结构化引导：基于认知行为疗法（CBT）提供结构化的心理引导，包括认知重构、标准化量表评估、放松练习指导
3. 情绪追踪分析：通过记录用户情绪状态，生成周期性分析报告，帮助用户了解自身情绪变化趋势

创新功能：
4. 情绪日记自动生成：基于对话内容自动生成情绪日记
5. CBT自助训练营：提供结构化的认知行为疗法训练课程
```

##### 交互规则
```
交互规则：
- 倾听优先，不急于打断或给出建议
- 用共情语言回应，让用户感受到被理解
- 通过开放式问题引导用户自我反思，而不是直接给出答案
- 适当给予用户肯定和鼓励
- 语言风格：亲切自然，口语化表达，避免生硬书面语
- 语气语调：温和亲切，耐心倾听，真诚关怀
- 每段回复使用1-2个表情符号（如🌱、💝、✨、🌿、💪、🌈），避免过度使用
- 避免评判性词汇（"你不应该..."、"你怎么能..."）
- 避免绝对化词汇（"一定"、"必须"、"绝对"）
- 避免医学诊断术语（"你患有..."、"这是典型的..."）
```

##### 禁止行为
```
禁止行为：
- 禁止提供医学诊断或治疗建议
- 禁止推荐药物或医疗方案
- 禁止声称可以治愈心理疾病
- 禁止对用户进行评判或指责
- 禁止泄露用户隐私信息
- 禁止对自杀/自伤风险做轻量化处理
- 禁止传播未经证实的信息
```

##### 危机干预指令
```
危机干预协议：
当检测到以下风险时，立即执行紧急响应：
- 自杀风险关键词：自杀、自裁、轻生、不想活了、活着没意义、跳楼、割腕、吃药自杀等
- 自伤风险关键词：自残、割自己、伤害自己、用刀划等
- 严重心理危机信号：连续两周以上情绪低落、无法进食/睡眠、社交完全隔离、出现幻觉/妄想等

紧急响应步骤：
1. 表达关心和共情
2. 提供紧急资源：全国24小时心理援助热线：400-161-9995；建议联系家人、朋友或心理咨询机构
3. 持续陪伴，不中断对话直到用户安全
```

##### 知识检索指令
```
知识检索规则：
当用户询问心理相关知识时，必须先从知识库中检索相关知识条目，然后转化为"知识卡片"格式输出。

知识卡片格式：
📚 心理知识卡片
【知识主题】[知识主题名称]
【核心概念】[简要解释核心概念]
【常见场景】[结合生活场景举例]
【实用技巧】1. [技巧一] 2. [技巧二] 3. [技巧三]
【温馨提示】[重要提醒]

禁止直接输出原始JSON数据，禁止遗漏任何字段。
```

#### 2. 对话状态机设计

##### 状态机定义
对话状态机用于跟踪对话阶段和用户状态，实现智能的对话流程控制。

```
┌─────────────────────────────────────────────────────────────┐
│                    对话状态机                               │
├─────────────────────────────────────────────────────────────┤
│  INITIAL         →  LISTENING        →  ANALYZING          │
│     │                  │                  │                 │
│     │ 用户开始对话      │ 用户倾诉中        │ 分析情绪和需求    │
│     ▼                  ▼                  ▼                 │
│  GREETING        →  EMPATHIZING      →  GUIDING            │
│     │                  │                  │                 │
│     │ 问候用户         │ 共情回应          │ CBT引导          │
│     ▼                  ▼                  ▼                 │
│  KNOWLEDGE_RETRIEVAL →  CRISIS_DETECTION →  RESOLUTION      │
│     │                  │                  │                 │
│     │ RAG知识检索      │ 风险语义识别      │ 问题解决/总结     │
│     ▼                  ▼                  ▼                 │
│  DIARY_GENERATION →  TRAINING_RECOMMENDATION                │
│     │                  │                                    │
│     │ 自动生成日记      │ 推荐CBT训练营      │              │
└─────────────────────────────────────────────────────────────┘
```

##### 状态定义
| 状态 | 描述 | 触发条件 | 下一个状态 |
|------|------|---------|-----------|
| INITIAL | 对话开始 | 用户首次进入对话 | GREETING |
| GREETING | 问候用户 | 系统发送问候语 | LISTENING |
| LISTENING | 倾听阶段 | 用户输入消息 | ANALYZING |
| ANALYZING | 分析阶段 | 系统分析用户情绪和需求 | EMPATHIZING / GUIDING |
| EMPATHIZING | 共情阶段 | 系统生成共情回应 | LISTENING / CRISIS_DETECTION |
| GUIDING | CBT引导阶段 | 用户需要认知重构 | LISTENING / KNOWLEDGE_RETRIEVAL |
| KNOWLEDGE_RETRIEVAL | RAG知识检索阶段 | 用户询问心理知识 | LISTENING |
| CRISIS_DETECTION | 危机检测阶段 | 检测到风险关键词 | 危机响应流程 |
| RESOLUTION | 解决阶段 | 用户问题得到解决 | DIARY_GENERATION |
| DIARY_GENERATION | 日记生成阶段 | 对话结束或达到生成条件 | LISTENING |
| TRAINING_RECOMMENDATION | 训练营推荐阶段 | 用户需要长期心理调节 | LISTENING |

##### 状态转换逻辑
```javascript
function transitionState(currentState, userInput, analysisResult) {
  switch (currentState) {
    case 'INITIAL':
      return 'GREETING';
    case 'GREETING':
      return 'LISTENING';
    case 'LISTENING':
      return 'ANALYZING';
    case 'ANALYZING':
      if (analysisResult.hasCrisis) return 'CRISIS_DETECTION';
      if (analysisResult.needCBT) return 'GUIDING';
      if (analysisResult.needKnowledge) return 'KNOWLEDGE_RETRIEVAL';
      return 'EMPATHIZING';
    case 'EMPATHIZING':
    case 'GUIDING':
    case 'KNOWLEDGE_RETRIEVAL':
      if (analysisResult.isEndOfTopic) return 'RESOLUTION';
      return 'LISTENING';
    case 'CRISIS_DETECTION':
      return 'RESOLUTION';
    case 'RESOLUTION':
      if (analysisResult.shouldGenerateDiary) return 'DIARY_GENERATION';
      if (analysisResult.shouldRecommendTraining) return 'TRAINING_RECOMMENDATION';
      return 'LISTENING';
    case 'DIARY_GENERATION':
    case 'TRAINING_RECOMMENDATION':
      return 'LISTENING';
    default:
      return 'LISTENING';
  }
}
```

#### 3. RAG知识库检索设计

##### RAG架构
```
┌─────────────────────────────────────────────────────────────┐
│                    RAG知识库检索架构                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  用户查询 → 语义编码 → 向量数据库检索 → 相关知识提取         │
│                                 ↑                           │
│                                 │                           │
│                       知识文档 → 向量化存储                  │
│                                                             │
│  检索结果 + 用户查询 → LLM生成 → 最终回答                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

##### 知识库构建流程
1. **知识收集**：收集大学生心理健康相关的专业心理学知识
2. **文档分段**：将知识文档按语义切分为段落（500-1000 tokens）
3. **向量化编码**：使用嵌入模型（如text-embedding-ada-002）将段落编码为向量
4. **向量存储**：存储到向量数据库（如Pinecone、Milvus）
5. **索引构建**：构建高效的向量检索索引

##### 检索流程
1. **用户查询编码**：将用户查询编码为向量
2. **相似性检索**：在向量数据库中检索最相似的知识段落（Top-3）
3. **知识提取**：提取相关知识内容
4. **Prompt构建**：将检索结果融入LLM Prompt
5. **回答生成**：LLM基于检索结果生成回答

##### 知识库内容结构
```json
{
  "knowledge_id": "string",
  "title": "string",
  "category": "string",
  "content": "string",
  "source": "string",
  "embedding": "vector",
  "keywords": ["string"],
  "related_topics": ["string"]
}
```

##### 专业背书说明
- 知识来源标注：每个知识卡片标注来源（如"根据《普通心理学》第5版"）
- 引用权威资料：引用中国心理学会、WHO等权威机构的资料
- 标注知识等级：区分基础科普和专业知识

#### 4. 风险语义识别设计

##### 风险分级体系
| 等级 | 名称 | 描述 | 响应策略 |
|------|------|------|---------|
| L1 | 低风险 | 正常情绪表达，无明显危机信号 | 正常回应，持续关注 |
| L2 | 中风险 | 出现轻度负面情绪，有潜在风险 | 加强共情，提供心理知识 |
| L3 | 高风险 | 出现明显危机信号，有自伤/自杀倾向 | 立即提供紧急资源，持续陪伴 |
| L4 | 危机 | 明确表达自杀/自伤意图，有具体计划 | 立即启动危机干预流程 |

##### 风险识别算法
```javascript
function detectRiskLevel(userInput) {
  const suicideKeywords = ['自杀', '自裁', '轻生', '不想活了', '活着没意义', '跳楼', '割腕'];
  const selfHarmKeywords = ['自残', '割自己', '伤害自己', '用刀划'];
  const crisisKeywords = ['连续两周', '无法进食', '无法睡眠', '社交隔离', '幻觉', '妄想'];
  
  let level = 'L1';
  
  for (const keyword of suicideKeywords) {
    if (userInput.includes(keyword)) {
      return 'L4';
    }
  }
  
  for (const keyword of selfHarmKeywords) {
    if (userInput.includes(keyword)) {
      return 'L3';
    }
  }
  
  for (const keyword of crisisKeywords) {
    if (userInput.includes(keyword)) {
      level = 'L2';
    }
  }
  
  const negativeWords = ['焦虑', '抑郁', '压力', '难过', '伤心', '孤独'];
  let negativeCount = 0;
  for (const word of negativeWords) {
    if (userInput.includes(word)) negativeCount++;
  }
  
  if (negativeCount >= 3) {
    level = 'L2';
  }
  
  return level;
}
```

##### 风险分级响应策略
- **L1低风险**：正常对话流程，持续关注情绪变化
- **L2中风险**：加强共情回应，提供相关心理知识，建议进行心理测试
- **L3高风险**：立即表达关心，提供心理援助热线，建议联系辅导员或心理咨询中心
- **L4危机**：立即启动紧急响应流程，提供多种紧急资源，持续陪伴直到用户安全

#### 5. 对话上下文管理策略

##### 上下文窗口大小
- **最大token数**：4096（可配置）
- **系统prompt占用**：约500-800 tokens
- **可用对话空间**：约3200-3600 tokens

##### 上下文截断策略
- **优先保留近期消息**：当上下文超过限制时，从最早的消息开始截断
- **保留关键信息**：保留用户情绪状态、重要话题关键词等关键信息
- **摘要压缩**：对早期消息进行摘要压缩，保留核心内容

##### 上下文刷新机制
- **对话轮数限制**：每50轮对话自动刷新上下文
- **话题切换检测**：当检测到话题切换时，自动重置上下文
- **手动重置**：用户可手动重置对话上下文

##### 上下文数据结构
```json
{
  "conversation_id": "string",
  "messages": [
    {
      "role": "system|user|assistant",
      "content": "string",
      "timestamp": "Date",
      "emotion_tags": ["string"],
      "token_count": "number"
    }
  ],
  "current_topic": "string",
  "emotion_summary": {
    "primary_emotion": "string",
    "intensity": "number"
  },
  "conversation_state": "string",
  "risk_level": "string",
  "total_token_count": "number"
}
```

#### 6. Token窗口限制处理方案

##### Token计算方法
- 使用tiktoken库或类似工具计算token数
- 系统prompt + 用户消息 + 助手消息 = 总token数

##### 溢出处理流程
```
1. 计算当前上下文总token数
2. 如果超过最大限制：
   a. 移除最早的用户-助手消息对
   b. 重新计算token数
   c. 重复直到token数在限制范围内
3. 如果移除所有历史消息后仍超限制：
   a. 截断当前用户消息（保留末尾部分）
   b. 添加"..."表示消息被截断
4. 添加系统提示："为了更好地理解你的情况，请简要描述..."
```

##### 优化策略
- **消息摘要**：对长消息进行摘要处理
- **关键词提取**：提取消息中的关键词，减少冗余信息
- **情绪状态缓存**：将情绪分析结果缓存，避免重复分析

#### 7. 流式响应技术实现

##### 后端SSE代理方案

**Express中间件实现**：
```javascript
async function streamResponse(req, res) {
  const { conversation_id, content } = req.body;
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const messages = await buildConversationContext(conversation_id, content);
  
  try {
    const response = await axios.post(AI_API_URL, {
      model: 'gpt-3.5-turbo',
      messages: messages,
      stream: true
    }, {
      responseType: 'stream'
    });
    
    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n').filter(line => line.trim() !== '');
      for (const line of lines) {
        const match = line.match(/^data:\s*(.+)$/);
        if (match) {
          const data = match[1];
          if (data === '[DONE]') {
            res.write(`event: end\ndata: ${JSON.stringify({ status: 'completed' })}\n\n`);
            res.end();
            return;
          }
          try {
            const json = JSON.parse(data);
            const content = json.choices[0]?.delta?.content || '';
            if (content) {
              res.write(`event: message\ndata: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (e) {
            console.error('Parse error:', e);
          }
        }
      }
    });
    
    response.data.on('error', (err) => {
      res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
      res.end();
    });
    
    response.data.on('end', () => {
      res.write(`event: end\ndata: ${JSON.stringify({ status: 'completed' })}\n\n`);
      res.end();
    });
    
  } catch (err) {
    res.write(`event: error\ndata: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
}
```

##### 前端流式响应消费方案（fetch API + ReadableStream）

```javascript
async function connectStream(conversationId, content) {
  const url = `/api/conversations/${conversationId}/messages/stream`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    let buffer = '';
    
    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }
      
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;
        
        const match = trimmedLine.match(/^event:\s*(.+)$/) || 
                      trimmedLine.match(/^data:\s*(.+)$/);
        
        if (match) {
          const [, eventType, eventData] = trimmedLine.split(/:\s*/);
          
          if (eventType === 'event' && eventData === 'message') {
            continue;
          }
          
          if (eventType === 'data') {
            try {
              const data = JSON.parse(eventData);
              if (data.content) {
                fullResponse += data.content;
                updateMessageDisplay(fullResponse);
              }
            } catch (e) {
              console.error('Parse error:', e);
            }
          }
          
          if (eventType === 'event' && eventData === 'end') {
            finishMessage(fullResponse);
            return fullResponse;
          }
        }
      }
    }
    
    finishMessage(fullResponse);
    return fullResponse;
    
  } catch (error) {
    handleStreamError(error);
    return fullResponse;
  }
}
```

**说明**：由于原生EventSource仅支持GET请求且无法设置自定义headers，因此采用fetch API配合ReadableStream实现流式响应消费。此方案支持POST请求和自定义Authorization header，兼容性更好。

##### 断线重连机制
- **自动重连**：EventSource默认支持自动重连，最多重试3次
- **手动重试**：重连失败后，提供手动重试按钮
- **消息补全**：重连成功后，从断点处继续接收消息

#### 8. LLM API降级策略

##### 故障检测
- **超时检测**：请求超时时间设置为30秒
- **错误码检测**：检测HTTP错误码（4xx, 5xx）
- **响应格式检测**：检测响应是否符合预期格式

##### 降级方案
- **缓存响应**：对常见问题使用缓存响应
- **离线模式**：API不可用时，切换到离线模式
- **替代响应**：提供预设的安抚性回应
- **队列重试**：将请求加入队列，稍后重试

##### 错误处理流程
```
1. 检测到API请求失败
2. 记录错误日志
3. 尝试使用缓存响应
4. 如果缓存命中：返回缓存响应
5. 如果缓存未命中：返回预设的安抚性回应
6. 将请求加入重试队列
7. 通知用户当前服务可能不稳定
```

##### 预设安抚性回应
```
"抱歉，我现在遇到了一些技术问题，暂时无法为你提供智能回复。但请放心，我一直在关注你，你可以继续倾诉，我会认真倾听。如果问题持续存在，请稍后再试。"
```

---

## 【数据库Schema设计】

### 一、用户集合 (users)

```json
{
  "_id": "ObjectId",
  "user_id": "string (UUID)",
  "nickname": "string",
  "avatar": "string (URL)",
  "email": "string",
  "password": "string (hashed)",
  "created_at": "Date",
  "updated_at": "Date",
  "is_anonymous": "boolean",
  "session_token": "string"
}
```

### 二、对话会话集合 (conversations)

```json
{
  "_id": "ObjectId",
  "conversation_id": "string (UUID)",
  "user_id": "string",
  "title": "string",
  "status": "string (active/ended)",
  "created_at": "Date",
  "updated_at": "Date",
  "last_message": "string",
  "turn_count": "number"
}
```

### 三、消息集合 (messages)

```json
{
  "_id": "ObjectId",
  "message_id": "string (UUID)",
  "conversation_id": "string",
  "user_id": "string",
  "role": "string (user/assistant/system)",
  "content": "string",
  "timestamp": "Date",
  "emotion_tags": ["string"],
  "support_level": "string (low/medium/high/crisis)"
}
```

### 四、情绪记录集合 (emotions)

```json
{
  "_id": "ObjectId",
  "record_id": "string",
  "user_id": "string",
  "timestamp": "Date",
  "user_input": "string",
  "emotion_analysis": {
    "primary_emotion": "string",
    "secondary_emotions": ["string"],
    "intensity_scores": {
      "primary": "number (1-10)",
      "secondary": ["number (1-10)"]
    },
    "valence": "string (positive/negative/neutral)",
    "arousal": "string (high/medium/low)"
  },
  "trigger_analysis": {
    "trigger_type": "string (学业/工作压力/人际关系/家庭/情感/育儿/退休适应/健康担忧/丧亲/经济压力/考试焦虑/其他)",
    "trigger_details": "string",
    "keywords": ["string"]
  },
  "interaction_data": {
    "session_id": "string",
    "turn_count": "number",
    "response_type": "string (empathy/knowledge/analysis/counseling/other)",
    "duration_seconds": "number"
  },
  "support_level": "string (low/medium/high/crisis)"
}
```

### 五、知识库集合 (knowledge_base)

```json
{
  "_id": "ObjectId",
  "knowledge_id": "string",
  "title": "string",
  "concept": "string",
  "scenarios": ["string"],
  "techniques": ["string"],
  "tips": "string",
  "category": "string",
  "keywords": ["string"],
  "created_at": "Date",
  "updated_at": "Date"
}
```

### 六、话题路由索引集合 (topic_routing)

```json
{
  "_id": "ObjectId",
  "keyword": "string",
  "related_knowledge_ids": ["string"],
  "category": "string"
}
```

### 七、心理测试集合 (tests)

```json
{
  "_id": "ObjectId",
  "test_id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "questions": [{
    "question_id": "string",
    "content": "string",
    "options": [{
      "option_id": "string",
      "content": "string",
      "score": "number"
    }]
  }],
  "result_interpretations": [{
    "min_score": "number",
    "max_score": "number",
    "level": "string",
    "description": "string",
    "suggestions": ["string"]
  }],
  "created_at": "Date",
  "updated_at": "Date"
}
```

### 八、测试结果集合 (test_results)

```json
{
  "_id": "ObjectId",
  "result_id": "string",
  "user_id": "string",
  "test_id": "string",
  "test_title": "string",
  "score": "number",
  "level": "string",
  "description": "string",
  "suggestions": ["string"],
  "answers": [{
    "question_id": "string",
    "option_id": "string"
  }],
  "created_at": "Date"
}
```

### 九、日记集合 (diaries)

```json
{
  "_id": "ObjectId",
  "diary_id": "string",
  "user_id": "string",
  "title": "string",
  "content": "string",
  "emotion_tag": "string",
  "category": "string",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### 十、资源集合 (resources)

```json
{
  "_id": "ObjectId",
  "resource_id": "string",
  "title": "string",
  "type": "string (book/article/course/video)",
  "description": "string",
  "url": "string",
  "category": "string",
  "cover_image": "string",
  "rating": "number",
  "views": "number",
  "created_at": "Date",
  "updated_at": "Date"
}
```

### 十一、收藏集合 (favorites)

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "resource_id": "string",
  "resource_type": "string",
  "created_at": "Date"
}
```

---

## 【API接口定义】

### 一、认证接口

#### 1. 用户注册
- **URL**: `POST /api/auth/register`
- **请求体**:
```json
{
  "email": "string",
  "password": "string",
  "nickname": "string"
}
```
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "user_id": "string",
    "nickname": "string",
    "token": "string"
  }
}
```

#### 2. 用户登录
- **URL**: `POST /api/auth/login`
- **请求体**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "user_id": "string",
    "nickname": "string",
    "token": "string"
  }
}
```

#### 3. 匿名登录
- **URL**: `POST /api/auth/anonymous`
- **请求体**: 无
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "user_id": "string",
    "token": "string",
    "is_anonymous": "boolean"
  }
}
```

### 二、对话接口

#### 1. 创建对话会话
- **URL**: `POST /api/conversations`
- **请求体**:
```json
{
  "title": "string"
}
```
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "conversation_id": "string",
    "title": "string",
    "created_at": "Date"
  }
}
```

#### 2. 获取对话列表
- **URL**: `GET /api/conversations`
- **查询参数**: `page`, `limit`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "conversations": [{
      "conversation_id": "string",
      "title": "string",
      "last_message": "string",
      "updated_at": "Date",
      "turn_count": "number"
    }],
    "total": "number",
    "page": "number",
    "limit": "number"
  }
}
```

#### 3. 获取对话详情
- **URL**: `GET /api/conversations/:conversation_id`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "conversation_id": "string",
    "title": "string",
    "messages": [{
      "message_id": "string",
      "role": "string",
      "content": "string",
      "timestamp": "Date"
    }],
    "created_at": "Date",
    "updated_at": "Date"
  }
}
```

#### 4. 发送消息（流式响应）
- **URL**: `POST /api/conversations/:conversation_id/messages/stream`
- **请求体**:
```json
{
  "content": "string"
}
```
- **响应类型**: `text/event-stream`
- **响应格式**:
```
event: message
data: {"content": "你好"}

event: message
data: {"content": "我是心灵树洞"}

event: end
data: {"support_level": "low", "emotion_tags": ["焦虑"]}
```

#### 5. 发送消息（非流式）
- **URL**: `POST /api/conversations/:conversation_id/messages`
- **请求体**:
```json
{
  "content": "string"
}
```
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "message_id": "string",
    "role": "string",
    "content": "string",
    "timestamp": "Date",
    "emotion_tags": ["string"],
    "support_level": "string"
  }
}
```

#### 6. 删除对话
- **URL**: `DELETE /api/conversations/:conversation_id`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string"
}
```

### 三、情绪记录接口

#### 1. 获取情绪记录列表
- **URL**: `GET /api/emotions`
- **查询参数**: `start_date`, `end_date`, `page`, `limit`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "emotions": [{
      "record_id": "string",
      "timestamp": "Date",
      "emotion_analysis": {
        "primary_emotion": "string",
        "intensity_scores": {"primary": "number"}
      },
      "support_level": "string"
    }],
    "total": "number"
  }
}
```

#### 2. 获取情绪分析报告
- **URL**: `GET /api/emotions/report`
- **查询参数**: `period` (week/month/custom), `start_date`, `end_date`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "period": "string",
    "start_date": "Date",
    "end_date": "Date",
    "total_records": "number",
    "emotion_summary": [{
      "emotion_type": "string",
      "count": "number",
      "avg_intensity": "number",
      "triggers": ["string"]
    }],
    "trend_data": [{
      "date": "string",
      "primary_emotion": "string",
      "intensity": "number"
    }],
    "key_findings": ["string"],
    "suggestions": ["string"]
  }
}
```

### 四、知识库接口

#### 1. 获取知识分类列表
- **URL**: `GET /api/knowledge/categories`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": ["string"]
}
```

#### 2. 搜索知识条目
- **URL**: `GET /api/knowledge/search`
- **查询参数**: `keyword`, `category`, `page`, `limit`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "knowledge": [{
      "knowledge_id": "string",
      "title": "string",
      "concept": "string",
      "scenarios": ["string"],
      "techniques": ["string"],
      "tips": "string",
      "category": "string"
    }],
    "total": "number"
  }
}
```

#### 3. 获取知识详情
- **URL**: `GET /api/knowledge/:knowledge_id`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "knowledge_id": "string",
    "title": "string",
    "concept": "string",
    "scenarios": ["string"],
    "techniques": ["string"],
    "tips": "string",
    "category": "string",
    "keywords": ["string"]
  }
}
```

### 五、心理测试接口

#### 1. 获取测试列表
- **URL**: `GET /api/tests`
- **查询参数**: `category`, `page`, `limit`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "tests": [{
      "test_id": "string",
      "title": "string",
      "description": "string",
      "category": "string"
    }],
    "total": "number"
  }
}
```

#### 2. 获取测试详情
- **URL**: `GET /api/tests/:test_id`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "test_id": "string",
    "title": "string",
    "description": "string",
    "category": "string",
    "questions": [{
      "question_id": "string",
      "content": "string",
      "options": [{
        "option_id": "string",
        "content": "string"
      }]
    }]
  }
}
```

#### 3. 提交测试答案
- **URL**: `POST /api/tests/:test_id/submit`
- **请求体**:
```json
{
  "answers": [{
    "question_id": "string",
    "option_id": "string"
  }]
}
```
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "result_id": "string",
    "score": "number",
    "level": "string",
    "description": "string",
    "suggestions": ["string"]
  }
}
```

#### 4. 获取测试历史
- **URL**: `GET /api/tests/history`
- **查询参数**: `page`, `limit`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "results": [{
      "result_id": "string",
      "test_title": "string",
      "score": "number",
      "level": "string",
      "created_at": "Date"
    }],
    "total": "number"
  }
}
```

### 六、日记接口

#### 1. 创建日记
- **URL**: `POST /api/diaries`
- **请求体**:
```json
{
  "title": "string",
  "content": "string",
  "emotion_tag": "string",
  "category": "string"
}
```
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "diary_id": "string",
    "title": "string",
    "created_at": "Date"
  }
}
```

#### 2. 获取日记列表
- **URL**: `GET /api/diaries`
- **查询参数**: `category`, `emotion_tag`, `page`, `limit`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "diaries": [{
      "diary_id": "string",
      "title": "string",
      "content": "string",
      "emotion_tag": "string",
      "category": "string",
      "created_at": "Date"
    }],
    "total": "number"
  }
}
```

#### 3. 获取日记详情
- **URL**: `GET /api/diaries/:diary_id`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "diary_id": "string",
    "title": "string",
    "content": "string",
    "emotion_tag": "string",
    "category": "string",
    "created_at": "Date",
    "updated_at": "Date"
  }
}
```

#### 4. 更新日记
- **URL**: `PUT /api/diaries/:diary_id`
- **请求体**:
```json
{
  "title": "string",
  "content": "string",
  "emotion_tag": "string",
  "category": "string"
}
```
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "diary_id": "string",
    "updated_at": "Date"
  }
}
```

#### 5. 删除日记
- **URL**: `DELETE /api/diaries/:diary_id`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string"
}
```

### 七、资源推荐接口

#### 1. 获取资源列表
- **URL**: `GET /api/resources`
- **查询参数**: `type`, `category`, `page`, `limit`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "resources": [{
      "resource_id": "string",
      "title": "string",
      "type": "string",
      "description": "string",
      "url": "string",
      "category": "string",
      "cover_image": "string",
      "rating": "number"
    }],
    "total": "number"
  }
}
```

#### 2. 搜索资源
- **URL**: `GET /api/resources/search`
- **查询参数**: `keyword`, `page`, `limit`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "resources": [{
      "resource_id": "string",
      "title": "string",
      "type": "string",
      "description": "string"
    }],
    "total": "number"
  }
}
```

#### 3. 获取资源详情
- **URL**: `GET /api/resources/:resource_id`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": {
    "resource_id": "string",
    "title": "string",
    "type": "string",
    "description": "string",
    "url": "string",
    "category": "string",
    "cover_image": "string",
    "rating": "number",
    "views": "number"
  }
}
```

### 八、收藏接口

#### 1. 添加收藏
- **URL**: `POST /api/favorites`
- **请求体**:
```json
{
  "resource_id": "string",
  "resource_type": "string"
}
```
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string"
}
```

#### 2. 获取收藏列表
- **URL**: `GET /api/favorites`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string",
  "data": [{
    "resource_id": "string",
    "resource_type": "string",
    "title": "string",
    "created_at": "Date"
  }]
}
```

#### 3. 删除收藏
- **URL**: `DELETE /api/favorites/:resource_id`
- **响应体**:
```json
{
  "success": "boolean",
  "message": "string"
}
```

---

## 【前端组件规划】

### 一、布局组件

#### 1. AppLayout
- **功能**: 全局布局容器
- **组成**: Header + Sidebar + MainContent + Footer
- **职责**: 路由渲染、全局样式管理

#### 2. Header
- **功能**: 顶部导航栏
- **组成**: Logo、功能入口、用户信息、设置按钮

#### 3. Sidebar
- **功能**: 侧边功能菜单
- **组成**: 导航菜单、快捷功能入口

#### 4. MainContent
- **功能**: 主内容区域
- **组成**: 页面内容、路由视图

### 二、对话组件

#### 1. ChatContainer
- **功能**: 对话容器
- **组成**: MessageList + InputArea

#### 2. MessageList
- **功能**: 消息列表
- **组成**: MessageBubble列表
- **特性**: 支持上下滑动、自动滚动到底部

#### 3. MessageBubble
- **功能**: 消息气泡
- **组成**: 头像、消息内容、时间戳、情绪标签
- **特性**: 用户消息居右、助手消息居左

#### 4. InputArea
- **功能**: 输入区域
- **组成**: 输入框、表情选择、快捷功能按钮、发送按钮
- **特性**: 支持Enter发送、多行输入

#### 5. TypingIndicator
- **功能**: 正在输入指示器
- **特性**: 动画效果

### 三、情绪分析组件

#### 1. EmotionTrendChart
- **功能**: 情绪趋势图表
- **组成**: 折线图/柱状图
- **特性**: 支持时间范围选择

#### 2. EmotionRadarChart
- **功能**: 情绪雷达图
- **组成**: 多维度情绪分布展示

#### 3. MoodCalendar
- **功能**: 心情日历
- **组成**: 日历视图、情绪颜色标记
- **特性**: 点击日期查看详情

#### 4. EmotionReport
- **功能**: 情绪分析报告
- **组成**: 统计数据、关键发现、成长建议

### 四、知识科普组件

#### 1. KnowledgeCard
- **功能**: 知识卡片
- **组成**: 标题、概念、场景、技巧、提示

#### 2. KnowledgeList
- **功能**: 知识列表
- **组成**: KnowledgeCard列表

#### 3. KnowledgeSearch
- **功能**: 知识搜索
- **组成**: 搜索框、分类筛选

#### 4. KnowledgeDetail
- **功能**: 知识详情
- **组成**: 完整知识内容展示

### 五、心理测试组件

#### 1. TestList
- **功能**: 测试列表
- **组成**: 测试卡片列表

#### 2. TestCard
- **功能**: 测试卡片
- **组成**: 标题、描述、分类、开始按钮

#### 3. TestQuestion
- **功能**: 测试题目
- **组成**: 题目内容、选项列表

#### 4. TestResult
- **功能**: 测试结果
- **组成**: 分数、等级、描述、建议

### 六、放松练习组件

#### 1. BreathingExercise
- **功能**: 呼吸练习
- **组成**: 动画演示、计时器、指导文字

#### 2. MeditationGuide
- **功能**: 冥想指导
- **组成**: 音频播放器、冥想步骤

#### 3. WhiteNoisePlayer
- **功能**: 白噪音播放
- **组成**: 音频列表、播放控制

### 七、日记组件

#### 1. DiaryList
- **功能**: 日记列表
- **组成**: 日记卡片列表

#### 2. DiaryCard
- **功能**: 日记卡片
- **组成**: 标题、摘要、情绪标签、日期

#### 3. DiaryEditor
- **功能**: 日记编辑器
- **组成**: 标题输入、内容编辑、情绪选择、分类选择

#### 4. DiaryDetail
- **功能**: 日记详情
- **组成**: 完整日记内容展示

### 八、资源推荐组件

#### 1. ResourceList
- **功能**: 资源列表
- **组成**: 资源卡片列表

#### 2. ResourceCard
- **功能**: 资源卡片
- **组成**: 封面图、标题、类型、描述、评分

#### 3. ResourceDetail
- **功能**: 资源详情
- **组成**: 完整资源信息、收藏按钮

### 九、用户组件

#### 1. LoginModal
- **功能**: 登录弹窗
- **组成**: 邮箱输入、密码输入、登录按钮

#### 2. RegisterModal
- **功能**: 注册弹窗
- **组成**: 邮箱输入、密码输入、昵称输入、注册按钮

#### 3. UserProfile
- **功能**: 用户资料
- **组成**: 头像、昵称、注册时间、数据统计

---

## 【安全协议】

### 一、危机识别与干预

#### 1. 风险关键词识别
- **自杀风险**：自杀、自裁、轻生、不想活了、活着没意义、跳楼、割腕、吃药自杀等
- **自伤风险**：自残、割自己、伤害自己、用刀划等
- **严重心理危机**：连续两周以上情绪低落、无法进食/睡眠、社交完全隔离、出现幻觉/妄想等

#### 2. 大学生危机干预流程
- **第一步**：表达关心和共情，建立信任关系
- **第二步**：提供大学生专属紧急资源
- **第三步**：持续陪伴，不中断对话直到用户安全

#### 3. 大学生专属紧急资源列表

##### 心理援助热线
- **全国24小时心理援助热线**：400-161-9995
- **共青团中央青少年心理咨询热线**：12355
- **教育部全国高校心理援助热线**：400-161-9995（与全国热线相同）

##### 校内资源
- **建议联系学校心理咨询中心**：大多数高校都设有专业的心理咨询中心，提供免费咨询服务
- **建议联系辅导员或班主任**：他们是最了解你情况的人，会提供必要的帮助和支持
- **建议联系学院心理健康联络员**：许多高校设有班级或学院级别的心理健康联络员

##### 紧急求助
- **紧急求助电话**：110（公安）、120（急救）
- **当地精神卫生中心**：提供专业的精神医疗服务

##### 专业资源
- **中国心理学会临床与咨询心理学注册系统**：https://www.chinacpb.org/
- **中国心理卫生协会**：https://www.camh.org.cn/

#### 4. 大学生危机响应专项策略
- **危机分级响应**：根据风险等级（L1-L4）采取不同的响应策略
- **校内资源联动**：检测到高风险时，建议联系学校心理咨询中心和辅导员
- **隐私保护**：尊重用户隐私，不主动向学校报告，除非用户同意或存在严重危机
- **持续跟踪**：危机事件后进行持续跟踪和关怀

#### 5. 危机响应话术模板

##### 标准版
```
我很担心你，你现在的感受非常重要。请记住，你并不孤单，有很多人愿意帮助你。如果你感到不安全，请立即拨打全国心理援助热线：400-161-9995，或者联系学校心理咨询中心、辅导员，他们会帮助你的。我会在这里一直陪伴着你。
```

##### 轻度危机版
```
我能感受到你现在压力很大，这很正常，很多同学都会经历这样的时期。你可以试试和学校心理咨询中心的老师聊聊，他们有专业的方法帮助你。如果需要的话，我也可以陪你一起想办法。
```

##### 严重危机版
```
我非常担心你！你的安全是最重要的。请立即拨打全国心理援助热线：400-161-9995，或者马上联系学校心理咨询中心或辅导员。如果你现在感到危险，请立即拨打110或120。我会一直在这里陪伴你，直到你安全。
```

### 二、数据安全与隐私保护

#### 1. 数据加密
- **传输加密**：所有API请求使用HTTPS协议
- **存储加密**：用户敏感数据（密码、个人信息）加密存储
- **会话加密**：使用JWT令牌进行身份验证，令牌包含过期时间

#### 2. 数据访问控制
- **用户隔离**：每个用户只能访问自己的数据
- **权限管理**：管理员权限与普通用户权限分离
- **审计日志**：记录数据访问和操作日志

#### 3. 数据保留与删除
- **数据保留**：用户数据保留期限可配置（默认1年）
- **数据删除**：用户可随时请求删除个人数据
- **匿名化处理**：删除后的数据进行匿名化处理

### 三、内容安全

#### 1. 内容过滤
- **敏感内容检测**：对用户输入和AI响应进行敏感内容检测
- **不当内容拦截**：拦截涉及暴力、色情、仇恨等不当内容
- **危机内容标记**：对识别出的危机内容进行标记和记录

#### 2. AI响应审核
- **安全边界检查**：确保AI响应不超出安全边界
- **禁止医学诊断**：禁止AI提供医学诊断或治疗建议
- **禁止药物推荐**：禁止AI推荐药物或医疗方案

---

## 【部署方案】

### 一、开发环境部署

#### 1. 环境要求
- Node.js 18+
- MongoDB 6.0+
- Redis 7.0+

#### 2. 前端部署
```bash
# 安装依赖
cd frontend
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

#### 3. 后端部署
```bash
# 安装依赖
cd backend
npm install

# 配置环境变量
cp .env.example .env
# 修改 .env 文件中的配置

# 启动开发服务器
npm run dev

# 启动生产服务器
npm run start
```

### 二、生产环境部署

#### 1. 服务器配置
- **云服务商**：阿里云/腾讯云/华为云
- **服务器规格**：4核8GB内存起步
- **操作系统**：Linux（Ubuntu 22.04 LTS）

#### 2. 数据库部署
- **MongoDB**：使用云数据库MongoDB服务或自建副本集
- **Redis**：使用云数据库Redis服务或自建集群

#### 3. 应用部署
- **前端**：部署到Nginx或CDN
- **后端**：使用PM2进程管理工具部署
- **负载均衡**：使用Nginx或云负载均衡服务

#### 4. CI/CD流程
```
代码提交 → Git触发 → 自动化测试 → 构建 → 部署到测试环境 → 人工验证 → 部署到生产环境
```

#### 5. 环境变量配置
```bash
# .env 文件示例
PORT=3000
MONGODB_URI=mongodb://localhost:27017/heart_confessional
REDIS_URI=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key
AI_API_KEY=your_ai_api_key
AI_API_URL=https://api.example.com/v1/chat/completions

# 限流配置
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=60000

# 日志配置
LOG_LEVEL=info
LOG_FILE=./logs/app.log

# 监控配置
METRICS_PORT=9090
```

### 三、API限流策略

#### 1. 限流目标
- **防止API滥用**：保护系统免受恶意请求攻击
- **资源合理分配**：确保所有用户公平使用系统资源
- **成本控制**：控制大模型API调用成本

#### 2. 限流策略

##### 用户级限流
- **普通用户**：每分钟最多100次请求
- **匿名用户**：每分钟最多50次请求
- **认证用户**：每分钟最多150次请求

##### 接口级限流
- **对话接口**：每分钟最多20次请求（防止过度对话）
- **AI生成接口**：每分钟最多10次请求（控制API成本）
- **其他接口**：每分钟最多100次请求

##### 全局限流
- **系统总请求**：每分钟最多10000次请求
- **AI API调用**：每分钟最多1000次请求

#### 3. 限流实现
- **使用express-rate-limit中间件**：实现用户级和接口级限流
- **使用Redis存储限流状态**：支持分布式部署
- **返回429状态码**：超过限流时返回"请求过于频繁"

#### 4. 限流响应格式
```json
{
  "success": false,
  "message": "请求过于频繁，请稍后再试",
  "data": {
    "retry_after": 60,
    "limit": 100,
    "remaining": 0
  }
}
```

### 四、生产环境监控与日志

#### 1. 日志系统

##### 日志级别
- **DEBUG**：详细调试信息
- **INFO**：常规运行信息
- **WARN**：警告信息（可能的问题）
- **ERROR**：错误信息（需要关注）
- **FATAL**：致命错误（系统崩溃）

##### 日志工具
- **Winston**：Node.js日志库
- **日志文件**：按日期轮转，保留30天
- **控制台输出**：开发环境实时输出

##### 日志格式
```json
{
  "timestamp": "2026-07-17T10:30:00.000Z",
  "level": "info",
  "message": "User login successful",
  "meta": {
    "user_id": "uuid-12345",
    "ip": "192.168.1.1",
    "endpoint": "/api/auth/login",
    "response_time": 120
  }
}
```

#### 2. 监控系统

##### 指标监控
- **Prometheus**：指标采集与存储
- **Grafana**：可视化仪表盘
- **关键指标**：
  - API请求次数与响应时间
  - AI API调用次数与成功率
  - 系统CPU、内存、磁盘使用率
  - 用户在线数与活跃度

##### 告警系统
- **Alertmanager**：告警管理
- **告警规则**：
  - API响应时间超过500ms
  - AI API调用成功率低于90%
  - 系统CPU使用率超过80%
  - 内存使用率超过85%
- **告警方式**：邮件、短信、钉钉/企业微信

#### 3. 错误追踪

##### Sentry集成
- **错误捕获**：自动捕获应用程序错误
- **错误追踪**：追踪错误发生的上下文和堆栈信息
- **性能监控**：监控页面加载和API响应性能

##### 错误报告格式
```json
{
  "error_id": "uuid-abcde",
  "timestamp": "2026-07-17T10:30:00.000Z",
  "error_type": "Error",
  "message": "AI API request failed",
  "stack": "...",
  "context": {
    "user_id": "uuid-12345",
    "conversation_id": "uuid-67890",
    "endpoint": "/api/conversations/messages/stream"
  }
}
```

---

## 【开发里程碑】

### 模块优先级排序

| 优先级 | 模块 | 说明 |
|--------|------|------|
| P0 | 用户认证 | 基础功能，其他模块依赖 |
| P0 | 对话模块 | 核心功能，必须优先完成 |
| P0 | AI服务集成 | 对话模块依赖 |
| P0 | 危机识别 | 安全功能，必须优先完成 |
| P1 | 情绪记录 | 情绪分析模块依赖 |
| P1 | 心理知识科普 | 核心功能之一 |
| P1 | 心理测试 | 核心功能之一 |
| P2 | 情绪分析报告 | 依赖情绪记录模块 |
| P2 | 放松练习 | 辅助功能 |
| P2 | 日记记录 | 辅助功能 |
| P2 | 资源推荐 | 辅助功能 |

### 模块依赖关系图

```
用户认证 ──→ 对话模块 ──→ AI服务集成
    │               │
    │               └──→ 危机识别
    │               │
    └──→ 情绪记录 ──→ 情绪分析报告
                    │
                    └──→ 心理知识科普
                    │
                    └──→ 心理测试
                    │
                    └──→ 放松练习
                    │
                    └──→ 日记记录
                    │
                    └──→ 资源推荐
```

### 第一阶段：基础框架搭建（第1-2周）

**目标**：完成项目基础架构，实现用户认证功能

- [ ] 项目初始化（前后端）
- [ ] 技术栈配置（React + Express + MongoDB）
- [ ] 数据库连接配置
- [ ] 用户认证模块开发（注册、登录、匿名登录、JWT认证）
- [ ] 基础API接口开发（健康检查、用户信息）

### 第二阶段：核心对话功能开发（第3-5周）

**目标**：实现核心对话功能，集成大模型API

- [ ] AI服务模块开发（大模型API调用、SSE流式响应）
- [ ] Prompt工程设计（System Prompt构建、上下文管理）
- [ ] 对话模块开发（消息发送、流式输出、对话历史）
- [ ] 危机识别模块开发（风险关键词检测、紧急响应）
- [ ] 情绪记录模块开发（情绪分析、记录存储）

### 第三阶段：扩展功能开发（第6-9周）

**目标**：实现所有扩展功能模块

- [ ] 心理知识科普模块开发（知识卡片、分类浏览、搜索）
- [ ] 心理测试模块开发（测试量表、结果计算、历史记录）
- [ ] 情绪分析报告模块开发（趋势图表、雷达图、心情日历）
- [ ] 放松练习模块开发（呼吸练习、冥想指导）
- [ ] 日记模块开发（日记撰写、分类管理、搜索）
- [ ] 资源推荐模块开发（资源展示、收藏管理）

### 第四阶段：UI优化与测试（第10-12周）

**目标**：优化用户体验，确保系统稳定

- [ ] UI设计优化（温暖治愈风格、动画效果）
- [ ] 响应式适配（桌面端、平板端、移动端）
- [ ] 自动化测试（单元测试、集成测试）
- [ ] 性能优化（加载速度、渲染优化）
- [ ] Bug修复

### 第五阶段：部署上线（第13周）

**目标**：完成生产环境部署，正式上线

- [ ] 生产环境部署（前端Nginx/CDN、后端PM2、数据库配置）
- [ ] 安全审计（数据加密、权限控制、内容安全）
- [ ] 性能测试（压力测试、负载测试）
- [ ] 正式上线

### 关键路径分析

```
项目初始化 → 用户认证 → AI服务集成 → 对话模块 → 危机识别 → 情绪记录 → 情绪分析报告
                              │
                              └──→ 心理知识科普
                              │
                              └──→ 心理测试
```

**关键路径**：项目初始化 → 用户认证 → AI服务集成 → 对话模块 → 危机识别 → 情绪记录 → 情绪分析报告

**关键依赖**：
- 对话模块依赖AI服务集成和用户认证
- 情绪分析报告依赖情绪记录模块
- 心理知识科普依赖知识库数据
- 心理测试依赖测试量表数据

### 资源配置建议

| 阶段 | 前端开发 | 后端开发 | AI工程师 | 测试工程师 |
|------|---------|---------|---------|-----------|
| 第一阶段 | 1人 | 1人 | - | - |
| 第二阶段 | 1人 | 1人 | 1人 | - |
| 第三阶段 | 2人 | 1人 | - | - |
| 第四阶段 | 1人 | 1人 | - | 1人 |
| 第五阶段 | 1人 | 1人 | - | 1人 |

---

## 【附录】

### 一、输出格式规范

#### 知识卡片格式
```markdown
📚 心理知识卡片

### 【知识主题】
[知识主题名称]

### 【核心概念】
[简要解释核心概念]

### 【常见场景】
[结合生活场景举例]

### 【实用技巧】
1. [技巧一]
2. [技巧二]
3. [技巧三]

### 【温馨提示】
[重要提醒]
```

#### 情绪分析报告格式
```markdown
📊 情绪趋势分析报告

### 【报告周期】
[开始日期] ~ [结束日期]

### 【情绪概览】
- 总对话次数：[N]次
- 平均对话时长：[X]分钟
- 最频繁出现的情绪：[情绪名称]

### 【情绪趋势图】
[文字描述趋势]

### 【高频情绪分析】
| 情绪类型 | 出现次数 | 平均强度 | 主要触发场景 |
|---------|---------|---------|-------------|

### 【关键发现】
1. [发现一]
2. [发现二]

### 【成长建议】
1. [建议一]
2. [建议二]

### 【资源推荐】
[推荐资源]
```

#### 考前疏导方案格式
```markdown
🎯 考前焦虑疏导方案

### 【当前状态评估】
- 焦虑水平：[X]/10
- 焦虑来源：[具体来源]
- 主要困扰：[描述]

### 【认知重构引导】
❌ 负面思维：[负面想法]
✅ 替代思维：[理性想法]
💡 验证依据：[证据]

### 【放松练习指导】
[指导内容]

### 【学习计划建议】
[建议内容]

### 【每日正向 Affirmations】
1. [正向语句1]
2. [正向语句2]
3. [正向语句3]

### 【紧急情况处理】
[处理步骤]
```

### 二、API接口汇总表

| 模块 | 接口数量 | 主要功能 |
|------|---------|---------|
| 认证 | 3 | 用户注册、登录、匿名登录 |
| 对话 | 6 | 创建会话、获取列表、发送消息、获取详情、删除对话 |
| 情绪记录 | 2 | 获取记录、生成报告 |
| 知识库 | 4 | 获取分类、搜索、详情 |
| 心理测试 | 4 | 获取列表、详情、提交、历史 |
| 日记 | 5 | 创建、列表、详情、更新、删除 |
| 资源推荐 | 4 | 获取列表、搜索、详情 |
| 收藏 | 3 | 添加、列表、删除 |

### 三、数据库集合汇总表

| 集合名 | 用途 | 预估数据量 |
|--------|------|-----------|
| users | 用户信息 | 百万级 |
| conversations | 对话会话 | 千万级 |
| messages | 消息记录 | 亿级 |
| emotions | 情绪记录 | 千万级 |
| knowledge_base | 知识条目 | 千级 |
| topic_routing | 话题路由 | 千级 |
| tests | 测试量表 | 百级 |
| test_results | 测试结果 | 百万级 |
| diaries | 日记记录 | 百万级 |
| resources | 资源信息 | 千级 |
| favorites | 收藏记录 | 百万级 |

---

**文档结束**

---

*本文档为心灵树洞Web智能体项目的技术开发指南，包含了项目概述、功能需求、UI设计、系统架构、数据库设计、API定义、前端组件规划、安全协议、部署方案和开发里程碑等内容，可作为项目开发和落地的指导文档。*