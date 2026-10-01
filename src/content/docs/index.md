---
title: Technical Summary
description: Expanse supercomputing cluster overview, technical details, resource allocation and job scheduling policies.
---

Expanse is a dedicated [Advanced Cyberinfrastructure Coordination Ecosystem: Services and Support](https://access-ci.org/) (ACCESS) cluster designed by Dell and SDSC delivering 5.16 peak petaflops, and will offer Composable Systems and Cloud Bursting.

Expanse's standard compute nodes are each powered by two 64-core AMD EPYC 7742 processors and contain 256 GB of DDR4 memory, while each GPU node contains four NVIDIA V100s (32 GB SXM2) connected via NVLINK and dual 20-core Intel Xeon 6248 CPUs. _Expanse_ also has four 2 TB large memory nodes.

Expanse is organized into 13 SDSC Scalable Compute Units (SSCUs), comprising 728 standard nodes, 54 GPU nodes and 4 large-memory nodes. Every Expanse node has access to a 12 PB Lustre parallel file system (provided by Aeon Computing) and a 7 PB Ceph Object Store system. Expanse uses the Bright Computing HPC Cluster management system and the SLURM workload manager for job scheduling.

Expanse supports the [ACCESS core software stack](https://access-ci.atlassian.net/wiki/spaces/PreReleaseDocumentation/pages/67716863), which includes remote login, remote computation, data movement, science workflow support, and science gateway support toolkits.

Expanse is an NSF-funded system operated by the [San Diego Supercomputer Center](https://www.sdsc.edu) at [UC San Diego](https://www.ucsd.edu), and is available through the ACCESS program.

## Resource Allocation Policies

- The maximum allocation for a Principle Investigator on Expanse is 15M core-hours and 75K GPU hours. Limiting the allocation size means that Expanse can support more projects, since the average size of each is smaller.
- Science Gateways requesting in the Maximize tier can request up to 30M core-hours.

## Job Scheduling Policies

- The maximum allowable job size on Expanse is 4,096 cores – a limit that helps shorten wait times since there are fewer nodes in idle state waiting for large number of nodes to become free.
- Expanse supports long-running jobs - run times can be extended to one week. Users requests will be evaluated based on number of jobs and job size.
- Expanse supports shared-node jobs (more than one job on a single node). Many applications are serial or can only scale to a few cores. Allowing shared nodes improves job throughput, provides higher overall system utilization, and allows more users to run on Expanse.

## Technical Details

| System Component              | Configuration                                        |
| ----------------------------- | ---------------------------------------------------- |
| **_Compute Nodes_**           |                                                      |
| CPU Type                      | _AMD EPYC 7742_                                      |
| Nodes                         | 728                                                  |
| Sockets                       | 2                                                    |
| Cores/socket                  | 64                                                   |
| Clock speed                   | 2.25 GHz                                             |
| Flop speed                    | 4608 GFlop/s                                         |
| Memory capacity               | \* 256 GB DDR4 DRAM                                  |
| Local Storage                 | 1TB Intel P4510 NVMe PCIe SSD                        |
| Max CPU Memory bandwidth      | 409.5 GB/s                                           |
| **_GPU Nodes_**               |                                                      |
| GPU Type                      | NVIDIA V100 SXM2                                     |
| Nodes                         | 52                                                   |
| GPUs/node                     | 4                                                    |
| CPU Type                      | Xeon Gold 6248                                       |
| Cores/socket                  | 20                                                   |
| Sockets                       | 2                                                    |
| Clock speed                   | 2.5 GHz                                              |
| Flop speed                    | 34.4 TFlop/s                                         |
| Memory capacity               | \*384 GB DDR4 DRAM                                   |
| Local Storage                 | 1.6TB Samsung PM1745b NVMe PCIe SSD                  |
| Max CPU Memory bandwidth      | 281.6 GB/s                                           |
| **_Large-Memory_**            |                                                      |
| CPU Type                      | _AMD EPYC 7742_                                      |
| Nodes                         | 4                                                    |
| Sockets                       | 2                                                    |
| Cores/socket                  | 64                                                   |
| Clock speed                   | 2.25 GHz                                             |
| Flop speed                    | 4608 GFlop/s                                         |
| Memory capacity               | 2 TB                                                 |
| Local Storage                 | 3.2 TB (2 X 1.6 TB Samsung PM1745b NVMe PCIe SSD)    |
| STREAM Triad bandwidth        | ~310 GB/sec                                          |
| **_Full System_**             |                                                      |
| Total compute nodes           | 728                                                  |
| Total compute cores           | 93,184                                               |
| Total GPU nodes               | 52                                                   |
| Total V100 GPUs               | 208                                                  |
| Peak performance              | 5.16 PFlop/s                                         |
| Total memory                  | 247 TB                                               |
| Total memory bandwidth        | 215 TB/s                                             |
| Total flash memory            | 824 TB                                               |
| **_HDR InfiniBand Interconnect_** |                                                  |
| Topology                      | Hybrid Fat-Tree                                      |
| Link bandwidth                | 100 Gb/s (bidirectional); HDR200 switches            |
| Peak bisection bandwidth      | 8.5 TB/s                                             |
| MPI latency                   | 1.17-1.69 µs                                         |
| **_DISK I/O Subsystem_**      |                                                      |
| File Systems                  | NFS, Ceph                                            |
| Lustre Storage(performance)   | 12 PB                                                |
| Ceph Storage                  | 7 PB                                                 |
| I/O bandwidth (performance disk) | 140 GB/s, 200K IOPs                               |

## Systems Software Environment

| Software Function             | Description                  |
| ----------------------------- | ---------------------------- |
| Cluster Management            | Bright Cluster Manager       |
| Operating System              | Rocky Linux                  |
| File Systems                  | Lustre, Ceph                 |
| Scheduler and Resource Manager | SLURM                       |
| ACCESS Software               | CTSS                         |
| User Environment              | Lmod                         |
| Compilers                     | AOCC, GCC, Intel, PGI        |
| Message Passing               | Intel MPI, MVAPICH, Open MPI |
