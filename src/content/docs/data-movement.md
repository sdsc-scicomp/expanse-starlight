---
title: Data Movement
description: Moving data to and from Expanse with Globus collections and mount points.
---

## Globus: SDSC Collections, Data Movers and Mount Points

All of _Expanse_'s Lustre filesystems are accessible via the SDSC Expanse specific collections(SDSC HPC - Expanse Lustre ; \*SDSC HPC - Projects) . The following table shows the mount points on the data mover nodes (that are the backend for ).

| Machine   | Location on machine        | Location on Globus/Data Movers |
| --------- | -------------------------- | ------------------------------ |
| \*Expanse | `/expanse/projects`        | /                              |
| Expanse   | `/expanse/lustre/projects` | `/projects/...`                |
| Expanse   | `/expanse/lustre/scratch`  | `/scratch/...`                 |
