#!/usr/bin/env bash
#         find all data-cy attribute in src | select values |
SRC_SELECTORS=$(grep -hro 'data-cy="[^"]*"' src | cut -d \" -f2 | sort | uniq)
TEST_SELECTORS=$(grep -hro '.getDataCy([^"]*' cypress src | cut -d \' -f2 | sort | uniq)

UNUSED_SELECTORS=$(comm -23 <(echo "$SRC_SELECTORS") <(echo "$TEST_SELECTORS"))

if [[ $UNUSED_SELECTORS != "" ]]; then
echo -e "WARNING! There are some selectors in your app that are not being used:

$UNUSED_SELECTORS"
fi

echo $SRC_SELECTORS | sed "s/ /'\n| '/g; s/^/&export type Selectors = \n| '/; s/.$/&'/;" | cat > cypress/support/@types/selectors.d.ts