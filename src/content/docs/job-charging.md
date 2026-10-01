---
title: Job Charging
description: How Service Units (SUs) are charged for jobs on Expanse compute, GPU and large-memory nodes.
---

The charge unit for all SDSC machines, including Expanse, is the Service Unit (SU). This corresponds to the equivalent use of one compute core utilizing less than or equal to 2G of data for one hour, or 1 GPU using less than 92G of data for 1 hour. Keep in mind that your charges are based on the resources that are tied up by your job and don't necessarily reflect how the resources are used. Charges on jobs submitted to the 'shared' partitions (shared,gpu-shared,debug,gpu-debug,large-shared) are based on either the number of cores or the fraction of the memory requested, whichever is larger. Jobs submitted to the node-exclusive partitions (compute, gpu) will be charged for the all 128 cores, whether the resources are used or not. The minimum charge for any job is 1 SU.

## Job Charge Considerations

- A node-exclusive job that runs on a compute node for one hour will be charged 128 SUs (128 cores x 1 hour)
- A node-exclusive job that runs on a GPU node for one hour will be charge 4GPU hours (4 GPU x 1 hour)
- A node-exclusive job that runs on a Large memory node for one hour will be charged 1024 SUs (2TB memory X 1 hour)
- A serial job in the shared queue that uses less than 2 GB memory and runs for one hour will be charged 1 SU (1 core x 1 hour)
- Each standard compute node has ~256 GB of memory and 128 cores
  - Each standard node core will be allocated 1 GB of memory, users should explicitly include the `--mem` directive to request additional memory
  - Max. available memory per compute node `--mem = 249208M`
- Each GPU node has 4 GPUs, ~384GB of memory and 40 cores
  - Default resource allocation for 1 GPU = 1 GPU, 1 CPU, and 1G of memory, users will need to explicitly ask for additional resources in their job script.
  - For max memory on a GPU node, users should request `--mem = 377308M`
  - A GPU SU is equivalent to 1GPU, \<10CPUs, and \<92G of memory.
- Multicore jobs will scale according to resource utilization
- Each large memory node has ~2 TB of memory and 128 cores
  - By default the system will only allocate 1 GB of memory per core, explicitly use the `--mem` directive to request additional memory
  - Max. memory per large memory node `--mem = 2055638M`
