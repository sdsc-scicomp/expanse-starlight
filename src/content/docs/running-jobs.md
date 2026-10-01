---
title: Running Jobs on Expanse
description: Submitting and managing batch and interactive jobs with SLURM on Expanse, including example scripts.
---

Expanse uses the **Simple Linux Utility for Resource Management (SLURM)** batch environment. When you run in the batch mode, you submit jobs to be run on the compute nodes using the `sbatch` command as described below. _Remember that computationally intensive jobs should be run only on the compute nodes and not the login nodes._

Expanse places limits on the number of jobs queued and running on a per group (allocation) and partition basis. Please note that submitting a large number of jobs (especially very short ones) can impact the overall scheduler response for all users. **_If you are anticipating submitting a lot of jobs, please contact the SDSC consulting staff before you submit them. We can work to check if there are bundling options that make your workflow more efficient and reduce the impact on the scheduler._**

The limits for each partition are noted in the table below. _Partition limits are subject to change based on Early User Period evaluation._

| Partition Name | Max Walltime | Max Nodes/Job | Max Running Jobs | Max Running + Queued Jobs | Charge Factor | Notes                                                                                          |
| -------------- | ------------ | ------------- | ---------------- | ------------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| compute        | 48 hrs       | 32            | 32               | 64                        | 1             | Exclusive access to regular compute nodes; _limit applies per group_                          |
| ind-compute    | 48 hrs       | 32            | 16               | 32                        | 1             | Exclusive access to Industry compute nodes; _limit applies per group_                          |
| shared         | 48 hrs       | 1             | 4096             | 4096                      | 1             | Single-node jobs using fewer than 128 cores                                                    |
| ind-shared     | 48 hrs       | 1             | 2048             | 2048                      | 1             | Single-node Industry jobs using fewer than 128 cores                                           |
| gpu            | 48 hrs       | 4             | 4                | 8 (32 Tres GPU)           | 1             | Used for exclusive access to the GPU nodes                                                     |
| ind-gpu        | 48 hrs       | 2             | 4                | 4 (8 Tres GPU)            | 1             | Exclusive access to the Industry GPU nodes                                                     |
| nairr-gpu      | 48 hrs       | 4             | 4                | 8 (32 Tres GPU)           | 1             | Exclusive access to the NAIRR GPU nodes                                                        |
| gpu-shared     | 48 hrs       | 1             | 24               | 24 (24 Tres GPU)          | 1             | Single-node job using fewer than 4 GPUs                                                        |
| ind-gpu-shared | 48 hrs       | 1             | 24               | 24 (24 Tres GPU)          | 1             | Single-node job using fewer than 4 Industry GPUs                                               |
| nairr-gpu-shared | 48 hrs     | 1             | 16               | 16 (16 Tres GPU)          | 1             | Single-node job using fewer than 4 NAIRR GPUs                                                  |
| large-shared   | 48 hrs       | 1             | 1                | 4                         | 1             | Single-node jobs using large memory up to 2 TB (minimum memory required 256G)                   |
| debug          | 30 min       | 2             | 1                | 2                         | 1             | Priority access to shared nodes set aside for testing of jobs with short walltime and limited resources |
| gpu-debug      | 30 min       | 2             | 1                | 2                         | 1             | Priority access to gpu-shared nodes set aside for testing of jobs with short walltime and limited resources; _max two gpus per job_ |
| preempt        | 7 days       | 32            |                  | 128                       | .8            | Non-refundable discounted jobs to run on free nodes that can be pre-empted by jobs submitted to any other queue |
| gpu-preempt    | 7 days       | 1             |                  | 24 (24 Tres GPU)          | .8            | Non-refundable discounted jobs to run on unallocated nodes that can be pre-empted by higher priority queues |

## Requesting interactive resources using srun

You can request an interactive session using the `srun` command. The following example will request one regular compute node, 4 cores, in the debug partition for 30 minutes.

```bash
srun --partition=debug  --pty --account=<<project>> --nodes=1 --ntasks-per-node=4 \
    --mem=8G -t 00:30:00 --wait=0 --export=ALL /bin/bash
```

The following example will request a GPU node, 10 cores, 1 GPU and 96G in the debug partition for 30 minutes. To ensure the GPU environment is properly loaded, please be sure run both the `module purge` and `module restore` commands.

```bash
login01$ srun --partition=gpu-debug --pty --account=<<project>> --ntasks-per-node=10 \
    --nodes=1 --mem=96G --gpus=1 -t 00:30:00 --wait=0 --export=ALL /bin/bash

srun: job 1336890 queued and waiting for resources
srun: job 1336890 has been allocated resources
exp-7-59$ module purge
exp-7-59$ module restore

Resetting modules to system default. Resetting $MODULEPATH back to system default.
    All extra directories will be removed from $MODULEPATH.
```

## Submitting Jobs Using sbatch

Jobs can be submitted to the sbatch partitions using the `sbatch` command as follows:

```bash
sbatch jobscriptfile
```

where `jobscriptfile` is the name of a UNIX format file containing special statements (corresponding to sbatch options), resource specifications and shell commands. Several example SLURM scripts are given below:

### Basic MPI Job

```bash
#!/bin/bash
#SBATCH --job-name="hellompi"
#SBATCH --output="hellompi.%j.%N.out"
#SBATCH --partition=compute
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=128
#SBATCH --mem=0
#SBATCH --account=<<project*>>
#SBATCH --export=ALL
#SBATCH -t 01:30:00

#This job runs with 2 nodes, 128 cores per node for a total of 256 tasks.

module purge
module load cpu
#Load module file(s) into the shell environment
module load gcc
module load mvapich2
module load slurm

srun --mpi=pmi2 -n 256 ../hello_mpi
```

- _Expanse requires users to enter a valid project name; users can list valid project by running the `expanse-client` script._
- _Expanse requires users to include memory , by using --mem=0 for compute partition the job will be allocated all the avialble memory on the node_

### Basic OpenMP Job

```bash
#!/bin/bash
#SBATCH --job-name="hello_openmp"
#SBATCH --output="hello_openmp.%j.%N.out"
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=1
#SBATCH --cpus-per-task=24
#SBATCH --mem=249000M
#SBATCH --account=<<project*>>
#SBATCH --export=ALL
#SBATCH -t 01:30:00

module purge
module load cpu
module load slurm
module load gcc
module load openmpi

#SET the number of openmp threads
export OMP_NUM_THREADS=24

#Run the job
./hello_openmp
```

_\* Expanse requires users to enter a valid project name; users can list valid project by running the `expanse-client` script._

### Hybrid MPI-OpenMP Job

```bash
#!/bin/bash
#SBATCH --job-name="hellohybrid"
#SBATCH --output="hellohybrid.%j.%N.out"
#SBATCH --partition=compute
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=128
#SBATCH --cpus-per-task=16
#SBATCH --mem=249000M
#SBATCH --account=<<project*>>
#SBATCH --export=ALL
#SBATCH -t 01:30:00

#This job runs with 1 node, 128 cores per node for a total of 128 cores.
# We use 8 MPI tasks and 16 OpenMP threads per MPI task

module purge
module load cpu
module load slurm
module load intel
module load intel-mpi

export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK

mpirun -genv I_MPI_PIN_DOMAIN=omp:compact ./hello_hybrid
```

_\* Expanse require users to enter a valid project name; users can list valid project by running the `expanse-client` script._

### Using the Shared Partition

```bash
#!/bin/bash
#SBATCH -p shared
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=8
#SBATCH --mem=40G
#SBATCH -t 01:00:00
#SBATCH -J job.8
#SBATCH -A <<project*>>
#SBATCH -o job.8.%j.%N.out
#SBATCH -e job.8.%j.%N.err
#SBATCH --export=ALL

export SLURM_EXPORT_ENV=ALL

module purge
module load cpu
module load gcc
module load mvapich2
module load slurm

srun -n 8 ../hello_mpi
```

_\* Expanse requires users to enter a valid project name; users can list valid project by running the `expanse-client` script._

The above script will run using 8 cores and 40 GB of memory. Please note that the performance in the shared partition may vary depending on how sensitive your application is to memory locality and the cores you are assigned by the scheduler. It is possible the 8 cores will span two sockets for example.

## Using Large Memory Nodes

The large memory nodes can be accessed via the "large-shared" partition. Charges are based on either the number of cores or the fraction of the memory requested, whichever is larger. By default the system will only allocate 1 GB of memory per core. If additional memory is required, users should explicitly use the `--mem` directive.

For example, on the "large-shared" partition, the following job requesting 128 cores and 2000 GB of memory (about 100% of 2TB of one node's available memory) for 1 hour will be charged 1024 SUs:

200/1455(memory) \* 64(cores) \* 1(duration) ~= 1024

```bash
#SBATCH --partition=large-shared
#SBATCH --nodes=1
#SBATCH --ntasks-per-node=128
#SBATCH --cpus-per-task=1
#SBATCH --mem=2055638M

export OMP_PROC_BIND='true'
```

While there is not a separate 'large' partition, a job can still explicitly request all of the resources on a large memory node. Please note that there is no premium for using _Expanse_'s large memory nodes. Users are advised to request the large nodes only if they need the extra memory.
