---
title: Modules
description: Using Lmod environment modules on Expanse to manage compilers, libraries and software.
---

Environment Modules provide for dynamic modification of your shell environment. Module commands set, change, or delete environment variables, typically in support of a particular application. They also let the user choose between different versions of the same software or different combinations of related codes.

_Expanse_ uses Lmod, a Lua-based module system. Users will now need to setup their own environment by loading available modules into the shell environment, including compilers and libraries and the batch scheduler.

Users will not see all the available modules when they run the `module available` command without loading a compiler. Users should use the command `module spider` to see if a particular package exists and can be loaded on the system. For additional details, and to identify dependents modules, use the command:

```bash
module spider <application_name>
```

The module paths are different for the CPU and GPU nodes. Users can enable the paths by loading the following modules:

```bash
module load cpu (for cpu nodes)
```

```bash
module load gpu (for gpu nodes)
```

Users are requested to ensure that both sets are not loaded at the same time in their build/run environment (use the `module list` command to check in an interactive session).

On the GPU nodes, the gnu compiler used for building packages is the default version 8.3.1 from the OS. Hence, no additional `module load` command is required to use them. For example, if one needs OpenMPI built with gnu compilers, the following is sufficient:

```bash
module load openmpi
```

## Useful Modules Commands

Here are some common module commands and their descriptions:

| Command                                 | Description                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------- |
| `module list`                           | List the modules that are currently loaded                                        |
| `module avail`                          | List the modules that are available in environment                                |
| `module spider`                         | List of the modules and extensions currently available                            |
| `module display <module_name>`          | Show the environment variables used by \<module name\> and how they are affected  |
| `module unload <module name>`           | Remove \<module name\> from the environment                                       |
| `module load <module name>`             | Load \<module name\> into the environment                                         |
| `module swap <module one> <module two>` | Replace \<module one\> with \<module two\> in the environment                     |

## Loading and unloading modules

Some modules depend on others, so they may be loaded or unloaded as a consequence of another module command. If a model has dependencies, the command `module spider <module_name>` will provide additional details.

**Module: command not found**

The error message _module: command not found_ is sometimes encountered when switching from one shell to another or attempting to run the module command from within a shell script or batch job. The reason the `module` command may not be inherited as expected is that it is defined as a function for your login shell. If you encounter this error, execute the following from the command line (interactive shells) or add to your shell script (including SLURM batch scripts):

```bash
source /etc/profile.d/modules.sh
```
