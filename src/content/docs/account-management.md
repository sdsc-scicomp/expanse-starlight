---
title: Account Management
description: Managing your Expanse account and projects with the expanse-client tool, and adding users to a project.
---

## Managing Your User Account

The `expanse-client` script provides additional details regarding project availability and usage. The script is located at:

```bash
/cm/shared/apps/sdsc/current/bin/expanse-client
```

The script uses the 'sdsc' module, which is loaded by default.

```bash
[user@login01 ~]$ module load sdsc
```

To review your available projects on Expanse resource use the 'user' parameter and '-r' to desginate a resource. If no resouce is designated expanse data will be shown by default.

```bash
[user@login01 ~]$ expanse-client user -r expanse
 Resource expanse
╭───┬─────────────┬─────────┬────────────┬──────┬───────────┬─────────────────╮
│   │ NAME        │ PROJECT │ TG PROJECT │ USED │ AVAILABLE │ USED BY PROJECT │
├───┼─────────────┼─────────┼────────────┼──────┼───────────┼─────────────────┤
│ 1 │ user        │ ddp386  │            │ 0    │ 110000    │ 8318            │
╰───┴─────────────┴─────────┴────────────┴──────┴───────────┴─────────────────╯
```

To see full list of available resources, use the 'resource' command:

```bash
[user@login02 ~]$ expanse-client resource
Available resources:
expanse
expanse_gpu
expanse_industry
expanse_industry_gpu
```

To review project details, use the 'project' parameter followed by an eligible project. (use -p option to report with out formatting):

```bash
[user@login01 ~]$ expanse-client project ddp386 -p
 Resource expanse
 Project ddp386
 TG Project
 Total allocation 110000
 Total spent 8318
 Expiration November 16, 2022

 NAME USED AVAILABLE USED BY PROJECT
-------------------------------------------------
 user 0 110000 8318
 user1 0 110000 8318
 user2 18 110000 8318
 user3 7825 110000 8318
 user4 0 110000 8318
 user5 152 110000 8318
```

For additional help using the expanse-client tool:

```bash
[user@login01 ~]$ expanse-client -h
Usage:
 expanse-client [command][flags]

Available Commands:
 help Help about any command
 project Get 'project' information
 resource Get resources
 user Get 'user' information

Flags:
 -a, --auth authenticate the request
 -h, --help help for user
 -p, --plain plain no graphics output
 -v, --verbose verbose output
 -r, --resource string Resource to query (default: "expanse")

Global Flags:
 -a, --auth authenticate the request
 -p, --plain plain no graphics output
 -v, --verbose verbose output
```

Many users will have access to multiple projects (e.g. an allocation for a research project and a separate allocation for classroom or educational use). Users should verify that the correct project is designated for all batch jobs. Awards are granted for a specific purposes and should not be used for other projects. Designate a project by replacing `<< project >>` with a project listed in the SBATCH directive in your job script:

```bash
#SBATCH -A << project >>
```

## Adding Users to a Project

Project PIs and co-PIs can add/remove users(accounts) to/from a project. To do this, log in to your [ACCESS portal account](https://allocations.access-ci.org/login) and go to the **Manage Allocations** page.
