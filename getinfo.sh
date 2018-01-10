#!/bin/bash
node prepcsv.js
while IFS='' read -r line || [[ -n "$line" ]]; do
	tokens=( $line )
	node bot.js ${tokens[0]} ${tokens[1]}
	done < "$1"
	
