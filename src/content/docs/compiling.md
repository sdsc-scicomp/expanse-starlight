---
title: Compiling Codes
description: Compiling codes on Expanse with AMD, Intel, PGI and GNU compilers, including MPI and OpenMP.
---

Expanse CPU nodes have GNU, Intel, and AOCC (AMD) compilers available along with multiple MPI implementations (OpenMPI, MVAPICH2, and IntelMPI). The majority of the applications on _Expanse_ have been built using gcc/10.2.0 which features AMD Rome specific optimization flags (-march=znver2). Users should evaluate their application for best compiler and library selection. GNU, Intel, and AOCC compilers all have flags to support Advanced Vector Extensions 2 (AVX2). Using AVX2, up to eight floating point operations can be executed per cycle per core, potentially doubling the performance relative to non-AVX2 processors running at the same clock speed. Note that AVX2 support is not enabled by default and compiler flags must be set as described below.

Expanse GPU nodes have GNU, Intel, and PGI compilers available along with multiple MPI implementations (OpenMPI, IntelMPI, and MVAPICH2). The gcc/10.2.0, Intel, and PGI compilers have specific flags for the Cascade Lake architecture. Users should evaluate their application for best compiler and library selections.

Note that the login nodes are not the same as the GPU nodes, therefore all GPU codes must be compiled by requesting an interactive session on the GPU nodes.

## Using AMD Compilers

The AMD Optimizing C/C++ Compiler (AOCC) is only available on CPU nodes. AMD compilers can be loaded by executing the following commands at the Linux prompt:

```bash
module load aocc
```

For more information on the AMD compilers: [flang | clang ] -help

| Language | Serial   | MPI      | OpenMP     | MPI+OpenMP      |
| ------- | -------- | -------- | ---------- | --------------- |
| Fortran | flang    | mpif90   | ifort -mp  | mpif90 -fopenmp |
| C       | clang    | mpiclang | icc -lomp  | mpicc -fopenmp  |
| C++     | clang++  | mpiclang | icpc -lomp | mpicxx -fopenmp |

## Using the Intel Compilers

The Intel compilers and the MVAPICH2 MPI compiler wrappers can be loaded by executing the following commands at the Linux prompt:

```bash
module load intel mvapich2
```

For AVX2 support, compile with the `-march=core-avx2` option. Note that this flag alone does not enable aggressive optimization, so compilation with `-O3` is also suggested.

Intel MKL libraries are available as part of the "intel" modules on _Expanse_. Once this module is loaded, the environment variable INTEL_MKLHOME points to the location of the mkl libraries. The [MKL link advisor](https://software.intel.com/en-us/articles/intel-mkl-link-line-advisor) can be used to ascertain the link line (change the INTEL_MKLHOME aspect appropriately).

For example to compile a C program statically linking 64 bit scalapack libraries on _Expanse_:

```bash
mpicc -o pdpttr.exe pdpttr.c \
    -I$INTEL_MKLHOME/mkl/include \
    ${INTEL_MKLHOME}/mkl/lib/intel64/libmkl_scalapack_lp64.a \
    -Wl,--start-group ${INTEL_MKLHOME}/mkl/lib/intel64/libmkl_intel_lp64.a \
    ${INTEL_MKLHOME}/mkl/lib/intel64/libmkl_core.a \
    ${INTEL_MKLHOME}/mkl/lib/intel64/libmkl_sequential.a \
    -Wl,--end-group ${INTEL_MKLHOME}/mkl/lib/intel64/libmkl_blacs_intelmpi_lp64.a \
    -lpthread -lm
```

For more information on the Intel compilers: [ifort | icc | icpc] -help

| Language | Serial | MPI    | OpenMP         | MPI+OpenMP      |
| ------- | ------ | ------ | -------------- | --------------- |
| Fortran | ifort  | mpif90 | ifort -qopenmp | mpif90 -qopenmp |
| C       | icc    | mpicc  | icc -qopenmp   | mpicc -qopenmp  |
| C++     | icpc   | mpicxx | icpc -qopenmp  | mpicxx -qopenmp |

## Using the PGI Compilers

The PGI compilers are only available on the GPU nodes, and can be loaded by executing the following commands at the Linux prompt

```bash
module load pgi
```

Note that the openmpi build is integrated into the PGI install so the above module load provides both PGI and openmpi.

For AVX support, compile with `-fast`.

For more information on the PGI compilers: man [pgf90 | pgcc | pgCC]

| Language | Serial | MPI    | OpenMP    | MPI+OpenMP     |
| ------- | ------ | ------ | --------- | -------------- |
| Fortran | pgf90  | mpif90 | pgf90 -mp | mpif90 -mp     |
| C       | pgcc   | mpicc  | pgcc -mp  | mpicc -mp      |
| C++     | pgCC   | mpicxx | pgCC -mp  | mpicxx -mp     |

## Using the GNU Compilers

The GNU compilers can be loaded by executing the following commands at the Linux prompt:

```bash
module load gcc openmpi
```

For AVX support, compile with -march=core-avx2. Note that AVX support is only available in version 4.7 or later, so it is necessary to explicitly load the gnu/4.9.2 module until such time that it becomes the default.

For more information on the GNU compilers: `man [gfortran | gcc | g++]`

| Language | Serial   | MPI    | OpenMP            | MPI+OpenMP      |
| ------- | -------- | ------ | ----------------- | --------------- |
| Fortran | gfortran | mpif90 | gfortran -fopenmp | mpif90 -fopenmp |
| C       | gcc      | mpicc  | gcc -fopenmp      | mpicc -fopenmp  |
| C++     | g++      | mpicxx | g++ -fopenmp      | mpicxx -fopenmp |

## Notes and Hints

- The mpif90, mpicc, and mpicxx commands are actually wrappers that call the appropriate serial compilers and load the correct MPI libraries. While the same names are used for the Intel, PGI and GNU compilers, keep in mind that these are completely independent scripts.
- If you use the PGI or GNU compilers or switch between compilers for different applications, make sure that you load the appropriate modules before running your executables.
- When building OpenMP applications and moving between different compilers, one of the most common errors is to use the wrong flag to enable handling of OpenMP directives. Note that Intel, PGI, and GNU compilers use the -qopenmp, -mp, and -fopenmp flags, respectively.
- Explicitly set the optimization level in your makefiles or compilation scripts. Most well written codes can safely use the highest optimization level (-O3), but many compilers set lower default levels (e.g. GNU compilers use the default -O0, which turns off all optimizations).
- Turn off debugging, profiling, and bounds checking when building executables intended for production runs as these can seriously impact performance. These options are all disabled by default. The flag used for bounds checking is compiler dependent, but the debugging (-g) and profiling (-pg) flags tend to be the same for all major compilers.
