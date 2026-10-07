import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import { IndustryBenchmark } from './models/IndustryBenchmark.js';
import { Curriculum } from './models/Curriculum.js';
import { Job } from './models/Job.js';
import { Application } from './models/Application.js';
import { MoU } from './models/MoU.js';
import { Student } from './models/Student.js';
import { AIEngine } from './services/aiEngine.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Fallback Seed Data
const initialBenchmarks = [
  {
    id: 'ind-fullstack',
    role: 'Full Stack Developer',
    category: 'Software Engineering',
    demandScore: 95,
    avgSalary: '$85k - $130k / ₹14 - 24 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. / MCA in Computer Science, IT or related STEM branch',
      minCgpa: '6.5 / 10 (or 65% aggregate)',
      experienceLevel: 'Entry-Level / Fresher to Associate (0 - 2 Years)',
      practicalHours: '120+ Practical Laboratory & Hands-on Coding Hours',
      certifications: ['AWS Certified Developer Associate', 'Meta Certified Front-End Developer', 'MongoDB Certified Developer'],
      coreTools: ['React 19', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'Redis', 'Jest', 'Git'],
      capstoneRequirement: 'Deploy full-stack SaaS portal with JWT authentication, role-based access, ACID transactions, and containerized CI/CD pipeline.'
    },
    keySkills: [
      { name: 'React', weight: 95, category: 'Frontend', minProficiency: 'Production React 19, Custom Hooks, State Virtualization, Optimistic UI', labDeliverable: 'Streaming Dashboard with TanStack Table and Optimistic Mutators' },
      { name: 'Node.js', weight: 92, category: 'Backend', minProficiency: 'Asynchronous Event Loop, Cluster Module, Stream Processing, REST & GraphQL', labDeliverable: 'Microservice API with Rate Limiting, Input Validation & Swagger Docs' },
      { name: 'MongoDB', weight: 88, category: 'Databases', minProficiency: 'Aggregation Pipeline, Compound Index Optimization, Transaction Sessions', labDeliverable: 'Multi-Tenant Schema with Complex Aggregations & Explain Plan Optimization' },
      { name: 'PostgreSQL', weight: 86, category: 'Databases', minProficiency: 'ACID Guarantees, Foreign Key Constraints, Joins, Triggers & Connection Pooling', labDeliverable: 'Normalized Financial Ledger Schema with Prisma ORM Migrations' },
      { name: 'Docker', weight: 80, category: 'DevOps', minProficiency: 'Multi-stage Dockerfiles, Container Networking, Health Checks, Non-root execution', labDeliverable: 'Production Multi-Service Docker Compose Setup with NGINX Reverse Proxy' },
      { name: 'AWS Cloud', weight: 78, category: 'Cloud', minProficiency: 'S3 Object Storage, EC2 Provisioning, RDS Postgres, IAM Least Privilege', labDeliverable: 'Secure Static Frontend on S3/CloudFront with Backend on ECS/Fargate' },
      { name: 'Automated Testing', weight: 82, category: 'Quality', minProficiency: 'Unit Testing with Vitest/Jest, E2E Testing with Playwright, Mock Service Worker', labDeliverable: 'Automated CI Test Suite achieving 85%+ Code Branch Coverage' },
      { name: 'System Design', weight: 85, category: 'Architecture', minProficiency: 'Horizontal Scaling, Redis Caching Strategies, Message Queues, Load Balancing', labDeliverable: 'Architecture Blueprint for 100k Concurrent Users with Zero-Downtime Rollout' }
    ],
    emergingTrends: ['Next.js App Router', 'Server Components & Actions', 'GraphQL & tRPC', 'Edge Computing & Cloudflare Workers']
  },
  {
    id: 'ind-cloud-devops',
    role: 'Cloud & DevOps Engineer',
    category: 'Cloud Engineering',
    demandScore: 96,
    avgSalary: '$95k - $140k / ₹14 - 26 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Computer Science, IT, Electronics or Cloud Computing',
      minCgpa: '7.0 / 10 (or 70% aggregate)',
      experienceLevel: 'Fresher to Cloud Engineer (0 - 2 Years)',
      practicalHours: '140+ Cloud Infrastructure & Terminal Lab Hours',
      certifications: ['AWS Solutions Architect Associate', 'CKA (Certified Kubernetes Administrator)', 'HashiCorp Terraform Associate'],
      coreTools: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'ArgoCD', 'Prometheus', 'Grafana', 'Bash', 'AWS/Azure'],
      capstoneRequirement: 'GitOps-driven multi-node Kubernetes cluster with automated canary rollouts, Prometheus alerting, and Terraform IaC.'
    },
    keySkills: [
      { name: 'Docker & Kubernetes', weight: 96, category: 'Containerization', minProficiency: 'Pod Lifecycle, Deployments, StatefulSets, Ingress Controllers, HPA, Helm Charts', labDeliverable: 'Production Multi-Pod Microservices Cluster on EKS/K3s with Helm' },
      { name: 'Terraform & IaC', weight: 92, category: 'Infrastructure', minProficiency: 'State Management, Remote Backends, Reusable Modules, Cloud Provider Providers', labDeliverable: 'Multi-Environment VPC, Subnet, and Security Group Terraform Repository' },
      { name: 'CI/CD Pipelines (GitHub Actions/ArgoCD)', weight: 94, category: 'DevOps', minProficiency: 'Automated Build, Test, Lint, Docker Push, GitOps Sync & Canary Deployment', labDeliverable: 'Zero-Downtime Blue/Green Deployment Pipeline with Automated Rollbacks' },
      { name: 'AWS / Azure / GCP Architecture', weight: 95, category: 'Cloud', minProficiency: 'IAM Policies, VPC Peering, Serverless Lambda, Managed Kubernetes, CloudWatch', labDeliverable: 'Secure High-Availability Architecture spanning Multi-AZs with Bastion Host' },
      { name: 'Linux System Internals & Bash', weight: 88, category: 'Systems', minProficiency: 'Process Schedulers, Systemd Units, File Permissions, Network Sockets, Shell Scripting', labDeliverable: 'Automated Server Hardening & Log Rotation Shell Script Suite' },
      { name: 'Prometheus & Grafana Observability', weight: 86, category: 'Monitoring', minProficiency: 'PromQL Queries, Alertmanager Rules, Exporters, Custom Dashboard Visualizations', labDeliverable: 'Real-Time Kubernetes Cluster Health Dashboard with P99 Latency Alerts' },
      { name: 'Cloud Security & DevSecOps', weight: 89, category: 'Security', minProficiency: 'Secret Management (Vault), Vulnerability Scanning (Trivy), OIDC Federation', labDeliverable: 'Shift-Left Container Vulnerability Gate in Pull Request Workflows' }
    ],
    emergingTrends: ['GitOps & Argo Workflows', 'Platform Engineering & Internal Developer Portals', 'eBPF Kernel Monitoring', 'FinOps Cloud Cost Governance']
  },
  {
    id: 'ind-ai-data',
    role: 'AI / Machine Learning Engineer',
    category: 'Artificial Intelligence',
    demandScore: 98,
    avgSalary: '$110k - $165k / ₹18 - 32 LPA',
    requirements: {
      minDegree: 'B.Tech / M.Tech in AI & Data Science, CSE, Mathematics or Computational Statistics',
      minCgpa: '7.5 / 10 (or 75% aggregate)',
      experienceLevel: 'Entry-Level / Associate AI Researcher (0 - 2 Years)',
      practicalHours: '150+ Machine Learning Labs & GPU Workstation Training Hours',
      certifications: ['TensorFlow Developer Certificate', 'AWS Machine Learning Specialty', 'DeepLearning.AI Generative AI Specialization'],
      coreTools: ['PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'ChromaDB/Pinecone', 'MLflow', 'Docker', 'FastAPI', 'CUDA'],
      capstoneRequirement: 'End-to-end RAG architecture with vector database indexing, evaluation benchmark (RAGAS), and FastAPI inference deployment.'
    },
    keySkills: [
      { name: 'PyTorch / TensorFlow Deep Learning', weight: 96, category: 'AI Core', minProficiency: 'Custom Neural Network Architectures, Backpropagation, Transfer Learning, GPU Acceleration', labDeliverable: 'Trained Vision/NLP Model with Learning Rate Schedulers & Validation Checkpoints' },
      { name: 'LLM Fine-tuning & LoRA', weight: 95, category: 'GenAI', minProficiency: 'Parameter-Efficient Fine-Tuning (PEFT/LoRA), Quantization (bitsandbytes), Instruction Datasets', labDeliverable: 'Domain-Specialized Open-Weights LLM Fine-Tuned for Technical Support Queries' },
      { name: 'RAG Architecture & Vector DBs', weight: 94, category: 'GenAI', minProficiency: 'Dense Embeddings, Semantic Rerankers, Chunking Strategies, Pinecone/Milvus/Chroma', labDeliverable: 'Production Enterprise Knowledge RAG Engine with Source Citations & Reranker' },
      { name: 'MLOps (MLflow, Kubeflow, BentoML)', weight: 90, category: 'MLOps', minProficiency: 'Model Versioning, Experiment Tracking, Drift Detection, Automated Retraining, Model Registry', labDeliverable: 'Containerized Model Serving Pipeline with Automated Performance Benchmarks' },
      { name: 'Feature Engineering & Data Pipelines', weight: 89, category: 'Data', minProficiency: 'Data Imputation, Outlier Handling, Normalization, Pandas, Polars, Vectorized Operations', labDeliverable: 'High-Throughput Feature Pipeline processing 1M+ Records with Schema Checks' },
      { name: 'Model Optimization & TensorRT', weight: 87, category: 'Performance', minProficiency: 'FP16/INT8 Quantization, ONNX Runtime, TensorRT Inference Acceleration, vLLM Engine', labDeliverable: 'Inference Latency Reduction from 120ms to 24ms using vLLM PagedAttention' },
      { name: 'AI Ethics, Guardrails & Evaluation', weight: 88, category: 'Safety', minProficiency: 'Guardrails AI, NeMo Guardrails, Prompt Injection Defense, Hallucination Benchmarks', labDeliverable: 'Automated Red-Teaming & Output Validation Suite for Enterprise Chatbots' }
    ],
    emergingTrends: ['Autonomous Multi-Agent Frameworks (CrewAI/AutoGen)', 'Multimodal Vision-Language Models', 'Edge AI & On-Device SLMs', 'Compound AI Systems']
  },
  {
    id: 'ind-cybersecurity',
    role: 'Cybersecurity & Ethical Hacking Specialist',
    category: 'Information Security & SecOps',
    demandScore: 97,
    avgSalary: '$92k - $148k / ₹16 - 28 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Cybersecurity, Computer Science, IT or Information Security',
      minCgpa: '7.0 / 10 (or 70% aggregate)',
      experienceLevel: 'Security Analyst / Ethical Hacker (0 - 2 Years)',
      practicalHours: '130+ Virtual Pentesting Lab & Cyber Range Hours',
      certifications: ['CompTIA Security+', 'CEH (Certified Ethical Hacker)', 'OSCP (Offensive Security Certified Professional)'],
      coreTools: ['Burp Suite Professional', 'Wireshark', 'Metasploit', 'Nmap', 'Splunk', 'Snort/Suricata', 'Linux Hardening', 'Ghidra'],
      capstoneRequirement: 'Comprehensive enterprise penetration testing report with vulnerability reproduction, OWASP Top 10 remediation, and SIEM alerting.'
    },
    keySkills: [
      { name: 'Network Security & Penetration Testing', weight: 96, category: 'Offensive Security', minProficiency: 'Port Scanning, Banner Grabbing, Exploitation Frameworks, Packet Sniffing, Firewall Evasion', labDeliverable: 'Full-Scope Simulated Network Penetration Test with Executive Vulnerability Report' },
      { name: 'OWASP Top 10 & AppSec Auditing', weight: 95, category: 'Application Security', minProficiency: 'SQL Injection, XSS, CSRF, IDOR, Broken Authentication, Server-Side Request Forgery', labDeliverable: 'Static (SAST) and Dynamic (DAST) Security Audit of Web Application with Fixes' },
      { name: 'Linux Hardening & Burp Suite', weight: 92, category: 'Tools', minProficiency: 'Proxy Interception, Repeater, Intruder, Token Manipulation, SSH Key Policies, IPTables', labDeliverable: 'Hardened Linux Host meeting CIS Benchmark Standards with Automated Scans' },
      { name: 'SIEM & SOC Threat Hunting (Splunk)', weight: 90, category: 'Defensive Security', minProficiency: 'Log Ingestion, Correlation Rules, Incident Response Triage, Threat Detection Playbooks', labDeliverable: 'Configured Splunk SIEM detecting Brute Force and Suspicious Privilege Escalation' },
      { name: 'Applied Cryptography & PKI', weight: 88, category: 'Security Architecture', minProficiency: 'RSA, AES-256-GCM, ECC, Digital Certificates, Certificate Authorities, TLS 1.3 Handshake', labDeliverable: 'Mutual TLS (mTLS) Authentication Layer for Microservices with Vault PKI' },
      { name: 'Cloud Security Posture (CSPM)', weight: 91, category: 'Cloud Security', minProficiency: 'IAM Role Hardening, S3 Bucket Policies, CloudTrail Auditing, GuardDuty Anomaly Alerts', labDeliverable: 'Automated Terraform Guardrail scanning AWS Infrastructure against Compliance Benchmarks' },
      { name: 'Zero Trust Network Architecture', weight: 89, category: 'Architecture', minProficiency: 'Microsegmentation, Continuous Verification, Identity-Aware Proxies, Software-Defined Perimeter', labDeliverable: 'Zero-Trust Access Gateway verifying Device Health and Multi-Factor Authentication' }
    ],
    emergingTrends: ['Zero Trust Architecture & SASE', 'AI-Augmented Threat Hunting & XDR', 'DevSecOps Automated Pipeline Gates', 'Quantum-Resistant Cryptography']
  },
  {
    id: 'ind-data-eng',
    role: 'Big Data Engineer & Pipeline Architect',
    category: 'Data Engineering & Analytics',
    demandScore: 94,
    avgSalary: '$90k - $138k / ₹15 - 26 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Computer Science, Data Science, Information Technology or Statistics',
      minCgpa: '6.8 / 10 (or 68% aggregate)',
      experienceLevel: 'Associate Data Engineer (0 - 2 Years)',
      practicalHours: '125+ Distributed Computing & Database Lab Hours',
      certifications: ['Databricks Certified Data Engineer Associate', 'Snowflake SnowPro Core', 'AWS Certified Data Analytics'],
      coreTools: ['Apache Spark', 'Apache Kafka', 'Snowflake', 'dbt', 'Apache Airflow', 'PostgreSQL', 'Docker', 'Python', 'PySpark'],
      capstoneRequirement: 'Streaming analytics lakehouse pipeline ingesting live Kafka events, transforming with dbt on Snowflake, and orchestrating via Airflow.'
    },
    keySkills: [
      { name: 'Apache Spark & Distributed Computing', weight: 96, category: 'Big Data', minProficiency: 'RDDs, DataFrames, Spark SQL, Catalyst Optimizer, Partitioning, Shuffle Optimization', labDeliverable: 'PySpark Job transforming 10GB Data Lakehouse dataset with Sub-Minute Execution' },
      { name: 'SQL & Data Warehousing (Snowflake/BigQuery)', weight: 95, category: 'Databases', minProficiency: 'Star Schema, Snowflake Clustering, Window Functions, CTEs, Materialized Views', labDeliverable: 'Enterprise Dimensional Data Warehouse Model with Automated Fact and Dimension Tables' },
      { name: 'Apache Kafka & Real-Time Streaming', weight: 92, category: 'Streaming', minProficiency: 'Topics, Partitions, Consumer Groups, Schema Registry (Avro), Exactly-Once Semantics', labDeliverable: 'Real-Time Kafka Event Streaming Producer/Consumer Cluster handling 50k msgs/sec' },
      { name: 'dbt & Modern Data Modeling', weight: 90, category: 'Analytics Engineering', minProficiency: 'Data Lineage, Jinja Templating, Incremental Models, Generic & Singular Testing', labDeliverable: 'Automated dbt Data Modeling Project with Data Quality Assertion Tests' },
      { name: 'Python & PySpark ETL Pipelines', weight: 93, category: 'ETL', minProficiency: 'Object-Oriented ETL Frameworks, Parquet File Formats, Error Handling & Data Reconciliation', labDeliverable: 'Resilient ETL Pipeline with Automated Dead-Letter Queue & Data Quality Notifications' },
      { name: 'Apache Airflow Pipeline Orchestration', weight: 88, category: 'Workflow Automation', minProficiency: 'DAG Design, Sensors, Custom Operators, Dynamic Task Mapping, XComs, Task Retries', labDeliverable: 'Multi-Stage Production Airflow DAG scheduling Dependency-Ordered ETL Batches' },
      { name: 'Data Governance & Data Quality', weight: 86, category: 'Governance', minProficiency: 'Great Expectations, Data Cataloging, Column-Level Lineage, PII Masking, GDPR/HIPAA', labDeliverable: 'Automated Data Quality Profiling Suite with Automated Alerts on Schema Drift' }
    ],
    emergingTrends: ['Apache Iceberg Lakehouse Architecture', 'Real-time Streaming Analytics with Apache Flink', 'Data Mesh Decentralized Domains', 'Vector Data Pipelines for GenAI']
  },
  {
    id: 'ind-mobile-dev',
    role: 'Mobile App Developer (iOS, Android & Flutter)',
    category: 'Mobile Engineering',
    demandScore: 92,
    avgSalary: '$80k - $125k / ₹12 - 22 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. / BCA / MCA in Computer Science, Software Engineering or IT',
      minCgpa: '6.5 / 10 (or 65% aggregate)',
      experienceLevel: 'Mobile Developer (0 - 2 Years)',
      practicalHours: '120+ Mobile Emulator & Device Debugging Lab Hours',
      certifications: ['Google Associate Android Developer', 'Meta Certified iOS Developer', 'Flutter Certified Developer'],
      coreTools: ['Flutter', 'Dart', 'React Native', 'Kotlin', 'Swift', 'Firebase', 'SQLite/Room', 'Fastlane', 'Git'],
      capstoneRequirement: 'Publish-ready offline-first cross-platform mobile application with biometric login, background sync, and push notifications.'
    },
    keySkills: [
      { name: 'Flutter & Dart Cross-Platform', weight: 94, category: 'Frameworks', minProficiency: 'Widget Tree Architecture, BLoC / Riverpod State Management, Custom Painters, Animations', labDeliverable: 'Cross-Platform App with BLoC Pattern, Dark/Light Mode & 60fps Micro-Interactions' },
      { name: 'React Native Mobile Architecture', weight: 92, category: 'Frameworks', minProficiency: 'React Native New Architecture (Fabric/TurboModules), Expo Application Services, Reanimated', labDeliverable: 'Fluid Mobile E-Commerce Interface with Gestures and Animated Layout Transitions' },
      { name: 'Native iOS (Swift) / Android (Kotlin)', weight: 88, category: 'Native Core', minProficiency: 'Kotlin Coroutines, Swift Concurrency (async/await), Jetpack Compose, SwiftUI', labDeliverable: 'Native Mobile Plugin interfacing Device Sensors, Camera & Bluetooth Hardware' },
      { name: 'Mobile REST & GraphQL Client Integration', weight: 90, category: 'Networking', minProficiency: 'Dio / Retrofit HTTP Clients, Token Refresh Interceptors, Apollo GraphQL, Cache Policies', labDeliverable: 'Resilient Networking Layer with Exponential Backoff Retries & Network Status Banner' },
      { name: 'Offline-First SQLite & Room Persistence', weight: 86, category: 'Storage', minProficiency: 'Room Database, Hive / Drift, Vector Sync Clocks, Optimistic Offline Mutator Queues', labDeliverable: 'Notes/Task Mobile App with Instant Offline CRUD and Background Server Reconciliation' },
      { name: 'App Store & Play Store CI/CD Deployment', weight: 85, category: 'DevOps', minProficiency: 'Fastlane Automation, Code Signing Certificates, App Bundle Optimization, Crashlytics', labDeliverable: 'Automated Fastlane Script building Signed APK/AAB and uploading to TestFlight/Play Internal' },
      { name: 'Mobile App Performance & Memory Tuning', weight: 87, category: 'Quality', minProficiency: 'Memory Leak Profiling (Android Studio / Xcode Instruments), Image Caching, Jank Reduction', labDeliverable: 'Performance Profile eliminating Overdraw and keeping Cold Start time under 1.2s' }
    ],
    emergingTrends: ['Kotlin Multiplatform (KMP)', 'On-Device AI/ML Models (CoreML & TensorFlow Lite)', 'Dynamic Island & Spatial UI', 'Predictive Offline Pre-Fetching']
  },
  {
    id: 'ind-embedded-iot',
    role: 'Embedded Systems & IoT Hardware Engineer',
    category: 'Hardware & Embedded Systems',
    demandScore: 91,
    avgSalary: '$82k - $128k / ₹12 - 24 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Electronics & Communication, Electrical, Computer Engineering or Instrumentation',
      minCgpa: '6.8 / 10 (or 68% aggregate)',
      experienceLevel: 'Embedded Systems Engineer (0 - 2 Years)',
      practicalHours: '135+ Hardware Lab & Microcontroller Oscilloscope Hours',
      certifications: ['Arm Certified MCU Engineer', 'Embedded Linux Certified Developer', 'AWS Certified IoT Specialty'],
      coreTools: ['Embedded C', 'C++', 'FreeRTOS', 'ARM Cortex-M', 'ESP32', 'STM32CubeIDE', 'KiCad', 'MQTT', 'Logic Analyzer'],
      capstoneRequirement: 'Hardware prototype running FreeRTOS with multi-sensor telemetry, MQTT cloud transmission, and deep sleep power management.'
    },
    keySkills: [
      { name: 'Embedded C / C++ Firmware Development', weight: 96, category: 'Firmware', minProficiency: 'Bitwise Manipulation, Memory Mapped I/O, Pointers, Volatile Keywords, ISRs', labDeliverable: 'Bare-Metal Firmware Driver for SPI Accelerometer with Interrupt-Driven Sampling' },
      { name: 'Real-Time Operating Systems (FreeRTOS)', weight: 93, category: 'RTOS', minProficiency: 'Task Scheduling, Queues, Binary/Counting Semaphores, Mutex Priority Inversion, Timers', labDeliverable: 'Multi-Task Firmware System managing Display, Sensors & Telemetry without Task Starvation' },
      { name: 'Microcontroller Protocols (I2C, SPI, UART, CAN)', weight: 91, category: 'Hardware Interfacing', minProficiency: 'Protocol Timing, Bus Arbitration, Baud Rates, Frame Checksums, DMA Channels', labDeliverable: 'Reliable CAN-Bus Multi-Node Communication with Error Frame Handling' },
      { name: 'MQTT, BLE & IoT Wireless Networking', weight: 89, category: 'IoT', minProficiency: 'MQTT QoS Levels, TLS on Embedded Devices, BLE GATT Profiles, Wi-Fi Provisioning', labDeliverable: 'Secure End-to-End IoT Gateway streaming TLS-Encrypted Telemetry to Cloud Broker' },
      { name: 'PCB Schematic Design & Hardware Debugging', weight: 86, category: 'Hardware', minProficiency: 'KiCad Schematic Capture, Component Selection, Power Regulators, Logic Analyzer Triage', labDeliverable: 'Fabricated 2-Layer IoT Development Board Schematic with Decoupling & Regulators' },
      { name: 'Low-Power Optimization & Battery Management', weight: 88, category: 'Power', minProficiency: 'Deep Sleep Modes, Wakeup Sources, Power Profiling, Current Shunt Measurements', labDeliverable: 'Battery-Powered Sensor Node achieving 2+ Year Longevity on Coin Cell Battery' },
      { name: 'Embedded Linux & Device Drivers', weight: 87, category: 'Systems', minProficiency: 'Yocto Project, Device Tree Overlays, U-Boot Bootloader, Kernel Module Compilations', labDeliverable: 'Custom Embedded Linux Image booting on Raspberry Pi Compute Module with Custom GPIO Driver' }
    ],
    emergingTrends: ['TinyML on Ultra-Low-Power Microcontrollers', 'Matter Standard for Smart Home Interoperability', 'LoRaWAN Long-Range Smart Cities', 'RISC-V Open Architecture']
  },
  {
    id: 'ind-blockchain',
    role: 'Blockchain & Web3 Smart Contract Engineer',
    category: 'Distributed Systems & FinTech',
    demandScore: 89,
    avgSalary: '$105k - $160k / ₹16 - 32 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Computer Science, Mathematics, Cryptography or Software Engineering',
      minCgpa: '7.0 / 10 (or 70% aggregate)',
      experienceLevel: 'Smart Contract Developer (0 - 2 Years)',
      practicalHours: '120+ Blockchain Testnet & Smart Contract Lab Hours',
      certifications: ['Certified Ethereum Developer', 'ConsenSys Blockchain Developer', 'Chainlink Certified Developer'],
      coreTools: ['Solidity', 'Hardhat/Foundry', 'EVM', 'Rust', 'Ethers.js/Viem', 'OpenZeppelin', 'IPFS', 'Slither'],
      capstoneRequirement: 'Audited DeFi protocol smart contract suite with automated Foundry fuzz testing, reentrancy guards, and Next.js Web3 dApp.'
    },
    keySkills: [
      { name: 'Solidity Smart Contracts & Foundry', weight: 96, category: 'Smart Contracts', minProficiency: 'ERC Standards (ERC-20, ERC-721, ERC-1155), Gas Optimization, Storage Slots, Proxies', labDeliverable: 'Upgradeability Proxy Protocol (UUPS) with Timelock Governance & Foundry Tests' },
      { name: 'Ethereum Virtual Machine (EVM) Architecture', weight: 92, category: 'Blockchain Core', minProficiency: 'Opcodes, Gas Computation, Calldata vs Memory vs Storage, Execution Clients', labDeliverable: 'Gas-Optimized Smart Contract reducing Transaction Execution Costs by 40%' },
      { name: 'Rust & Solana Program Development', weight: 91, category: 'High-Throughput Chains', minProficiency: 'Anchor Framework, Program Derived Addresses (PDAs), Account Serialization, Cross-Program Invocations', labDeliverable: 'Decentralized Escrow Program on Solana with Comprehensive Anchor Unit Tests' },
      { name: 'Web3.js / Viem / Wagmi Frontend Integration', weight: 89, category: 'Web3 Client', minProficiency: 'WalletConnect, RainbowKit, Contract Read/Write Hooks, Event Subscriptions', labDeliverable: 'Responsive Web3 Dashboard with Wallet Authentication and Transaction Toast State' },
      { name: 'Smart Contract Security Auditing & Verification', weight: 94, category: 'Security', minProficiency: 'Reentrancy, Integer Overflow, Flash Loan Exploits, Static Analysis with Slither & Mythril', labDeliverable: 'Comprehensive Formal Verification & Automated Slither Audit Report with Zero Criticals' },
      { name: 'Decentralized Storage & Oracles (Chainlink/IPFS)', weight: 86, category: 'Infrastructure', minProficiency: 'Chainlink Price Feeds, Chainlink Automation, VRF Verifiable Randomness, Filecoin/IPFS', labDeliverable: 'Decentralized Insurance Protocol triggered by Automated Chainlink Weather Oracle' }
    ],
    emergingTrends: ['Zero-Knowledge Proofs (ZK-Rollups & zkSNARKs)', 'Account Abstraction (ERC-4337 Smart Wallets)', 'Real-World Asset (RWA) Tokenization', 'Cross-Chain Interoperability Protocol (CCIP)']
  },
  {
    id: 'ind-uiux-design',
    role: 'UI/UX & Product Design Technologist',
    category: 'Design Engineering',
    demandScore: 90,
    avgSalary: '$75k - $120k / ₹11 - 20 LPA',
    requirements: {
      minDegree: 'B.Des / B.Tech / B.Sc in Interaction Design, Human-Computer Interaction, CS or Multimedia',
      minCgpa: '6.5 / 10 (or 65% aggregate)',
      experienceLevel: 'UI/UX Designer / Design Technologist (0 - 2 Years)',
      practicalHours: '110+ Interactive Prototyping & Usability Testing Lab Hours',
      certifications: ['Google UX Design Professional Certificate', 'Nielsen Norman Group UX Certification', 'Interaction Design Foundation (IxDF)'],
      coreTools: ['Figma', 'FigJam', 'Tailwind CSS', 'Framer Motion', 'Adobe Creative Cloud', 'Miro', 'Storybook', 'Lottie'],
      capstoneRequirement: 'Complete product design case study with persona research, design tokens, responsive Figma components, and clickable React prototype.'
    },
    keySkills: [
      { name: 'Figma Token-Based Design Systems', weight: 96, category: 'Design Systems', minProficiency: 'Auto-Layout 5.0, Component Variants, Design Tokens, Variables & Modes (Light/Dark)', labDeliverable: 'Multi-Brand Enterprise Design System with 80+ Reusable Auto-Layout Components' },
      { name: 'Modern Responsive CSS & Tailwind Architecture', weight: 94, category: 'UI Development', minProficiency: 'Flexbox, CSS Grid, Fluid Typography, Container Queries, Tailwind v4 Utility Best Practices', labDeliverable: 'Pixel-Perfect Responsive Landing Page matching High-Fidelity Figma Specification' },
      { name: 'User Journey Mapping & Wireframing', weight: 90, category: 'UX Strategy', minProficiency: 'Information Architecture, Empathy Maps, Low/High-Fidelity Wireframes, User Flows', labDeliverable: 'Comprehensive UX Case Study addressing User Friction with Documented Solution Impact' },
      { name: 'Web Accessibility & WCAG 2.1 Compliance', weight: 91, category: 'Accessibility', minProficiency: 'Color Contrast Ratios, Screen Reader Semantics (ARIA), Keyboard Tab Navigation, Focus States', labDeliverable: 'Accessibility Audit achieving 100% Lighthouse A11y & WCAG Level AA Certification' },
      { name: 'Interactive Micro-Animations (Framer Motion)', weight: 88, category: 'Motion Design', minProficiency: 'Spring Physics, Gesture Drag/Hover, Shared Layout Transitions, Page Transitions', labDeliverable: 'Interactive Mobile Prototype with Fluid Gestures and Delightful Spring Feedback' },
      { name: 'Usability A/B Testing & User Research', weight: 86, category: 'Research', minProficiency: 'Moderated/Unmoderated Usability Testing, System Usability Scale (SUS), Heatmap Analytics', labDeliverable: 'Synthesized Usability Test Report with Quantitative Task Completion Rates' }
    ],
    emergingTrends: ['AI-Powered Generative Design Co-Pilots', 'Spatial Computing & VisionOS Interface Guidelines', 'Headless Component Systems (Radix/Shadcn)', 'Design-to-Code Automation']
  },
  {
    id: 'ind-sre',
    role: 'Site Reliability Engineer (SRE) & Systems Architect',
    category: 'Infrastructure & Reliability',
    demandScore: 95,
    avgSalary: '$100k - $150k / ₹16 - 28 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Computer Science, Systems Engineering, IT or Distributed Computing',
      minCgpa: '7.2 / 10 (or 72% aggregate)',
      experienceLevel: 'Associate SRE / Systems Engineer (0 - 2 Years)',
      practicalHours: '140+ Distributed Systems & High-Availability Lab Hours',
      certifications: ['Google Cloud Professional Cloud DevOps Engineer', 'CKA (Certified Kubernetes Administrator)', 'AWS Certified DevOps Engineer Professional'],
      coreTools: ['Kubernetes', 'Prometheus', 'Grafana', 'OpenTelemetry', 'Chaos Mesh', 'Go', 'Python', 'Envoy', 'PagerDuty'],
      capstoneRequirement: 'Resilience engineering benchmark injecting network partitions into a microservices cluster with automated failover and SLO alerting.'
    },
    keySkills: [
      { name: 'Service Level Objectives (SLOs, SLIs, SLAs)', weight: 96, category: 'SRE Principles', minProficiency: 'Error Budget Calculations, Multi-Window Multi-Burn-Rate Alerts, Availability Targets', labDeliverable: 'Documented SLO Framework with Automated Alertmanager Burn-Rate Policies' },
      { name: 'Distributed Tracing & OpenTelemetry', weight: 93, category: 'Observability', minProficiency: 'W3C Trace Context, Spans, Metric Exporters, Jaeger/Tempo, Collector Pipelines', labDeliverable: 'End-to-End OpenTelemetry Pipeline isolating Microservice P99 Latency Bottlenecks' },
      { name: 'Chaos Engineering & Fault Injection', weight: 91, category: 'Resilience', minProficiency: 'Chaos Mesh, Network Latency Injections, Pod Termination, Stress Testing, Blast Radius Control', labDeliverable: 'Automated Chaos Testing Suite validating Zero-Downtime Payment Service Recovery' },
      { name: 'Incident Response & Post-Mortem Facilitation', weight: 89, category: 'Operations', minProficiency: 'Blameless Post-Mortems, On-Call Escalation Trees, Runbooks, Root Cause Analysis (RCA)', labDeliverable: 'Comprehensive Production Incident RCA Report with Actionable Remediation Items' },
      { name: 'Go / Python Automation & CLI Tooling', weight: 92, category: 'Automation', minProficiency: 'System Calls, Concurrency (Goroutines/Channels), Kubernetes API Clients, Automated Runbooks', labDeliverable: 'Custom Go CLI Tool automating Cluster Health Diagnostics and Remediation' },
      { name: 'High-Availability Database Clustering', weight: 88, category: 'Systems', minProficiency: 'PostgreSQL Streaming Replication, Patroni Auto-Failover, Connection Pooling (PgBouncer)', labDeliverable: 'Zero-Data-Loss Database Failover Cluster surviving Sudden Primary Node Crash' }
    ],
    emergingTrends: ['AI-Powered Incident Response & Auto-Remediation', 'eBPF-Based Kernel Tracing', 'Multi-Region Sovereign Cloud Architecture', 'FinOps Cloud Cost Optimization']
  },
  {
    id: 'ind-fintech',
    role: 'FinTech & Quantitative Software Engineer',
    category: 'Financial Technology & High-Frequency Systems',
    demandScore: 97,
    avgSalary: '$115k - $175k / ₹20 - 36 LPA',
    requirements: {
      minDegree: 'B.Tech / M.Tech in Computer Science, Mathematics, Electrical, or Computational Finance',
      minCgpa: '7.5 / 10 (or 75% aggregate)',
      experienceLevel: 'FinTech / Quantitative Developer (0 - 2 Years)',
      practicalHours: '130+ Financial Systems & Algorithmic Trading Lab Hours',
      certifications: ['CQF (Certificate in Quantitative Finance)', 'AWS Certified Solutions Architect', 'Chartered Financial Analyst (CFA Level 1)'],
      coreTools: ['Modern C++ (C++20)', 'Python (NumPy/Pandas)', 'PostgreSQL', 'TimescaleDB', 'Redis', 'Kafka', 'FIX Protocol', 'Docker'],
      capstoneRequirement: 'Sub-millisecond simulated order book engine processing FIX protocol financial orders with risk checks and ledger reconciliation.'
    },
    keySkills: [
      { name: 'Low-Latency C++ & Concurrency', weight: 97, category: 'High-Performance Systems', minProficiency: 'C++20, Lock-Free Queues, Memory-Mapped Files, Cache Locality, SIMD Vectorization', labDeliverable: 'High-Speed L2 Order Book Matching Engine achieving Sub-Microsecond Tick Processing' },
      { name: 'Python Quantitative Modeling & Pandas', weight: 94, category: 'Quantitative Analysis', minProficiency: 'Vectorized Backtesting, Monte Carlo Simulations, Black-Scholes, Sharpe Ratio, Risk Models', labDeliverable: 'Algorithmic Portfolio Backtester evaluating Volatility and Maximum Drawdown' },
      { name: 'Financial Protocol Standards (FIX / ITCH / OUCH)', weight: 91, category: 'FinTech Protocols', minProficiency: 'FIX 4.2/4.4 Messaging, Message Parsing, Session State Machines, Drop Copy Feeds', labDeliverable: 'Client FIX Gateway with Automatic Session Reconnection and Sequence Reset' },
      { name: 'Time-Series Databases (TimescaleDB / kdb+)', weight: 92, category: 'Databases', minProficiency: 'Hypertable Partitioning, Continuous Aggregates, Millisecond Tick Compression, SQL Windowing', labDeliverable: 'Scalable Market Data Storage Engine retaining 100M+ Historical Market Ticks' },
      { name: 'Payment Gateways & Double-Entry Ledgers', weight: 93, category: 'Payment Infrastructure', minProficiency: 'ACID Financial Invariants, Idempotency Keys, Webhook Verification, PCI-DSS Compliance', labDeliverable: 'Immutable Double-Entry Financial Ledger with Zero-Drift Balance Invariant Tests' },
      { name: 'Financial Fraud Detection & Real-Time AML', weight: 89, category: 'Risk & Compliance', minProficiency: 'Rule Engines, Graph Anomaly Detection, Velocity Thresholds, Suspicious Activity Triage', labDeliverable: 'Real-Time Transaction Risk Scoring Service evaluating Transfers under 15ms' }
    ],
    emergingTrends: ['Real-Time Settlement via Central Bank Digital Currencies (CBDC)', 'AI Quantitative Alpha Generation', 'FPGA Hardware Acceleration', 'Open Banking ISO 20022 APIs']
  },
  {
    id: 'ind-healthtech',
    role: 'HealthTech & Biomedical Informatics Engineer',
    category: 'Healthcare Technology & Digital Health',
    demandScore: 93,
    avgSalary: '$88k - $138k / ₹14 - 25 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Biomedical Engineering, Computer Science, Biotechnology or IT',
      minCgpa: '7.0 / 10 (or 70% aggregate)',
      experienceLevel: 'HealthTech Systems Engineer (0 - 2 Years)',
      practicalHours: '125+ Clinical Data Systems & Medical Imaging Lab Hours',
      certifications: ['HL7 FHIR Certified Implementer', 'AWS Certified Security Specialty', 'HIPAA Compliance Professional'],
      coreTools: ['Python', 'FastAPI', 'PostgreSQL', 'HL7 FHIR', 'DICOM / Orthanc', 'PyTorch (Medical AI)', 'Docker', 'OAuth2 / SMART on FHIR'],
      capstoneRequirement: 'SMART on FHIR patient portal integrating electronic health records (EHR) with HIPAA encryption and automated clinical alerts.'
    },
    keySkills: [
      { name: 'HL7 FHIR & EHR Interoperability', weight: 96, category: 'Healthcare Standards', minProficiency: 'FHIR Resources (Patient, Observation, Encounter), RESTful FHIR APIs, SMART on FHIR Auth', labDeliverable: 'Interoperable FHIR Server Proxy mapping Legacy Hospital Database to JSON FHIR v4' },
      { name: 'Medical Imaging Processing (DICOM & PACS)', weight: 92, category: 'Medical Imaging', minProficiency: 'DICOM File Structure, Pydicom, Orthanc Server, 3D Voxel Rendering, Image Anonymization', labDeliverable: 'Automated DICOM Pipeline stripping PHI Metadata and Generating Web Viewer Slices' },
      { name: 'HIPAA & Medical Data Privacy Compliance', weight: 95, category: 'Security & Compliance', minProficiency: 'PHI Encryption at Rest/Transit, Audit Logging, Business Associate Agreements, Access RBAC', labDeliverable: 'HIPAA-Compliant Patient Telehealth API with Immutable Audit Access Logging' },
      { name: 'Clinical Decision Support AI (CDS)', weight: 90, category: 'Clinical AI', minProficiency: 'Diagnostic Models, Sensitivity/Specificity Tuning, AUC-ROC, Clinical Natural Language Processing', labDeliverable: 'Clinical Risk Prediction Model predicting ICU Readmission with 88%+ Sensitivity' },
      { name: 'Bioinformatics & Genomic Data Pipelines', weight: 88, category: 'Genomics', minProficiency: 'FASTQ/BAM/VCF File Formats, Biopython, Variant Calling Pipelines, NCBI API Integration', labDeliverable: 'Automated Variant Annotation Pipeline querying ClinVar for Pathogenic Mutations' },
      { name: 'Wearable Health Telemetry & IoT Biosensors', weight: 87, category: 'IoT Health', minProficiency: 'BLE Heart Rate / SpO2 Profiles, Time-Series Biometrics, Anomaly Detection Algorithms', labDeliverable: 'Real-Time Remote Patient Monitoring Dashboard triggering Alerts on Arrhythmia' }
    ],
    emergingTrends: ['Generative AI Clinical Note Summarization', 'Federated Learning for Multi-Hospital Privacy', 'Digital Therapeutics (DTx)', 'Ambient Clinical Scribing']
  },
  {
    id: 'ind-robotics',
    role: 'Robotics, Autonomous Systems & Computer Vision Engineer',
    category: 'Robotics & Automation',
    demandScore: 94,
    avgSalary: '$92k - $145k / ₹15 - 28 LPA',
    requirements: {
      minDegree: 'B.Tech / M.Tech in Robotics, Mechatronics, Mechanical, Electronics or Computer Science',
      minCgpa: '7.2 / 10 (or 72% aggregate)',
      experienceLevel: 'Robotics Engineer (0 - 2 Years)',
      practicalHours: '140+ Robotics Hardware & Simulation Lab Hours',
      certifications: ['ROS 2 Certified Developer', 'NVIDIA Isaac Robotics Associate', 'OpenCV Computer Vision Specialist'],
      coreTools: ['ROS 2 (Robot Operating System)', 'C++', 'Python', 'OpenCV', 'Gazebo Simulator', 'PyTorch', 'LiDAR / Point Cloud (PCL)', 'Linux'],
      capstoneRequirement: 'Autonomous mobile robot (AMR) navigation simulation in Gazebo featuring SLAM mapping, obstacle avoidance, and path planning.'
    },
    keySkills: [
      { name: 'ROS 2 (Robot Operating System) Architecture', weight: 96, category: 'Robotics Core', minProficiency: 'Nodes, Topics, Services, Actions, DDS Middleware, TF2 Coordinate Transforms, URDF Models', labDeliverable: 'Modular ROS 2 Robotic Arm Controller utilizing MoveIt 2 for Inverse Kinematics' },
      { name: 'Computer Vision & OpenCV Object Tracking', weight: 93, category: 'Perception', minProficiency: 'Edge Detection, Contour Extraction, Perspective Warping, YOLOv8 Real-Time Inference', labDeliverable: 'Visual Servoing System directing Robotic Gripper to Track and Pick Moving Objects' },
      { name: 'SLAM & 2D/3D Navigation (Nav2)', weight: 94, category: 'Autonomous Navigation', minProficiency: 'LiDAR Odometry, Cartographer / Fast-LIO SLAM, Costmaps, A* and TEB Local Planners', labDeliverable: 'Complete Autonomous Navigation Package mapping Unknown Warehouse and Routing to Goal' },
      { name: 'Simulation in Gazebo & NVIDIA Isaac Sim', weight: 90, category: 'Simulation', minProficiency: 'Physics Engines (ODE/PhysX), World Creation, Sensor Plugin Integration, URDF/Xacro', labDeliverable: 'High-Fidelity Virtual Factory Simulation testing Autonomous Forklift Obstacle Avoidance' },
      { name: 'Sensor Fusion & Kalman Filtering', weight: 91, category: 'State Estimation', minProficiency: 'Extended Kalman Filters (EKF), IMU + Wheel Odometry + GPS Fusion, Covariance Tuning', labDeliverable: 'Sensor Fusion State Estimator maintaining Sub-5cm Pose Accuracy during Drift' },
      { name: 'Embedded C++ Real-Time Motor Control', weight: 89, category: 'Actuation & Control', minProficiency: 'PID Tuning, PWM Motor Drives, Encoders, CANOpen / EtherCAT Industrial Communication', labDeliverable: 'Closed-Loop Brushless DC Motor Speed Controller maintaining Precision RPM' }
    ],
    emergingTrends: ['Humanoid Robotics & Bipedal Locomotion', 'Vision-Language-Action (VLA) Robotics Models', 'Sim-to-Real Reinforcement Learning', 'Cloud Robotics Fleet Management']
  },
  {
    id: 'ind-gamedev',
    role: 'Game Engine & Real-Time 3D Simulation Developer',
    category: 'Interactive Media & Gaming',
    demandScore: 91,
    avgSalary: '$80k - $132k / ₹12 - 24 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Computer Science, Game Engineering, Animation or Multimedia',
      minCgpa: '6.5 / 10 (or 65% aggregate)',
      experienceLevel: 'Game Developer (0 - 2 Years)',
      practicalHours: '120+ 3D Game Engine & Shader Programming Hours',
      certifications: ['Unity Certified Professional Programmer', 'Unreal Engine Authorized Instructor / Specialist'],
      coreTools: ['Unreal Engine 5 (UE5)', 'Unity 3D', 'C++', 'C#', 'HLSL/GLSL Shaders', 'Blender', 'Git LFS', 'PhysX'],
      capstoneRequirement: 'Playable 3D action game prototype in Unreal Engine 5 / Unity with dynamic lighting, AI enemy behavior trees, and spatial audio.'
    },
    keySkills: [
      { name: 'Unreal Engine 5 & C++ Architecture', weight: 95, category: 'Engine Development', minProficiency: 'Actor Components, UPROPERTY/UFUNCTION Macros, Gameplay Ability System (GAS), Blueprints', labDeliverable: 'Responsive 3D Character Controller with State Machine and Wall-Run Mechanics' },
      { name: 'Unity 3D & C# Scripting', weight: 92, category: 'Engine Development', minProficiency: 'ScriptableObjects, Component Architecture, Coroutines, Universal Render Pipeline (URP)', labDeliverable: 'Cross-Platform 3D Isometric Puzzle Game with Dynamic Inventory System' },
      { name: 'Real-Time 3D Shader Programming (HLSL)', weight: 90, category: 'Graphics & VFX', minProficiency: 'Vertex & Fragment Shaders, Lighting Models (PBR), Post-Processing, Niagara Particle VFX', labDeliverable: 'Custom Water Shader featuring Gerstner Waves, Foam Mapping, and Dynamic Refraction' },
      { name: 'Game AI & Behavior Trees', weight: 88, category: 'Game AI', minProficiency: 'NavMesh Pathfinding, Finite State Machines, Behavior Trees, Perception Stimuli (Sight/Sound)', labDeliverable: 'Enemy Patrol AI with Line-of-Sight Detection, Flanking Strategy, and Alert States' },
      { name: 'Multiplayer Real-Time Networking', weight: 91, category: 'Networking', minProficiency: 'Client-Side Prediction, Server Reconciliation, Interpolation, WebSocket / UDP Sockets', labDeliverable: 'Authoritative Multiplayer Arena supporting 8 Players with Sub-40ms Network Latency' },
      { name: 'Game Physics & Collision Systems', weight: 87, category: 'Physics', minProficiency: 'Rigid Body Dynamics, Raycasting, Convex Hulls, Custom Force Fields, ragdoll physics', labDeliverable: 'Vehicular Physics Simulator with Realistic Suspension, Drift, and Tire Friction' }
    ],
    emergingTrends: ['Nanite & Lumen Real-Time Photorealism', 'Procedural Content Generation (PCG)', 'AI NPC Dialogue with Local SLMs', 'Cloud Gaming Streaming Infrastructure']
  },
  {
    id: 'ind-automotive',
    role: 'Automotive Embedded & Autonomous Mobility Engineer',
    category: 'Automotive Systems',
    demandScore: 93,
    avgSalary: '$90k - $142k / ₹15 - 26 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. in Automotive, Electronics, Electrical, Computer Engineering or Mechatronics',
      minCgpa: '7.0 / 10 (or 70% aggregate)',
      experienceLevel: 'Automotive Software Engineer (0 - 2 Years)',
      practicalHours: '135+ ECU Hardware & Vehicle Network Simulation Hours',
      certifications: ['AUTOSAR Certified Developer', 'ISO 26262 Automotive Functional Safety Professional'],
      coreTools: ['Embedded C', 'C++', 'AUTOSAR Classic/Adaptive', 'CANoe / CANalyzer', 'CAN / LIN / Automotive Ethernet', 'Simulink / MATLAB', 'Git'],
      capstoneRequirement: 'Simulated Electronic Control Unit (ECU) firmware managing Advanced Driver Assistance Systems (ADAS) alerts over CAN-FD bus.'
    },
    keySkills: [
      { name: 'AUTOSAR Architecture (Classic & Adaptive)', weight: 95, category: 'Automotive Standards', minProficiency: 'Software Components (SWC), Runtime Environment (RTE), Basic Software (BSW), ARXML Models', labDeliverable: 'Configured AUTOSAR SWC communicating with Sensor Actuator Interface over RTE' },
      { name: 'In-Vehicle Networks (CAN, CAN-FD, Automotive Ethernet)', weight: 94, category: 'Vehicle Networking', minProficiency: 'DBC File Modeling, Arbitration, CRC Checksums, Diagnostic over IP (DoIP), UDS (ISO 14229)', labDeliverable: 'Complete UDS Diagnostic Routine reading ECU Trouble Codes (DTCs) and Resetting Faults' },
      { name: 'ISO 26262 Functional Safety & ASIL Compliance', weight: 92, category: 'Functional Safety', minProficiency: 'HARA (Hazard Analysis & Risk Assessment), ASIL D Decomposition, Safety Mechanisms, FMEA', labDeliverable: 'Safety Case Architecture for Brake-by-Wire Subsystem meeting ASIL D Redundancy' },
      { name: 'Model-Based Development (MATLAB / Simulink)', weight: 90, category: 'Model-Based Design', minProficiency: 'Stateflow State Charts, Embedded Coder Automatic Code Generation, MIL/SIL Verification', labDeliverable: 'Cruise Control Control Algorithm modeled in Simulink and auto-generated to MISRA-C' },
      { name: 'ADAS Perception & Radar/LiDAR Processing', weight: 91, category: 'Autonomous Mobility', minProficiency: 'Radar Point Clouds, Camera Object Detection, Time-to-Collision (TTC) Calculations, AEB', labDeliverable: 'Autonomous Emergency Braking (AEB) Logic triggering Deceleration on Pedestrian Detection' },
      { name: 'MISRA C / C++ Coding Compliance', weight: 89, category: 'Code Quality', minProficiency: 'Static Code Analysis (PC-Lint / SonarQube), Memory Safety, No Dynamic Allocation in Runtime', labDeliverable: '100% MISRA-C:2012 Compliant ECU Firmware codebase verified via Static Analysis' }
    ],
    emergingTrends: ['Software-Defined Vehicles (SDV)', 'Centralized High-Compute Vehicle Zonal Architecture', 'Over-the-Air (OTA) ECU Firmware Updates', 'V2X Vehicle-to-Everything Telematics']
  },
  {
    id: 'ind-greentech',
    role: 'Climate Intelligence & GreenTech Systems Architect',
    category: 'CleanTech & Sustainability',
    demandScore: 92,
    avgSalary: '$85k - $135k / ₹13 - 24 LPA',
    requirements: {
      minDegree: 'B.Tech / B.E. / M.Sc in Environmental Engineering, Computer Science, Energy Systems or Data Science',
      minCgpa: '6.8 / 10 (or 68% aggregate)',
      experienceLevel: 'Sustainability Tech Analyst / Green Systems Engineer (0 - 2 Years)',
      practicalHours: '120+ Geospatial Analytics & Energy Telemetry Lab Hours',
      certifications: ['GHG Protocol Corporate Standard Specialist', 'AWS Certified Solutions Architect', 'LEED Green Associate'],
      coreTools: ['Python', 'PostGIS', 'TimescaleDB', 'QGIS', 'FastAPI', 'Pandas', 'Google Earth Engine', 'Docker', 'IoT Sensor Gateways'],
      capstoneRequirement: 'Carbon footprint accounting engine measuring corporate cloud emissions (Scope 1, 2, 3) using geospatial satellite data and GHG standards.'
    },
    keySkills: [
      { name: 'Carbon Accounting & Scope 1/2/3 Calculations', weight: 95, category: 'Carbon Accounting', minProficiency: 'GHG Protocol Standards, Emission Factors (DEFRA/EPA), Activity Data Ingestion, Carbon Offsets', labDeliverable: 'Automated Corporate Carbon Accounting Engine computing Scope 1-3 Emissions with Visual Reports' },
      { name: 'Smart Grid & Energy Optimization Telemetry', weight: 92, category: 'Energy Systems', minProficiency: 'Smart Meter Time-Series Data, Peak Load Forecasting, Demand Response, Solar PV Production Models', labDeliverable: 'Predictive Energy Optimization Model scheduling High-Power Loads during Peak Solar Generation' },
      { name: 'Geospatial Analytics & Satellite Remote Sensing', weight: 91, category: 'Geospatial Data', minProficiency: 'Sentinel-2 / Landsat Imagery, Google Earth Engine, NDVI Vegetation Index, PostGIS Spatial Queries', labDeliverable: 'Deforestation & Land-Use Change Detection Map powered by Sentinel-2 Geospatial Analysis' },
      { name: 'IoT Environmental Sensor Networks', weight: 88, category: 'Environmental IoT', minProficiency: 'Air Quality Index (AQI) Sensors (PM2.5/PM10), LoRaWAN Transmission, Water Quality Telemetry', labDeliverable: 'Low-Power LoRaWAN Environmental Monitoring Station streaming Live AQI Data to Public Dashboard' },
      { name: 'Life Cycle Assessment (LCA) & Supply Chain Traceability', weight: 89, category: 'Sustainability Supply Chain', minProficiency: 'Product Carbon Footprint (PCF), Circular Economy Metrics, Material Flow Analysis, Supply Chain Audits', labDeliverable: 'Product Life Cycle Impact Assessment Calculator quantifying Cradle-to-Grave Emissions' },
      { name: 'ESG Reporting & Regulatory Compliance APIs', weight: 87, category: 'ESG Compliance', minProficiency: 'CSRD Compliance, SEC Climate Rules, BRSR India Reporting Formats, XBRL Data Export', labDeliverable: 'Automated Business Responsibility and Sustainability Report (BRSR) Generator' }
    ],
    emergingTrends: ['AI-Driven Precision Climate Forecasting', 'Satellite Methane Leakage Detection', 'Battery Health & Second-Life Analytics', 'Voluntary Carbon Credit Blockchain Registries']
  }
];

const initialCurriculums = [
  {
    id: 'curr-cs-btech',
    institution: 'Apex Institute of Technology',
    degree: 'B.Tech Computer Science & Engineering',
    totalStudents: 240,
    modules: [
      { code: 'CS301', title: 'Data Structures & Algorithms in C++', depth: 95, practicalHours: 40, theoryHours: 50 },
      { code: 'CS302', title: 'Relational Database Management Systems (SQL)', depth: 85, practicalHours: 30, theoryHours: 45 },
      { code: 'CS303', title: 'Operating Systems & Process Concurrency', depth: 82, practicalHours: 25, theoryHours: 45 },
      { code: 'CS304', title: 'Computer Networks & TCP/IP Model', depth: 80, practicalHours: 20, theoryHours: 45 },
      { code: 'CS305', title: 'Web Development Basics (HTML5, CSS, PHP)', depth: 55, practicalHours: 35, theoryHours: 30 },
      { code: 'CS306', title: 'Introduction to Artificial Intelligence', depth: 60, practicalHours: 20, theoryHours: 45 }
    ],
    currentStrengths: ['Core algorithmic problem solving', 'Database normalization', 'Memory management basics'],
    identifiedDeficits: ['Cloud deployment & Containerization', 'Modern JavaScript frameworks', 'Modern CI/CD pipelines', 'Production MLOps']
  },
  {
    id: 'curr-ai-btech',
    institution: 'National University of Engineering',
    degree: 'B.Tech Artificial Intelligence & Data Science',
    totalStudents: 180,
    modules: [
      { code: 'AI401', title: 'Machine Learning Algorithms (Scikit-Learn)', depth: 88, practicalHours: 40, theoryHours: 45 },
      { code: 'AI402', title: 'Deep Learning & Neural Networks', depth: 82, practicalHours: 35, theoryHours: 45 },
      { code: 'AI403', title: 'Natural Language Processing Fundamentals', depth: 75, practicalHours: 30, theoryHours: 40 },
      { code: 'AI404', title: 'Python Programming for Data Analysis', depth: 85, practicalHours: 40, theoryHours: 30 },
      { code: 'AI405', title: 'Probability, Linear Algebra & Computational Statistics', depth: 90, practicalHours: 20, theoryHours: 50 },
      { code: 'AI406', title: 'Big Data Technologies & MapReduce Foundations', depth: 70, practicalHours: 25, theoryHours: 40 }
    ],
    currentStrengths: ['Mathematical rigor', 'Classic ML models', 'Statistical data exploration'],
    identifiedDeficits: ['Large Language Model (LLM) fine-tuning', 'Vector Search & Embeddings', 'MLOps pipelines in Kubernetes']
  },
  {
    id: 'curr-cloud-devops',
    institution: 'Indian Institute of Technology & Sciences',
    degree: 'B.Tech Cloud Computing & DevOps Engineering',
    totalStudents: 210,
    modules: [
      { code: 'CL301', title: 'Cloud Infrastructure & Distributed Virtualization', depth: 92, practicalHours: 45, theoryHours: 40 },
      { code: 'CL302', title: 'Linux Administration, Shell Scripting & Sockets', depth: 88, practicalHours: 35, theoryHours: 45 },
      { code: 'CL303', title: 'Containerization Basics & Microservice Patterns', depth: 82, practicalHours: 30, theoryHours: 40 },
      { code: 'CL304', title: 'Enterprise Network Architecture & VPC Peering', depth: 85, practicalHours: 25, theoryHours: 45 },
      { code: 'CL305', title: 'Continuous Integration & Build Automation Basics', depth: 78, practicalHours: 35, theoryHours: 35 }
    ],
    currentStrengths: ['Linux server internals', 'Virtual networking protocols', 'Infrastructure automation basics'],
    identifiedDeficits: ['Production Kubernetes cluster administration', 'GitOps & ArgoCD canary deployments', 'eBPF observability']
  },
  {
    id: 'curr-cyber-btech',
    institution: 'Birla Technical University',
    degree: 'B.Tech Cybersecurity & Information Defense',
    totalStudents: 160,
    modules: [
      { code: 'CY401', title: 'Applied Cryptography & Public Key Infrastructure', depth: 90, practicalHours: 35, theoryHours: 50 },
      { code: 'CY402', title: 'Ethical Hacking, Penetration Testing & Tools', depth: 88, practicalHours: 45, theoryHours: 40 },
      { code: 'CY403', title: 'Web Application Security & OWASP Defenses', depth: 84, practicalHours: 40, theoryHours: 35 },
      { code: 'CY404', title: 'Network Security, Firewalls & Intrusion Detection', depth: 86, practicalHours: 30, theoryHours: 45 },
      { code: 'CY405', title: 'Cyber Forensics, Malware Analysis & Incident Response', depth: 75, practicalHours: 30, theoryHours: 40 }
    ],
    currentStrengths: ['Offensive security tooling', 'Network traffic analysis', 'Cryptographic algorithms'],
    identifiedDeficits: ['Cloud Security Posture Management (CSPM)', 'DevSecOps automated gates', 'Zero Trust IAM architecture']
  },
  {
    id: 'curr-data-eng',
    institution: 'Vellore Global University',
    degree: 'B.Tech Big Data Systems & Data Engineering',
    totalStudents: 195,
    modules: [
      { code: 'DE301', title: 'Distributed Data Storage & Apache Spark Programming', depth: 86, practicalHours: 40, theoryHours: 45 },
      { code: 'DE302', title: 'Relational Database Internals & Advanced SQL Querying', depth: 92, practicalHours: 35, theoryHours: 45 },
      { code: 'DE303', title: 'Real-Time Streaming Systems & Event Architectures', depth: 78, practicalHours: 30, theoryHours: 40 },
      { code: 'DE304', title: 'Data Warehousing, Dimensional Modeling & ETL Batches', depth: 84, practicalHours: 35, theoryHours: 40 },
      { code: 'DE305', title: 'NoSQL Distributed Systems (Cassandra, MongoDB, HBase)', depth: 80, practicalHours: 30, theoryHours: 35 }
    ],
    currentStrengths: ['Complex relational SQL modeling', 'Hadoop & Spark batch jobs', 'Data warehousing paradigms'],
    identifiedDeficits: ['Modern dbt transformation testing', 'Apache Iceberg lakehouse tables', 'Vector database ingestion pipelines']
  },
  {
    id: 'curr-embedded-iot',
    institution: 'Delhi Metropolitan Institute of Technology',
    degree: 'B.Tech Electronics & Embedded Systems',
    totalStudents: 175,
    modules: [
      { code: 'ES301', title: 'Microcontroller Architecture & ARM Cortex Systems', depth: 94, practicalHours: 45, theoryHours: 45 },
      { code: 'ES302', title: 'Embedded C Programming & Hardware Interfacing', depth: 90, practicalHours: 40, theoryHours: 40 },
      { code: 'ES303', title: 'Real-Time Operating Systems (FreeRTOS Architecture)', depth: 82, practicalHours: 35, theoryHours: 40 },
      { code: 'ES304', title: 'Serial Communication Protocols (I2C, SPI, UART, CAN)', depth: 88, practicalHours: 30, theoryHours: 45 },
      { code: 'ES305', title: 'IoT Wireless Networking & Low-Power Sensor Nodes', depth: 76, practicalHours: 30, theoryHours: 35 }
    ],
    currentStrengths: ['Bare-metal firmware programming', 'Hardware communication buses', 'Oscilloscope circuit debugging'],
    identifiedDeficits: ['TinyML on ultra-low-power microcontrollers', 'Matter smart home protocol', 'OTA firmware updates']
  },
  {
    id: 'curr-robotics-btech',
    institution: "St. Xavier's Engineering College",
    degree: 'B.Tech Robotics & Autonomous Mechatronics',
    totalStudents: 150,
    modules: [
      { code: 'RO401', title: 'Robotics Kinematics, Dynamics & Motion Control', depth: 92, practicalHours: 40, theoryHours: 50 },
      { code: 'RO402', title: 'Robot Operating System (ROS 2 Architecture & Nodes)', depth: 84, practicalHours: 45, theoryHours: 35 },
      { code: 'RO403', title: 'Computer Vision, Image Processing & Pattern Tracking', depth: 80, practicalHours: 35, theoryHours: 40 },
      { code: 'RO404', title: 'Feedback Control Systems, PID & State-Space Modeling', depth: 88, practicalHours: 30, theoryHours: 45 },
      { code: 'RO405', title: 'Autonomous Navigation, SLAM & Sensor Fusion Basics', depth: 75, practicalHours: 30, theoryHours: 40 }
    ],
    currentStrengths: ['Mathematical kinematics & dynamics', 'PID motor control', 'Simulation environments'],
    identifiedDeficits: ['3D LiDAR Fast-LIO SLAM mapping', 'Deep learning visual servoing with YOLOv8', 'MoveIt 2 motion planning']
  },
  {
    id: 'curr-software-eng',
    institution: 'MIT World Peace Engineering School',
    degree: 'B.Tech Software Engineering & Full Stack Architecture',
    totalStudents: 220,
    modules: [
      { code: 'SE301', title: 'Object-Oriented Analysis, Design Patterns & UML', depth: 90, practicalHours: 35, theoryHours: 45 },
      { code: 'SE302', title: 'Modern JavaScript, TypeScript & Frontend Frameworks', depth: 85, practicalHours: 45, theoryHours: 35 },
      { code: 'SE303', title: 'Server-Side Architecture, RESTful APIs & Middleware', depth: 86, practicalHours: 40, theoryHours: 40 },
      { code: 'SE304', title: 'Software Quality Assurance, Unit Testing & Test Automation', depth: 80, practicalHours: 35, theoryHours: 35 },
      { code: 'SE305', title: 'Relational & Document Database System Engineering', depth: 84, practicalHours: 30, theoryHours: 40 }
    ],
    currentStrengths: ['Design pattern application', 'Full stack web architectures', 'Unit test coverage methodologies'],
    identifiedDeficits: ['Docker container orchestration', 'Cloud native deployment pipelines', 'Redis caching & high-scale concurrency']
  },
  {
    id: 'curr-fintech-btech',
    institution: 'Pune University School of Technology',
    degree: 'B.Tech FinTech & Quantitative Computational Systems',
    totalStudents: 140,
    modules: [
      { code: 'FT401', title: 'High-Performance Computational C++ & Algorithms', depth: 92, practicalHours: 40, theoryHours: 45 },
      { code: 'FT402', title: 'Financial Markets, Securities Trading & Market Microstructure', depth: 88, practicalHours: 25, theoryHours: 50 },
      { code: 'FT403', title: 'Time-Series Analysis & Python Quantitative Modeling', depth: 86, practicalHours: 35, theoryHours: 40 },
      { code: 'FT404', title: 'Cryptographic Ledgers, Smart Contracts & Distributed Consensus', depth: 80, practicalHours: 35, theoryHours: 40 },
      { code: 'FT405', title: 'Financial Risk Management, Portfolio Optimization & Metrics', depth: 84, practicalHours: 20, theoryHours: 45 }
    ],
    currentStrengths: ['Low-level C++ algorithms', 'Quantitative statistical backtesting', 'Financial ledger principles'],
    identifiedDeficits: ['Sub-microsecond FIX protocol engines', 'Lock-free memory architectures', 'TimescaleDB hypertable clustering']
  },
  {
    id: 'curr-mca-amrita',
    institution: 'Amrita Institute of Advanced Computing',
    degree: 'Master of Computer Applications (MCA)',
    totalStudents: 165,
    modules: [
      { code: 'MC301', title: 'Advanced Data Structures, Graph Theory & Algorithms', depth: 92, practicalHours: 40, theoryHours: 45 },
      { code: 'MC302', title: 'Enterprise Java & Spring Boot Web Microservices', depth: 88, practicalHours: 45, theoryHours: 40 },
      { code: 'MC303', title: 'Database Administration, SQL Tuning & NoSQL Systems', depth: 86, practicalHours: 35, theoryHours: 40 },
      { code: 'MC304', title: 'Cloud Computing, Virtualization & Service Management', depth: 78, practicalHours: 30, theoryHours: 40 },
      { code: 'MC305', title: 'Mobile Application Development & Responsive Frameworks', depth: 80, practicalHours: 35, theoryHours: 35 }
    ],
    currentStrengths: ['Enterprise application development', 'Database management', 'Comprehensive software lifecycle'],
    identifiedDeficits: ['Kubernetes container orchestration', 'Modern React 19 / Next.js ecosystem', 'Automated CI/CD GitOps']
  },
  {
    id: 'curr-biomed-psg',
    institution: 'PSG College of Technology',
    degree: 'B.Tech Biomedical Engineering & Medical Informatics',
    totalStudents: 130,
    modules: [
      { code: 'BM401', title: 'Biomedical Signal Acquisition, DSP & Biosensors', depth: 90, practicalHours: 40, theoryHours: 45 },
      { code: 'BM402', title: 'Medical Imaging Techniques, X-Ray, CT, MRI & DICOM', depth: 88, practicalHours: 35, theoryHours: 45 },
      { code: 'BM403', title: 'Health Information Systems, EHR & Hospital Telemetry', depth: 78, practicalHours: 30, theoryHours: 40 },
      { code: 'BM404', title: 'Biomedical Instrumentation & Medical Device Regulations', depth: 86, practicalHours: 35, theoryHours: 45 },
      { code: 'BM405', title: 'Bioinformatics Fundamentals & Genomic Sequence Analysis', depth: 75, practicalHours: 25, theoryHours: 40 }
    ],
    currentStrengths: ['Medical imaging theory', 'Biosignal acquisition', 'Regulatory medical standards'],
    identifiedDeficits: ['HL7 FHIR v4 REST APIs', 'Deep learning medical image segmentation', 'HIPAA compliant cloud telemetry']
  },
  {
    id: 'curr-des-iida',
    institution: 'International Institute of Digital Arts',
    degree: 'B.Des Human-Computer Interaction & UI/UX Design',
    totalStudents: 120,
    modules: [
      { code: 'DS301', title: 'Design Thinking, User Research & Empathy Mapping', depth: 92, practicalHours: 40, theoryHours: 40 },
      { code: 'DS302', title: 'Figma Design Systems, Auto-Layout & Component Variants', depth: 94, practicalHours: 50, theoryHours: 30 },
      { code: 'DS303', title: 'Information Architecture, Wireframing & Usability Audits', depth: 86, practicalHours: 35, theoryHours: 35 },
      { code: 'DS304', title: 'Frontend Styling Basics (HTML5, Modern CSS & Flexbox)', depth: 78, practicalHours: 35, theoryHours: 30 },
      { code: 'DS305', title: 'Web Accessibility Standards (WCAG 2.1) & Inclusive Design', depth: 82, practicalHours: 25, theoryHours: 35 }
    ],
    currentStrengths: ['User-centric research methodologies', 'High-fidelity Figma prototyping', 'Design token architectures'],
    identifiedDeficits: ['Tailwind CSS v4 token integration', 'Interactive motion with Framer Motion', 'Usability A/B split testing metrics']
  }
];

let fallbackJobs = [
  {
    id: 'job-101',
    title: 'Software Engineer Intern',
    company: 'Microsoft',
    logo: '💻',
    type: 'Internship (6 Months)',
    workMode: 'Hybrid (Both Online & On-Site)',
    location: 'Bengaluru',
    stipend: '₹50,000 / month',
    stipendAmount: 50000,
    isUnpaid: false,
    ctcPostInternship: '₹18.5 LPA',
    openings: 12,
    deadline: '2026-11-25',
    requiredSkills: ['React', 'Node.js', 'MongoDB', 'Docker'],
    preferredSkills: ['AWS Cloud', 'Automated Testing'],
    description: 'Work with the Azure Developer Experience engineering squad to build developer tools and high-scale cloud dashboards.',
    academicEligibility: 'B.Tech CSE/IT, Min CGPA: 7.5, Passing year 2026/2027',
    tier: 'Tier 1 Industry Partner'
  },
  {
    id: 'job-105',
    title: 'Frontend Web Development Intern',
    company: 'NextGen EdTech Solutions',
    logo: '🌐',
    type: 'Internship (3 Months)',
    workMode: 'Online / Remote',
    location: 'Remote',
    stipend: '₹5,000 / month (Below 8k)',
    stipendAmount: 5000,
    isUnpaid: false,
    ctcPostInternship: '₹6.5 LPA',
    openings: 8,
    deadline: '2026-11-20',
    requiredSkills: ['React', 'JavaScript', 'HTML/CSS', 'Tailwind CSS'],
    preferredSkills: ['Git', 'REST APIs'],
    description: 'Build interactive student learning portals and responsive dashboards in a fast-paced EdTech startup. Flexible remote work hours.',
    academicEligibility: 'B.Tech/BCA/B.Sc Computer Science, 2nd/3rd/4th Year',
    tier: 'Startup Hub Accelerator'
  },
  {
    id: 'job-106',
    title: 'Python Data Analytics & Research Intern',
    company: 'Cognitive Insights Lab',
    logo: '📊',
    type: 'Internship (6 Months)',
    workMode: 'Online / Remote',
    location: 'Remote',
    stipend: '₹7,500 / month (Below 8k)',
    stipendAmount: 7500,
    isUnpaid: false,
    ctcPostInternship: '₹8.0 LPA',
    openings: 6,
    deadline: '2026-11-18',
    requiredSkills: ['Python', 'Pandas', 'SQL', 'Data Visualization'],
    preferredSkills: ['Scikit-learn', 'Excel'],
    description: 'Perform real-time dataset sanitization, exploratory data analysis, and build automated visualization reports for client deliverables.',
    academicEligibility: 'B.Tech CSE/IT/DS, MCA, Min CGPA 7.0',
    tier: 'R&D Innovation Hub'
  },
  {
    id: 'job-107',
    title: 'AICTE Open Source & Web Intern',
    company: 'OpenEdu Foundation',
    logo: '🏛️',
    type: 'Internship (Summer 3 Months)',
    workMode: 'Online / Remote',
    location: 'Remote',
    stipend: 'No Stipend (Academic Credit & Certificate)',
    stipendAmount: 0,
    isUnpaid: true,
    ctcPostInternship: 'PPO Eligible based on contributions',
    openings: 20,
    deadline: '2026-12-05',
    requiredSkills: ['React', 'Node.js', 'Git / GitHub', 'Markdown'],
    preferredSkills: ['Open Source Contributions', 'Documentation'],
    description: 'Contribute to public digital public infrastructure (DPI) education projects. Official AICTE activity points and verified certificate upon completion.',
    academicEligibility: 'Open to all Engineering & Polytechnic students',
    tier: 'National Open Source Initiative'
  },
  {
    id: 'job-108',
    title: 'Junior Cloud & Linux Lab Intern',
    company: 'ServerMesh Systems',
    logo: '🐧',
    type: 'Internship (6 Months)',
    workMode: 'Hybrid (Both Online & On-Site)',
    location: 'Pune',
    stipend: '₹6,000 / month (Below 8k)',
    stipendAmount: 6000,
    isUnpaid: false,
    ctcPostInternship: '₹7.2 LPA',
    openings: 5,
    deadline: '2026-11-22',
    requiredSkills: ['Linux System Internals & Bash', 'Networking Basics', 'Docker', 'Git'],
    preferredSkills: ['AWS Basics', 'Python Scripting'],
    description: 'Manage staging virtual machines, configure CI runner daemons, and monitor microservices in hybrid setup (3 days remote, 2 days office).',
    academicEligibility: 'B.Tech CSE/IT/ECE, Min CGPA 6.5',
    tier: 'Direct Campus Drive'
  },
  {
    id: 'job-109',
    title: 'Cybersecurity & Vulnerability Assessment Intern',
    company: 'Aegis Cyber Defense',
    logo: '🛡️',
    type: 'Internship (3 Months)',
    workMode: 'In-Office (On-Site)',
    location: 'Bengaluru',
    stipend: 'No Stipend (Certificate & Mentorship)',
    stipendAmount: 0,
    isUnpaid: true,
    ctcPostInternship: '₹9.0 LPA on PPO',
    openings: 4,
    deadline: '2026-11-10',
    requiredSkills: ['OWASP Top 10', 'Network Security', 'Linux', 'Burp Suite'],
    preferredSkills: ['Python Scripting', 'Wireshark'],
    description: 'Work alongside senior penetration testers to audit university and SMB web applications for security vulnerabilities.',
    academicEligibility: 'B.Tech CSE/IT, BCA/MCA, 3rd or 4th Year',
    tier: 'Cyber CoE Partner'
  },
  {
    id: 'job-110',
    title: 'Mobile App Developer Intern (Flutter / React Native)',
    company: 'AppWave Innovations',
    logo: '📱',
    type: 'Internship (6 Months)',
    workMode: 'Hybrid (Both Online & On-Site)',
    location: 'Delhi NCR',
    stipend: '₹7,000 / month (Below 8k)',
    stipendAmount: 7000,
    isUnpaid: false,
    ctcPostInternship: '₹7.5 LPA',
    openings: 7,
    deadline: '2026-11-28',
    requiredSkills: ['React Native / Flutter', 'JavaScript', 'REST APIs', 'UI/UX Design'],
    preferredSkills: ['Firebase', 'State Management'],
    description: 'Develop cross-platform client mobile applications for hyper-local delivery and student campus commerce.',
    academicEligibility: 'All undergraduate engineering students',
    tier: 'Startup Accelerator'
  },
  {
    id: 'job-102',
    title: 'Cloud DevOps Intern',
    company: 'CloudMatrix Technologies',
    logo: '☁️',
    type: 'Internship (6 Months)',
    workMode: 'Hybrid (Both Online & On-Site)',
    location: 'Pune',
    stipend: '₹45,000 / month',
    stipendAmount: 45000,
    isUnpaid: false,
    ctcPostInternship: '₹14.5 LPA',
    openings: 8,
    deadline: '2026-11-15',
    requiredSkills: ['Docker & Kubernetes', 'AWS / Azure / GCP Architecture', 'CI/CD Pipelines (GitHub Actions/ArgoCD)', 'Linux System Internals & Bash'],
    preferredSkills: ['Terraform & IaC', 'Prometheus & Grafana Observability'],
    description: 'Automate multi-region infrastructure provisioning, deploy Helm charts on EKS, and build fault-tolerant deployment pipelines.',
    academicEligibility: 'B.Tech CSE/IT, Min CGPA: 7.5, Passing year 2026/2027',
    tier: 'Industry Partner Tier 1'
  },
  {
    id: 'job-103',
    title: 'GenAI & MLOps Research Engineer (Placement)',
    company: 'NeuralSphere AI Labs',
    logo: '⚡',
    type: 'Full-time Placement',
    workMode: 'In-Office (On-Site)',
    location: 'Hyderabad',
    stipend: 'Full Benefits + Joining Bonus',
    stipendAmount: 0,
    isUnpaid: false,
    ctcPostInternship: '₹22.0 - 28.0 LPA',
    openings: 4,
    deadline: '2026-10-30',
    requiredSkills: ['PyTorch / TensorFlow Deep Learning', 'RAG Architecture & Vector DBs', 'LLM Fine-tuning & LoRA', 'MLOps (MLflow, Kubeflow, BentoML)'],
    preferredSkills: ['Model Optimization & TensorRT', 'Distributed training'],
    description: 'Design and deploy fine-tuned open-weights models for enterprise retrieval systems. Build automated inference benchmark pipelines.',
    academicEligibility: 'B.Tech/M.Tech AI, CS, Data Science with verified project portfolio',
    tier: 'R&D CoE Sponsored'
  },
  {
    id: 'job-104',
    title: 'Full-Stack Software Engineer Associate',
    company: 'FinVortex Global',
    logo: '💳',
    type: 'Full-time Placement',
    workMode: 'Online / Remote',
    location: 'Remote',
    stipend: 'Direct Offer',
    stipendAmount: 0,
    isUnpaid: false,
    ctcPostInternship: '₹16.0 LPA',
    openings: 15,
    deadline: '2026-11-20',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    preferredSkills: ['Automated Testing', 'Redis Caching'],
    description: 'Build mission-critical real-time payment settlement dashboards handling millions of transactions daily with sub-50ms latency.',
    academicEligibility: 'All Engineering branches, Min CGPA 7.0',
    tier: 'Campus Placement Drive'
  }
];

let fallbackApplications = [
  {
    id: 'app-901',
    jobId: 'job-101',
    jobTitle: 'Software Engineer Intern',
    company: 'Microsoft',
    studentId: 'std-1',
    studentName: 'Rohan Sharma',
    college: 'Apex Institute of Technology',
    cgpa: 8.7,
    matchScore: 94,
    status: 'Shortlisted for Technical Assessment',
    appliedDate: '2026-10-02',
    timeline: [
      { step: 'Application Submitted', date: '2026-10-02', done: true },
      { step: 'ATS Skill Matching Verified', date: '2026-10-03', done: true },
      { step: 'Shortlisted by Recruiter', date: '2026-10-05', done: true },
      { step: 'Live Cloud Lab Assessment', date: 'Scheduled: Oct 12', done: false },
      { step: 'Final Interview & Offer', date: 'Pending', done: false }
    ],
    resumeUrl: 'https://example.com/resume/rohan.pdf',
    notes: 'Strong practical React & Node lab badge with verified Docker project.'
  }
];

let fallbackStudents = [
  {
    id: 'std-1',
    name: 'Rohan Sharma',
    avatar: '👨‍💻',
    email: 'rohan.sharma@apex.edu',
    college: 'Apex Institute of Technology',
    department: 'Computer Science & Engineering',
    year: '4th Year (Batch 2026)',
    cgpa: 8.7,
    targetRole: 'Full Stack Developer',
    verifiedSkills: [
      { name: 'React', level: 'Mastery', verifiedBy: 'Meta Certified Professional' },
      { name: 'Node.js', level: 'Advanced', verifiedBy: 'College Lab Exam' },
      { name: 'JavaScript / TypeScript', level: 'Advanced', verifiedBy: 'Department Faculty' },
      { name: 'MongoDB', level: 'Advanced', verifiedBy: 'MongoDB University' },
      { name: 'Docker & Kubernetes', level: 'Intermediate', verifiedBy: 'Google Cloud CoE' }
    ],
    skillGaps: [
      { name: 'AWS Cloud', severity: 'High', recommendation: 'Complete AWS Cloud Practitioner Sandbox Lab' },
      { name: 'Automated Testing (Playwright/Jest)', severity: 'Moderate', recommendation: 'Integrate E2E test suite in Capstone project' }
    ],
    projects: [
      { title: 'Full Stack Real-Time Collaboration Hub', tech: 'React, Node.js, Socket.IO, MongoDB' },
      { title: 'Microservices Cloud Platform', tech: 'Docker, Kubernetes, Express' },
      { title: 'AI Resume Competency Parser', tech: 'Python, NLP, React' }
    ],
    assessmentScore: 86,
    appliedJobsCount: 4,
    placementStatus: 'Shortlisted by Microsoft'
  },
  {
    id: 'std-2',
    name: 'Priya Sundaram',
    avatar: '👩‍💻',
    email: 'priya.sundaram@nue.edu',
    college: 'National University of Engineering',
    department: 'AI & Data Science',
    year: '4th Year (Batch 2026)',
    cgpa: 9.2,
    targetRole: 'AI / Machine Learning Engineer',
    verifiedSkills: [
      { name: 'PyTorch / TensorFlow Deep Learning', level: 'Advanced', verifiedBy: 'NVIDIA DLI' },
      { name: 'RAG Architecture & Vector DBs', level: 'Advanced', verifiedBy: 'Industry Capstone' },
      { name: 'LLM Fine-tuning & LoRA', level: 'Advanced', verifiedBy: 'Research Paper' },
      { name: 'Python Programming for Data Analysis', level: 'Mastery', verifiedBy: 'College Faculty' }
    ],
    skillGaps: [
      { name: 'MLOps (MLflow, Kubeflow, BentoML)', severity: 'Moderate', recommendation: 'Containerize LLM pipeline on Kubernetes cluster' }
    ],
    projects: [
      { title: 'Enterprise RAG Retrieval System', tech: 'Python, LangChain, VectorDB' },
      { title: 'Vision Transformer Benchmark', tech: 'PyTorch, TensorRT' }
    ],
    assessmentScore: 92,
    appliedJobsCount: 3,
    placementStatus: 'Shortlisted - NeuralSphere AI'
  }
];

let fallbackMoUs = [
  {
    id: 'mou-01',
    partnerCompany: 'Google Cloud Academic Alliances',
    institution: 'Apex Institute of Technology',
    signedDate: '2025-08-15',
    validUntil: '2028-08-14',
    scope: 'Cloud Architecture Center of Excellence (CoE), 500 annual cloud certification vouchers, sponsored faculty upskilling workshops.',
    activeProjects: 3,
    status: 'Active & Verified',
    impact: '180 students certified, 32 placed with average CTC of 15.2 LPA'
  },
  {
    id: 'mou-02',
    partnerCompany: 'NVIDIA Deep Learning Institute',
    institution: 'National University of Engineering',
    signedDate: '2025-11-01',
    validUntil: '2027-10-31',
    scope: 'Accelerated Computing Lab setup with DGX workstations, curriculum co-design for Generative AI elective CS492, joint research grants.',
    activeProjects: 5,
    status: 'Active & Verified',
    impact: '12 peer-reviewed papers, 18 high-package R&D placements'
  }
];

// Initialize DB Connection
connectDB().catch(console.error);

// Routes
// 1. System & Architecture Status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    project: 'SkillBridge Platform',
    architecture: {
      frontend: 'React 19 + Tailwind CSS v4 + Vite',
      backend: 'Node.js + Express 5',
      database: getDBStatus(),
      aiEngine: 'AIEngine (Career Readiness Score & 6-Factor Internship Matching)'
    },
    timestamp: new Date().toISOString()
  });
});

// 2. Career Readiness Score
app.get('/api/students/:id/career-readiness', (req, res) => {
  const student = fallbackStudents.find(s => s.id === req.params.id) || fallbackStudents[0];
  const benchmark = initialBenchmarks.find(b => b.role.toLowerCase() === student.targetRole.toLowerCase()) || initialBenchmarks[0];
  
  const readiness = AIEngine.calculateCareerReadiness(student, benchmark);
  res.json({ success: true, studentId: student.id, studentName: student.name, readiness });
});

// 3. AI Resume Parser & Skill Extractor
app.post('/api/students/:id/resume-parse', (req, res) => {
  const { resumeText = '' } = req.body;
  const parsed = AIEngine.parseResumeAI(resumeText);
  res.json({ success: true, ...parsed });
});

// 4. Interactive Visual Learning Roadmap
app.get('/api/roadmap/:studentId', (req, res) => {
  const student = fallbackStudents.find(s => s.id === req.params.studentId) || fallbackStudents[0];
  const benchmark = initialBenchmarks.find(b => b.role.toLowerCase() === student.targetRole.toLowerCase()) || initialBenchmarks[0];

  const roadmapData = AIEngine.generateVisualRoadmap(student.verifiedSkills.map(s => s.name), benchmark);
  res.json({ success: true, studentId: student.id, studentName: student.name, roadmapData });
});

// 5. 6-Factor Weighted Internship Matching
app.get('/api/matches/:studentId', (req, res) => {
  const student = fallbackStudents.find(s => s.id === req.params.studentId) || fallbackStudents[0];
  
  const matches = fallbackJobs.map(job => {
    const matchAnalysis = AIEngine.matchCandidateToJobDetailed(student, job);
    return {
      job,
      matchScore: matchAnalysis.matchScore,
      breakdown: matchAnalysis.breakdown,
      reasons: matchAnalysis.reasons,
      missingSkills: matchAnalysis.missingSkills
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  res.json({ success: true, studentId: student.id, count: matches.length, matches });
});

// 6. AI Career Coach Assistant
app.post('/api/ai-coach/chat', (req, res) => {
  const { studentId = 'std-1', message = '' } = req.body;
  const student = fallbackStudents.find(s => s.id === studentId) || fallbackStudents[0];

  const response = AIEngine.chatCareerCoach(student, message);
  res.json({ success: true, ...response });
});

// 7. Admin Platform Analytics
app.get('/api/admin/analytics', (req, res) => {
  res.json({
    success: true,
    platformMetrics: {
      totalStudents: 25480,
      colleges: 182,
      industryPartners: 420,
      internships: 1860,
      placements: 1240,
      usersOnline: 1284,
      applicationsToday: 342,
      newOpportunities: 28
    },
    commonSkillGaps: [
      { skill: 'Cloud Computing & Kubernetes', deficitPercentage: 68 },
      { skill: 'Cybersecurity & AppSec', deficitPercentage: 54 },
      { skill: 'AI/ML & Deep Learning', deficitPercentage: 49 },
      { skill: 'DevOps & CI/CD Tooling', deficitPercentage: 41 }
    ]
  });
});

// Standard Endpoints
app.get('/api/industry-benchmarks', (req, res) => {
  res.json({ success: true, count: initialBenchmarks.length, data: initialBenchmarks });
});

app.get('/api/curriculums', (req, res) => {
  res.json({ success: true, count: initialCurriculums.length, data: initialCurriculums });
});

app.post('/api/gap-analysis', (req, res) => {
  const { curriculumId, industryId } = req.body;
  const curr = initialCurriculums.find(c => c.id === curriculumId) || initialCurriculums[0];
  const ind = initialBenchmarks.find(b => b.id === industryId) || initialBenchmarks[0];

  const analysis = AIEngine.analyzeCurriculumGap(curr, ind);
  res.json({ success: true, analysis });
});

app.get('/api/jobs', (req, res) => {
  const { type, search } = req.query;
  let filtered = [...fallbackJobs];
  if (type && type !== 'all') {
    filtered = filtered.filter(j => j.type.toLowerCase().includes(type.toLowerCase()));
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(j => 
      j.title.toLowerCase().includes(s) || 
      j.company.toLowerCase().includes(s) || 
      j.requiredSkills.some(sk => sk.toLowerCase().includes(s))
    );
  }
  res.json({ success: true, count: filtered.length, data: filtered });
});

app.post('/api/jobs', (req, res) => {
  const newJob = {
    id: `job-${Date.now().toString().slice(-4)}`,
    ...req.body,
    openings: Number(req.body.openings) || 5,
    logo: req.body.logo || '💼',
    tier: req.body.tier || 'Industry Partner'
  };
  fallbackJobs.unshift(newJob);
  res.status(201).json({ success: true, message: 'Opportunity posted successfully!', job: newJob });
});

app.get('/api/applications', (req, res) => {
  res.json({ success: true, count: fallbackApplications.length, data: fallbackApplications });
});

app.post('/api/applications', (req, res) => {
  const { jobId, studentId, studentName, college, cgpa, resumeUrl } = req.body;
  const job = fallbackJobs.find(j => j.id === jobId);
  if (!job) return res.status(404).json({ success: false, message: 'Job not found' });

  const student = fallbackStudents.find(s => s.id === studentId) || fallbackStudents[0];
  const matchResult = AIEngine.matchCandidateToJobDetailed(student, job);

  const newApp = {
    id: `app-${Date.now().toString().slice(-4)}`,
    jobId,
    jobTitle: job.title,
    company: job.company,
    studentId: studentId || student.id,
    studentName: studentName || student.name,
    college: college || student.college,
    cgpa: Number(cgpa) || student.cgpa,
    matchScore: matchResult.matchScore,
    status: 'Application Submitted',
    appliedDate: new Date().toISOString().split('T')[0],
    timeline: [
      { step: 'Application Submitted', date: new Date().toISOString().split('T')[0], done: true },
      { step: 'ATS Skill Matching Verified', date: 'Processing', done: false },
      { step: 'Shortlisted by Recruiter', date: 'Pending', done: false },
      { step: 'Technical Assessment', date: 'Pending', done: false },
      { step: 'Final Interview & Offer', date: 'Pending', done: false }
    ],
    resumeUrl: resumeUrl || 'https://example.com/resume/verified_profile.pdf',
    notes: 'Candidate applied via Academia-Industry Placement portal.'
  };

  fallbackApplications.unshift(newApp);
  res.status(201).json({ success: true, message: 'Applied successfully!', application: newApp });
});

app.patch('/api/applications/:id/status', (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;
  const appIndex = fallbackApplications.findIndex(a => a.id === id);
  if (appIndex === -1) return res.status(404).json({ success: false, message: 'Application not found' });

  fallbackApplications[appIndex].status = status;
  if (note) fallbackApplications[appIndex].notes = note;
  
  const timeline = fallbackApplications[appIndex].timeline;
  const stepToUpdate = timeline.find(t => !t.done);
  if (stepToUpdate) {
    stepToUpdate.done = true;
    stepToUpdate.date = new Date().toISOString().split('T')[0];
  }

  res.json({ success: true, message: 'Status updated successfully', application: fallbackApplications[appIndex] });
});

app.get('/api/mous', (req, res) => {
  res.json({ success: true, count: fallbackMoUs.length, data: fallbackMoUs });
});

app.post('/api/mous', (req, res) => {
  const newMou = {
    id: `mou-${Date.now().toString().slice(-4)}`,
    ...req.body,
    signedDate: new Date().toISOString().split('T')[0],
    activeProjects: Number(req.body.activeProjects) || 1,
    status: 'Active & Verified'
  };
  fallbackMoUs.unshift(newMou);
  res.status(201).json({ success: true, message: 'MoU recorded successfully!', mou: newMou });
});

app.get('/api/students', (req, res) => {
  res.json({ success: true, count: fallbackStudents.length, data: fallbackStudents });
});

// Student Authentication Routes
app.post('/api/auth/register', (req, res) => {
  const { name, email, password, college, department, year, rollNumber, cgpa, targetRole } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'Name and university email are required.' });
  }

  const existing = fallbackStudents.find(s => s.email?.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'Student with this email is already registered.' });
  }

  const newStudent = {
    id: `std-${Date.now().toString().slice(-4)}`,
    name,
    avatar: '👨‍🎓',
    email,
    password: password || 'password123',
    college: college || 'Apex Institute of Technology',
    department: department || 'Computer Science & Engineering',
    year: year || '3rd Year (Batch 2027)',
    rollNumber: rollNumber || `2023CS${Math.floor(100 + Math.random() * 900)}`,
    cgpa: Number(cgpa) || 8.2,
    targetRole: targetRole || 'Full Stack Developer',
    verifiedSkills: [
      { name: 'JavaScript & Web Stack', level: 'Intermediate', verifiedBy: 'College Lab Exam' },
      { name: 'Data Structures & Algorithms', level: 'Intermediate', verifiedBy: 'Curriculum Coursework' },
      { name: 'Git & Version Control', level: 'Intermediate', verifiedBy: 'SkillBridge Diagnostic' }
    ],
    skillGaps: [
      { name: 'Docker & Kubernetes', severity: 'High', recommendation: 'Complete containerization foundation course' }
    ],
    projects: [
      { title: 'Campus Collaboration Portal', tech: 'React, Node.js, Express, MongoDB' }
    ],
    assessmentScore: 82,
    appliedJobsCount: 0,
    placementStatus: 'Actively Looking for Opportunities'
  };

  fallbackStudents.unshift(newStudent);
  res.status(201).json({ success: true, message: 'Student registered successfully! Welcome to SkillBridge.', student: newStudent });
});

app.post('/api/auth/login', (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier) {
    return res.status(400).json({ success: false, message: 'Email or University Roll Number is required.' });
  }

  const ident = identifier.toLowerCase().trim();
  const student = fallbackStudents.find(s => 
    s.email?.toLowerCase() === ident || 
    s.name?.toLowerCase().includes(ident) ||
    s.rollNumber?.toLowerCase() === ident
  );

  if (!student) {
    return res.status(404).json({ success: false, message: 'No registered student found with this Email or Roll Number. Please sign up.' });
  }

  res.json({ success: true, message: `Welcome back, ${student.name}!`, student });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(), 
    service: 'SkillBridge API',
    database: getDBStatus()
  });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 SkillBridge Backend running on http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Port ${PORT} is already in use by another instance. Using existing running service.`);
  } else {
    console.error('Server error:', err);
  }
});
