# This script goes through all the repositories in the given directory and 
# Aggregate the src files and header file in a single file for each repository
# Use getopts to parse the arguments

# Default values
REPOSITORY_DIR=$(pwd)
OUTPUT_DIR=$(pwd)/aggregate

# Parse the arguments
while getopts ":r:o:" opt; do
  case $opt in
    r)
      REPOSITORY_DIR=$OPTARG
      ;;
    o)
      OUTPUT_DIR=$OPTARG
      ;;
    h)
      echo "Usage: $0 [-r repository_dir] [-o output_dir]" >&2
      echo "Default values are: repository_dir=$REPOSITORY_DIR, output_dir=$OUTPUT_DIR" >&2
      exit 1
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done

# Check if the repository directory exists
if [ ! -d $REPOSITORY_DIR ]; then
  echo "Repository directory $REPOSITORY_DIR does not exist" >&2
  exit 1
fi

# Create the output directory if it does not exist
if [ ! -d $OUTPUT_DIR ]; then
  mkdir $OUTPUT_DIR
fi
OUTPUT_DIR=$(realpath $OUTPUT_DIR)

# Empty the output directory
rm -rf $OUTPUT_DIR/*

# Go to the repository directory
cd $REPOSITORY_DIR

# For each repository
for repository in */; do
  # Go to the repository directory
  cd $repository

  # Get the repository name
  repository_name=$(basename $repository)

  # Create the output file for the repository
  touch $OUTPUT_DIR/${repository_name}.c

  black_list="argsparse.c argsparse.h configp.h utils.h"
  #prefix src/
    # Aggregate the src files
  for src_file in src/*.c; do
    if [[ ! $black_list =~ $(basename $src_file) ]]; then      
      cat "$src_file" >> $OUTPUT_DIR/${repository_name}.c
    fi
  done

  # Aggregate the header files
  for header_file in src/*.h; do
    if [[ ! $black_list =~ $(basename $header_file) ]]; then
      cat "$header_file" >> $OUTPUT_DIR/${repository_name}.c
    fi
  done

  # Go back to the repository directory
  cd ..
done