#!/bin/sh

function help {
  cat <<END
get-from-report <bugs|issues> <...input-files>
END
}

if [ -z $1 -o -z $2 ]; then
  help 1>&2
  exit 1
fi

all_args=("$@")
rest_args=("${all_args[@]:1}")

sed -rf "get-$1" "${rest_args[@]}"

exit 0
