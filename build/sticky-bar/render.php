<?php
/**
 * Frontend render template for the Sticky Bar block.
 *
 * @package NoticeBarStickyBannerBlock
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Rendered inner blocks.
 * @var WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- All output is escaped inside nsbb_render().
echo nsbb_render( $attributes, $content );
