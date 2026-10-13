<?php
/**
 * Helper functions used when rendering the Sticky Bar block.
 *
 * @package StickyBarBlock
 */

defined( 'ABSPATH' ) || exit;

/**
 * Validates a CSS color value.
 *
 * Accepts hex colors, rgb()/rgba()/hsl()/hsla() functions and WordPress
 * preset color variables. Anything else returns an empty string.
 *
 * @param mixed $color Raw color value.
 * @return string Safe color value or empty string.
 */
function sticky_bar_block_sanitize_color( $color ) {
	if ( ! is_string( $color ) ) {
		return '';
	}

	$color = trim( $color );

	if ( '' === $color ) {
		return '';
	}

	if ( preg_match( '/^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/', $color ) ) {
		return $color;
	}

	if ( preg_match( '/^(?:rgba?|hsla?)\(\s*[0-9.,%\s\/]+\)$/i', $color ) ) {
		return $color;
	}

	if ( preg_match( '/^var\(--wp--preset--color--[a-z0-9-]+\)$/', $color ) ) {
		return $color;
	}

	return '';
}

/**
 * Validates a CSS font-size value.
 *
 * Accepts plain lengths (px, em, rem, %, vw, vh), clamp()/min()/max()/calc()
 * expressions built from safe characters, and preset font-size variables.
 *
 * @param mixed $size Raw font-size value.
 * @return string Safe font-size value or empty string.
 */
function sticky_bar_block_sanitize_font_size( $size ) {
	if ( is_int( $size ) || is_float( $size ) ) {
		$size = $size . 'px';
	}

	if ( ! is_string( $size ) ) {
		return '';
	}

	$size = trim( $size );

	if ( preg_match( '/^\d*\.?\d+(?:px|em|rem|%|vw|vh)$/', $size ) ) {
		return $size;
	}

	if ( preg_match( '/^(?:clamp|min|max|calc)\([0-9a-z.,%+\-*\/\s()]+\)$/i', $size ) ) {
		return $size;
	}

	if ( preg_match( '/^var\(--wp--preset--font-size--[a-z0-9-]+\)$/', $size ) ) {
		return $size;
	}

	return '';
}

/**
 * Validates a CSS font-weight value.
 *
 * @param mixed $weight Raw font-weight.
 * @return string Safe font-weight or empty string.
 */
function sticky_bar_block_sanitize_font_weight( $weight ) {
	$allowed = array( '100', '200', '300', '400', '500', '600', '700', '800', '900', 'normal', 'bold' );

	return in_array( (string) $weight, $allowed, true ) ? (string) $weight : '';
}

/**
 * Clamps a numeric attribute to an integer range.
 *
 * @param mixed $value    Raw value.
 * @param int   $min      Minimum allowed value.
 * @param int   $max      Maximum allowed value.
 * @param int   $fallback Value to use when the input is not numeric.
 * @return int
 */
function sticky_bar_block_clamp_int( $value, $min, $max, $fallback ) {
	if ( ! is_numeric( $value ) ) {
		return (int) $fallback;
	}

	return (int) max( $min, min( $max, (int) round( (float) $value ) ) );
}

/**
 * Returns an attribute from the list only if it matches an allowed value.
 *
 * @param array  $attributes Block attributes.
 * @param string $key        Attribute name.
 * @param array  $allowed    Allowed values.
 * @param string $fallback   Fallback value.
 * @return string
 */
function sticky_bar_block_enum( $attributes, $key, $allowed, $fallback ) {
	$value = isset( $attributes[ $key ] ) ? $attributes[ $key ] : $fallback;

	return in_array( $value, $allowed, true ) ? $value : $fallback;
}
