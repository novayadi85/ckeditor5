/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module typing/utils/getlasttextline
 */

/**
 * Returns a last text limited by a non-text node from a given range.
 *
 * A text "line" is understood to be a text limited either by a parent block or by inline elements (e.g. `<softBreak>`).
 *
 * @protected
 * @param {module:engine/model/range~Range} range
 * @param {module:engine/model/model~Model} model
 * @returns {module:typing/utils/getlasttextline~LastTextLineData}
 */
export default function getLastTextLine( range, model ) {
	let start = range.start;

	const text = Array.from( range.getItems() ).reduce( ( rangeText, node ) => {
		// Trim text to a last occurrence of an inline element and update range start.
		if ( !( node.is( 'text' ) || node.is( 'textProxy' ) ) ) {
			start = model.createPositionAfter( node );

			return '';
		}

		return rangeText + node.data;
	}, '' );

	return { text, range: model.createRange( start, range.end ) };
}

/**
 * A value returned from the {@link module:typing/utils/getlasttextline~getLastTextLine}.
 *
 * @typedef {Object} module:typing/utils/getlasttextline~LastTextLineData
 *
 * @property {String} text The text from the text nodes.
 * @property {module:engine/model/range~Range} The trimmed range of the text.
 */
