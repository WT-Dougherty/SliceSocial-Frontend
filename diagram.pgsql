┌─────────────────────────── App / Frontend (React Native) ────────────────────────────┐
│                         Authorization: Amazon Cognito (JWT)                          │
└──────────────────────────────────────────────────────────────────────────────────────┘
                 │                                             │
                 ▼                                             ▼
       ┌─────────────────┐                             ┌─────────────────┐
       │  API Gateway    │  ← Cognito Authorizer →     │  API Gateway    │
       └────────┬────────┘                             └────────┬────────┘
                │                                             │
                ▼                                             ▼
        ┌──────────────┐                               ┌──────────────┐
        │   Lambda     │    (same code patterns)       │   Lambda     │
        └──────┬───────┘                               └──────┬───────┘
               │                                              │
               │                                              │
     RDS (non‑Aurora)                                 Aurora (clustered)
               │                                              │
               ▼                                              ▼
   ┌───────────────────────────┐                    ┌───────────────────────────┐
   │         RDS Instance      │                    │    Aurora DB Cluster      │
   │  (Postgres/MySQL engine)  │                    │  (Postgres/MySQL compat)  │
   └───────────┬───────────────┘                    └───────────┬───────────────┘
               │                                                │
               │                                                │
      (Optional Multi‑AZ)                              (Always a cluster)
               │                                                │
      ┌────────▼────────┐                           ┌───────────▼───────────┐
      │  Standby in AZ2 │  ← synchronous replicate  │   Writer Instance     │  ←─ Writes
      └─────────────────┘                           └───────────┬───────────┘
                                                               │     ▲
                                                               │     │
                                        ┌──────────────────────▼─────┴──────────────────────┐
                                        │                Cluster Storage                     │
                                        │  Distributed, 6‑way replicated across 3 AZs        │
                                        └──────────────────────┬─────────────────────────────┘
                                                               │
                                     ┌─────────────────────────▼─────────────────────────┐
                                     │                Reader Instances (0..N)            │  ←─ Reads
                                     └─────────────────────────┬─────────────────────────┘
                                                               │
                                     ┌─────────────────────────▼─────────────────────────┐
                                     │ Endpoints:                                        │
                                     │  • Writer endpoint  → all writes (and reads if)   │
                                     │  • Reader endpoint  → load‑balanced read replicas │
                                     └───────────────────────────────────────────────────┘
