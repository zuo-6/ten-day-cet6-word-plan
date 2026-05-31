(function () {
  "use strict";

  var STORAGE_KEY = "cet6-ten-day-state-v1";
  var VOCAB_KEY = "cet6-ten-day-vocab-v1";
  var ORDER_KEY = "cet6-ten-day-order-v1";
  var SESSION_SIZE = 50;
  var DAYS = 10;
  var SESSIONS_PER_DAY = 6;

  var seedWords = [
    ["abandon", "/əˈbændən/", "v. 放弃；抛弃", "to leave or stop doing something", "He decided to abandon the original plan.", "他决定放弃原来的计划。", "abandon a plan"],
    ["absorb", "/əbˈzɔːrb/", "v. 吸收；理解", "to take in liquid, information, or attention", "Plants absorb water through their roots.", "植物通过根部吸收水分。", "absorb knowledge"],
    ["abstract", "/ˈæbstrækt/", "adj. 抽象的", "existing as an idea rather than a thing", "The article discusses abstract concepts.", "这篇文章讨论抽象概念。", "abstract thinking"],
    ["abundant", "/əˈbʌndənt/", "adj. 丰富的", "more than enough", "The region has abundant natural resources.", "该地区自然资源丰富。", "abundant evidence"],
    ["accelerate", "/əkˈseləreɪt/", "v. 加速", "to make something happen faster", "Technology can accelerate social change.", "技术可以加速社会变化。", "accelerate growth"],
    ["access", "/ˈækses/", "n./v. 使用权；进入", "the ability to use or enter something", "Students need access to reliable databases.", "学生需要使用可靠数据库。", "access information"],
    ["accommodate", "/əˈkɑːmədeɪt/", "v. 容纳；适应", "to provide space or adjust to needs", "The hall can accommodate 500 people.", "大厅可容纳 500 人。", "accommodate demand"],
    ["accumulate", "/əˈkjuːmjəleɪt/", "v. 积累", "to collect gradually", "Small habits accumulate into big results.", "小习惯会积累成大成果。", "accumulate experience"],
    ["accurate", "/ˈækjərət/", "adj. 准确的", "correct and exact", "Accurate data is essential for research.", "准确数据对研究至关重要。", "accurate measurement"],
    ["acknowledge", "/əkˈnɑːlɪdʒ/", "v. 承认；致谢", "to accept or recognize something", "She acknowledged the importance of teamwork.", "她承认团队合作的重要性。", "acknowledge a mistake"],
    ["adapt", "/əˈdæpt/", "v. 适应；改编", "to change to fit new conditions", "Companies must adapt to market changes.", "公司必须适应市场变化。", "adapt to change"],
    ["adequate", "/ˈædɪkwət/", "adj. 足够的", "enough for a purpose", "The project needs adequate funding.", "这个项目需要足够资金。", "adequate preparation"],
    ["advocate", "/ˈædvəkeɪt/", "v./n. 提倡；拥护者", "to publicly support an idea", "Many experts advocate lifelong learning.", "许多专家提倡终身学习。", "advocate reform"],
    ["affect", "/əˈfekt/", "v. 影响", "to influence or change something", "Sleep can affect memory and attention.", "睡眠会影响记忆和注意力。", "affect performance"],
    ["aggregate", "/ˈæɡrɪɡət/", "adj./n. 总计的；合计", "formed by adding parts together", "The aggregate score determines the winner.", "总分决定获胜者。", "aggregate data"],
    ["alternative", "/ɔːlˈtɜːrnətɪv/", "n./adj. 替代方案", "another possible choice", "Online courses offer an alternative path.", "在线课程提供另一种路径。", "alternative solution"],
    ["ambiguous", "/æmˈbɪɡjuəs/", "adj. 模棱两可的", "having more than one possible meaning", "The instructions were ambiguous.", "说明含糊不清。", "ambiguous answer"],
    ["anticipate", "/ænˈtɪsɪpeɪt/", "v. 预期；预见", "to expect something to happen", "We anticipate a rise in demand.", "我们预计需求会上升。", "anticipate problems"],
    ["apparent", "/əˈpærənt/", "adj. 明显的", "easy to see or understand", "The benefits became apparent later.", "好处后来变得明显。", "apparent difference"],
    ["approach", "/əˈproʊtʃ/", "n./v. 方法；接近", "a way of dealing with something", "This approach saves time.", "这种方法节省时间。", "practical approach"],
    ["appropriate", "/əˈproʊpriət/", "adj. 合适的", "suitable for a situation", "Choose an appropriate method.", "选择合适的方法。", "appropriate response"],
    ["approximate", "/əˈprɑːksɪmət/", "adj. 大约的", "close but not exact", "The approximate cost is $200.", "大约费用是 200 美元。", "approximate number"],
    ["arbitrary", "/ˈɑːrbɪtreri/", "adj. 任意的", "based on personal choice rather than reason", "The rule seems arbitrary.", "这条规则似乎很随意。", "arbitrary decision"],
    ["assess", "/əˈses/", "v. 评估", "to judge the value or quality of something", "Teachers assess students' progress.", "教师评估学生进步。", "assess risk"],
    ["assign", "/əˈsaɪn/", "v. 分配；指派", "to give a task to someone", "The manager assigned roles to the team.", "经理给团队分配角色。", "assign responsibility"],
    ["assumption", "/əˈsʌmpʃn/", "n. 假设", "something accepted as true without proof", "The conclusion is based on a weak assumption.", "结论基于一个薄弱假设。", "basic assumption"],
    ["attain", "/əˈteɪn/", "v. 达到；获得", "to achieve something", "Few athletes attain this level.", "很少运动员达到这个水平。", "attain a goal"],
    ["attribute", "/əˈtrɪbjuːt/", "v. 归因于", "to say something is caused by something", "He attributed success to persistence.", "他把成功归因于坚持。", "attribute A to B"],
    ["beneficial", "/ˌbenɪˈfɪʃl/", "adj. 有益的", "having a good effect", "Exercise is beneficial to health.", "锻炼有益健康。", "beneficial effect"],
    ["capacity", "/kəˈpæsəti/", "n. 能力；容量", "ability or amount something can hold", "The system has limited capacity.", "该系统容量有限。", "capacity for learning"],
    ["category", "/ˈkætəɡɔːri/", "n. 类别", "a group of similar things", "Words are grouped by category.", "单词按类别分组。", "broad category"],
    ["cease", "/siːs/", "v. 停止", "to stop happening", "The rain ceased by midnight.", "雨在午夜前停了。", "cease operation"],
    ["challenge", "/ˈtʃælɪndʒ/", "n./v. 挑战", "a difficult task or question", "Climate change is a global challenge.", "气候变化是全球性挑战。", "major challenge"],
    ["circumstance", "/ˈsɜːrkəmstæns/", "n. 情况", "a fact or condition affecting a situation", "Plans change according to circumstances.", "计划会根据情况变化。", "under no circumstances"],
    ["coherent", "/koʊˈhɪrənt/", "adj. 连贯的", "logical and clear", "The essay needs a coherent structure.", "文章需要连贯结构。", "coherent argument"],
    ["collapse", "/kəˈlæps/", "v./n. 倒塌；崩溃", "to fall down or fail suddenly", "The old bridge collapsed.", "旧桥倒塌了。", "economic collapse"],
    ["commence", "/kəˈmens/", "v. 开始", "to begin", "The ceremony will commence at nine.", "仪式九点开始。", "commence work"],
    ["commit", "/kəˈmɪt/", "v. 承诺；犯", "to promise or do something", "They committed resources to the project.", "他们向项目投入资源。", "commit to a plan"],
    ["commodity", "/kəˈmɑːdəti/", "n. 商品", "a product that can be bought or sold", "Oil is an important commodity.", "石油是重要商品。", "basic commodity"],
    ["communicate", "/kəˈmjuːnɪkeɪt/", "v. 交流；传达", "to share information or feelings", "Good leaders communicate clearly.", "优秀领导者表达清晰。", "communicate ideas"],
    ["compatible", "/kəmˈpætəbl/", "adj. 兼容的", "able to work together", "The software is compatible with Edge.", "该软件兼容 Edge。", "compatible system"],
    ["compensate", "/ˈkɑːmpenseɪt/", "v. 补偿", "to make up for loss or harm", "The company compensated customers.", "公司补偿了客户。", "compensate for loss"],
    ["component", "/kəmˈpoʊnənt/", "n. 组成部分", "one part of a larger thing", "Trust is a key component of cooperation.", "信任是合作的关键组成部分。", "major component"],
    ["comprehensive", "/ˌkɑːmprɪˈhensɪv/", "adj. 全面的", "including almost everything", "We need a comprehensive review.", "我们需要全面审查。", "comprehensive plan"],
    ["concentrate", "/ˈkɑːnsntreɪt/", "v. 集中", "to focus attention", "It is hard to concentrate in noise.", "噪声中很难集中注意力。", "concentrate on study"],
    ["concept", "/ˈkɑːnsept/", "n. 概念", "an idea or principle", "The concept is easy to understand.", "这个概念容易理解。", "basic concept"],
    ["conclude", "/kənˈkluːd/", "v. 断定；结束", "to decide after considering facts", "Researchers concluded that sleep matters.", "研究者得出结论：睡眠很重要。", "conclude from evidence"],
    ["conduct", "/kənˈdʌkt/", "v. 进行；实施", "to organize or carry out", "They conducted a survey.", "他们开展了一项调查。", "conduct research"],
    ["confine", "/kənˈfaɪn/", "v. 限制", "to keep within limits", "The report is confined to urban areas.", "报告仅限于城市地区。", "confine oneself to"],
    ["confirm", "/kənˈfɜːrm/", "v. 确认", "to prove or state that something is true", "The results confirmed the theory.", "结果证实了该理论。", "confirm a finding"],
    ["conflict", "/ˈkɑːnflɪkt/", "n. 冲突", "a disagreement or struggle", "The policy caused conflict.", "政策引发了冲突。", "conflict with"],
    ["consequence", "/ˈkɑːnsɪkwens/", "n. 后果", "a result of an action", "Every choice has consequences.", "每个选择都有后果。", "serious consequence"],
    ["considerable", "/kənˈsɪdərəbl/", "adj. 相当大的", "large in amount or degree", "The plan requires considerable effort.", "该计划需要相当大的努力。", "considerable amount"],
    ["consistent", "/kənˈsɪstənt/", "adj. 一致的", "not changing or conflicting", "Consistent practice improves fluency.", "持续练习提高流利度。", "consistent result"],
    ["constitute", "/ˈkɑːnstɪtuːt/", "v. 构成", "to form or be part of something", "Women constitute half the workforce.", "女性构成劳动力的一半。", "constitute evidence"],
    ["constraint", "/kənˈstreɪnt/", "n. 限制", "a limit or restriction", "Time is the main constraint.", "时间是主要限制。", "budget constraint"],
    ["consume", "/kənˈsuːm/", "v. 消耗；消费", "to use resources", "The process consumes much energy.", "这个过程消耗大量能源。", "consume resources"],
    ["contemporary", "/kənˈtempəreri/", "adj. 当代的", "belonging to the present time", "The book examines contemporary culture.", "这本书研究当代文化。", "contemporary society"],
    ["contradict", "/ˌkɑːntrəˈdɪkt/", "v. 反驳；矛盾", "to say the opposite or be inconsistent", "The data contradicts his claim.", "数据与他的说法矛盾。", "contradict evidence"],
    ["contribute", "/kənˈtrɪbjuːt/", "v. 贡献；促成", "to give or help cause something", "Education contributes to social mobility.", "教育促进社会流动。", "contribute to"],
    ["conventional", "/kənˈvenʃənl/", "adj. 传统的", "usual or traditional", "Conventional methods may not work.", "传统方法可能无效。", "conventional wisdom"],
    ["convert", "/kənˈvɜːrt/", "v. 转换", "to change into another form", "Solar panels convert light into electricity.", "太阳能板将光转化为电。", "convert into"],
    ["convince", "/kənˈvɪns/", "v. 说服", "to make someone believe something", "Evidence convinced the committee.", "证据说服了委员会。", "convince someone of"],
    ["cooperate", "/koʊˈɑːpəreɪt/", "v. 合作", "to work together", "Departments must cooperate closely.", "各部门必须紧密合作。", "cooperate with"],
    ["cope", "/koʊp/", "v. 应对", "to deal successfully with difficulty", "Students learn to cope with stress.", "学生学会应对压力。", "cope with pressure"],
    ["core", "/kɔːr/", "n./adj. 核心", "the central or most important part", "Vocabulary is a core skill.", "词汇是核心技能。", "core value"],
    ["criteria", "/kraɪˈtɪriə/", "n. 标准", "standards used to judge something", "The criteria are clearly defined.", "标准被明确定义。", "selection criteria"],
    ["crucial", "/ˈkruːʃl/", "adj. 至关重要的", "extremely important", "Timing is crucial in this experiment.", "时机在实验中至关重要。", "crucial factor"],
    ["decline", "/dɪˈklaɪn/", "v./n. 下降；拒绝", "to become lower or refuse politely", "Sales declined last month.", "上个月销售额下降。", "sharp decline"],
    ["deduce", "/dɪˈduːs/", "v. 推断", "to reach a conclusion from evidence", "We can deduce the cause from the data.", "我们可从数据推断原因。", "deduce from"],
    ["define", "/dɪˈfaɪn/", "v. 定义", "to state the meaning clearly", "The report defines key terms.", "报告定义了关键术语。", "define a concept"],
    ["demonstrate", "/ˈdemənstreɪt/", "v. 展示；证明", "to show clearly", "The results demonstrate the effect.", "结果证明了该影响。", "demonstrate ability"],
    ["derive", "/dɪˈraɪv/", "v. 获得；源于", "to get from a source", "The word derives from Latin.", "该词源于拉丁语。", "derive benefit from"],
    ["detect", "/dɪˈtekt/", "v. 检测；发现", "to notice or discover", "The device detects tiny changes.", "设备检测微小变化。", "detect errors"],
    ["deviate", "/ˈdiːvieɪt/", "v. 偏离", "to move away from a standard", "Do not deviate from the procedure.", "不要偏离流程。", "deviate from"],
    ["dimension", "/daɪˈmenʃn/", "n. 维度；方面", "an aspect or measurement", "The issue has a moral dimension.", "该问题有道德层面。", "social dimension"],
    ["diminish", "/dɪˈmɪnɪʃ/", "v. 减少", "to become less", "The effect may diminish over time.", "效果可能随时间减弱。", "diminish impact"],
    ["discrete", "/dɪˈskriːt/", "adj. 分离的", "separate and distinct", "The data is divided into discrete groups.", "数据被分成独立组。", "discrete unit"],
    ["displace", "/dɪsˈpleɪs/", "v. 取代；使流离", "to move or replace something", "Automation may displace some jobs.", "自动化可能取代一些岗位。", "displace workers"],
    ["distinct", "/dɪˈstɪŋkt/", "adj. 明显不同的", "clearly different", "The two methods are distinct.", "这两种方法明显不同。", "distinct feature"],
    ["diverse", "/daɪˈvɜːrs/", "adj. 多样的", "including many different types", "The class has diverse backgrounds.", "班级背景多样。", "diverse culture"],
    ["domestic", "/dəˈmestɪk/", "adj. 国内的；家庭的", "related to a country or home", "Domestic demand increased.", "国内需求增加。", "domestic market"],
    ["duration", "/duˈreɪʃn/", "n. 持续时间", "the length of time something lasts", "The duration of the exam is two hours.", "考试时长为两小时。", "for the duration of"],
    ["dynamic", "/daɪˈnæmɪk/", "adj. 动态的", "changing and active", "Language is a dynamic system.", "语言是动态系统。", "dynamic process"],
    ["efficient", "/ɪˈfɪʃnt/", "adj. 高效的", "working well with little waste", "The app offers an efficient way to review.", "该应用提供高效复习方式。", "efficient method"],
    ["eliminate", "/ɪˈlɪmɪneɪt/", "v. 消除", "to remove completely", "The policy aims to eliminate waste.", "政策旨在消除浪费。", "eliminate errors"],
    ["emerge", "/ɪˈmɜːrdʒ/", "v. 出现", "to appear or become known", "New problems emerged during testing.", "测试中出现了新问题。", "emerge from"],
    ["emphasis", "/ˈemfəsɪs/", "n. 强调", "special importance given to something", "The course places emphasis on practice.", "课程强调练习。", "place emphasis on"],
    ["empirical", "/ɪmˈpɪrɪkl/", "adj. 实证的", "based on observation or experience", "The theory needs empirical support.", "该理论需要实证支持。", "empirical evidence"],
    ["encounter", "/ɪnˈkaʊntər/", "v./n. 遇到", "to meet or experience", "You may encounter unfamiliar words.", "你可能遇到生词。", "encounter difficulty"],
    ["enhance", "/ɪnˈhæns/", "v. 提高；增强", "to improve quality or value", "Reading can enhance vocabulary.", "阅读可以提升词汇量。", "enhance efficiency"],
    ["ensure", "/ɪnˈʃʊr/", "v. 确保", "to make certain", "Check twice to ensure accuracy.", "检查两遍以确保准确。", "ensure safety"],
    ["equivalent", "/ɪˈkwɪvələnt/", "adj./n. 等同的", "equal in value or meaning", "This word has no exact equivalent.", "这个词没有完全对应词。", "equivalent to"],
    ["establish", "/ɪˈstæblɪʃ/", "v. 建立；确立", "to create or prove", "The study established a connection.", "研究确立了联系。", "establish a system"],
    ["evaluate", "/ɪˈvæljueɪt/", "v. 评估", "to judge value or quality", "We need to evaluate the results.", "我们需要评估结果。", "evaluate performance"],
    ["evident", "/ˈevɪdənt/", "adj. 明显的", "clear and easy to see", "The pattern is evident in the chart.", "图表中模式很明显。", "evident from"],
    ["exceed", "/ɪkˈsiːd/", "v. 超过", "to be greater than a limit", "Demand exceeded supply.", "需求超过供给。", "exceed expectations"],
    ["exclude", "/ɪkˈskluːd/", "v. 排除", "to leave out", "The survey excludes children.", "调查不包括儿童。", "exclude from"],
    ["expand", "/ɪkˈspænd/", "v. 扩大", "to become larger", "The company plans to expand overseas.", "公司计划向海外扩张。", "expand access"],
    ["explicit", "/ɪkˈsplɪsɪt/", "adj. 明确的", "clear and direct", "The rules are explicit.", "规则很明确。", "explicit instruction"],
    ["exploit", "/ɪkˈsplɔɪt/", "v. 利用；剥削", "to use something for advantage", "Firms exploit new technology.", "企业利用新技术。", "exploit resources"],
    ["external", "/ɪkˈstɜːrnl/", "adj. 外部的", "from outside", "External factors affected the outcome.", "外部因素影响了结果。", "external pressure"],
    ["facilitate", "/fəˈsɪlɪteɪt/", "v. 促进", "to make easier", "Clear rules facilitate cooperation.", "清晰规则促进合作。", "facilitate learning"],
    ["factor", "/ˈfæktər/", "n. 因素", "something that influences a result", "Cost is an important factor.", "成本是重要因素。", "key factor"],
    ["feature", "/ˈfiːtʃər/", "n. 特征；功能", "an important part or quality", "The app has a review feature.", "该应用有复习功能。", "distinctive feature"],
    ["fluctuate", "/ˈflʌktʃueɪt/", "v. 波动", "to change frequently", "Prices fluctuate with demand.", "价格随需求波动。", "fluctuate widely"],
    ["focus", "/ˈfoʊkəs/", "v./n. 集中；焦点", "to give attention to one thing", "Focus on high-frequency words first.", "先关注高频词。", "focus on"],
    ["fundamental", "/ˌfʌndəˈmentl/", "adj. 基本的", "central and important", "Vocabulary is fundamental to reading.", "词汇是阅读的基础。", "fundamental principle"],
    ["generate", "/ˈdʒenəreɪt/", "v. 产生", "to produce or create", "The model generates examples.", "模型生成例句。", "generate income"],
    ["hypothesis", "/haɪˈpɑːθəsɪs/", "n. 假设", "an idea to be tested", "The hypothesis was supported by data.", "数据支持了该假设。", "test a hypothesis"],
    ["identical", "/aɪˈdentɪkl/", "adj. 完全相同的", "exactly the same", "The results are nearly identical.", "结果几乎完全相同。", "identical to"],
    ["identify", "/aɪˈdentɪfaɪ/", "v. 识别", "to recognize or find", "The system identifies weak words.", "系统识别薄弱单词。", "identify causes"],
    ["illustrate", "/ˈɪləstreɪt/", "v. 说明", "to explain with examples", "The chart illustrates the trend.", "图表说明了趋势。", "illustrate a point"],
    ["impact", "/ˈɪmpækt/", "n./v. 影响", "a strong effect", "The policy had a major impact.", "政策产生重大影响。", "impact on"],
    ["implement", "/ˈɪmplɪment/", "v. 实施", "to put a plan into action", "The school implemented a new program.", "学校实施了新项目。", "implement policy"],
    ["implicit", "/ɪmˈplɪsɪt/", "adj. 含蓄的", "suggested but not directly stated", "The message is implicit.", "信息是含蓄表达的。", "implicit meaning"],
    ["impose", "/ɪmˈpoʊz/", "v. 强加；征收", "to force a rule or burden", "The city imposed new restrictions.", "城市实施了新限制。", "impose limits"],
    ["incentive", "/ɪnˈsentɪv/", "n. 激励", "something that encourages action", "Rewards provide an incentive to learn.", "奖励提供学习动力。", "financial incentive"],
    ["incidence", "/ˈɪnsɪdəns/", "n. 发生率", "the rate at which something happens", "The incidence of disease declined.", "疾病发生率下降。", "high incidence"],
    ["incline", "/ɪnˈklaɪn/", "v. 倾向于", "to tend to think or act", "I incline to agree with her.", "我倾向于同意她。", "be inclined to"],
    ["incorporate", "/ɪnˈkɔːrpəreɪt/", "v. 包含；合并", "to include as part of something", "The design incorporates user feedback.", "设计纳入了用户反馈。", "incorporate into"],
    ["indicate", "/ˈɪndɪkeɪt/", "v. 表明", "to show or suggest", "The data indicates improvement.", "数据显示有所改善。", "indicate that"],
    ["inevitable", "/ɪnˈevɪtəbl/", "adj. 不可避免的", "certain to happen", "Some errors are inevitable.", "一些错误不可避免。", "inevitable result"],
    ["infer", "/ɪnˈfɜːr/", "v. 推断", "to form an opinion from evidence", "Readers infer meaning from context.", "读者从语境推断含义。", "infer from"],
    ["inhibit", "/ɪnˈhɪbɪt/", "v. 抑制；阻碍", "to slow or prevent", "Fear can inhibit creativity.", "恐惧会抑制创造力。", "inhibit growth"],
    ["initial", "/ɪˈnɪʃl/", "adj. 最初的", "at the beginning", "The initial results were promising.", "初步结果很有希望。", "initial stage"],
    ["innovation", "/ˌɪnəˈveɪʃn/", "n. 创新", "a new idea or method", "Innovation drives economic growth.", "创新推动经济增长。", "technological innovation"],
    ["insight", "/ˈɪnsaɪt/", "n. 洞察", "a deep understanding", "The interview gave us new insight.", "访谈给了我们新洞察。", "insight into"],
    ["integrate", "/ˈɪntɪɡreɪt/", "v. 整合", "to combine parts into a whole", "The platform integrates review and testing.", "平台整合复习与测试。", "integrate with"],
    ["intense", "/ɪnˈtens/", "adj. 强烈的", "very strong", "The course requires intense effort.", "课程需要高强度投入。", "intense competition"],
    ["interact", "/ˌɪntərˈækt/", "v. 互动", "to communicate or affect each other", "Students interact in small groups.", "学生在小组中互动。", "interact with"],
    ["interpret", "/ɪnˈtɜːrprət/", "v. 解释", "to explain meaning", "It is hard to interpret the data.", "这些数据很难解释。", "interpret results"],
    ["interval", "/ˈɪntərvl/", "n. 间隔", "a period between events", "Review words at fixed intervals.", "按固定间隔复习单词。", "regular interval"],
    ["intrinsic", "/ɪnˈtrɪnsɪk/", "adj. 内在的", "belonging naturally", "Learning has intrinsic value.", "学习有内在价值。", "intrinsic motivation"],
    ["investigate", "/ɪnˈvestɪɡeɪt/", "v. 调查", "to examine carefully", "Scientists investigated the cause.", "科学家调查原因。", "investigate a case"],
    ["isolate", "/ˈaɪsəleɪt/", "v. 隔离；分离", "to separate from others", "Researchers isolated the variable.", "研究者分离了变量。", "isolate from"],
    ["justify", "/ˈdʒʌstɪfaɪ/", "v. 证明合理", "to show a good reason for something", "The evidence justifies the decision.", "证据证明该决定合理。", "justify action"],
    ["label", "/ˈleɪbl/", "v./n. 标记", "to mark or describe", "Each word is labeled by topic.", "每个词按主题标记。", "label as"],
    ["maintain", "/meɪnˈteɪn/", "v. 维持；主张", "to keep or state firmly", "Maintain a steady learning pace.", "保持稳定学习节奏。", "maintain balance"],
    ["mature", "/məˈtʃʊr/", "adj. 成熟的", "fully developed", "A mature system handles errors well.", "成熟系统能良好处理错误。", "mature market"],
    ["maximize", "/ˈmæksɪmaɪz/", "v. 最大化", "to make as large as possible", "Review helps maximize retention.", "复习有助于最大化记忆保持。", "maximize benefits"],
    ["mechanism", "/ˈmekənɪzəm/", "n. 机制", "a process that makes something happen", "The review mechanism is simple.", "复习机制很简单。", "market mechanism"],
    ["mediate", "/ˈmiːdieɪt/", "v. 调解；影响", "to help settle or affect indirectly", "Culture may mediate behavior.", "文化可能影响行为。", "mediate conflict"],
    ["method", "/ˈmeθəd/", "n. 方法", "a way of doing something", "Choose a method that fits you.", "选择适合你的方法。", "effective method"],
    ["minimize", "/ˈmɪnɪmaɪz/", "v. 最小化", "to reduce as much as possible", "Good design minimizes distraction.", "好设计尽量减少干扰。", "minimize risk"],
    ["modify", "/ˈmɑːdɪfaɪ/", "v. 修改", "to change slightly", "You can modify the plan.", "你可以修改计划。", "modify behavior"],
    ["monitor", "/ˈmɑːnɪtər/", "v. 监控", "to watch and check", "The app monitors progress locally.", "应用在本地监控进度。", "monitor changes"],
    ["mutual", "/ˈmjuːtʃuəl/", "adj. 相互的", "shared by two or more people", "Trust is based on mutual respect.", "信任基于相互尊重。", "mutual benefit"],
    ["neglect", "/nɪˈɡlekt/", "v. 忽视", "to fail to give attention", "Do not neglect pronunciation.", "不要忽视发音。", "neglect duty"],
    ["notion", "/ˈnoʊʃn/", "n. 概念；想法", "an idea or belief", "The notion is widely accepted.", "这个观念被广泛接受。", "basic notion"],
    ["objective", "/əbˈdʒektɪv/", "n./adj. 目标；客观的", "a goal or unbiased", "The objective is clear.", "目标很清楚。", "objective evidence"],
    ["obtain", "/əbˈteɪn/", "v. 获得", "to get something", "Students obtain information online.", "学生在线获取信息。", "obtain data"],
    ["obvious", "/ˈɑːbviəs/", "adj. 明显的", "easy to see", "The reason is obvious.", "原因很明显。", "obvious advantage"],
    ["occupy", "/ˈɑːkjupaɪ/", "v. 占据", "to take up space or time", "Work occupies most of his day.", "工作占据他一天大部分时间。", "occupy space"],
    ["occur", "/əˈkɜːr/", "v. 发生", "to happen", "Errors may occur during import.", "导入时可能发生错误。", "occur to someone"],
    ["option", "/ˈɑːpʃn/", "n. 选项", "a possible choice", "Users can choose another option.", "用户可选择另一个选项。", "available option"],
    ["orient", "/ˈɔːrient/", "v. 使适应；定位", "to direct toward a purpose", "The course is oriented toward exams.", "课程面向考试。", "orient toward"],
    ["outcome", "/ˈaʊtkʌm/", "n. 结果", "the result of an action", "The outcome depends on practice.", "结果取决于练习。", "learning outcome"],
    ["overall", "/ˌoʊvərˈɔːl/", "adj. 总体的", "considering everything", "Overall progress is steady.", "总体进度稳定。", "overall effect"],
    ["parallel", "/ˈpærəlel/", "adj. 平行的；相似的", "similar or happening at the same time", "The two cases are parallel.", "两个案例相似。", "parallel structure"],
    ["parameter", "/pəˈræmɪtər/", "n. 参数；范围", "a limit or variable", "Set the review parameters carefully.", "仔细设置复习参数。", "key parameter"],
    ["participate", "/pɑːrˈtɪsɪpeɪt/", "v. 参与", "to take part", "Students participate in discussions.", "学生参与讨论。", "participate in"],
    ["perceive", "/pərˈsiːv/", "v. 感知；认为", "to notice or understand", "People perceive risk differently.", "人们对风险的感知不同。", "perceive as"],
    ["period", "/ˈpɪriəd/", "n. 时期", "a length of time", "Review after a short period.", "短时间后复习。", "period of time"],
    ["persist", "/pərˈsɪst/", "v. 坚持；持续", "to continue despite difficulty", "The problem may persist.", "问题可能持续存在。", "persist in"],
    ["perspective", "/pərˈspektɪv/", "n. 视角", "a way of thinking", "Try to see another perspective.", "试着看另一个视角。", "from a perspective"],
    ["phase", "/feɪz/", "n. 阶段", "a stage in a process", "The project entered a new phase.", "项目进入新阶段。", "initial phase"],
    ["phenomenon", "/fəˈnɑːmɪnən/", "n. 现象", "something that happens or exists", "The phenomenon is common.", "这种现象很常见。", "social phenomenon"],
    ["policy", "/ˈpɑːləsi/", "n. 政策", "a plan or rule of action", "The policy encourages innovation.", "政策鼓励创新。", "public policy"],
    ["portion", "/ˈpɔːrʃn/", "n. 部分", "a part of a whole", "A large portion of time is spent reading.", "大量时间花在阅读上。", "portion of"],
    ["potential", "/pəˈtenʃl/", "adj./n. 潜在的；潜力", "possible but not yet developed", "The idea has great potential.", "这个想法很有潜力。", "potential risk"],
    ["precise", "/prɪˈsaɪs/", "adj. 精确的", "exact and accurate", "Use precise language in writing.", "写作中使用精确语言。", "precise meaning"],
    ["predict", "/prɪˈdɪkt/", "v. 预测", "to say what will happen", "It is hard to predict demand.", "需求很难预测。", "predict outcomes"],
    ["preliminary", "/prɪˈlɪmɪneri/", "adj. 初步的", "coming before the main part", "Preliminary results look positive.", "初步结果看起来积极。", "preliminary study"],
    ["presume", "/prɪˈzuːm/", "v. 假定", "to suppose something is true", "We presume the data is accurate.", "我们假定数据准确。", "presume that"],
    ["previous", "/ˈpriːviəs/", "adj. 先前的", "existing before", "Review previous words daily.", "每天复习之前的单词。", "previous study"],
    ["primary", "/ˈpraɪmeri/", "adj. 主要的", "most important", "The primary goal is retention.", "主要目标是记住。", "primary reason"],
    ["principle", "/ˈprɪnsəpl/", "n. 原则", "a basic rule or belief", "The principle is simple.", "原则很简单。", "basic principle"],
    ["priority", "/praɪˈɔːrəti/", "n. 优先事项", "something more important", "High-frequency words are the priority.", "高频词是优先事项。", "top priority"],
    ["proceed", "/proʊˈsiːd/", "v. 继续进行", "to continue", "Proceed to the next session.", "继续进入下一组。", "proceed with"],
    ["process", "/ˈprɑːses/", "n. 过程", "a series of actions", "Learning is a gradual process.", "学习是渐进过程。", "learning process"],
    ["prohibit", "/prəˈhɪbɪt/", "v. 禁止", "to forbid by rule", "The rules prohibit cheating.", "规则禁止作弊。", "prohibit from"],
    ["promote", "/prəˈmoʊt/", "v. 促进；推广", "to encourage or support", "Reading promotes vocabulary growth.", "阅读促进词汇增长。", "promote development"],
    ["proportion", "/prəˈpɔːrʃn/", "n. 比例", "a part compared with a whole", "A high proportion passed the test.", "高比例的人通过考试。", "large proportion"],
    ["prospect", "/ˈprɑːspekt/", "n. 前景", "a possibility or chance", "The career prospects are good.", "职业前景不错。", "future prospect"],
    ["pursue", "/pərˈsuː/", "v. 追求", "to try to achieve", "She pursued higher education.", "她追求高等教育。", "pursue a goal"],
    ["radical", "/ˈrædɪkl/", "adj. 激进的；根本的", "very new or complete", "The reform was radical.", "改革很彻底。", "radical change"],
    ["range", "/reɪndʒ/", "n. 范围", "a variety or limit", "The course covers a wide range of topics.", "课程涵盖广泛话题。", "range of"],
    ["ratio", "/ˈreɪʃioʊ/", "n. 比率", "relationship between two amounts", "The ratio of teachers to students improved.", "师生比例改善。", "high ratio"],
    ["recover", "/rɪˈkʌvər/", "v. 恢复", "to return to normal", "The economy began to recover.", "经济开始恢复。", "recover from"],
    ["refine", "/rɪˈfaɪn/", "v. 改进；精炼", "to improve by small changes", "Refine your learning strategy.", "改进你的学习策略。", "refine a method"],
    ["regime", "/reɪˈʒiːm/", "n. 制度；政权", "a system of rule or management", "The new regime changed policy.", "新制度改变了政策。", "regulatory regime"],
    ["reinforce", "/ˌriːɪnˈfɔːrs/", "v. 加强", "to make stronger", "Review reinforces memory.", "复习加强记忆。", "reinforce learning"],
    ["reject", "/rɪˈdʒekt/", "v. 拒绝", "to refuse to accept", "The committee rejected the proposal.", "委员会拒绝了提案。", "reject an idea"],
    ["relevant", "/ˈreləvənt/", "adj. 相关的", "connected with the subject", "Use relevant examples.", "使用相关例子。", "relevant to"],
    ["reluctant", "/rɪˈlʌktənt/", "adj. 不情愿的", "not willing", "He was reluctant to change.", "他不愿改变。", "reluctant to"],
    ["require", "/rɪˈkwaɪər/", "v. 要求", "to need or demand", "Success requires discipline.", "成功需要自律。", "require effort"],
    ["resident", "/ˈrezɪdənt/", "n. 居民", "a person living in a place", "Residents supported the plan.", "居民支持该计划。", "local resident"],
    ["resolve", "/rɪˈzɑːlv/", "v. 解决；决定", "to solve or decide firmly", "They resolved the dispute.", "他们解决了争端。", "resolve conflict"],
    ["resource", "/ˈriːsɔːrs/", "n. 资源", "something useful", "Time is a valuable resource.", "时间是宝贵资源。", "learning resource"],
    ["respond", "/rɪˈspɑːnd/", "v. 回应", "to answer or react", "The system responds quickly.", "系统响应很快。", "respond to"],
    ["retain", "/rɪˈteɪn/", "v. 保持；记住", "to keep", "Spaced review helps retain words.", "间隔复习帮助记住单词。", "retain information"],
    ["reveal", "/rɪˈviːl/", "v. 揭示", "to show something hidden", "The data revealed a pattern.", "数据揭示了一种模式。", "reveal truth"],
    ["rigid", "/ˈrɪdʒɪd/", "adj. 僵硬的；严格的", "not flexible", "A rigid schedule may fail.", "僵硬的时间表可能失败。", "rigid rule"],
    ["scenario", "/səˈnærioʊ/", "n. 情景", "a possible situation", "Consider the worst scenario.", "考虑最坏情景。", "possible scenario"],
    ["scope", "/skoʊp/", "n. 范围", "the range of something", "The scope of the study is limited.", "研究范围有限。", "scope of work"],
    ["sequence", "/ˈsiːkwəns/", "n. 顺序", "a set order", "Words appear in a review sequence.", "单词按复习顺序出现。", "sequence of events"],
    ["shift", "/ʃɪft/", "v./n. 转变", "to change position or direction", "The market shifted rapidly.", "市场快速转变。", "shift from A to B"],
    ["significant", "/sɪɡˈnɪfɪkənt/", "adj. 重要的；显著的", "important or noticeable", "The change is significant.", "变化很显著。", "significant difference"],
    ["simulate", "/ˈsɪmjuleɪt/", "v. 模拟", "to imitate conditions", "The test simulates real exams.", "测试模拟真实考试。", "simulate conditions"],
    ["specify", "/ˈspesɪfaɪ/", "v. 明确说明", "to state exactly", "Specify the format before import.", "导入前明确格式。", "specify requirements"],
    ["sphere", "/sfɪr/", "n. 领域；球体", "an area of activity", "The issue affects every sphere of life.", "该问题影响生活各领域。", "public sphere"],
    ["stable", "/ˈsteɪbl/", "adj. 稳定的", "not changing suddenly", "A stable routine helps learning.", "稳定习惯有助学习。", "stable system"],
    ["strategy", "/ˈstrætədʒi/", "n. 策略", "a plan for achieving a goal", "Use a review strategy.", "使用复习策略。", "effective strategy"],
    ["subsequent", "/ˈsʌbsɪkwənt/", "adj. 随后的", "coming after", "Subsequent reviews are scheduled.", "后续复习已安排。", "subsequent change"],
    ["substitute", "/ˈsʌbstɪtuːt/", "n./v. 替代", "to use instead of another", "This method is not a substitute for practice.", "该方法不能替代练习。", "substitute for"],
    ["sufficient", "/səˈfɪʃnt/", "adj. 足够的", "enough", "You need sufficient review.", "你需要足够复习。", "sufficient evidence"],
    ["summary", "/ˈsʌməri/", "n. 总结", "a short statement of main points", "Read the summary after study.", "学习后阅读总结。", "brief summary"],
    ["sustain", "/səˈsteɪn/", "v. 维持", "to keep going", "Sustain attention for each session.", "每组保持注意力。", "sustain growth"],
    ["symbol", "/ˈsɪmbl/", "n. 象征；符号", "a sign representing something", "The star symbol marks key words.", "星号标记重点词。", "symbol of"],
    ["target", "/ˈtɑːrɡɪt/", "n./v. 目标", "a goal or aim", "The target is 300 words a day.", "目标是每天 300 词。", "target audience"],
    ["terminate", "/ˈtɜːrmɪneɪt/", "v. 终止", "to end", "The contract was terminated.", "合同被终止。", "terminate agreement"],
    ["theory", "/ˈθiːəri/", "n. 理论", "an explanation of facts", "The theory explains memory decay.", "该理论解释记忆衰退。", "scientific theory"],
    ["transfer", "/trænsˈfɜːr/", "v./n. 转移", "to move from one place to another", "Skills transfer across contexts.", "技能可迁移到不同语境。", "transfer knowledge"],
    ["transform", "/trænsˈfɔːrm/", "v. 转变", "to change completely", "Technology transformed education.", "技术改变了教育。", "transform into"],
    ["trend", "/trend/", "n. 趋势", "a general direction of change", "The trend is clear.", "趋势很清楚。", "current trend"],
    ["ultimate", "/ˈʌltɪmət/", "adj. 最终的", "final or most important", "The ultimate goal is fluent reading.", "最终目标是流畅阅读。", "ultimate aim"],
    ["undergo", "/ˌʌndərˈɡoʊ/", "v. 经历", "to experience a change", "The system underwent testing.", "系统经历了测试。", "undergo change"],
    ["uniform", "/ˈjuːnɪfɔːrm/", "adj. 统一的", "the same everywhere", "Use a uniform format.", "使用统一格式。", "uniform standard"],
    ["unique", "/juˈniːk/", "adj. 独特的", "being the only one", "Each learner has unique needs.", "每个学习者都有独特需求。", "unique feature"],
    ["utilize", "/ˈjuːtəlaɪz/", "v. 利用", "to use effectively", "Utilize short breaks for review.", "利用短休息复习。", "utilize resources"],
    ["valid", "/ˈvælɪd/", "adj. 有效的", "reasonable or legally acceptable", "The argument is valid.", "论证是有效的。", "valid reason"],
    ["vary", "/ˈveri/", "v. 变化", "to be different", "Learning speed varies by person.", "学习速度因人而异。", "vary from"],
    ["vehicle", "/ˈviːəkl/", "n. 工具；车辆", "a means for achieving something", "Language is a vehicle for thought.", "语言是思想的载体。", "vehicle for"],
    ["version", "/ˈvɜːrʒn/", "n. 版本", "a form of something", "This is the first version.", "这是第一版。", "latest version"],
    ["via", "/ˈvaɪə/", "prep. 通过", "by way of", "Import words via CSV.", "通过 CSV 导入单词。", "via email"],
    ["violate", "/ˈvaɪəleɪt/", "v. 违反", "to break a rule", "Do not violate copyright.", "不要侵犯版权。", "violate rules"],
    ["virtual", "/ˈvɜːrtʃuəl/", "adj. 虚拟的", "existing on a computer or almost", "Virtual classes are common.", "虚拟课堂很常见。", "virtual environment"],
    ["visible", "/ˈvɪzəbl/", "adj. 可见的", "able to be seen", "Progress should be visible.", "进度应当可见。", "visible change"],
    ["volume", "/ˈvɑːljuːm/", "n. 数量；体积", "amount or size", "The word volume is high.", "单词量很大。", "large volume"],
    ["welfare", "/ˈwelfer/", "n. 福利；福祉", "health and happiness", "Education improves social welfare.", "教育改善社会福祉。", "public welfare"]
  ];

  function buildDefaultVocab() {
    return seedWords.map(function (row, index) {
      return {
        id: "cet6_seed_" + String(index + 1).padStart(4, "0"),
        word: row[0],
        phonetic: row[1],
        meaning: row[2],
        englishMeaning: row[3],
        example: row[4],
        exampleCn: row[5],
        phrase: row[6],
        day: Math.floor(index / (SESSION_SIZE * SESSIONS_PER_DAY)) + 1,
        session: Math.floor((index % (SESSION_SIZE * SESSIONS_PER_DAY)) / SESSION_SIZE) + 1
      };
    });
  }

  function normalizeImported(items) {
    var seenWords = {};
    var unique = items.filter(function (item) {
      var word = String(item && item.word || "").trim().toLowerCase();
      if (!word || seenWords[word]) return false;
      seenWords[word] = true;
      return true;
    });
    return shuffle(unique.filter(function (item) {
      return item && String(item.word || "").trim();
    })).slice(0, 3000).map(function (item, index) {
      return {
        id: item.id || "cet6_import_" + String(index + 1).padStart(4, "0"),
        word: String(item.word || "").trim(),
        phonetic: item.phonetic || "",
        meaning: item.meaning || item.cn || "释义待补充",
        englishMeaning: item.englishMeaning || item.en || "",
        example: item.example || "",
        exampleCn: item.exampleCn || "",
        phrase: item.phrase || "",
        day: Math.floor(index / (SESSION_SIZE * SESSIONS_PER_DAY)) + 1,
        session: Math.floor((index % (SESSION_SIZE * SESSIONS_PER_DAY)) / SESSION_SIZE) + 1
      };
    });
  }

  function csvToObjects(text) {
    var lines = text.replace(/\r/g, "").split("\n").filter(Boolean);
    var headers = splitCsvLine(lines.shift() || "").map(function (h) { return h.trim(); });
    return lines.map(function (line) {
      var cells = splitCsvLine(line);
      return headers.reduce(function (obj, header, index) {
        obj[header] = cells[index] || "";
        return obj;
      }, {});
    });
  }

  function splitCsvLine(line) {
    var result = [];
    var cell = "";
    var quoted = false;
    for (var i = 0; i < line.length; i += 1) {
      var ch = line[i];
      if (ch === '"' && line[i + 1] === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = !quoted;
      } else if (ch === "," && !quoted) {
        result.push(cell);
        cell = "";
      } else {
        cell += ch;
      }
    }
    result.push(cell);
    return result;
  }

  function defaultState() {
    return {
      activeDay: 1,
      activeSession: 1,
      queue: [],
      queueIndex: 0,
      selectedGrade: "",
      revealed: false,
      records: {},
      settings: { autoSpeak: true, usVoice: true, rate: 0.9 }
    };
  }

  var vocab = loadVocab();
  var state = loadState();
  var voices = [];

  var el = {};
  document.addEventListener("DOMContentLoaded", init);

  function init() {
    bindElements();
    bindEvents();
    loadVoices();
    renderAll();
    buildQueue(state.activeDay, state.activeSession, false);
  }

  function bindElements() {
    [
      "browserStatus", "currentDayText", "heroTitle", "heroSub", "ringFill", "overallPercent",
      "learnedCount", "knownCount", "dueCount", "starredCount", "sessionList", "studyMeta",
      "finishSessionBtn", "wordCard", "wordIndex", "speakBtn", "wordText", "phoneticText",
      "meaningArea", "meaningText", "englishMeaningText", "exampleText", "exampleCnText",
      "phraseText", "revealBtn", "againBtn", "starBtn", "nextBtn", "reviewNowBtn",
      "reviewList", "importInput", "searchInput", "exportBtn", "bankList", "autoSpeakToggle",
      "usVoiceToggle", "rateRange", "resetBtn", "backupBtn", "restoreInput"
    ].forEach(function (id) { el[id] = document.getElementById(id); });
  }

  function bindEvents() {
    document.querySelectorAll(".nav-tab").forEach(function (btn) {
      btn.addEventListener("click", function () { showView(btn.dataset.view); });
    });
    el.sessionList.addEventListener("click", function (event) {
      var btn = event.target.closest("[data-session]");
      if (!btn) return;
      state.activeDay = Number(btn.dataset.day);
      state.activeSession = Number(btn.dataset.session);
      buildQueue(state.activeDay, state.activeSession, true);
      showView("study");
    });
    document.querySelectorAll("[data-grade]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.selectedGrade = btn.dataset.grade;
        state.revealed = true;
        renderStudy();
        saveState();
      });
    });
    el.revealBtn.addEventListener("click", function () {
      state.revealed = true;
      renderStudy();
      saveState();
    });
    el.nextBtn.addEventListener("click", nextWord);
    el.againBtn.addEventListener("click", markAgain);
    el.starBtn.addEventListener("click", toggleStar);
    el.speakBtn.addEventListener("click", function () { speak(currentWord() && currentWord().word, true); });
    el.finishSessionBtn.addEventListener("click", function () { showView("today"); });
    el.reviewNowBtn.addEventListener("click", startReview);
    el.importInput.addEventListener("change", importFile);
    el.searchInput.addEventListener("input", renderBank);
    el.exportBtn.addEventListener("click", exportProgress);
    el.backupBtn.addEventListener("click", exportProgress);
    el.restoreInput.addEventListener("change", restoreProgress);
    el.autoSpeakToggle.addEventListener("change", function () {
      state.settings.autoSpeak = el.autoSpeakToggle.checked;
      saveState();
    });
    el.usVoiceToggle.addEventListener("change", function () {
      state.settings.usVoice = el.usVoiceToggle.checked;
      saveState();
    });
    el.rateRange.addEventListener("input", function () {
      state.settings.rate = Number(el.rateRange.value);
      saveState();
    });
    el.resetBtn.addEventListener("click", resetProgress);
    document.addEventListener("keydown", handleKeys);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  function handleKeys(event) {
    if (event.target && /input|textarea|select/i.test(event.target.tagName)) return;
    if (event.key === " ") {
      event.preventDefault();
      state.revealed ? nextWord() : (state.revealed = true, renderStudy(), saveState());
    }
    if (event.key === "1") setGrade("known");
    if (event.key === "2") setGrade("fuzzy");
    if (event.key === "3") setGrade("unknown");
    if (event.key.toLowerCase() === "p") speak(currentWord() && currentWord().word, true);
  }

  function setGrade(grade) {
    state.selectedGrade = grade;
    state.revealed = true;
    renderStudy();
    saveState();
  }

  function showView(name) {
    document.querySelectorAll(".view").forEach(function (view) {
      view.classList.toggle("is-visible", view.id === "view-" + name);
    });
    document.querySelectorAll(".nav-tab").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.view === name);
    });
    if (name === "bank") renderBank();
    if (name === "review") renderReview();
  }

  function buildQueue(day, session, restart) {
    var fresh = shuffle(vocab.filter(function (word) { return word.day === day && word.session === session; }));
    var due = shuffle(getDueWords(day)).slice(0, 20);
    var merged = uniqueWords(shuffle(interleave(fresh, due)));
    state.queue = merged.map(function (word) { return word.id; });
    if (restart || state.queueIndex >= state.queue.length) state.queueIndex = 0;
    state.revealed = false;
    state.selectedGrade = "";
    saveState();
    renderStudy();
  }

  function interleave(fresh, due) {
    var result = [];
    var max = Math.max(fresh.length, due.length);
    for (var i = 0; i < max; i += 1) {
      if (fresh[i]) result.push(fresh[i]);
      if (due[i] && !result.some(function (w) { return w.id === due[i].id; })) result.push(due[i]);
    }
    return result;
  }

  function uniqueWords(words) {
    var seen = {};
    return words.filter(function (word) {
      if (!word || seen[word.id]) return false;
      seen[word.id] = true;
      return true;
    });
  }

  function currentWord() {
    var id = state.queue[state.queueIndex];
    return vocab.find(function (word) { return word.id === id; }) || vocab[0];
  }

  function nextWord() {
    var word = currentWord();
    if (!word) return;
    applyGrade(word, state.selectedGrade || "known");
    state.queueIndex += 1;
    state.revealed = false;
    state.selectedGrade = "";
    if (state.queueIndex >= state.queue.length) {
      state.queueIndex = Math.max(0, state.queue.length - 1);
      completeSession();
      showView("today");
    }
    saveState();
    renderAll();
    if (document.getElementById("view-study").classList.contains("is-visible")) autoSpeakCurrent();
  }

  function applyGrade(word, grade) {
    var record = state.records[word.id] || {};
    record.grade = grade;
    record.seen = true;
    record.count = (record.count || 0) + 1;
    record.lastDay = state.activeDay;
    record.nextDay = grade === "unknown" ? state.activeDay : grade === "fuzzy" ? Math.min(DAYS, state.activeDay + 1) : Math.min(DAYS, state.activeDay + 2);
    if (grade === "known") record.mastered = true;
    if (grade !== "known") record.mastered = false;
    state.records[word.id] = record;
  }

  function markAgain() {
    var word = currentWord();
    if (!word) return;
    if (state.queue.indexOf(word.id, state.queueIndex + 1) < 0) {
      state.queue.splice(Math.min(state.queue.length, state.queueIndex + 4), 0, word.id);
    }
    applyGrade(word, "unknown");
    saveState();
    renderAll();
  }

  function toggleStar() {
    var word = currentWord();
    if (!word) return;
    var record = state.records[word.id] || {};
    record.starred = !record.starred;
    state.records[word.id] = record;
    saveState();
    renderAll();
  }

  function completeSession() {
    var nextSession = state.activeSession + 1;
    if (nextSession > SESSIONS_PER_DAY) {
      state.activeSession = 1;
      state.activeDay = Math.min(DAYS, state.activeDay + 1);
    } else {
      state.activeSession = nextSession;
    }
    buildQueue(state.activeDay, state.activeSession, false);
  }

  function startReview() {
    var due = getDueWords(state.activeDay);
    if (!due.length) return;
    state.queue = due.map(function (word) { return word.id; });
    state.queueIndex = 0;
    state.revealed = false;
    state.selectedGrade = "";
    saveState();
    showView("study");
    renderStudy();
    autoSpeakCurrent();
  }

  function getDueWords(day) {
    return vocab.filter(function (word) {
      var record = state.records[word.id];
      return record && (record.starred || record.nextDay <= day);
    });
  }

  function renderAll() {
    renderToday();
    renderStudy();
    renderReview();
    renderSettings();
  }

  function renderToday() {
    var records = Object.keys(state.records).map(function (id) { return state.records[id]; });
    var learned = records.filter(function (r) { return r.seen; }).length;
    var mastered = records.filter(function (r) { return r.mastered; }).length;
    var starred = records.filter(function (r) { return r.starred; }).length;
    var due = getDueWords(state.activeDay).length;
    var percent = vocab.length ? Math.round((learned / Math.min(3000, vocab.length)) * 100) : 0;
    el.currentDayText.textContent = state.activeDay;
    el.heroTitle.textContent = "Day " + state.activeDay + " · Session " + state.activeSession;
    el.heroSub.textContent = "当前词库 " + vocab.length + " 词。完整模式目标为 3000 词，10 天每天 300 词。";
    el.learnedCount.textContent = learned;
    el.knownCount.textContent = mastered;
    el.dueCount.textContent = due;
    el.starredCount.textContent = starred;
    el.overallPercent.textContent = percent + "%";
    el.ringFill.style.strokeDashoffset = String(320.44 - 320.44 * percent / 100);
    renderSessions();
  }

  function renderSessions() {
    var html = "";
    for (var i = 1; i <= SESSIONS_PER_DAY; i += 1) {
      var words = vocab.filter(function (w) { return w.day === state.activeDay && w.session === i; });
      var done = words.filter(function (w) { return state.records[w.id] && state.records[w.id].seen; }).length;
      var pct = words.length ? Math.round(done / words.length * 100) : 0;
      html += '<article class="session-card"><h3>Session ' + i + '</h3><p>' +
        words.length + ' 个新词 · 已完成 ' + done + '</p><div class="progress"><span style="width:' +
        pct + '%"></span></div><button class="primary-button" type="button" data-day="' +
        state.activeDay + '" data-session="' + i + '">开始</button></article>';
    }
    el.sessionList.innerHTML = html;
  }

  function renderStudy() {
    var word = currentWord();
    if (!word) return;
    var record = state.records[word.id] || {};
    el.studyMeta.textContent = "Day " + state.activeDay + " · Session " + state.activeSession;
    el.wordIndex.textContent = Math.min(state.queueIndex + 1, state.queue.length || 1) + " / " + (state.queue.length || 1);
    el.wordText.textContent = word.word;
    el.phoneticText.textContent = word.phonetic || "音标待补充";
    el.meaningText.textContent = word.meaning || "释义待补充";
    el.englishMeaningText.textContent = word.englishMeaning || "";
    el.exampleText.textContent = word.example || "No example yet.";
    el.exampleCnText.textContent = word.exampleCn || "";
    el.phraseText.textContent = word.phrase ? "搭配：" + word.phrase : "";
    el.meaningArea.hidden = !state.revealed;
    el.revealBtn.hidden = state.revealed;
    el.starBtn.textContent = record.starred ? "取消重点" : "加入重点";
    document.querySelectorAll("[data-grade]").forEach(function (btn) {
      btn.classList.toggle("is-selected", btn.dataset.grade === state.selectedGrade);
    });
  }

  function renderReview() {
    var due = getDueWords(state.activeDay);
    el.reviewList.innerHTML = due.length ? due.map(listItem).join("") : '<div class="notice"><strong>暂无复习词</strong><span>学习中标记为模糊、不认识或重点的单词会出现在这里。</span></div>';
  }

  function renderBank() {
    var keyword = (el.searchInput.value || "").trim().toLowerCase();
    var items = vocab.filter(function (word) {
      return !keyword || [word.word, word.meaning, word.englishMeaning, word.phrase].join(" ").toLowerCase().indexOf(keyword) >= 0;
    }).slice(0, 120);
    el.bankList.innerHTML = items.map(listItem).join("") || '<div class="notice"><strong>没有结果</strong><span>换一个关键词试试。</span></div>';
  }

  function listItem(word) {
    var record = state.records[word.id] || {};
    return '<article class="list-item"><div><strong>' + escapeHtml(word.word) + '</strong><span>' +
      escapeHtml(word.phonetic || "") + ' · ' + escapeHtml(word.meaning || "") + '</span></div><span>Day ' +
      word.day + ' · S' + word.session + (record.starred ? ' · 重点' : '') + '</span></article>';
  }

  function renderSettings() {
    el.autoSpeakToggle.checked = !!state.settings.autoSpeak;
    el.usVoiceToggle.checked = !!state.settings.usVoice;
    el.rateRange.value = state.settings.rate || 0.9;
  }

  function loadVoices() {
    if (!("speechSynthesis" in window)) {
      el.browserStatus.textContent = "当前浏览器不支持发音";
      return;
    }
    voices = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
    el.browserStatus.textContent = voices.length ? "发音已就绪" : "点击播放可初始化发音";
  }

  function autoSpeakCurrent() {
    if (state.settings.autoSpeak) speak(currentWord() && currentWord().word, false);
  }

  function speak(text, userTriggered) {
    if (!text || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = state.settings.usVoice ? "en-US" : "en-GB";
      utterance.rate = state.settings.rate || 0.9;
      var preferred = voices.find(function (voice) {
        return voice.lang && voice.lang.toLowerCase().indexOf(state.settings.usVoice ? "en-us" : "en-gb") === 0;
      });
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
      if (userTriggered) el.browserStatus.textContent = "已播放：" + text;
    } catch (error) {
      el.browserStatus.textContent = "发音启动失败";
    }
  }

  function importFile(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var text = String(reader.result || "");
        var raw = file.name.toLowerCase().endsWith(".json") ? JSON.parse(text) : csvToObjects(text);
        vocab = normalizeImported(raw);
        localStorage.setItem(VOCAB_KEY, JSON.stringify(vocab));
        state = defaultState();
        saveState();
        buildQueue(1, 1, true);
        renderAll();
        showView("today");
      } catch (error) {
        alert("导入失败：请检查 JSON/CSV 格式。");
      }
    };
    reader.readAsText(file, "utf-8");
  }

  function exportProgress() {
    var data = JSON.stringify({
      app: "cet6-ten-day",
      version: 1,
      exportedAt: new Date().toISOString(),
      state: state,
      records: state.records,
      vocabCount: vocab.length
    }, null, 2);
    var blob = new Blob([data], { type: "application/json" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = "cet6-progress.json";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(url); }, 500);
  }

  function restoreProgress(event) {
    var file = event.target.files && event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var payload = JSON.parse(String(reader.result || "{}"));
        var restoredState = payload.state || null;
        if (!restoredState && payload.records) {
          restoredState = defaultState();
          restoredState.records = payload.records;
        }
        if (!restoredState || typeof restoredState !== "object") {
          throw new Error("invalid backup");
        }
        state = Object.assign(defaultState(), restoredState);
        state.settings = Object.assign(defaultState().settings, restoredState.settings || {});
        saveState();
        if (!state.queue || !state.queue.length) {
          buildQueue(state.activeDay || 1, state.activeSession || 1, true);
        }
        renderAll();
        showView("today");
        alert("进度已恢复。");
      } catch (error) {
        alert("恢复失败：请选择由本网站导出的 cet6-progress.json。");
      } finally {
        el.restoreInput.value = "";
      }
    };
    reader.readAsText(file, "utf-8");
  }

  function resetProgress() {
    if (!confirm("确定重置学习进度？词库不会被删除。")) return;
    state = defaultState();
    saveState();
    buildQueue(1, 1, true);
    renderAll();
  }

  function loadVocab() {
    try {
      var saved = JSON.parse(localStorage.getItem(VOCAB_KEY) || "null");
      return saved && saved.length ? saved : buildShuffledDefaultVocab();
    } catch (error) {
      return buildShuffledDefaultVocab();
    }
  }

  function buildShuffledDefaultVocab() {
    var order = getOrCreateDefaultOrder();
    var words = buildDefaultVocab();
    return order.map(function (index) { return words[index]; }).filter(Boolean).map(function (word, index) {
      word.day = Math.floor(index / (SESSION_SIZE * SESSIONS_PER_DAY)) + 1;
      word.session = Math.floor((index % (SESSION_SIZE * SESSIONS_PER_DAY)) / SESSION_SIZE) + 1;
      return word;
    });
  }

  function getOrCreateDefaultOrder() {
    try {
      var saved = JSON.parse(localStorage.getItem(ORDER_KEY) || "null");
      if (saved && saved.length === seedWords.length) return saved;
    } catch (error) {}
    var order = shuffle(seedWords.map(function (_, index) { return index; }));
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    return order;
  }

  function shuffle(items) {
    var array = items.slice();
    for (var i = array.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  function loadState() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return Object.assign(defaultState(), saved || {});
    } catch (error) {
      return defaultState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, function (ch) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch];
    });
  }
}());
