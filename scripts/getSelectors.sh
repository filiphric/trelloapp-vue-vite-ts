#!/usr/bin/env bash
#         find all data-cy attribute in src | select values |
SELECTORS=$(grep -hro 'data-cy="[^"]*"' src | cut -d \" -f2 | sort | uniq)

#                remove all spaces ;       add string to the start      ; add to the end |            write to a file 
echo $SELECTORS | sed "s/ /'\n| '/g; s/^/&export type Selectors = \n| '/; s/.$/&'/;" | cat > cypress/support/@types/selectors.d.ts