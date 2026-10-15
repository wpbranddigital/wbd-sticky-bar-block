<?php
/**
 * Server-side rendering for the Sticky Bar block.
 *
 * @package NoticeBarStickyBannerBlock
 */

defined( 'ABSPATH' ) || exit;

/**
 * Builds the frontend markup for a Sticky Bar block.
 *
 * All attribute values are validated here and every piece of output is
 * escaped. The nested content ($content) is the already-rendered markup
 * of the allowed inner blocks, which WordPress filters when the post is saved.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Rendered inner blocks.
 * @return string Block HTML.
 */
function nsbb_render( $attributes, $content ) {
	$attributes = is_array( $attributes ) ? $attributes : array();
	$content    = is_string( $content ) ? $content : '';

	$position      = nsbb_enum( $attributes, 'position', array( 'top', 'bottom' ), 'top' );
	$justification = nsbb_enum( $attributes, 'contentJustification', array( 'left', 'center', 'right', 'space-between' ), 'center' );
	$animation     = nsbb_enum( $attributes, 'animation', array( 'none', 'fade', 'slide' ), 'slide' );
	$dismiss       = nsbb_enum( $attributes, 'dismissMemory', array( 'none', 'session', 'local' ), 'session' );

	$offset    = nsbb_clamp_int( isset( $attributes['offset'] ) ? $attributes['offset'] : 0, 0, 200, 0 );
	$z_index   = nsbb_clamp_int( isset( $attributes['zIndex'] ) ? $attributes['zIndex'] : 999, 1, 99998, 999 );
	$gap       = nsbb_clamp_int( isset( $attributes['gap'] ) ? $attributes['gap'] : 16, 0, 80, 16 );
	$max_width = nsbb_clamp_int( isset( $attributes['contentMaxWidth'] ) ? $attributes['contentMaxWidth'] : 0, 0, 1920, 0 );

	$show_cta   = ! isset( $attributes['showCta'] ) || ! empty( $attributes['showCta'] );
	$show_close = ! isset( $attributes['showClose'] ) || ! empty( $attributes['showClose'] );

	$bar_id = isset( $attributes['barId'] ) ? sanitize_key( $attributes['barId'] ) : '';
	if ( '' === $bar_id ) {
		$bar_id = 'sbb-' . substr( md5( $content ), 0, 10 );
	}

	$region_label = isset( $attributes['ariaLabel'] ) ? trim( sanitize_text_field( $attributes['ariaLabel'] ) ) : '';
	if ( '' === $region_label ) {
		$region_label = __( 'Announcement', 'noticebar-sticky-banner-block' );
	}

	// Wrapper classes.
	$classes = array(
		'sbb-bar',
		'sbb-position-' . $position,
		'sbb-justify-' . $justification,
		'sbb-animation-' . $animation,
	);

	if ( 'top' === $position && ( ! isset( $attributes['adminBarOffset'] ) || ! empty( $attributes['adminBarOffset'] ) ) ) {
		$classes[] = 'sbb-has-admin-bar-offset';
	}
	if ( ! isset( $attributes['stackOnMobile'] ) || ! empty( $attributes['stackOnMobile'] ) ) {
		$classes[] = 'sbb-stack-on-mobile';
	}
	foreach ( array(
		'hideOnDesktop' => 'sbb-hide-on-desktop',
		'hideOnTablet'  => 'sbb-hide-on-tablet',
		'hideOnMobile'  => 'sbb-hide-on-mobile',
	) as $key => $class_name ) {
		if ( ! empty( $attributes[ $key ] ) ) {
			$classes[] = $class_name;
		}
	}

	// Wrapper CSS custom properties (all values are validated integers).
	$style = sprintf(
		'--sbb-offset:%1$dpx;--sbb-z-index:%2$d;--sbb-gap:%3$dpx;',
		$offset,
		$z_index,
		$gap
	);
	if ( $max_width > 0 ) {
		$style .= sprintf( '--sbb-content-max-width:%dpx;', $max_width );
	}

	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'class'           => implode( ' ', $classes ),
			'style'           => $style,
			'role'            => 'region',
			'aria-label'      => $region_label,
			'data-sbb-id'     => $bar_id,
			'data-sbb-memory' => $dismiss,
		)
	);

	// CTA button (rendered only when it has both text and a valid URL).
	$cta_html = '';
	$cta_text = isset( $attributes['ctaText'] ) ? wp_strip_all_tags( (string) $attributes['ctaText'] ) : '';
	$cta_url  = isset( $attributes['ctaUrl'] ) ? esc_url( trim( (string) $attributes['ctaUrl'] ) ) : '';

	if ( $show_cta && '' !== trim( $cta_text ) && '' !== $cta_url ) {
		$cta_styles = array();

		$cta_bg = nsbb_sanitize_color( isset( $attributes['ctaBackgroundColor'] ) ? $attributes['ctaBackgroundColor'] : '' );
		if ( '' !== $cta_bg ) {
			$cta_styles[] = 'background-color:' . $cta_bg;
		}

		$cta_color = nsbb_sanitize_color( isset( $attributes['ctaTextColor'] ) ? $attributes['ctaTextColor'] : '' );
		if ( '' !== $cta_color ) {
			$cta_styles[] = 'color:' . $cta_color;
		}

		$cta_styles[] = sprintf( 'border-radius:%dpx', nsbb_clamp_int( isset( $attributes['ctaBorderRadius'] ) ? $attributes['ctaBorderRadius'] : 4, 0, 999, 4 ) );
		$cta_styles[] = sprintf(
			'padding:%1$dpx %2$dpx',
			nsbb_clamp_int( isset( $attributes['ctaPaddingY'] ) ? $attributes['ctaPaddingY'] : 8, 0, 40, 8 ),
			nsbb_clamp_int( isset( $attributes['ctaPaddingX'] ) ? $attributes['ctaPaddingX'] : 16, 0, 80, 16 )
		);

		$cta_font_size = nsbb_sanitize_font_size( isset( $attributes['ctaFontSize'] ) ? $attributes['ctaFontSize'] : '' );
		if ( '' !== $cta_font_size ) {
			$cta_styles[] = 'font-size:' . $cta_font_size;
		}

		$cta_font_weight = nsbb_sanitize_font_weight( isset( $attributes['ctaFontWeight'] ) ? $attributes['ctaFontWeight'] : '' );
		if ( '' !== $cta_font_weight ) {
			$cta_styles[] = 'font-weight:' . $cta_font_weight;
		}

		$new_tab      = ! empty( $attributes['ctaNewTab'] );
		$target_attrs = $new_tab ? ' target="_blank" rel="noopener noreferrer"' : '';
		$new_tab_text = $new_tab
			? '<span class="screen-reader-text">' . esc_html__( '(opens in a new tab)', 'noticebar-sticky-banner-block' ) . '</span>'
			: '';

		$cta_html = sprintf(
			'<a class="sbb-cta" href="%1$s" style="%2$s"%3$s>%4$s%5$s</a>',
			$cta_url,
			esc_attr( implode( ';', $cta_styles ) ),
			$target_attrs,
			esc_html( html_entity_decode( $cta_text, ENT_QUOTES, get_bloginfo( 'charset' ) ) ),
			$new_tab_text
		);
	}

	// Close button. It is hidden until view.js runs, so visitors without
	// JavaScript never see a button that does nothing.
	$close_html = '';
	if ( $show_close ) {
		$icon_size  = nsbb_clamp_int( isset( $attributes['closeIconSize'] ) ? $attributes['closeIconSize'] : 20, 12, 48, 20 );
		$icon_color = nsbb_sanitize_color( isset( $attributes['closeIconColor'] ) ? $attributes['closeIconColor'] : '' );

		$close_html = sprintf(
			'<button type="button" class="sbb-close" aria-label="%1$s"%2$s hidden><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="%3$d" height="%3$d" aria-hidden="true" focusable="false"><path d="M13.06 12l5.47-5.47-1.06-1.06L12 10.94 6.53 5.47 5.47 6.53 10.94 12l-5.47 5.47 1.06 1.06L12 13.06l5.47 5.47 1.06-1.06L13.06 12z"/></svg></button>',
			esc_attr(
				sprintf(
					/* translators: %s: accessible name of the bar, e.g. "Announcement". */
					__( 'Close %s', 'noticebar-sticky-banner-block' ),
					$region_label
				)
			),
			'' !== $icon_color ? ' style="' . esc_attr( 'color:' . $icon_color ) . '"' : '',
			$icon_size
		);
	}

	return sprintf(
		'<div %1$s><div class="sbb-inner"><div class="sbb-content">%2$s</div>%3$s</div>%4$s</div>',
		$wrapper_attributes,
		$content,
		$cta_html,
		$close_html
	);
}
