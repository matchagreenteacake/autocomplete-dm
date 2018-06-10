'use babel';

// data source is an array of objects
import suggestions from '../data/dm';

class provider {
	constructor() {
		// offer suggestions only when editing .dm file
		this.selector = '.source.dm';
	}

	getSuggestions(options) {
		const { prefix } = options;

	return this.findMatchingSuggestions(prefix);
	}

	findMatchingSuggestions(prefix) {
		// filter list of suggestions to those matching the prefix, case insensitive
		let prefixLower = prefix.toLowerCase();
		let matchingSuggestions = suggestions.filter((suggestion) => {
			let textLower = suggestion.displayText.toLowerCase();
			return textLower.startsWith(prefixLower);
		});

		// run each matching suggestion through inflateSuggestion() and return
		return matchingSuggestions.map(this.inflateSuggestion);
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(suggestion) {
			if (suggestion.snippet){
			return {
				snippet: suggestion.snippet,
				description: suggestion.description,
				descriptionMoreURL: suggestion.descriptionMoreURL,
				type: suggestion.type,
				rightLabel: suggestion.type
			};
		}
		else {
			return {
				text: suggestion.displayText,
				description: suggestion.description,
				descriptionMoreURL: suggestion.descriptionMoreURL,
				type: suggestion.type,
				rightLabel: suggestion.type
			};
		}
	}
}
export default new provider();
