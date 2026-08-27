const COURSES = [
  {
    "name": "中国近现代史纲要",
    "sem": 1,
    "credit": 3.0,
    "category": "公共基础"
  },
  {
    "name": "国家安全教育",
    "sem": 1,
    "credit": 1.0,
    "category": "公共基础"
  },
  {
    "name": "体育-1",
    "sem": 1,
    "credit": 1.0,
    "category": "公共基础"
  },
  {
    "name": "大学英语（综合）",
    "sem": 1,
    "credit": 4.0,
    "category": "公共基础"
  },
  {
    "name": "高等数学(工)-1",
    "sem": 1,
    "credit": 5.5,
    "category": "公共基础"
  },
  {
    "name": "线性代数(工)",
    "sem": 1,
    "credit": 3.0,
    "category": "公共基础"
  },
  {
    "name": "大学物理Ⅰ-1",
    "sem": 2,
    "credit": 3.5,
    "category": "公共基础"
  },
  {
    "name": "思想道德与法治",
    "sem": 2,
    "credit": 3.0,
    "category": "公共基础"
  },
  {
    "name": "体育-2",
    "sem": 2,
    "credit": 1.0,
    "category": "公共基础"
  },
  {
    "name": "大学英语（高级）",
    "sem": 2,
    "credit": 2.0,
    "category": "公共基础"
  },
  {
    "name": "英语高阶课程",
    "sem": 2,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "高等数学(工)-2",
    "sem": 2,
    "credit": 5.5,
    "category": "公共基础"
  },
  {
    "name": "习近平新时代中国特色社会主义 思想概论",
    "sem": 2,
    "credit": 3.0,
    "category": "公共基础"
  },
  {
    "name": "大学物理Ⅰ-2",
    "sem": 3,
    "credit": 3.5,
    "category": "公共基础"
  },
  {
    "name": "复变函数",
    "sem": 3,
    "credit": 2.0,
    "category": "公共基础"
  },
  {
    "name": "离散数学",
    "sem": 3,
    "credit": 2.0,
    "category": "公共基础"
  },
  {
    "name": "马克思主义基本原理",
    "sem": 3,
    "credit": 3.0,
    "category": "公共基础"
  },
  {
    "name": "体育-3",
    "sem": 3,
    "credit": 1.0,
    "category": "公共基础"
  },
  {
    "name": "概率论与数理统计（工）",
    "sem": 3,
    "credit": 3.0,
    "category": "公共基础"
  },
  {
    "name": "科学计算及其应用",
    "sem": 4,
    "credit": 2.0,
    "category": "公共基础"
  },
  {
    "name": "毛泽东思想和中国特色社会主义 理论体系概论",
    "sem": 4,
    "credit": 3.0,
    "category": "公共基础"
  },
  {
    "name": "体育-4",
    "sem": 4,
    "credit": 1.0,
    "category": "公共基础"
  },
  {
    "name": "工程图学基础与AutoCAD",
    "sem": 2,
    "credit": 2.0,
    "category": "学科基础"
  },
  {
    "name": "电路分析基础",
    "sem": 2,
    "credit": 4.0,
    "category": "学科基础"
  },
  {
    "name": "计算机软件基础",
    "sem": 2,
    "credit": 2.0,
    "category": "学科基础"
  },
  {
    "name": "数字电子技术",
    "sem": 3,
    "credit": 2.0,
    "category": "学科基础"
  },
  {
    "name": "模拟电子技术",
    "sem": 3,
    "credit": 3.0,
    "category": "学科基础"
  },
  {
    "name": "微机原理与应用",
    "sem": 4,
    "credit": 3.0,
    "category": "学科基础"
  },
  {
    "name": "自动控制原理",
    "sem": 4,
    "credit": 4.0,
    "category": "学科基础"
  },
  {
    "name": "机器人基础原理",
    "sem": 4,
    "credit": 2.5,
    "category": "学科基础"
  },
  {
    "name": "电机驱动与运动控制",
    "sem": 5,
    "credit": 3.5,
    "category": "学科基础"
  },
  {
    "name": "机器人感知技术",
    "sem": 5,
    "credit": 2.5,
    "category": "学科基础"
  },
  {
    "name": "现代控制理论",
    "sem": 5,
    "credit": 2.0,
    "category": "学科基础"
  },
  {
    "name": "军事理论",
    "sem": 1,
    "credit": 2.0,
    "category": "实践环节"
  },
  {
    "name": "军事训练",
    "sem": 1,
    "credit": 2.0,
    "category": "实践环节"
  },
  {
    "name": "高级语言综合实践",
    "sem": 1,
    "credit": 2.0,
    "category": "实践环节"
  },
  {
    "name": "物理实验（工）-1",
    "sem": 2,
    "credit": 1.0,
    "category": "实践环节"
  },
  {
    "name": "机械工程训练A",
    "sem": 3,
    "credit": 1.0,
    "category": "实践环节"
  },
  {
    "name": "物理实验（工）-2",
    "sem": 3,
    "credit": 1.0,
    "category": "实践环节"
  },
  {
    "name": "电子技术基础实验",
    "sem": 3,
    "credit": 1.0,
    "category": "实践环节"
  },
  {
    "name": "电子技术综合设计",
    "sem": 4,
    "credit": 1.0,
    "category": "实践环节"
  },
  {
    "name": "嵌入式系统综合实践",
    "sem": 4,
    "credit": 2.0,
    "category": "实践环节"
  },
  {
    "name": "电机驱动与运动控制实验",
    "sem": 5,
    "credit": 1.5,
    "category": "学科基础"
  },
  {
    "name": "机器人感知技术实验",
    "sem": 5,
    "credit": 1.5,
    "category": "学科基础"
  },
  {
    "name": "机器人综合设计与实践",
    "sem": 6,
    "credit": 2.0,
    "category": "实践环节"
  },
  {
    "name": "大模型技术综合实践",
    "sem": 6,
    "credit": 2.0,
    "category": "实践环节"
  },
  {
    "name": "工作实习",
    "sem": 7,
    "credit": 4.0,
    "category": "实践环节"
  },
  {
    "name": "毕业设计（论文）",
    "sem": 8,
    "credit": 8.0,
    "category": "实践环节"
  },
  {
    "name": "信号与系统Ⅲ",
    "sem": 4,
    "credit": 2.0,
    "category": "学科基础"
  },
  {
    "name": "机器人操作系统基础",
    "sem": 4,
    "credit": 2.0,
    "category": "学科基础"
  },
  {
    "name": "Python编程基础",
    "sem": 3,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "数据库原理与应用",
    "sem": 3,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "数字信号处理",
    "sem": 5,
    "credit": 2.5,
    "category": "专业选修"
  },
  {
    "name": "机器人机构设计",
    "sem": 5,
    "credit": 2.5,
    "category": "专业选修"
  },
  {
    "name": "图像处理与机器视觉（双语）",
    "sem": 5,
    "credit": 2.5,
    "category": "专业选修"
  },
  {
    "name": "机器学习与大模型技术（双语）",
    "sem": 5,
    "credit": 2.5,
    "category": "专业选修"
  },
  {
    "name": "机器人动力学与控制",
    "sem": 5,
    "credit": 2.5,
    "category": "专业选修"
  },
  {
    "name": "信息通信网络及应用",
    "sem": 5,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "智能控制技术",
    "sem": 6,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "机器人系统仿真",
    "sem": 5,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "机器人智能交互技术",
    "sem": 6,
    "credit": 2.5,
    "category": "专业选修"
  },
  {
    "name": "具身智能技术",
    "sem": 6,
    "credit": 2.5,
    "category": "专业选修"
  },
  {
    "name": "多机器人系统建模与分析（英 文）",
    "sem": 6,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "人形机器人技术",
    "sem": 6,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "自主信息物理系统",
    "sem": 6,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "机器人导航技术",
    "sem": 6,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "人工神经网络设计",
    "sem": 6,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "协作操控机器人",
    "sem": 6,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "物联网机器人",
    "sem": 6,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "先进控制理论",
    "sem": 7,
    "credit": 2.0,
    "category": "专业选修"
  },
  {
    "name": "新生研讨课",
    "sem": 1,
    "credit": 1.0,
    "category": "自主课程"
  },
  {
    "name": "学术论文写作",
    "sem": 7,
    "credit": 1.0,
    "category": "自主课程"
  },
  {
    "name": "机器人前沿论坛",
    "sem": 7,
    "credit": 1.0,
    "category": "自主课程"
  }
];
