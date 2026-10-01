---
title: Expanse AI Resource
description: The Expanse AI resource with NVIDIA H100 GPUs - technical summary, running jobs, storage and AI software.
---

## Technical Summary

The Expanse AI resource features 34 Dell XE9640 servers, each containing four NVIDIA H100 GPUs, two 36-core Intel Sapphire Road processors, 1 TB of RAM and 6.4 TB of local NVMe storage. The resource is integrated into the Expanse supercomputer infrastructure and uses the same login nodes (login.expanse.sdsc.edu), 2-factor authentication (described above), and home directories. The resource also includes 3PB of cloud-compatible Ceph storage. The nodes are available via the “nairr-gpu” and “nairr-gpu-shared” partitions on Expanse. Time on the nodes is allocated via the NAIRR Pilot Program ([https://nairrpilot.org/opportunities/allocations](https://nairrpilot.org/opportunities/allocations)).

**Running Jobs on Expanse AI Resource**

Interactive and batch computing jobs can be submitted using Slurm commands as described in the running jobs section above. A few key differences must be noted:

[1] The GPU specification must include the GPU type (h100). So, for example, to request 1 H100 GPU in the “nairr-gpu-shared” partition you can do:

```bash
#SBATCH --gpus=h100:1
```

[2] The Expanse Lustre filesystem is \*not\* mounted on the Expanse AI resource. IO tasks must use the node local NVMe storage (/scratch/$USER/job_$SLURM_JOBID) and push/pull data to/from the Ceph storage pool (accessible via a S3 interface) for data that is needed beyond the job runtime. Details are provided in the Expanse AI Resource storage section below.

**Storage options on Expanse AI Resource**

There are three primary storage options on the Expanse AI Resource.

[1] The home directory filesystem which is restricted to 100G. Please do not use this location for any intensive IO. This location is primarily meant for source code and job scripts storage.

[2] The node local NVMe storage: Each node has ~6TB of space available for use during a job’s runtime. The location is /scratch/$USER/job_$SLURM_JOBID. Users can change to this location, pull/push data from external sources (including the Ceph filesystem) and use the location for their IO. Note that this location is purged at the end of the job so any data that is needed beyond the job’s runtime must be pushed to the available Ceph storage.

[3] A Ceph based storage system is available for storing data for the duration of the project. The primary mode of access is via a S3 interface. Each user will be provided with S3 credentials for access. Users can install the s3cmd tool (using pip or conda install, https://github.com/s3tools/s3cmd) and use it to push data into S3 buckets on the Ceph storage. For example, to create a test bucket and move data:

```bash
s3cmd mb s3://myusernametest

s3cmd ls s3://myusernametest

s3cmd put --recursive mydirectoryonscratch s3://myusernametest/
```

**AI Software**

There are two main options for AI software:

[1] Singularity Images: SDSC provided singularity images can be used for PyTorch and TensorFlow based codes. Users can also build singularity images from NVIDIA NGC containers or build their own containers.

[2] Conda based installs: Users can also install packages using a conda installation in their home directory or using the galyleo tool (https://github.com/mkandes/galyleo?tab=readme-ov-file#conda) available on Expanse.

A sample PyTorch example batch script is provided in /cm/shared/examples/sdsc/ExpanseAIR/pytorch.
