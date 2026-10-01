---
title: Using GPU Nodes
description: Running GPU jobs on Expanse, GPU modes, the no-requeue option, job dependencies and monitoring.
---

GPU nodes are allocated as a separate resource. The GPU nodes can be accessed via either the "gpu" or the "gpu-shared" partitions.

```bash
#SBATCH -p gpu
```

or

```bash
#SBATCH -p gpu-shared
```

When users request 1 GPU, in gpu-shared partition, by default they will also receive, 1 CPU, and 1G memory. Here is an example AMBER script using the gpu-shared queue.

## GPU job

```bash
#!/bin/bash
#SBATCH --job-name="ambergpu"
#SBATCH --output="ambergpu.%j.%N.out"
#SBATCH --partition=gpu
#SBATCH --nodes=1
#SBATCH --gpus=4
#SBATCH --mem=377300M
#SBATCH --account=<<project*>>
#SBATCH --no-requeue
#SBATCH -t 01:00:00

module purge
module load gpu
module load slurm
module load openmpi
module load amber
pmemd.cuda -O -i mdin.GPU -o mdout.GPU.$SLURM_JOBID -x mdcrd.$SLURM_JOBID \
    -nf mdinfo.$SLURM_JOBID -1 mdlog.$SLURM_JOBID -p prmtop -c inpcrd
```

_\* Expanse requires users to enter a valid project name; users can list valid project by running the `expanse-client` script._

## GPU-shared job

```bash
#!/bin/bash
#SBATCH --job-name="ambergpushared"
#SBATCH --output="ambergpu.%j.%N.out"
#SBATCH --partition=gpu-shared
#SBATCH --nodes=1
#SBATCH --gpus=2
#SBATCH --cpus-per-task=1
#SBATCH --mem=93G
#SBATCH --account=<<project*>>
#SBATCH --no-requeue
#SBATCH -t 01:00:00

module purge
module load gpu
module load slurm
module load openmpi
module load amber
pmemd.cuda -O -i mdin.GPU -o mdout-OneGPU.$SLURM_JOBID -p prmtop -c inpcrd
```

_\* Expanse requires users to enter a valid project name; users can list valid project by running the `expanse-client` script._

Users can find application specific example job script on the system in directory `/cm/shared/examples/sdsc/`.

GPU modes can be controlled for jobs in the "gpu" partition. By default, the GPUs are in non-exclusive mode and the persistence mode is 'on'. If a particular "gpu" partition job needs exclusive access the following options should be set in your batch script:

```bash
#SBATCH --constraint=exclusive
```

To turn persistence off add the following line to your batch script:

```bash
#SBATCH --constraint=persistenceoff
```

The charging equation will be:

GPU SUs = (Number of GPUs) x (wallclock time)

## SLURM No-Requeue Option

SLURM will requeue jobs if there is a node failure. However, in some cases this might be detrimental if files get overwritten. If users wish to avoid automatic requeue, the following line should be added to their script:

```bash
#SBATCH --no-requeue
```

The 'requeue' count limit is currently set to 5. The job will be requeued 5 times after which the job will be placed in the REQUEUE_HOLD state and the job must be canceled and resubmitted.

## Example Scripts for Applications

SDSC User Services staff have developed sample run scripts for common applications. They are available in the `/cm/shared/examples` directory on _Expanse_.

### Job Dependencies

There are several scenarios (e.g. splitting long running jobs, workflows) where users may require jobs with dependencies on successful completions of other jobs. In such cases, SLURM's `--dependency` option can be used. The syntax is as follows:

```bash
[user@login01-expanse ~]$ sbatch --dependency=afterok:jobid jobscriptfile
```

### Job Monitoring and Management

Users can monitor jobs using the `squeue` command.

```bash
[user@expanse ~]$ squeue -u user1

             JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
            256556   compute raxml_na user1     R    2:03:57      4 expanse-14-[11-14]
            256555   compute raxml_na user1     R    2:14:44      4 expanse-02-[06-09]
```

In this example, the output lists two jobs that are running in the "compute" partition. The jobID, partition name, job names, user names, status, time, number of nodes, and the node list are provided for each job. Some common `squeue` options include:

| Option    | Result                                                  |
| --------- | ------------------------------------------------------- |
| `-i <interval>`   | Repeatedly report at intervals (in seconds)             |
| `-ij<job_list>`   | Displays information for specified job(s)               |
| `-p <part_list>`  | Displays information for specified partitions (queues)  |
| `-t <state_list>` | Shows jobs in the specified state(s)                    |

Users can cancel their own jobs using the `scancel` command as follows:

```bash
[user@expanse ~]$ scancel <jobid>
```
