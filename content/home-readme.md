### Hi 👋 我是 ranpin，端侧 AI 工程师。
- 关注方向：智能机器人 / 具身智能、自动驾驶、智能座舱。
- 关注技术：Agent Harness · VLA 与世界模型 · 压缩与量化 · 边缘部署（Jetson Orin / 高通8x97 / NPU）。

🏠 [个人主页](https://ranpin.github.io/)

---

> ###### 2026.07 - 至今
>
> #### 🧰 工具 / 作品（做点可能无用但有意思的）
>
> - **[openResume](https://github.com/ranpin/openResume)** [![🎬 演示Demo](demo-badge.svg)](https://ranpin.github.io/openResume/) — **在线简历中心**：双栏实时预览的简历编辑器 + 经历库 + BYOK 大模型生成简历，四套版式八套配色、真·多页 A4 预览与 PDF/Word 导出（React + TS + Vite 单页应用）。
> - **[easter-egg-map](https://github.com/ranpin/easter-egg-map)** — **基于地理位置的旅行彩蛋 UGC 聚合平台**：把旅途中发现的彩蛋（书、杂志、手写信、盲盒）标记到世界地图上分享（React + TS + Mapbox，前端已上线、后端规划中）。
> - **[MagicEye](https://github.com/ranpin/MagicEye)** — **微信小程序 AR 魔法交互工具**：用手机摄像头对着现实世界，靠手势与 AI 实现时间冻结、时间倒流、点石成金（FastAPI 后端）。

> ###### 2026.07 - 至今
>
> #### 🤖 智能机器人 / 具身智能（学习研究中）
>
> - **[alpamayo-edge](https://github.com/ranpin/alpamayo-edge)** [![🎬 演示Demo](demo-badge.svg)](https://ranpin.github.io/alpamayo-edge/cosmos3-demo/) [![🛣️ 轨迹演示](demo-badge-traj.svg)](https://ranpin.github.io/alpamayo-edge/r1-trajectory/) — **NVIDIA Physical AI 模型在 Jetson Orin 上的边缘部署实证**：一套 TensorRT-Edge 管线部署多代模型——8B VLM 量化五轴实测（INT4/INT8）、Cosmos3-Edge WAM 场景理解、Alpamayo-R1 AV 轨迹（分解注意力打穿 TRT≥11 算子墙），两个真实 Orin 推理 demo。
> - **[homebot-wm](https://github.com/ranpin/homebot-wm)** [![🎬 演示Demo](demo-badge.svg)](https://ranpin.github.io/homebot-wm/) — **视觉扩散策略的压缩与边缘部署**：Push-T 策略从训练走通 ONNX 导出 → INT8 量化 → DDIM 减步 → TensorRT，在 Jetson Orin 实机测延迟与闭环精度。
> - **[spring-festival-dance-robot](https://github.com/ranpin/spring-festival-dance-robot)** [![🎬 演示Demo](demo-badge.svg)](https://ranpin.github.io/spring-festival-dance-robot/) — **复刻「春晚舞蹈机器人」**：一段群舞视频经 PromptHMR → GMR 重定向为 9 台 Unitree G1 的同步动作，Kaggle GPU 推理 + Mac 本地 viser 交互式 3D 演示。

> ###### 2025.07 - 至今
>
> #### 🚗 智能座舱（工作期间）
>
> - **[jevCabin](https://github.com/ranpin/jevCabin)** [![🎬 演示Demo](demo-badge.svg)](https://ranpin.github.io/jevCabin/) — **车载座舱智能助手**：对话走 Qwen-2.5-Omni-7B，车内人员/身份/座位信息提取改用 Jev 类型化决策模型（本地 Laya）替代约 2000 token 的巨型 prompt，零样本人名 F1 0.964、单条 28ms（比旧管线快 27 倍）。
> - **[memolink](https://github.com/ranpin/memolink)** [![🎬 演示Demo](demo-badge.svg)](https://ranpin.github.io/memolink/) — **Jetson Orin 上纯本地跑通的 C++ 端侧 Agent 记忆系统**：提取 → 消解 → 存储 → 检索 → 更新 → 删除 → 版本回溯全链路离线完成，自写 WordPiece 分词器 + ONNX INT8 embedding + 本地 4B 做矛盾消解，附座舱助手应用 demo。
> - **[aadkMemory](https://github.com/ranpin/aadkMemory)** — **基于 FAISS 的对话记忆检索 demo**：C++ 主程序内嵌 Python 解释器做本地向量检索、拼 Top-K 历史进 prompt 后交云端 Qwen 生成（学习性质，本地检索 + 云端生成，非端侧部署）。
> - **[chat_huanhuan](https://github.com/ranpin/chat_huanhuan)** — **《甄嬛传》角色对话系统**：用 LoRA 微调训练甄嬛角色模型，Ollama 部署，配 Streamlit 对话界面与 MCP 服务器。

> ###### 2022.09 - 2025.06
>
> #### 🛣️ 自动驾驶（读研期间）
>
> - **[heat2label](https://github.com/ranpin/heat2label)** [![🎬 演示Demo](demo-badge.svg)](https://ranpin.github.io/heat2label/) — **把模型内部热力图自动转成伪框标注的两路实验**：DAAM 交叉注意力（SD v1.4，生成与标注一趟完成）与 Grad-CAM++（ResNet-101 CAM），输出 COCO 风格 label.json（研究 demo）。
> - **[offroad-judge-suite](https://github.com/ranpin/offroad-judge-suite)** — **2023 自动驾驶越野挑战赛的多传感器评测与数据安全基础设施**：数据加密工具链、通信协议规范、评分配置模板、C++ Qt 参赛端 mock 客户端与 ROS 服务端可视化（已脱敏归档）。
> - **[Resnet50_TensorRT](https://github.com/ranpin/Resnet50_TensorRT)** — **ResNet50 的 TensorRT 推理加速对比**：torch → ONNX → FP32/FP16/INT8 引擎，INT8 用 ImageNet 校准（留作学习参考）。

> ###### 2017.09 - 2021.06
>
> #### 🎓 前后端开发（本科期间）
>
> - **[agriculturalScience](https://github.com/ranpin/agriculturalScience)** — **「智慧e农」移动端 +「土圈后台管理系统」后端**：技术栈 Justep BeX5 / Struts2 + Spring + Hibernate + MySQL；存档仓，源码仅以两个 RAR 压缩包入库、未验证可运行。
> - **[musicPlayer](https://github.com/ranpin/musicPlayer)** — **仿网易云音乐网页播放器「网愈云音乐」**：Vue 2 + axios 走第三方 API 镜像实现搜索、播放、封面、热评与 MV，无构建工具（仅作代码存档）。
> - **[ptaCode](https://github.com/ranpin/ptaCode)** — **PTA 课程习题的练习代码存档**（仓库现为空壳，仅 README）。
> - **[JavaTiku](https://github.com/ranpin/JavaTiku)** — **《Java2 实用教程（第 5 版）》配套练习题库桌面程序**：Java Swing 编写，1243 道题分判断/选择/挑错/读程四种题型（仓内仅编译好的 jar 与 Windows JRE）。
