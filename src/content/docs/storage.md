---
title: Storage
description: Expanse storage systems - local scratch, Lustre filesystems, home directory, and backup policies.
---

## Overview

:::danger

**Users are responsible for backing up all important data in case of unexpected data loss at SDSC.**

:::

The SDSC Expanse Lustre file system (including `/expanse/lustre/scratch` and `/expanse/lustre/project`) **IS NOT** an archival file system. The SDSC Expanse Lustre file system **IS NOT** backed up. SDSC will enforce a strict purge policy on the Expanse Lustre filesystem. **Project space will be purged 90 days after allocation expires. Scratch files will be purged 90 days from creation date.**

## Local Scratch Disk

The compute nodes on _Expanse_ have access to fast flash storage. There is 1TB of SSD space available for use on each compute node. The latency to the SSDs is several orders of magnitude lower than that for spinning disk (\<100 microseconds vs. milliseconds) making them ideal for user-level check pointing and applications that need fast random I/O to large scratch files. Users can access the SSDs only during job execution under the following directories local to each compute node:

`/scratch/$USER/job_$SLURM_JOB_ID`

| Partition       | Space Available |
| --------------- | --------------- |
| compute,shared  | 1 TB            |
| gpu, gpu-shared | 1.6TB           |
| large-shared    | 3.2 TB          |

## Parallel Lustre Filesystems

In addition to the local scratch storage, users will have access to global parallel filesystems on _Expanse_. Every _Expanse_ node has access to a 12 PB Lustre parallel file system (provided by Aeon Computing) and a 7 PB Ceph Object Store system, 140 GB/second performance storage. SDSC limits the number of files that can be stored in the `/lustre/scratch` filesystem to 2 million files per user. Users should contact support for assistance at the [ACCESS Help Desk](https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/pages/72417292) if their workflow requires extensive small I/O, to avoid causing system issues assosicated with load on the metadata server.

The two Lustre filesystems available on _Expanse_ are:

- Lustre _Expanse_ scratch filesystem: `/expanse/lustre/scratch/$USER/temp_project`
- Lustre NSF projects filesystem: `/expanse/lustre/projects/`

### Submitting Jobs Using Lustre

Jobs that need to use the Lustre filesystem should explicitly reqeust the feature by including the following line to their script:

```bash
#SBATCH --constraint="lustre"
```

This constraint can be used in combination with any other constraints you are already using. For example:

```bash
#SBATCH --constraint="lustre&persistenceoff&exclusive"
```

Jobs submitted without --constraint="lustre" that need the Lustre filesystem will be scheduled on nodes without Lustre and will FAIL.

## Home File System

After logging in, users are placed in their home directory, /home, also referenced by the environment variable `$HOME`. The home directory is limited in space and should be used only for source code storage. User will have access to 100GB in `/home`. Jobs should **never** be run from the home file system, as it is not set up for high performance throughput. Users should keep usage on `$HOME` under 100GB. Backups are currently being stored on a rolling 8-week period. In case of file corruption/data loss, please contact us at [ACCESS Help Desk](https://access-ci.atlassian.net/wiki/spaces/ACCESSdocumentation/pages/72417292) to retrieve the requested files.
